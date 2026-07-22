"use client";

import { motion } from "framer-motion";

interface GlowingOrbProps {
  className?: string;
  color?: "blue" | "purple" | "cyan" | "pink";
  size?: number;
}

export default function GlowingOrb({ 
  className = "", 
  color = "blue",
  size = 400 
}: GlowingOrbProps) {
  const colors = {
    blue: "from-blue-500/30 via-blue-400/20 to-transparent",
    purple: "from-purple-500/30 via-purple-400/20 to-transparent",
    cyan: "from-cyan-500/30 via-cyan-400/20 to-transparent",
    pink: "from-pink-500/30 via-pink-400/20 to-transparent",
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-radial ${colors[color]} blur-3xl pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}