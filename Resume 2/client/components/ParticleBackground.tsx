import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      spd[i] = 0.002 + Math.random() * 0.004;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i];
      if (pos[i * 3 + 1] < -10) {
        pos[i * 3 + 1] = 10;
        pos[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f97316"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Particles count={250} />
        </Suspense>
      </Canvas>
    </div>
  );
}
