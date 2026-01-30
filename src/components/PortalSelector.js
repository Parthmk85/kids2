"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Baby, Sparkles, GraduationCap } from "lucide-react";

const PortalSelector = () => {
  const router = useRouter();

  const handleSelect = (path) => {
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div className="container max-w-6xl px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Empowering Your Future</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 italic font-serif">Journey</span>
          </h1>
          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">
            Experience a personalized learning environment tailored just for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Junior Portal Option */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect("/junior")}
            className="group cursor-pointer relative cursor-target"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative h-full bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col items-center text-center backdrop-blur-sm transition-all duration-500 group-hover:border-yellow-400/50 group-hover:bg-white/[0.08]">
              <div className="w-32 h-32 mb-8 rounded-3xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-white transition-all duration-500 shadow-inner">
                <Baby className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Junior Portal</h2>
              <p className="text-white/50 mb-8 text-lg">
                Nursery to 5th Grade. <br />
                Learning through play and creativity.
              </p>
              <div className="px-8 py-3.5 bg-yellow-400 text-black rounded-2xl font-bold text-lg shadow-lg shadow-yellow-400/20 group-hover:shadow-yellow-400/40 transition-all duration-300">
                Let's Play!
              </div>
            </div>
          </motion.div>

          {/* Senior Portal Option */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect("/senior")}
            className="group cursor-pointer relative cursor-target"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative h-full bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col items-center text-center backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-white/[0.08]">
              <div className="w-32 h-32 mb-8 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <GraduationCap className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Senior Portal</h2>
              <p className="text-white/50 mb-8 text-lg">
                6th to 10th Grade. <br />
                Advanced curriculum and excellence.
              </p>
              <div className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-all duration-300">
                Enter Academy
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-white/20 text-sm"
        >
          Secured Campus Access • kids2 Education
        </motion.div>
      </div>
    </div>
  );
};

export default PortalSelector;
