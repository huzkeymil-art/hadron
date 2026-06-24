import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useCanvasActive, isCompactViewport } from "../hooks/useCanvasActive.js";

/* Inline lighting environment tinted to the project accent — gives the metals
   real reflections without fetching any HDR. */
function StudioEnv({ color }) {
  return (
    <Environment resolution={128}>
      <Lightformer intensity={2.4} color={color} position={[-5, 2, 2]} scale={[9, 9, 1]} />
      <Lightformer intensity={1.2} color="#3a6bff" position={[6, -2, 1]} scale={[7, 7, 1]} />
      <Lightformer intensity={3} color="#fff3ea" position={[0, 6, -4]} scale={[12, 4, 1]} />
      <Lightformer intensity={0.7} color="#f4f1ea" position={[0, -6, 3]} scale={[10, 4, 1]} />
    </Environment>
  );
}

/* Smoothly tracked, normalised pointer shared by every variant. */
function useParallax(ref, factor = 0.3) {
  const pointer = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.06;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.06;
    if (ref.current) {
      ref.current.rotation.y += delta * 0.18;
      ref.current.rotation.x +=
        (pointer.current.y * factor - ref.current.rotation.x) * 0.05;
    }
  });
}

function Knot({ color }) {
  const ref = useRef();
  useParallax(ref, 0.4);
  return (
    <mesh ref={ref} scale={1.25}>
      <torusKnotGeometry args={[1, 0.34, 220, 32]} />
      <meshStandardMaterial color="#0e0e0e" roughness={0.12} metalness={0.96} envMapIntensity={1.1} emissive={color} emissiveIntensity={0.1} />
    </mesh>
  );
}

function Crystal({ color }) {
  const ref = useRef();
  useParallax(ref, 0.5);
  return (
    <mesh ref={ref} scale={1.7}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.05} metalness={0.7} envMapIntensity={1.3} flatShading emissive={color} emissiveIntensity={0.16} />
    </mesh>
  );
}

function Prism({ color }) {
  const ref = useRef();
  useParallax(ref, 0.45);
  return (
    <mesh ref={ref} scale={1.7}>
      <octahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial color="#121212" roughness={0.14} metalness={0.9} envMapIntensity={1.1} distort={0.28} speed={2} emissive={color} emissiveIntensity={0.12} flatShading />
    </mesh>
  );
}

function Blob({ color }) {
  const ref = useRef();
  useParallax(ref, 0.35);
  return (
    <mesh ref={ref} scale={1.6}>
      <icosahedronGeometry args={[1, 14]} />
      <MeshDistortMaterial color="#0e0e0e" roughness={0.12} metalness={0.94} envMapIntensity={1.1} distort={0.36} speed={1.6} emissive={color} emissiveIntensity={0.08} />
    </mesh>
  );
}

function Rings({ color }) {
  const group = useRef();
  useParallax(group, 0.3);
  const rings = useMemo(
    () => [
      { rot: [Math.PI / 2.2, 0, 0], r: 2.0, c: color, e: 0.6 },
      { rot: [Math.PI / 2, Math.PI / 3, 0], r: 2.35, c: "#4a4a4a", e: 0.1 },
      { rot: [Math.PI / 1.7, -Math.PI / 3, 0], r: 2.7, c: "#6b6b6b", e: 0.1 },
    ],
    [color]
  );
  return (
    <group ref={group}>
      <mesh scale={0.65}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.14} metalness={0.95} envMapIntensity={1.1} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      {rings.map((p, i) => (
        <mesh key={i} rotation={p.rot}>
          <torusGeometry args={[p.r, 0.01, 16, 180]} />
          <meshStandardMaterial color={p.c} emissive={p.c} emissiveIntensity={p.e} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ color }) {
  const ref = useRef();
  // Fewer points on small screens — imperceptible there, much lighter.
  const count = isCompactViewport() ? 800 : 1400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute on a fuzzy sphere shell
      const r = 2.1 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += (state.pointer.y * 0.2 - ref.current.rotation.x) * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

const VARIANTS = { knot: Knot, crystal: Crystal, prism: Prism, sphere: Blob, rings: Rings, particles: ParticleField };

function Scene({ variant, color }) {
  const Obj = VARIANTS[variant] ?? Blob;
  const usesPoints = variant === "particles";
  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 9, 17]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#fff5ee" />
      <pointLight position={[-6, -2, 2]} intensity={32} color={color} distance={22} />
      <pointLight position={[4, -4, -4]} intensity={11} color="#3a6bff" distance={18} />
      {!usesPoints && <StudioEnv color={color} />}
      {usesPoints ? (
        <Obj color={color} />
      ) : (
        <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.6}>
          <Obj color={color} />
        </Float>
      )}
      <Sparkles count={40} scale={[10, 7, 5]} size={1.3} speed={0.3} opacity={0.45} color={color} />
    </>
  );
}

export default function ProjectScene({ variant = "sphere", color = "#ff3d00" }) {
  const wrap = useRef(null);
  const active = useCanvasActive(wrap);

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
        camera={{ position: [0, 0, 6], fov: 40 }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}
