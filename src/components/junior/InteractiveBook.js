"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RenderTexture, PerspectiveCamera, Text, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const Page = ({ index, frontContent, backContent, isFlipped, onFlip }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: isFlipped ? -Math.PI : 0,
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
  }, [isFlipped]);

  return (
    <group>
      {/* The pivot point for the page should be at the spine */}
      <group
        ref={groupRef}
        position={[-0.1, 0.05 + index * 0.01, 0]} // Slight vertical offset to prevent z-fighting
      >
        {/* The Page Mesh */}
        {/* Offset mesh by half width so pivot is at edge */}
        <mesh position={[2, 0, 0]} castShadow receiveShadow onClick={onFlip}>
          <boxGeometry args={[4, 0.02, 5.5]} /> {/* Dimensions of A4-ish page */}
          
          {/* Front of Page (Right side when closed) */}
          <meshStandardMaterial attach="material-2" color="#fffdf5" roughness={0.8} />
          <Html 
            transform 
            occlude="blending"
            position={[0, 0.02, 0]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            scale={0.004} // Tuned scale: 1000px * 0.004 = 4 units (Page Width)
            style={{ width: '1000px', height: '1350px', background: '#fffdf5', overflow: 'hidden' }}
          >
             {frontContent}
          </Html>

           {/* Back of Page (Left side when flipped) */}
           <meshStandardMaterial attach="material-3" color="#fdfbf7" roughness={0.8}>
            <RenderTexture attach="map" anisotropy={16}>
               <PerspectiveCamera makeDefault manual aspect={4 / 5.5} position={[0, 0, 5]} />
               <color attach="background" args={['#fdfbf7']} />
               {/* Rotate content 180 if needed, or just design it for back */}
               <group rotation={[0, Math.PI, 0]}> 
                 {backContent}
               </group>
            </RenderTexture>
          </meshStandardMaterial>
          
           {/* Other sides (Edge of paper) */}
           <meshStandardMaterial attach="material-0" color="#f5f5f5" />
           <meshStandardMaterial attach="material-1" color="#f5f5f5" />
           <meshStandardMaterial attach="material-4" color="#f5f5f5" />
           <meshStandardMaterial attach="material-5" color="#f5f5f5" />
        </mesh>
      </group>
    </group>
  );
};

import { PortalContext } from "../../context/PortalContext";

// ... (Page component stays same)

export default function InteractiveBook({ isOpen, children, portalContext: portalValue }) {
  const [currentPage, setCurrentPage] = useState(0);
  const coverRef = useRef();

  // Cover Animation
  useEffect(() => {
    if (coverRef.current) {
      gsap.to(coverRef.current.rotation, {
        z: isOpen ? -Math.PI : 0,
        duration: 2,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);
  
  return (
    <group position={[0, -0.5, 0]}>
      {/* Back Cover - Static Base */}
      <mesh position={[2, 0, 0]} receiveShadow>
         <boxGeometry args={[4.2, 0.1, 5.7]} />
         <meshStandardMaterial color="#5d4037" />
      </mesh>

      {/* Dynamic Front Cover */}
      <group
        ref={coverRef}
        position={[-0.1, 0.1, 0]} // Spine pivot
      >
         <mesh position={[2.1, 0, 0]}>
            <boxGeometry args={[4.2, 0.1, 5.7]} />
            <meshStandardMaterial color="#8d2a2a" />
            
            {/* Title on styled Cover */}
            <mesh position={[0, 0.06, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <planeGeometry args={[3, 4]} />
              <meshStandardMaterial transparent opacity={0.9}>
                 <RenderTexture attach="map">
                    <PerspectiveCamera makeDefault manual aspect={3/4} position={[0,0,5]} />
                    <color attach="background" args={['#8d2a2a']} />
                    <Text fontSize={0.8} color="#ffcc00">
                      Magic Book
                    </Text>
                 </RenderTexture>
              </meshStandardMaterial>
            </mesh>
         </mesh>
      </group>

      {/* Pages Container - Only visible/active when book is open */}
      <group position={[0, 0.05, 0]}>
        {/* Page 1 */}
        <Page 
          index={1}
          isFlipped={isOpen && currentPage > 0}
          onFlip={(e) => { e.stopPropagation(); setCurrentPage(prev => prev === 0 ? 1 : 0); }}
          
          /* CONTENT FOR PAGE 1 FRONT */
          frontContent={
            <div style={{ width: '100%', height: '100%', background: 'white', overflowY: 'auto', padding: '10px' }}>
                <PortalContext.Provider value={portalValue}>
                   {children}
                </PortalContext.Provider>
            </div>
          }

          /* CONTENT FOR PAGE 1 BACK (Left side after flip) */
          backContent={
             <group>
               <Text fontSize={0.5} color="#333" position={[0, 0, 0]}>
                 Start Journey
               </Text>
            </group>
          }
        />
      </group>
    </group>
  );
}
