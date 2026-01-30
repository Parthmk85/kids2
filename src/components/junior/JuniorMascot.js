"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF, Center } from "@react-three/drei";

function Character() {
  const group = useRef();
  
  // Load the GLB model
  const { scene } = useGLTF("/models/robot+mascot+3d+model.glb");
  
  // Store global mouse position
  const mouse = useRef({ x: 0, y: 0 });

  // Ref to store the Head node
  const headBoneRef = useRef(null);

  useEffect(() => {
    // Traverse the scene to find the Head node
    if (scene) {
      console.log("Traversing scene for Head node...");
      scene.traverse((child) => {
        // console.log("Node:", child.name); // Debugging
        const name = child.name.toLowerCase();
        
        // Broad search for head/neck bones
        if (name.includes("head") || name.includes("neck") || name.includes("spine006") || name.includes("spine_06")) {
             // Prefer "Head" over others
             if (!headBoneRef.current) {
                 headBoneRef.current = child;
                 console.log("Found likely Head node:", child.name);
             } else if (name.includes("head") && !headBoneRef.current.name.toLowerCase().includes("head")) {
                 headBoneRef.current = child; // Upgrade to actual head if we found neck first
                 console.log("Upgraded to better Head node:", child.name);
             }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const targetX = mouse.current.x; // -1 to 1
    const targetY = mouse.current.y; // -1 to 1

    if (group.current) {
        // Floating animation
        group.current.position.y = Math.sin(t * 1) * 0.1 + (targetY * 0.05); 
        
        // FALLBACK: If no head found, rotate body slightly so it reacts
        if (!headBoneRef.current) {
           group.current.rotation.y = targetX * 0.5;
           group.current.rotation.x = -targetY * 0.2;
        }
    }
    
    // Rotate HEAD only if found
    if (headBoneRef.current) {
        // Clamp rotation targets
        const targetRotationY = Math.max(Math.min(-targetX * 0.8, 1.2), -1.2); 
        const targetRotationX = Math.max(Math.min(-targetY * 0.6, 0.8), -0.8);
        
        // Pro UX Touch: Smooth Interpolation (Lerp)
        // head.rotation += (target - current) * 0.1
        headBoneRef.current.rotation.y += (targetRotationY - headBoneRef.current.rotation.y) * 0.1;
        headBoneRef.current.rotation.x += (targetRotationX - headBoneRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={group} scale={2.5} position={[0, -1, 0]}>
       {/* Center component auto-centers the model geometry */}
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preload the model for faster loading
useGLTF.preload("/models/robot+mascot+3d+model.glb");

export default function JuniorMascot() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Character />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
