"use client";

import React, { useState, useRef } from "react";
import StoryBook from "./StoryBook";

export default function JuniorExperience({ children }) {
  const [videoFinished, setVideoFinished] = useState(false);
  const videoRef = useRef(null);

  const handleTimeUpdate = (e) => {
    const video = e.target;
    // Trigger transition 1 second before video ends for seamless overlap
    if (video.duration && (video.duration - video.currentTime <= 1) && !videoFinished) {
      setVideoFinished(true);
    }
  };

  // Set playback speed when video loads
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-transparent overflow-hidden">
      {/* Video Background - Always visible */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/video.mp4" 
          autoPlay 
          muted 
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>

      {/* Skip Button - Only show before video finishes */}
      {!videoFinished && (
        <button 
          onClick={() => setVideoFinished(true)}
          className="absolute bottom-8 right-8 z-30 text-white/50 hover:text-white text-sm font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all"
        >
          Skip Intro
        </button>
      )}

      {/* When video is done, show the StoryBook interface on top */}
      {videoFinished && (
        <div className="relative z-50">
          <StoryBook>{children}</StoryBook>
        </div>
      )}
    </div>
  );
}
