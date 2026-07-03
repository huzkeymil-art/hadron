import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCanvasActive, isCompactViewport } from "../hooks/useCanvasActive.js";

/**
 * BlackHoleScene — the hero's single living thing.
 *
 * A cinematic, physically-suggestive black hole: a pure-black event horizon,
 * a shader-driven accretion disk (white-hot inner edge cooling to ember),
 * two "lensed" light arcs bowing over and under the horizon, and three
 * depth layers of drifting dust. Everything is emissive/unlit — no lights,
 * no HDR environment — so the whole scene costs a handful of draw calls.
 *
 * Motion is deliberately slow: the disk streaks creep, the photon ring
 * breathes, dust drifts along orbital paths, and the rig follows the
 * pointer with a heavy lerp. Nothing here is fast enough to distract.
 */

/* ---------- shared palette (matches the site's CSS tokens) ---------- */
const HOT = new THREE.Color("#fff3ea"); // white-hot plasma
const EMBER = new THREE.Color("#ff3d00"); // brand ember
const DEEP = new THREE.Color("#b32505"); // cooled outer plasma
const DUST = new THREE.Color("#d8cfc2"); // bone-tinted star dust

/* ---------- procedural radial-gradient sprite texture ---------- */
function makeGlowTexture(inner, outer) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ---------- accretion disk (custom shader) ---------- */
const DISK_VERT = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DISK_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uInner;
  uniform float uOuter;
  uniform float uOpacity;
  uniform vec3 uHot;
  uniform vec3 uEmber;
  uniform vec3 uDeep;
  varying vec2 vPos;

  void main() {
    float r = length(vPos);
    float t = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
    float angle = atan(vPos.y, vPos.x);

    // layered rotating streaks — plasma shear, not stripes
    float a1 = sin(angle * 23.0 - uTime * 0.30 + r * 6.0);
    float a2 = sin(angle * 11.0 + uTime * 0.18 - r * 9.0);
    float a3 = sin(angle * 43.0 - uTime * 0.42 + r * 14.0);
    float streak = 0.60 + 0.40 * (0.5 * a1 + 0.3 * a2 + 0.2 * a3);

    // radial profile: white-hot at the inner edge, thinning outward
    float body = pow(1.0 - t, 2.4);
    float innerFade = smoothstep(0.0, 0.06, t);

    // relativistic beaming — the approaching side burns brighter
    float beam = 1.0 + 0.55 * sin(angle);

    vec3 col = mix(uEmber, uHot, pow(1.0 - t, 3.0));
    col = mix(uDeep, col, smoothstep(0.0, 0.55, 1.0 - t));

    float alpha = body * streak * innerFade * uOpacity;
    gl_FragColor = vec4(col * beam, alpha);
  }
`;

function AccretionDisk({ inner = 1.16, outer = 3.1, opacity = 0.85 }) {
  const mat = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInner: { value: inner },
      uOuter: { value: outer },
      uOpacity: { value: opacity },
      uHot: { value: HOT },
      uEmber: { value: EMBER },
      uDeep: { value: DEEP },
    }),
    [inner, outer, opacity]
  );
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[-1.32, 0, -0.18]}>
      <ringGeometry args={[inner, outer, 128, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={DISK_VERT}
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

/* ---------- lensed light arc (fades at both ends, breathes slowly) ---------- */
const ARC_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float fade = sin(vUv.x * 3.14159);
    float pulse = 0.85 + 0.15 * sin(uTime * 0.35 + vUv.x * 6.2831);
    gl_FragColor = vec4(uColor, fade * pulse * uOpacity);
  }
`;

