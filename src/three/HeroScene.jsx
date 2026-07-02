import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useCanvasActive, isCompactViewport } from "../hooks/useCanvasActive.js";

/* Inline studio lighting environment — gives metals something to reflect
   without fetching any HDR (fully offline). The single biggest quality lever. */
function StudioEnv() {
  return (
    <Environment resolution={128}>
      <Lightformer intensity={2.2} color="#ff6a2b" position={[-5, 2, 2]} scale={[9, 9, 1]} />
      <Lightformer intensity={1.3} color="#3a6bff" position={[6, -2, 1]} scale={[7, 7, 1]} />
      <Lightformer intensity={3} color="#fff3ea" position={[0, 6, -4]} scale={[12, 4, 1]} />
      <Lightformer intensity={0.8} color="#f4f1ea" position={[0, -6, 3]} scale={[10, 4, 1]} />
    </Environment>
  );
}

/* The distorted core — a dark, glossy "hadron" that breathes and warps. */
function Core({ pointer }) {
  const mesh = useRef();
  const mat = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.z += delta * 0.04;
    // ease toward the pointer for a subtle parallax tilt
    const tx = pointer.current.y * 0.35;
    const ty = pointer.current.x * 0.5;
    mesh.current.rotation.x += (tx - mesh.current.rotation.x) * 0.05;
    mesh.current.position.x += (ty * 0.4 - mesh.current.position.x) * 0.05;
  });

  return (
    <mesh ref={mesh} scale={1.55}>
      <icosahedronGeometry args={[1, 14]} />
      <MeshDistortMaterial
        ref={mat}
        color="#0e0e0e"
        roughness={0.1}
        metalness={0.96}
        distort={0.32}
        speed={1.6}
        emissive="#ff3d00"
        emissiveIntensity={0.06}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

/* Orbital rings — echoes the atom logo and gives the scene depth. */
function Rings({ pointer }) {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x += (pointer.current.y * 0.25 - group.current.rotation.x) * 0.04;
  });

  const ringProps = useMemo(
    () => [
      { rot: [Math.PI / 2.2, 0, 0], color: "#ff3d00", r: 2.7 },
      { rot: [Math.PI / 2, Math.PI / 3, 0], color: "#4a4a4a", r: 3.05 },
      { rot: [Math.PI / 1.7, -Math.PI / 3, 0], color: "#6b6b6b", r: 3.35 },
    ],
    []
  );

  return (
    <group ref={group}>
      {ringProps.map((p, i) => (
        <mesh key={i} rotation={p.rot}>
          <torusGeometry args={[p.r, 0.008, 16, 160]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={i === 0 ? 0.6 : 0.12}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* A drifting field of tiny shards for atmosphere. */
function Shards({ count = 26 }) {
  const ref = useRef();
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: [
          THREE.MathUtils.randFloatSpread(11),
          THREE.MathUtils.randFloatSpread(7),
          THREE.MathUtils.randFloatSpread(6) - 2,
        ],
        s: THREE.MathUtils.randFloat(0.02, 0.07),
      })),
    [count]
  );
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });
  return (
    <group ref={ref}>
      {data.map((d, i) => (
        <mesh key={i} position={d.pos} scale={d.s}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f4f1ea" emissive="#f4f1ea" emissiveIntensity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ shardCount }) {
  const pointer = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    // normalised pointer (-1..1) smoothed
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.08;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.08;
  });

  return (
    <>
      <fog attach="fog" args={["#070707", 9, 17]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#fff5ee" />
      <pointLight position={[-6, -2, 2]} intensity={34} color="#ff3d00" distance={20} />
      <pointLight position={[4, -4, -4]} intensity={12} color="#3a6bff" distance={18} />
      <StudioEnv />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <Core pointer={pointer} />
      </Float>
      <Rings pointer={pointer} />
      <Shards count={shardCount} />
      <Sparkles count={shardCount * 2} scale={[11, 7, 5]} size={1.4} speed={0.3} opacity={0.5} color="#ffb38a" />
    </>
  );
}

export default function HeroScene() {
  const wrap = useRef(null);
  const active = useCanvasActive(wrap);
  const shardCount = isCompactViewport() ? 14 : 26;

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
        camera={{ position: [0, 0, 6], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Scene shardCount={shardCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
