import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { useCanvasActive, isCompactViewport } from "../hooks/useCanvasActive.js";

/* Inline studio lighting — reflections without any HDR fetch. */
function StudioEnv() {
  return (
    <Environment resolution={128}>
      <Lightformer intensity={2.4} color="#ff6a2b" position={[-5, 2, 2]} scale={[9, 9, 1]} />
      <Lightformer intensity={1.2} color="#8b5cf6" position={[6, -2, 1]} scale={[7, 7, 1]} />
      <Lightformer intensity={3} color="#fff3ea" position={[0, 6, -4]} scale={[12, 4, 1]} />
      <Lightformer intensity={0.8} color="#f4f1ea" position={[0, -6, 3]} scale={[10, 4, 1]} />
    </Environment>
  );
}

/**
 * A stream of particles racing around a tilted circular beamline. Instanced —
 * hundreds of particles cost a single draw call. Particles bunch into packets
 * (like a real accelerator) via a comb function on their phase.
 */
function BeamStream({ radius = 2.6, tilt = 0, speed = 0.55, color = "#ff3d00", count = 220, dir = 1 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        phase: (i / count) * Math.PI * 2,
        wobble: Math.random() * Math.PI * 2,
        size: 0.012 + Math.random() * 0.03,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const a = s.phase + t * speed * dir;
      // packet bunching: particles cluster into 3 traveling bunches
      const bunch = 1 + 0.5 * Math.sin(a * 3);
      const r = radius + Math.sin(t * 1.4 + s.wobble) * 0.03;
      dummy.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.32, Math.sin(a) * r * 0.6);
      dummy.scale.setScalar(s.size * bunch);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.rotation.z = tilt;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} roughness={0.3} toneMapped={false} />
    </instancedMesh>
  );
}

/* Thin guide ring marking each beamline. */
function BeamGuide({ radius, tilt, color, opacity = 0.35 }) {
  return (
    <mesh rotation={[Math.PI / 2 - 0.62, 0, tilt]}>
      <torusGeometry args={[radius, 0.006, 12, 200]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={opacity} />
    </mesh>
  );
}

/* Collision flashes where the two beamlines cross — pulsing point lights + a flare mesh. */
function CollisionFlash({ position }) {
  const light = useRef();
  const flare = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.pow(Math.max(0, Math.sin(t * 1.6 + offset)), 10);
    if (light.current) light.current.intensity = 4 + pulse * 60;
    if (flare.current) {
      flare.current.scale.setScalar(0.05 + pulse * 0.55);
      flare.current.material.opacity = 0.25 + pulse * 0.75;
    }
  });
  return (
    <group position={position}>
      <pointLight ref={light} color="#ffd9c2" distance={7} />
      <mesh ref={flare}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#fff1e6" transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/* The interaction core — a dark reflective nucleus at the collision point. */
function Core({ pointer }) {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += (pointer.current.y * 0.3 - mesh.current.rotation.x) * 0.05;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={mesh} scale={0.85}>
        <icosahedronGeometry args={[1, 5]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.12} metalness={0.96} envMapIntensity={1.2} emissive="#ff3d00" emissiveIntensity={0.05} />
      </mesh>
    </Float>
  );
}

function Scene({ particleCount }) {
  const pointer = useRef({ x: 0, y: 0 });
  const rig = useRef();
  useFrame((state) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.07;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.07;
    if (rig.current) {
      rig.current.rotation.y = pointer.current.x * 0.16;
      rig.current.rotation.x = -pointer.current.y * 0.1;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#070707", 9, 18]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#fff5ee" />
      <pointLight position={[-6, -2, 2]} intensity={30} color="#ff3d00" distance={20} />
      <pointLight position={[5, -4, -4]} intensity={12} color="#8b5cf6" distance={18} />
      <StudioEnv />

      <group ref={rig} rotation={[0.1, 0, 0]}>
        <Core pointer={pointer} />
        <BeamStream radius={2.6} tilt={0.5} speed={0.5} color="#ff3d00" count={particleCount} dir={1} />
        <BeamStream radius={3.1} tilt={-0.55} speed={0.42} color="#ff8a3d" count={particleCount} dir={-1} />
        <BeamGuide radius={2.6} tilt={0.5} color="#ff3d00" />
        <BeamGuide radius={3.1} tilt={-0.55} color="#6b6b6b" opacity={0.25} />
        <CollisionFlash position={[2.85, 0.2, 0.9]} />
        <CollisionFlash position={[-2.8, -0.25, -0.6]} />
      </group>

      <Sparkles count={isCompactViewport() ? 24 : 50} scale={[11, 7, 5]} size={1.4} speed={0.3} opacity={0.5} color="#ffb38a" />
    </>
  );
}

export default function ColliderScene() {
  const wrap = useRef(null);
  const active = useCanvasActive(wrap);
  const particleCount = isCompactViewport() ? 130 : 240;

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
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0.4, 6.4], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Scene particleCount={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
