import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCanvasActive } from "../hooks/useCanvasActive.js";

/**
 * BlackHoleScene — the hero's single living thing.
 *
 * A physically-suggestive black hole in the Gargantua register:
 *  - a pure-black event horizon that depth-occludes everything behind it
 *  - a Keplerian accretion disk (inner plasma shears faster than outer,
 *    turbulent noise streaks, relativistic doppler beaming that brightens
 *    and whitens the approaching side)
 *  - a screen-space lensing halo: thin photon ring hugging the horizon plus
 *    the lensed image of the disk's far side bowing over and under the hole
 *  - three depth layers of drifting dust
 *
 * Everything is emissive/unlit — no lights, no HDR — a handful of draw calls.
 * Motion is slow by design: the disk creeps, the ring breathes, dust drifts.
 */

/* ---------- shared GLSL: cheap value noise ---------- */
const GLSL_NOISE = /* glsl */ `
  float bh_hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float bh_noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(bh_hash(i), bh_hash(i + vec2(1.0, 0.0)), u.x),
      mix(bh_hash(i + vec2(0.0, 1.0)), bh_hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
`;

const BASIC_VERT = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* ---------- accretion disk: Keplerian shear + turbulence + beaming ---------- */
const DISK_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uInner;
  uniform float uOuter;
  uniform float uOpacity;
  uniform vec3 uHot;
  uniform vec3 uEmber;
  uniform vec3 uDeep;
  varying vec2 vPos;

  ${GLSL_NOISE}

  void main() {
    float r = length(vPos);
    float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
    float angle = atan(vPos.y, vPos.x);

    // Keplerian differential rotation — inner plasma orbits faster,
    // so the streaks wind into trailing spirals over time.
    float w = 0.42 / pow(max(r, 0.35), 1.5);
    float a = angle - uTime * w;

    // turbulent plasma streaks in co-rotating coordinates
    float n1 = bh_noise(vec2(a * 5.0, r * 11.0));
    float n2 = bh_noise(vec2(a * 13.0 + 7.3, r * 23.0));
    float n3 = bh_noise(vec2(a * 29.0 + 3.1, r * 41.0));
    float streak = 0.35 + 0.65 * (0.55 * n1 + 0.30 * n2 + 0.15 * n3);

    // radial profile: white-hot rim thinning outward, soft inner skirt
    float body = pow(1.0 - t, 2.1);
    float skirt = smoothstep(0.0, 0.05, t);

    // relativistic beaming — the approaching side burns brighter and whiter
    float dop = 0.5 + 0.5 * sin(angle);
    float beam = mix(0.4, 1.8, dop);

    vec3 col = mix(uEmber, uHot, pow(1.0 - t, 2.6) * (0.3 + 0.7 * dop));
    col = mix(uDeep, col, smoothstep(0.0, 0.55, 1.0 - t));

    float alpha = body * streak * skirt * uOpacity;
    gl_FragColor = vec4(col * beam * 1.3, alpha);
  }
`;

/* ---------- lensing halo: photon ring + lensed far-side disk arcs ---------- */
const HALO_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uHot;
  uniform vec3 uEmber;
  varying vec2 vPos;

  ${GLSL_NOISE}

  void main() {
    float r = length(vPos);
    float angle = atan(vPos.y, vPos.x);

    // thin photon ring hugging the horizon, with a faint secondary echo
    float ring  = exp(-pow((r - 1.045) / 0.016, 2.0));
    float ring2 = exp(-pow((r - 1.095) / 0.045, 2.0)) * 0.22;

    // lensed far side of the disk: a broad arch over the top of the hole
    // and a tighter, dimmer secondary image beneath it
    float up = max(sin(angle), 0.0);
    float dn = max(-sin(angle), 0.0);
    float topArc = exp(-pow((r - 1.34) / 0.17, 2.0)) * pow(up, 1.5);
    float botArc = exp(-pow((r - 1.15) / 0.07, 2.0)) * pow(dn, 2.2) * 0.55;

    // tangentially smeared light — background stars stretched by the lens
    float sm = bh_noise(vec2(angle * 8.0 + uTime * 0.015, r * 4.0));
    float smear = exp(-pow((r - 1.3) / 0.4, 2.0)) * sm * 0.10;

    // the disk is beamed bright on its left — keep the lensed images coherent
    float lr = 0.5 + 0.5 * cos(angle + 3.14159);
    float arcs = (topArc * 1.2 + botArc) * mix(0.55, 1.5, lr);

    float pulse = 0.92 + 0.08 * sin(uTime * 0.22);
    float glow = ring * 1.5 + ring2 + arcs + smear;

    vec3 col = mix(uEmber, uHot, clamp(ring * 1.3 + topArc * 0.6 + 0.12, 0.0, 1.0));
    gl_FragColor = vec4(col * glow * pulse, clamp(glow, 0.0, 1.0) * uOpacity);
  }
`;

/* ---------- palette ---------- */
const HOT = new THREE.Color("#fff3ea");
const EMBER = new THREE.Color("#ff3d00");
const DEEP = new THREE.Color("#b32505");
const DUST = new THREE.Color("#d8cfc2");

/* the disk's orientation — dust layers reuse it so everything shares a plane */
const DISK_EULER = [-1.32, 0, -0.18];

