import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Octahedron, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

/* ── spinning torus ring ─────────────────────────────────────────────── */
function SpinningTorus({ position, color, speed = 1 }: { position: [number,number,number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.getElapsedTime() * speed * 0.4;
    ref.current.rotation.y = s.clock.getElapsedTime() * speed * 0.6;
  });
  return (
    <Torus ref={ref} args={[0.5, 0.15, 16, 40]} position={position}>
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.05}
        emissive={color} emissiveIntensity={0.4} />
    </Torus>
  );
}

/* ── floating octahedron ────────────────────────────────────────────── */
function FloatingOcta({ position, color }: { position: [number,number,number]; color: string }) {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.2} position={position}>
      <Octahedron args={[0.4]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1}
          emissive={color} emissiveIntensity={0.5} />
      </Octahedron>
    </Float>
  );
}

/* ── distorted sphere ───────────────────────────────────────────────── */
function BlobSphere({ position, color }: { position: [number,number,number]; color: string }) {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial color={color} distort={0.55} speed={2.5}
          metalness={0.7} roughness={0.1} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </Float>
  );
}

/* ── floating icosahedron ───────────────────────────────────────────── */
function FloatingIco({ position, color }: { position: [number,number,number]; color: string }) {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1} position={position}>
      <Icosahedron args={[0.35]}>
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05}
          emissive={color} emissiveIntensity={0.6} />
      </Icosahedron>
    </Float>
  );
}

/* ── Main export ─────────────────────────────────────────────────────── */
interface Props {
  density?: "low" | "medium" | "high";
  className?: string;
}

export default function FloatingShapes3D({ density = "medium", className = "" }: Props) {
  const shapes = density === "low" ? [
    { type: "torus", pos: [-4, 2, -3] as [number,number,number], color: "#f97316", speed: 0.8 },
    { type: "blob",  pos: [4, -1, -2] as [number,number,number], color: "#fbbf24" },
    { type: "ico",   pos: [0, 3, -4]  as [number,number,number], color: "#9ca3af" },
  ] : density === "high" ? [
    { type: "torus", pos: [-5, 2, -3]  as [number,number,number], color: "#f97316", speed: 0.7 },
    { type: "torus", pos: [5, -2, -4]  as [number,number,number], color: "#fbbf24", speed: 1.2 },
    { type: "blob",  pos: [-3, -3, -2] as [number,number,number], color: "#f97316" },
    { type: "blob",  pos: [4, 3, -3]   as [number,number,number], color: "#ea580c" },
    { type: "octa",  pos: [0, 4, -5]   as [number,number,number], color: "#9ca3af" },
    { type: "ico",   pos: [-5, -1, -3] as [number,number,number], color: "#fbbf24" },
    { type: "ico",   pos: [3, 1, -5]   as [number,number,number], color: "#f97316" },
  ] : [
    { type: "torus", pos: [-4.5, 2, -3]  as [number,number,number], color: "#f97316", speed: 0.8 },
    { type: "torus", pos: [4.5, -1.5, -4] as [number,number,number], color: "#fbbf24", speed: 1.1 },
    { type: "blob",  pos: [-2, -2.5, -2]  as [number,number,number], color: "#f97316" },
    { type: "octa",  pos: [3, 2.5, -3]    as [number,number,number], color: "#9ca3af" },
    { type: "ico",   pos: [0, 3.5, -5]    as [number,number,number], color: "#fbbf24" },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[6, 6, 4]} intensity={2} color="#f97316" />
          <pointLight position={[-6, -4, 4]} intensity={1.5} color="#fbbf24" />

          {shapes.map((s, i) =>
            s.type === "torus" ? <SpinningTorus key={i} position={s.pos} color={s.color} speed={s.speed} /> :
            s.type === "blob"  ? <BlobSphere    key={i} position={s.pos} color={s.color} /> :
            s.type === "octa"  ? <FloatingOcta  key={i} position={s.pos} color={s.color} /> :
                                 <FloatingIco   key={i} position={s.pos} color={s.color} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
