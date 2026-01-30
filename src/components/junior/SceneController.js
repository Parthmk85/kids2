"use client";

import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export default function SceneController({ isActive, onAnimationComplete }) {
  const { camera, scene } = useThree();
  const timeline = useRef(null);

  useEffect(() => {
    // Initial Camera Position (Cozy Wide Shot)
    // Positioned to see the whole desk/room
    camera.position.set(0, 3, 8);
    camera.rotation.set(-0.2, 0, 0);
    
    // Create GSAP Timeline for the "Dive"
    timeline.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (onAnimationComplete) onAnimationComplete();
      }
    });

    timeline.current
      .to(camera.position, {
        x: 0,
        y: 6, // High above
        z: 0.1, // Almost directly above but slight offset to avoid gimbal lock issues if we looked straight down without care
        duration: 2.5,
        ease: "power3.inOut"
      })
      .to(camera.rotation, {
        x: -Math.PI / 2, // Look straight down
        y: 0,
        z: 0,
        duration: 2.5,
        ease: "power3.inOut"
      }, "<"); // Run simultaneously

  }, [camera]);

  useEffect(() => {
    if (isActive && timeline.current) {
      timeline.current.play();
    } else if (!isActive && timeline.current) {
      timeline.current.reverse();
    }
  }, [isActive]);

  return null;
}