/* ---------- reactive compact-viewport hook (resize/orientation aware) ---------- */
function useCompact() {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setCompact(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return compact;
}

/* ---------- procedural radial-gradient sprite texture (disposed on unmount) ---------- */
function useGlowTexture(inner, outer) {
  const tex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [inner, outer]);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

/* ---------- accretion disk mesh ---------- */
function AccretionDisk({ outer }) {
  const mat = useRef();
  // stable identity — values are mutated, never replaced, so the compiled
  // program keeps reading the same uniform holders
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInner: { value: 1.14 },
      uOuter: { value: 3.1 },
      uOpacity: { value: 0.9 },
      uHot: { value: HOT },
      uEmber: { value: EMBER },
      uDeep: { value: DEEP },
    }),
    []
  );
  useEffect(() => {
    uniforms.uOuter.value = outer;
  }, [uniforms, outer]);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh rotation={DISK_EULER}>
      {/* geometry sized to the max radius; the shader fades to uOuter */}
      <ringGeometry args={[1.14, 3.1, 128, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={BASIC_VERT}
        fragmentShader={DISK_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ---------- screen-space lensing halo ---------- */
function LensHalo() {
  const mat = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0.85 },
      uHot: { value: HOT },
      uEmber: { value: EMBER },
    }),
    []
  );
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh>
      <ringGeometry args={[1.0, 2.2, 128, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={BASIC_VERT}
        fragmentShader={HALO_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ---------- event horizon ---------- */
function EventHorizon() {
  return (
    <mesh>
      <sphereGeometry args={[1, 48, 48]} />
      <meshBasicMaterial color="#000000" toneMapped={false} />
    </mesh>
  );
}

/* ---------- layered dust ---------- */
function makeScatter(count, generate) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [x, y, z] = generate();
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }
  return arr;
}

/* orbital band hugging the disk plane — generated in the disk's local XY
   plane and given the disk's exact Euler, so it cannot drift off-plane;
   the z-spin is an in-plane orbit by construction */
function DustBand({ count }) {
  const ref = useRef();
  const positions = useMemo(
    () =>
      makeScatter(count, () => {
        const r = 1.5 + Math.pow(Math.random(), 1.6) * 4.2;
        const a = Math.random() * Math.PI * 2;
        const z = (Math.random() - 0.5) * 0.24;
        return [Math.cos(a) * r, Math.sin(a) * r, z];
      }),
    [count]
  );
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.012;
  });
  return (
    <group rotation={DISK_EULER}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color={DUST}
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function DustField({ count }) {
  const ref = useRef();
  const positions = useMemo(
    () =>
      makeScatter(count, () => {
        const r = 4.5 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        return [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          -Math.abs(r * Math.cos(phi)) * 0.7,
        ];
      }),
    [count]
  );
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.004;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={DUST} size={0.014} sizeAttenuation transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

function ForegroundMotes({ count }) {
  const ref = useRef();
  const positions = useMemo(
    () =>
      makeScatter(count, () => [
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5,
        2 + Math.random() * 2.2,
      ]),
    [count]
  );
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.006;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={DUST} size={0.05} sizeAttenuation transparent opacity={0.16} depthWrite={false} />
    </points>
  );
}

/* ---------- ambient glow + gravitational darkening ---------- */
function Glows() {
  const emberGlow = useGlowTexture("rgba(255,90,30,0.5)", "rgba(255,90,30,0)");
  const darkHalo = useGlowTexture("rgba(0,0,0,0.85)", "rgba(0,0,0,0)");
  const glow = useRef();
  useFrame(({ clock }) => {
    if (glow.current) glow.current.material.opacity = 0.2 + 0.05 * Math.sin(clock.getElapsedTime() * 0.22);
  });
  return (
    <group>
      <sprite scale={[4.8, 4.8, 1]} position={[0, 0, -0.6]}>
        <spriteMaterial map={darkHalo} transparent depthWrite={false} opacity={0.65} />
      </sprite>
      <sprite ref={glow} scale={[6.2, 4.2, 1]} position={[0, -0.1, -1.2]}>
        <spriteMaterial map={emberGlow} transparent depthWrite={false} opacity={0.22} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* ---------- scene + pointer rig ---------- */
function Scene({ compact }) {
  const pointer = useRef({ x: 0, y: 0 });
  const rig = useRef();
  useFrame((state) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;
    if (rig.current) {
      rig.current.rotation.y = pointer.current.x * 0.07;
      rig.current.rotation.x = -pointer.current.y * 0.045;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#070707", 9, 18]} />
      {/* Offset right on desktop so the hole reads as a subject the headline
          sits beside; raised and reduced on mobile so it clears the text. */}
      <group
        ref={rig}
        position={compact ? [0, 1.05, 0] : [1.5, 0.35, 0]}
        scale={compact ? 0.72 : 1}
      >
        <EventHorizon />
        <LensHalo />
        <AccretionDisk outer={compact ? 2.7 : 3.1} />
        <Glows />
        <DustBand count={compact ? 260 : 620} />
      </group>
      <DustField count={compact ? 140 : 320} />
      {!compact && <ForegroundMotes count={26} />}
    </>
  );
}

export default function BlackHoleScene() {
  const wrap = useRef(null);
  const active = useCanvasActive(wrap);
  const compact = useCompact();

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        // everything in the scene is a soft glow — MSAA buys nothing, and a
        // 1.75 dpr cap keeps fillrate sane on integrated GPUs
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1.75, 1.75)]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [0, 0.3, 6.4], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Scene compact={compact} />
        </Suspense>
      </Canvas>
    </div>
  );
}
