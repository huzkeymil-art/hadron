import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

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
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        ref={mat}
        color="#141414"
        roughness={0.18}
        metalness={0.65}
        distort={0.34}
        speed={1.7}
        emissive="#ff3d00"
        emissiveIntensity={0.08}
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
function Shards() {
  const ref = useRef();
  const count = 26;
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
    []
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

function Scene() {
  const pointer = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    // normalised pointer (-1..1) smoothed
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.08;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.4} color="#fff5ee" />
      <pointLight position={[-6, -2, 2]} intensity={40} color="#ff3d00" distance={20} />
      <pointLight position={[4, -4, -4]} intensity={14} color="#3a6bff" distance={18} />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <Core pointer={pointer} />
      </Float>
      <Rings pointer={pointer} />
      <Shards />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
