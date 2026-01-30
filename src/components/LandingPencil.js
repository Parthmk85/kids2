"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, GraduationCap, ArrowRight } from "lucide-react";
import LightRays from "./LightRays";

// --- Custom Pencil Component ---
const Pencil = () => (
  <svg width="60" height="400" viewBox="0 0 60 400" className="drop-shadow-2xl">
    <defs>
      <linearGradient id="pencilBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <linearGradient id="wood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fdba74" />
      </linearGradient>
    </defs>

    {/* Eraser (Top) */}
    <rect x="10" y="0" width="40" height="40" rx="5" fill="#f87171" />

    {/* Metal Ferrule */}
    <rect x="10" y="40" width="40" height="20" fill="url(#metal)" />

    {/* Body (Hexagonal-ish shading) */}
    <rect x="10" y="60" width="40" height="280" fill="url(#pencilBody)" />
    <rect x="18" y="60" width="4" height="280" fill="rgba(255,255,255,0.2)" />
    <rect x="38" y="60" width="4" height="280" fill="rgba(0,0,0,0.05)" />

    {/* Sharpened Wood (Cone) */}
    <path d="M10,340 L30,380 L50,340 Z" fill="url(#wood)" />

    {/* Graphite Tip */}
    <path d="M23,380 L30,400 L37,380 Z" fill="#334155" />
  </svg>
);

// --- Floating Background Icons ---
const FloatingIcons = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden text-slate-700/20 font-bold select-none">
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[15%] left-[10%] text-8xl font-serif"
    >
      Aa
    </motion.div>
    <motion.div
      animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute top-[20%] right-[15%] text-8xl"
    >
      +
    </motion.div>
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[20%] left-[15%] text-9xl"
    >
      ?
    </motion.div>
    <motion.div
      animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute bottom-[10%] right-[20%] text-7xl font-mono"
    >
      123
    </motion.div>
  </div>
);

// --- 3D Stage Component ---
const Stage3D = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0, rotateX: 65 }}
    animate={{ scale: 1, opacity: 1, rotateX: 65 }}
    transition={{ delay: 1.2, duration: 1, type: "spring" }}
    className="absolute bottom-[-40px] w-64 h-64 pointer-events-none"
  >
    {/* Floor Glow */}
    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-[40px] scale-150" />

    {/* Outer Ring */}
    <div className="absolute inset-0 rounded-full border-[8px] border-slate-700/50 bg-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]" />

    {/* Inner Rotating Detail */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute inset-4 rounded-full border-2 border-dashed border-slate-600/30 flex items-center justify-center"
    >
      <div className="w-full h-full absolute top-0 left-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent)]" />
    </motion.div>

    {/* Center Core */}
    <div className="absolute inset-12 rounded-full bg-gradient-to-b from-slate-600 to-slate-900 border border-slate-500/30 shadow-inner flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-yellow-400/10 blur-sm" />
    </div>
  </motion.div>
);

export default function PortalSelector() {
  const router = useRouter();
  const [hoverSide, setHoverSide] = useState(null); // 'left', 'right', or null
  const [hasLanded, setHasLanded] = useState(false);

  const handleSelect = (path) => {
    router.push(path);
  };

  return (
    <div className="h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center relative perspective-[1200px]">

      {/* Ghost Cursor Layer */}
      <div className="absolute inset-0 z-[50] pointer-events-none">
        <GhostCursor
          color="#fbbf24"
          brightness={2}
          edgeIntensity={0}
          trailLength={50}
          inertia={0.5}
          grainIntensity={0.05}
          bloomStrength={0.1}
          bloomRadius={1}
          bloomThreshold={0.025}
          fadeDelayMs={100}
          fadeDurationMs={500}
        />
      </div>

      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Floating Icons of Education */}
      <FloatingIcons />

      {/* Background Subtle Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full h-full">

        {/* --- 3D Stage --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[150px]">
          <Stage3D />
        </div>

        {/* --- LEFT BUTTON (Junior) --- */}
        <motion.div
          initial={{ x: 0, opacity: 0, rotateY: 90, transformOrigin: "right center" }}
          animate={{ x: -165, opacity: 1, rotateY: 0 }}
          transition={{ delay: 1.8, duration: 1.2, type: "spring", bounce: 0.3 }}
          className="absolute z-10"
        >
          <motion.div
            onHoverStart={() => setHoverSide('left')}
            onHoverEnd={() => setHoverSide(null)}
            onClick={() => handleSelect("/junior")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-80 h-48 bg-white rounded-l-3xl rounded-r-none shadow-2xl border-y border-l border-slate-100 flex flex-col items-center justify-center cursor-pointer group hover:bg-yellow-50 transition-colors"
            style={{ transformOrigin: "right center" }}
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mb-4 group-hover:scale-110 transition-transform shadow-inner">
              <Baby size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Junior Portal</h2>
            <p className="text-slate-500 text-sm">Nursery - 5th Grade</p>
            <div className="mt-3 text-yellow-600 font-bold text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Let's Play <ArrowRight size={12} />
            </div>
          </motion.div>
        </motion.div>


        {/* --- RIGHT BUTTON (Senior) --- */}
        <motion.div
          initial={{ x: 0, opacity: 0, rotateY: -90, transformOrigin: "left center" }}
          animate={{ x: 165, opacity: 1, rotateY: 0 }}
          transition={{ delay: 1.8, duration: 1.2, type: "spring", bounce: 0.3 }}
          className="absolute z-10"
        >
          <motion.div
            onHoverStart={() => setHoverSide('right')}
            onHoverEnd={() => setHoverSide(null)}
            onClick={() => handleSelect("/senior")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-80 h-48 bg-white rounded-r-3xl rounded-l-none shadow-2xl border-y border-r border-slate-100 flex flex-col items-center justify-center cursor-pointer group hover:bg-blue-50 transition-colors"
            style={{ transformOrigin: "left center" }}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform shadow-inner">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Senior Portal</h2>
            <p className="text-slate-500 text-sm">6th - 10th Grade</p>
            <div className="mt-3 text-blue-600 font-bold text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Enter Academy <ArrowRight size={12} />
            </div>
          </motion.div>
        </motion.div>


        {/* --- THE HERO PENCIL (Center Divider) --- */}
        <motion.div
          initial={{ y: "-150vh", rotate: 0 }}
          animate={{
            y: hasLanded ? [0, -8, 0] : 0,
            rotate: hoverSide === 'left' ? -6 : hoverSide === 'right' ? 6 : 0
          }}
          onAnimationComplete={() => !hasLanded && setHasLanded(true)}
          transition={{
            y: hasLanded
              ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", bounce: 0.4, duration: 1.5 },
            rotate: { type: "spring", stiffness: 200, damping: 20 }
          }}
          className="relative z-20"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
        >
          <Pencil />
        </motion.div>

      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 text-slate-500 text-sm font-medium tracking-wide"
      >
        Select your learning path to begin
      </motion.div>

    </div>
  );
}
