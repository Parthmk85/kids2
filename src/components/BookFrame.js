"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookFrame({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start opening animation automatically
    const timer1 = setTimeout(() => setIsOpen(true), 500);
    const timer2 = setTimeout(() => setShowContent(true), 2000); // Wait for open anim
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#8b5a2b] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Wooden Desk Texture Background */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
      
      {/* The Book */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : 0.8, 
          opacity: 1 
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative w-full max-w-[95vw] h-[90vh] perspective-1000"
      >
        <div className={`relative w-full h-full bg-[#fdfbf7] rounded-3xl shadow-2xl flex border-16 border-[#5d4037] overflow-hidden transition-all duration-1000 ${isOpen ? 'rotate-x-0' : 'rotate-y-12'}`}>
          
          {/* Binding/Spine Effect */}
          <div className="absolute top-0 bottom-0 left-1/2 w-8 -ml-4 bg-linear-to-r from-black/5 via-black/10 to-black/5 z-20 pointer-events-none" />
          
          {/* Left Page (Visual Only for now, simulates depth) */}
           <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-linear-to-r from-gray-100/50 to-transparent pointer-events-none z-10" />

          {/* Book Content Container */}
          <motion.div 
            className="w-full h-full overflow-y-auto no-scrollbar relative z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
             {/* Inner Page Paper Texture */}
             <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50" />
             
             {children}
          </motion.div>

          {/* Book Cover (Front) - The "Opening" Animation Part */}
          <AnimatePresence>
            {!showContent && (
              <motion.div 
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[-16px] bottom-[-16px] left-[-16px] w-[calc(50%+16px)] bg-[#8d2a2a] z-50 origin-right flex items-center justify-center border-y-16 border-l-16 border-[#5d4037] rounded-l-3xl shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                 <div className="text-center transform rotate-y-0">
                    <h1 className="text-6xl font-serif text-[#ffcc00] drop-shadow-md mb-4">Begin Adventure</h1>
                    <div className="text-white/60 text-xl">Tap to Open</div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
