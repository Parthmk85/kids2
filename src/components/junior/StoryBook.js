"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper Component for "My Journey" (Page 0)
const JourneyPage = () => (
  <div className="h-full flex flex-col justify-center items-center text-center p-8">
     <h2 className="text-4xl font-extrabold text-[#ffbfaa] mb-6 font-serif tracking-wide">
       My Journey
     </h2>
     <div className="w-40 h-40 bg-yellow-100 rounded-full flex items-center justify-center text-7xl mb-8 shadow-inner hover:scale-105 transition-transform duration-300">
        🐿️
     </div>
     <p className="text-gray-500 max-w-xs font-medium text-xl">
       "Welcome to your magical school diary!"
     </p>
     <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="bg-blue-50 p-4 rounded-xl text-blue-500 font-bold">⭐ Stars: 5</div>
        <div className="bg-pink-50 p-4 rounded-xl text-pink-500 font-bold">🏆 Badges: 2</div>
     </div>
  </div>
);

// Placeholder for other pages
const InfoPage = ({ title, icon, color, text }) => (
  <div className={`h-full flex flex-col items-center justify-center p-8 text-center bg-${color}-50`}>
    <div className="text-8xl mb-6">{icon}</div>
    <h2 className={`text-4xl font-bold text-${color}-500 mb-4`}>{title}</h2>
    <p className="text-gray-600 text-lg">{text}</p>
  </div>
);

export default function StoryBook({ children }) {
  const [currentLeftPage, setCurrentLeftPage] = useState(0); // 0 means Page 0 (Left) and Page 1 (Right) are visible

  const styles = {
      pageVisible: {
          rotateY: 0,
          opacity: 1,
          zIndex: 1,
          transition: { duration: 0.6 }
      },
      pageNext: { // Page waiting on the right
          rotateY: 180,
          opacity: 0,
          zIndex: 0
      },
      pagePrev: { // Page finished on the left
          rotateY: -180,
          opacity: 0,
          zIndex: 0
      }
  };

  const pages = [
    <JourneyPage key="journey" />,
    <InfoPage key="gallery" title="Gallery" icon="🎨" color="purple" text="Look at our amazing drawings and crafts!" />,
    <InfoPage key="teachers" title="Teachers" icon="👩‍🏫" color="green" text="Meet your lovely teachers who guide you." />,
    <InfoPage key="events" title="Events" icon="🎉" color="red" text="Upcoming birthdays and festivals!" />,
    <InfoPage key="end" title="The End" icon="👋" color="gray" text="Come back tomorrow for more fun!" />
  ];

  const totalPages = pages.length;

  const flipPage = (direction) => {
    // Direction 1 = Next Spread (+2), -1 = Prev Spread (-2)
    const newIndex = currentLeftPage + (direction * 2);
    if (newIndex >= 0 && newIndex < totalPages) {
      setCurrentLeftPage(newIndex);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-transparent overflow-hidden p-2">
      {/* Container with Fade-in Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[65vw] max-h-[80vh] aspect-[2/1] bg-white rounded-[40px] shadow-2xl flex border-12 border-[#d4a574] perspective-2000"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 4px #f0e6d2' }}
      >
        
        {/* Spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-50 bg-linear-to-r from-neutral-200 via-neutral-100 to-neutral-200 shadow-inner rounded-sm" />

        {/* LEFT PAGE CONTAINER */}
        <div className="flex-1 relative h-full bg-[#faf9f6] border-r border-gray-200 overflow-hidden rounded-l-[32px]">
           {/* Paper Texture */}
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
           
           <AnimatePresence mode="wait">
             <motion.div 
               key={currentLeftPage}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               transition={{ duration: 0.4 }}
               className="relative z-10 w-full h-full"
             >
                {pages[currentLeftPage]}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* RIGHT PAGE CONTAINER */}
        <div className="flex-1 relative h-full bg-white overflow-hidden rounded-r-[32px]">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

           <AnimatePresence mode="wait">
             <motion.div 
               key={currentLeftPage + 1}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
               className="relative z-10 w-full h-full"
             >
                {pages[currentLeftPage + 1] || <div className="h-full flex items-center justify-center text-gray-300">End of Book</div>}
             </motion.div>
           </AnimatePresence>
           
           {/* Curled Corner */}
           <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-black/5 to-transparent pointer-events-none rounded-tl-[40px]" />
        </div>

      </motion.div>
    </div>
  );
}
