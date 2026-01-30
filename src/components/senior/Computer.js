"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, MousePointer2, ArrowLeft } from 'lucide-react';
import Mascot from '../Mascot';

// Custom SVG components to match the flat vector illustration style
const LeftPlant = () => (
    <svg width="180" height="250" viewBox="0 0 200 300" className="absolute bottom-0 -left-40 z-0">
        <defs>
            <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a5b1c2" />
                <stop offset="100%" stopColor="#d1d8e0" />
            </linearGradient>
        </defs>
        {/* Pot */}
        <path d="M60,250 L140,250 L130,300 L70,300 Z" fill="url(#potGrad)" />
        <rect x="55" y="240" width="90" height="15" rx="5" fill="#778ca3" />

        {/* Stems & Leaves */}
        <g transform="translate(100, 240)">
            {/* Center Leaf */}
            <path d="M0,0 Q10,-50 0,-120 Q-10,-50 0,0" fill="#4B6584" />
            <ellipse cx="0" cy="-120" rx="30" ry="60" fill="#4834d4" className="opacity-90" />

            {/* Left Leaf */}
            <g transform="rotate(-30)">
                <path d="M0,0 Q5,-40 0,-100" stroke="#4B6584" strokeWidth="3" fill="none" />
                <ellipse cx="0" cy="-100" rx="25" ry="50" fill="#686de0" />
            </g>

            {/* Right Leaf */}
            <g transform="rotate(30)">
                <path d="M0,0 Q-5,-40 0,-100" stroke="#4B6584" strokeWidth="3" fill="none" />
                <ellipse cx="0" cy="-100" rx="25" ry="50" fill="#686de0" />
            </g>
        </g>
    </svg>
);

const RightPlant = () => (
    <svg width="150" height="300" viewBox="0 0 150 300" className="absolute bottom-0 -right-36 z-0">
        {/* Pot */}
        <path d="M40,200 L110,200 L100,300 L50,300 Z" fill="#686de0" />
        <rect x="35" y="190" width="80" height="15" rx="5" fill="#4834d4" />

        {/* Stems */}
        <g stroke="#2f3542" strokeWidth="3" fill="none">
            <path d="M75,200 Q75,150 75,100" />
            <path d="M75,200 Q45,150 35,80" />
            <path d="M75,200 Q105,150 115,90" />
            <path d="M75,200 Q60,160 55,120" />
            <path d="M75,200 Q90,160 95,130" />
        </g>

        {/* Flowers/Dots */}
        <circle cx="75" cy="100" r="12" fill="#4834d4" />
        <circle cx="35" cy="80" r="10" fill="#686de0" />
        <circle cx="115" cy="90" r="10" fill="#686de0" />
        <circle cx="55" cy="120" r="8" fill="#4834d4" />
        <circle cx="95" cy="130" r="8" fill="#4834d4" />
    </svg>
);