const ARC_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function LensArc({ radius, tube, arc, rotationZ, color, opacity }) {
  const mat = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color(color) },
    }),
    [color, opacity]
  );
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[0, 0, rotationZ]}>
      <torusGeometry args={[radius, tube, 8, 80, arc]} />
      <shaderMaterial
        ref={mat}
        vertexShader={ARC_VERT}
        fragmentShader={ARC_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ---------- event horizon: pure black core + breathing photon ring ---------- */
function EventHorizon() {
  const ring = useRef();
  useFrame(({ clock }) => {
    if (ring.current) {
      ring.current.material.opacity = 0.75 + 0.12 * Math.sin(clock.getElapsedTime() * 0.3);
    }
  });
  return (
    <group>
      {/* the hole itself — writes depth so the far side of the disk vanishes behind it */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#000000" toneMapped={false} />
      </mesh>
      {/* photon ring hugging the horizon */}
      <mesh>
        <torusGeometry args={[1.035, 0.012, 8, 96]} />
        <meshBasicMaterial
          color="#ffddc8"
          transparent
          opacity={0.8}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* a wider, warmer ring that breathes slowly */}
      <mesh ref={ring}>
        <torusGeometry args={[1.06, 0.02, 8, 96]} />
        <meshBasicMaterial
          color="#ff6a2b"
          transparent
          opacity={0.8}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ---------- layered dust: orbital band, background field, foreground motes ---------- */
function useScatter(count, generate) {
  return useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = generate(i);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, generate]);
}

function DustBand({ count }) {
  const ref = useRef();
  const positions = useScatter(count, () => {
    // flattened orbital band hugging the disk plane
    const r = 1.5 + Math.pow(Math.random(), 1.6) * 4.2;
    const a = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 0.28;
    return [Math.cos(a) * r, y, Math.sin(a) * r * 0.9];
  });
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012; // slow orbital drift
  });
  return (
    <points ref={ref} rotation={[-1.32 + Math.PI / 2, 0, -0.18]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={DUST}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DustField({ count }) {
  const ref = useRef();
  const positions = useScatter(count, () => {
    // sparse spherical shell — deep-space backdrop
    const r = 4.5 + Math.random() * 4.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta) * 0.6, -Math.abs(r * Math.cos(phi)) * 0.7];
  });
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
  const positions = useScatter(count, () => {
    const x = (Math.random() - 0.5) * 9;
    const y = (Math.random() - 0.5) * 5;
    const z = 2 + Math.random() * 2.2;
    return [x, y, z];
  });
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.006;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={DUST} size={0.05} sizeAttenuation transparent opacity={0.18} depthWrite={false} />
    </points>
  );
}

/* ---------- ambient plasma glow + gravitational darkening ---------- */
function Glows() {
  const emberGlow = useMemo(() => makeGlowTexture("rgba(255,90,30,0.5)", "rgba(255,90,30,0)"), []);
  const darkHalo = useMemo(() => makeGlowTexture("rgba(0,0,0,0.85)", "rgba(0,0,0,0)"), []);
  const glow = useRef();
  useFrame(({ clock }) => {
    if (glow.current) glow.current.material.opacity = 0.22 + 0.05 * Math.sin(clock.getElapsedTime() * 0.25);
  });
  return (
    <group>
      {/* gravitational darkening — space dims near the horizon */}
      <sprite scale={[4.6, 4.6, 1]} position={[0, 0, -0.5]}>
        <spriteMaterial map={darkHalo} transparent depthWrite={false} opacity={0.6} />
      </sprite>
      {/* soft plasma ambience */}
      <sprite ref={glow} scale={[6.5, 4.4, 1]} position={[0, -0.1, -1.2]}>
        <spriteMaterial map={emberGlow} transparent depthWrite={false} opacity={0.24} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* ---------- scene + pointer rig ---------- */
function Scene({ compact, offsetX }) {
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
      <group ref={rig} position={[offsetX, compact ? 1.05 : 0.2, 0]} scale={compact ? 0.72 : 1}>
        <EventHorizon />
        <AccretionDisk outer={compact ? 2.7 : 3.1} />
        <LensArc radius={1.42} tube={0.035} arc={2.3} rotationZ={Math.PI / 2 - 1.15} color="#ffd9c2" opacity={0.4} />
        <LensArc radius={1.3} tube={0.025} arc={1.7} rotationZ={-Math.PI / 2 - 0.85} color="#ff3d00" opacity={0.22} />
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
  const compact = isCompactViewport();
  const offsetX = compact ? 0 : 1.25;

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [0, 0.3, 6.4], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Scene compact={compact} offsetX={offsetX} />
        </Suspense>
      </Canvas>
    </div>
  );
}
