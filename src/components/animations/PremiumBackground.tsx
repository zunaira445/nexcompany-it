"use client";

import { motion } from "framer-motion";
import { Smartphone, Laptop, Cloud, Wifi, Server, Cpu, Code2, Database } from "lucide-react";

/**
 * Premium 3D IT Background — Clean, minimal, content-focused.
 * A subtle 3D rotating ring as the centerpiece, with faint floating
 * particles and edge-placed device icons. The center stays crystal
 * clear for page content (text, cards, forms).
 */

/* ─────────── Subtle 3D Perspective Grid ─────────── */
function PerspectiveGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ perspective: "1400px" }}>
      <div
        className="absolute inset-0"
        style={{
          transform: "rotateX(65deg) translateY(-5%)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 131, 246, 0.25) 1px, transparent 1px)`,
          backgroundSize: "100% 80px",
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, rgba(59, 131, 246, 0.11) 1px, transparent 1px)`,
          backgroundSize: "80px 100%",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 40% at 50% 100%, transparent 10%, rgba(4, 4, 10, 0.79) 60%)",
        }} />
      </div>
    </div>
  );
}

/* ─────────── Very Subtle Floating Particles ─────────── */
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 0.5,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: Math.random() * 25 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.15 + 0.03,
}));

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.id % 3 === 0 ? "rgba(59,130,246,0.5)" : p.id % 3 === 1 ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.3)",
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -8, 5, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── Central 3D Rotating Ring (Main Focal) ─────────── */
function RotatingRing() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:flex items-center justify-center">
      <motion.div
        className="relative"
        style={{
          width: "380px",
          height: "380px",
          perspective: "1000px",
        }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "5px solid rgba(152, 213, 241, 0.4)",
            boxShadow: "0 0 40px rgba(59, 131, 246, 0.37), inset 0 0 40px rgba(59,130,246,0.03)",
          }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute"
          style={{
            inset: "30px",
            border: "4px solid rgba(169, 85, 247, 0.42)",
            borderRadius: "50%",
            boxShadow: "0 0 30px rgba(169, 85, 247, 0.21), inset 0 0 30px rgba(168,85,247,0.02)",
          }}
          animate={{ rotateY: [0, -360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {/* Cross ring */}
        <motion.div
          className="absolute"
          style={{
            inset: "65px",
            border: "2px solid rgba(34, 197, 94, 0.84)",
            borderRadius: "50%",
          }}
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        {/* Glowing dots on outer ring */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0 ? "rgba(59, 131, 246, 0.9)" : "rgba(168,85,247,0.4)",
              boxShadow: i % 2 === 0 ? "0 0 8px rgba(59,130,246,0.3)" : "0 0 8px rgba(168,85,247,0.25)",
              top: "50%",
              left: "50%",
              marginLeft: "-3px",
              marginTop: "-3px",
            }}
            animate={{ rotate: [deg, deg + 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────── Minimal Floating Device Icons (Edges Only) ─────────── */
const floatingDevices = [
  { Icon: Smartphone, top: "12%", left: "6%", duration: 12, delay: 0 },
  { Icon: Laptop, top: "82%", left: "7%", duration: 14, delay: 2 },
  { Icon: Cloud, top: "15%", left: "92%", duration: 13, delay: 1 },
  { Icon: Wifi, top: "85%", left: "91%", duration: 15, delay: 3 },
  { Icon: Server, top: "48%", left: "3%", duration: 14, delay: 1.5 },
  { Icon: Cpu, top: "52%", left: "96%", duration: 12, delay: 0.5 },
  { Icon: Code2, top: "8%", left: "50%", duration: 13, delay: 2.5 },
  { Icon: Database, top: "90%", left: "48%", duration: 14, delay: 1 },
];

function FloatingDevices() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {floatingDevices.map(({ Icon, top, left, duration, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top, left }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-10 h-10 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] flex items-center justify-center"
            style={{
              boxShadow: "0 4px 16px rgba(59,130,246,0.06)",
            }}
          >
            <Icon className="w-4 h-4 text-primary/40" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────── Subtle Data Flow Lines ─────────── */
function DataFlows() {
  const flows = [
    { x: "10%", height: "40%", duration: 6, delay: 0, color: "rgba(59,130,246,0.06)" },
    { x: "90%", height: "35%", duration: 7, delay: 2, color: "rgba(168,85,247,0.05)" },
    { x: "25%", height: "30%", duration: 8, delay: 1, color: "rgba(34,197,94,0.04)" },
    { x: "75%", height: "45%", duration: 5, delay: 3, color: "rgba(59,130,246,0.05)" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
      {flows.map((f, i) => (
        <div key={i} className="absolute" style={{ left: f.x, top: "15%", height: f.height, width: "1px" }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${f.color}, transparent)` }} />
          <motion.div
            className="absolute w-full"
            style={{ height: "20%", background: `linear-gradient(to bottom, transparent, ${f.color.replace("0.06", "0.2").replace("0.05", "0.15").replace("0.04", "0.12")}, transparent)`, filter: "blur(1px)" }}
            animate={{ top: ["-20%", "100%"] }}
            transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─────────── Ambient Glow (Very Subtle) ─────────── */
function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute w-[35vw] h-[35vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 131, 246, 0.9) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[30vw] h-[30vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(89, 7, 165, 0.59) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}

/* ─────────── Main Export ─────────── */
export default function PremiumBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#05050A]" />

      {/* Subtle 3D Perspective Grid */}
      <PerspectiveGrid />

      {/* Very Subtle Ambient Glow */}
      <AmbientGlow />

      {/* Minimal Floating Particles */}
      <FloatingParticles />

      {/* Central 3D Rotating Ring */}
      <RotatingRing />

      {/* Edge Floating Devices (8 only) */}
      <FloatingDevices />

      {/* Subtle Data Flow Lines */}
      <DataFlows />

      {/* Strong Center Vignette — Content stays crystal clear */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 75% at 50% 50%, rgba(16, 1, 19, 0.88) 30%, rgba(6, 6, 17, 0.02) 60%, transparent 85%)",
        }}
      />
    </>
  );
}