export default function Computer() {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const sections = 4; // Home, About, Features, Contact
    const isScrolling = useRef(false);

    // Scroll Hijack Logic
    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (isScrolling.current) return;

            // Threshold
            if (Math.abs(e.deltaY) > 20) {
                isScrolling.current = true;
                if (e.deltaY > 0) {
                    setIndex(prev => Math.min(prev + 1, sections - 1));
                } else {
                    setIndex(prev => Math.max(prev - 1, 0));
                }
                setTimeout(() => { isScrolling.current = false; }, 800);
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    // Keyboard support
    useEffect(() => {
        const handleKey = (e) => {
            if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();
                if (isScrolling.current) return;
                isScrolling.current = true;
                if (e.key === 'ArrowDown') setIndex(prev => Math.min(prev + 1, sections - 1));
                else setIndex(prev => Math.max(prev - 1, 0));
                setTimeout(() => isScrolling.current = false, 800);
            }
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <div className="h-screen w-full bg-[#f5f6fa] flex items-center justify-center overflow-hidden font-sans relative">

            {/* Background Abstract Shapes */}
            <div className="absolute top-[15%] left-[20%] w-64 h-32 bg-[#a29bfe] rounded-2xl opacity-40 -rotate-3"></div>
            <div className="absolute top-[10%] left-[25%] w-48 h-12 bg-[#dfe6e9] rounded-full opacity-60"></div>

            {/* Gear Icon Background */}
            <div className="absolute top-[15%] right-[25%] opacity-20 text-[#6c5ce7]">
                <Settings size={120} strokeWidth={1.5} className="animate-spin-slow" />
                <style jsx>{`.animate-spin-slow { animation: spin 20s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
            <div className="absolute top-[25%] right-[22%] w-32 h-32 bg-[#dfe6e9] rounded-full opacity-30"></div>

            {/* Main Stage */}
            <div className="relative z-10 scale-100 md:scale-125">

                {/* Plants */}
                <LeftPlant />
                <RightPlant />

                {/* Monitor Frame */}
                {/* Expanded width as requested, plants brought closer */}
                <div className="relative w-[900px] h-[580px] bg-[#2d3436] rounded-[2.5rem] p-6 shadow-2xl">

                    {/* Screen Area (Clip Content) */}
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">

                        {/* Scrollable Content Container */}
                        <div
                            className="w-full h-full transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateY(-${index * 100}%)` }}
                        >
                            {/* --- WEBSITE CONTENT SECTIONS --- */}

                            {/* 1. Home / Hero */}
                            <section className="w-full h-full flex flex-col relative overflow-hidden bg-slate-50">
                                {/* Mock Navbar inside screen */}
                                <div className="w-full h-16 flex items-center justify-between px-8 border-b border-gray-100 bg-white">
                                    <span className="font-bold text-xl text-purple-600">SCHOOL</span>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span>Home</span><span>About</span><span>Contact</span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                                        <MousePointer2 size={40} />
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Interactive Learning</h1>
                                    <p className="text-gray-500 max-w-md">Welcome to the future of education. Scroll inside this monitor to explore our senior portal features.</p>
                                    <button className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg hover:bg-purple-700 transition">Get Started</button>
                                </div>
                            </section>

                            {/* 2. Academics */}
                            <section className="w-full h-full flex items-center justify-center bg-purple-50 p-12">
                                <div className="grid grid-cols-2 gap-8 w-full h-full items-center">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col justify-center">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Science &<br />Technology</h2>
                                        <p className="text-gray-500">Advanced labs, robotics, and coding classes for the innovators of tomorrow.</p>
                                    </div>
                                    <div className="grid grid-rows-2 gap-4 h-full">
                                        <div className="bg-purple-200 rounded-2xl w-full h-full"></div>
                                        <div className="bg-blue-100 rounded-2xl w-full h-full"></div>
                                    </div>
                                </div>
                            </section>

                            {/* 3. Community */}
                            <section className="w-full h-full flex flex-col items-center justify-center bg-white p-12">
                                <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Community</h2>
                                <div className="flex gap-6 w-full overflow-x-auto pb-4 justify-center">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="min-w-[200px] h-[250px] bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-md transition">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                                            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 w-16 bg-gray-100 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 4. Contact / Footer */}
                            <section className="w-full h-full flex flex-col items-center justify-center bg-[#2d3436] text-white p-12">
                                <h2 className="text-4xl font-bold mb-6">Join Us Today</h2>
                                <p className="text-gray-400 mb-10 text-center max-w-lg">Apply for the upcoming academic year and secure your future.</p>
                                <form className="w-full max-w-sm flex flex-col gap-4">
                                    <input type="email" placeholder="Enter your email" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition" />
                                    <button className="w-full p-4 bg-purple-500 rounded-xl font-bold hover:bg-purple-600 transition">Apply Now</button>
                                </form>
                            </section>

                        </div>
                    </div>

                    {/* Monitor Camera Dot */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                </div>

                {/* Monitor Stand */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-16 bg-[#2d3436] clip-path-stand z-[-1]"></div>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-5 bg-[#2d3436] rounded-full z-[-1]"></div>
                <style jsx>{`.clip-path-stand { clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%); }`}</style>

                {/* Table Line */}
                <div className="absolute -bottom-10 -left-[20%] -right-[20%] h-1 bg-black rounded-full z-[-2]"></div>

            </div>

            {/* Go Back Button Overlay */}
            <div className="absolute top-8 left-8 z-50">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-full font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Go Back</span>
                </button>
            </div>

        </div>
    );
}
