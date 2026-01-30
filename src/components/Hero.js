"use client";

import React from "react";
import { usePortal } from "../context/PortalContext";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Users, Star } from "lucide-react";
import MagnetLines from "./MagnetLines";

export default function Hero() {
  const { portal, resetPortal } = usePortal();

  const isJunior = portal === "junior";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 px-5 py-1.5 rounded-full border ${
              isJunior 
                ? "bg-yellow-400/10 border-yellow-400/20 text-yellow-600" 
                : "bg-blue-600/10 border-blue-600/20 text-blue-400"
            } text-sm font-bold tracking-wider uppercase flex items-center gap-2`}
          >
            <Star className="w-4 h-4" />
            <span>{isJunior ? "Welcome Little Stars!" : "Excellence in Education"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-6xl md:text-8xl font-black tracking-tight mb-8 ${
              isJunior ? "text-orange-600" : "text-white"
            }`}
          >
            {isJunior ? "Let's Learn & " : "Building the "}
            <span className={isJunior ? "text-yellow-500 italic" : "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 font-serif"}>
              {isJunior ? "Grow Together" : "Future Leaders"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-12"
          >
            {isJunior 
              ? "Discover a magical world of colors, stories, and friends in our junior wing." 
              : "Achieve academic greatness with cutting-edge technology and world-class faculty."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button className={`cursor-target px-10 py-5 rounded-3xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-xl ${
              isJunior 
                ? "bg-yellow-400 text-black shadow-yellow-400/30" 
                : "bg-blue-600 text-white shadow-blue-600/30"
            }`}>
              {isJunior ? "Start Exploring" : "Apply Now"}
            </button>
            <button 
              onClick={resetPortal}
              className="cursor-target px-10 py-5 rounded-3xl font-bold text-xl border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition-all underline decoration-white/20 underline-offset-8"
            >
              Change Grade
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
          >
            {[
              { icon: BookOpen, label: "Modern Labs", value: "15+" },
              { icon: Users, label: "Expert Faculty", value: "120+" },
              { icon: Trophy, label: "National Awards", value: "45+" },
              { icon: Star, label: "Happy Students", value: "2.5k+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`mb-4 p-3 rounded-2xl ${isJunior ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-400"}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-white/30 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
