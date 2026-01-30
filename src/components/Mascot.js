"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortal } from "../context/PortalContext";
import { MessageSquare, X } from "lucide-react";

export default function Mascot() {
  const { portal } = usePortal();
  const [isHovered, setIsHovered] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");

  const isJunior = portal === "junior";

  const juniorMessages = [
    "Hi there! Let's explore together! 🎨",
    "Did you see the colors today? 🌈",
    "I love reading stories, do you? 📚",
    "Want to play a game? 🎮",
  ];

  const seniorMessages = [
    "Welcome to the Academic Hub. 🎓",
    "Focus and Determination lead to Excellence. 🚀",
    "Need help with your curriculum? 📖",
    "Explore our research facilities! 🔬",
  ];

  useEffect(() => {
    if (portal) {
      const messages = isJunior ? juniorMessages : seniorMessages;
      setMessage(messages[0]);
      
      const timer = setTimeout(() => setShowBubble(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [portal]);

  const cycleMessage = () => {
    const messages = isJunior ? juniorMessages : seniorMessages;
    const currentIndex = messages.indexOf(message);
    const nextIndex = (currentIndex + 1) % messages.length;
    setMessage(messages[nextIndex]);
  };

  if (!portal) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            className={`mb-4 p-5 rounded-3xl shadow-2xl max-w-[200px] pointer-events-auto relative border ${
              isJunior 
                ? "bg-white border-yellow-200 text-slate-800" 
                : "bg-zinc-900 border-white/10 text-white/80"
            }`}
          >
            <button 
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm font-bold leading-relaxed">{message}</p>
            {/* Arrow */}
            <div className={`absolute -bottom-2 right-8 w-4 h-4 transform rotate-45 border-r border-b ${
              isJunior ? "bg-white border-yellow-200" : "bg-zinc-900 border-white/10"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragConstraints={{ left: -100, right: 0, top: -100, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          setShowBubble(true);
          cycleMessage();
        }}
        className={`w-24 h-24 rounded-full cursor-pointer pointer-events-auto flex items-center justify-center shadow-2xl relative group ${
          isJunior 
            ? "bg-yellow-400 shadow-yellow-400/20" 
            : "bg-blue-600 shadow-blue-600/20"
        }`}
      >
        {/* Mascot Face (Simple animated placeholder) */}
        <div className="relative text-5xl">
          {isJunior ? "🐿️" : "🤖"}
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 -right-2 text-2xl"
            >
              ✨
            </motion.div>
          )}
        </div>

        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-full opacity-20 ${
            isJunior ? "bg-yellow-400" : "bg-blue-600"
          }`}
        />
      </motion.div>
    </div>
  );
}
