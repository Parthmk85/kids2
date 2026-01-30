"use client";

import React, { useState, useEffect } from "react";
import { usePortal } from "../context/PortalContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Settings, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { portal, resetPortal } = usePortal();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isJunior = portal === "junior";

  const navLinks = isJunior
    ? ["Play", "Learn", "Gallery", "About", "Teachers"]
    : ["Academics", "Admissions", "Campus", "Events", "Portal"];

  return (
    <nav className={`${isJunior ? "sticky top-0" : "fixed top-0"} left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 bg-black/80 backdrop-blur-md border-b border-white/5" : "py-8 bg-transparent"
      }`}>
      <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-target flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-2xl ${isJunior ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" : "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            }`}>
            K
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            kids<span className={isJunior ? "text-yellow-400" : "text-blue-500"}>2</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="cursor-target text-white/60 hover:text-white font-medium transition-colors text-sm uppercase tracking-widest leading-none"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="cursor-target p-2.5 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
            <Bell className="w-5 h-5" />
          </button>
          {portal && (
            <button
              onClick={() => router.push("/")}
              className={`cursor-target flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all ${isJunior
                  ? "bg-white/5 text-yellow-400 hover:bg-yellow-400/10"
                  : "bg-white/5 text-blue-400 hover:bg-blue-400/10"
                }`}
            >
              <LogOut className="w-4 h-4" />
              Reset Portal
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="cursor-target md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-white/5 flex flex-col p-6 gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-2xl font-bold text-white/50 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
            <hr className="border-white/5" />
            <button
              onClick={() => { router.push("/"); setIsOpen(false); }}
              className="flex items-center gap-3 text-red-400 font-bold"
            >
              <LogOut className="w-5 h-5" />
              Switch Portal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
