import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Create trail particles
      if (Math.random() > 0.8) {
        createTrail(e.clientX, e.clientY);
      }
    };

    const createTrail = (x: number, y: number) => {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes trail-fade {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(0.5);
        }
      }

      .cursor-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #f97316, #fbbf24);
        border-radius: 50%;
        pointer-events: none;
        animation: trail-fade 0.6s ease-out forwards;
        z-index: 999;
        transform: translate(-4px, -4px);
      }

      body {
        cursor: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-screen"
      style={{
        background: "radial-gradient(circle, #f97316 0%, #fbbf24 100%)",
        boxShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    />
  );
}
