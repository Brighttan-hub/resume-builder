import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating resume card mesh ─────────────────────────────────────── */
function ResumeCard() {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Card body */}
      <mesh ref={cardRef} castShadow>
        <boxGeometry args={[2.8, 3.8, 0.06]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} transparent opacity={0.97} />
      </mesh>

      {/* Orange header bar */}
      <mesh position={[0, 1.6, 0.032]}>
        <boxGeometry args={[2.8, 0.6, 0.001]} />
        <meshStandardMaterial color="#f97316" roughness={0.3} />
      </mesh>

      {/* Header text lines */}
      {[0, 0.18, 0.36].map((y, i) => (
        <mesh key={i} position={[0, 1.45 - y, 0.04]}>
          <boxGeometry args={[i === 0 ? 1.8 : i === 1 ? 1.2 : 0.9, 0.08, 0.001]} />
          <meshStandardMaterial color={i === 0 ? "#ffffff" : "#e2e8f0"} roughness={0.5} />
        </mesh>
      ))}

      {/* Section dividers and content lines */}
      {[-0.1, -0.35, -0.6, -0.85, -1.1, -1.35, -1.55, -1.7].map((y, i) => (
        <mesh key={i} position={[i % 3 === 0 ? 0 : (i % 2 === 0 ? 0.3 : -0.3), y, 0.04]}>
          <boxGeometry args={[i % 3 === 0 ? 2.2 : 1.0, 0.05, 0.001]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? "#f97316" : "#9ca3af"}
            roughness={0.5}
            transparent
            opacity={i % 4 === 0 ? 1 : 0.6}
          />
        </mesh>
      ))}

      {/* Skill badges — orange */}
      {[[-0.7, -0.9], [0.0, -0.9], [0.7, -0.9]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.04]}>
          <boxGeometry args={[0.5, 0.18, 0.01]} />
          <meshStandardMaterial color="#f97316" roughness={0.3} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Glowing edge — orange */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[2.9, 3.9, 0.02]} />
        <meshStandardMaterial
          color="#f97316"
          roughness={0.2}
          metalness={0.8}
          emissive="#f97316"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

/* ── Orbiting geometric shapes ──────────────────────────────────────── */
function OrbitingShapes() {
  const group1 = useRef<THREE.Group>(null);
  const group2 = useRef<THREE.Group>(null);
  const group3 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group1.current) {
      group1.current.position.x = Math.cos(t * 0.6) * 2.4;
      group1.current.position.y = Math.sin(t * 0.6) * 1.2;
      group1.current.rotation.x = t * 0.8;
      group1.current.rotation.z = t * 0.5;
    }
    if (group2.current) {
      group2.current.position.x = Math.cos(t * 0.4 + 2) * 2.8;
      group2.current.position.y = Math.sin(t * 0.4 + 2) * 1.5;
      group2.current.rotation.y = t * 0.7;
    }
    if (group3.current) {
      group3.current.position.x = Math.cos(t * 0.5 + 4) * 2.2;
      group3.current.position.y = Math.sin(t * 0.5 + 4) * 1.8;
      group3.current.rotation.z = t * 1.0;
    }
  });

  return (
    <>
      {/* orange octahedron */}
      <group ref={group1}>
        <mesh>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.1} emissive="#f97316" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* amber tetrahedron */}
      <group ref={group2}>
        <mesh>
          <tetrahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} emissive="#fbbf24" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* grey icosahedron */}
      <group ref={group3}>
        <mesh>
          <icosahedronGeometry args={[0.18]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.05} emissive="#9ca3af" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </>
  );
}

/* ── Animated particle ring ─────────────────────────────────────────── */
function ParticleRing() {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color("#f97316"); // orange
    const color2 = new THREE.Color("#fbbf24"); // amber

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 0.8;
      const spread = (Math.random() - 0.5) * 1.5;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = spread;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const t = Math.random();
      const c = color1.clone().lerp(color2, t);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ── Floating sphere accents ────────────────────────────────────────── */
function FloatingSpheres() {
  return (
    <>
      {/* orange distorted sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} position={[-3.5, 1.5, -1]}>
        <Sphere args={[0.35, 32, 32]}>
          <MeshDistortMaterial color="#f97316" distort={0.5} speed={3} roughness={0.1} metalness={0.6} emissive="#f97316" emissiveIntensity={0.35} />
        </Sphere>
      </Float>

      {/* amber distorted sphere */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.6} position={[3.8, -1, -0.5]}>
        <Sphere args={[0.25, 32, 32]}>
          <MeshDistortMaterial color="#fbbf24" distort={0.6} speed={2} roughness={0.05} metalness={0.8} emissive="#fbbf24" emissiveIntensity={0.4} />
        </Sphere>
      </Float>

      {/* grey torus */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1} position={[2.5, 2, -2]}>
        <mesh>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.1} emissive="#6b7280" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </>
  );
}

/* ── Main scene ─────────────────────────────────────────────────────── */
export default function HeroScene3D() {
  return (
    <div className="w-full h-full" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#f97316" />
          <pointLight position={[-5, -5, 5]} intensity={1.5} color="#fbbf24" />
          <pointLight position={[0, 0, 4]} intensity={1} color="#ffffff" />

          <Stars radius={80} depth={30} count={1500} factor={3} saturation={0.4} fade speed={1} />

          <ResumeCard />
          <OrbitingShapes />
          <ParticleRing />
          <FloatingSpheres />
        </Suspense>
      </Canvas>
    </div>
  );
}
