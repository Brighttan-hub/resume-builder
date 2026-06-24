import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function Tilt3DCard({
  children,
  className = "",
  glowColor = "rgba(124, 58, 237, 0.4)",
}: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);
  const brightness = useTransform(springY, [-0.5, 0.5], [1.15, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          filter: useTransform(brightness, (v) => `brightness(${v})`),
          transformStyle: "preserve-3d",
        }}
        className={`relative ${className}`}
      >
        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, ${glowColor} 0%, transparent 60%)`
            ),
            opacity: 0.15,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}
