"use client";

import { useEffect, useRef } from 'react';
import './bouncing.css';

export default function BouncingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fun kid-friendly emojis
    const emojis = ['🎨', '✏️', '📚', '🎒', '⭐', '🌈', '🎈', '🦋', '🌸', '🎵', '🧸', '🎯'];
    
    class BouncingElement {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Slower speed
        this.vy = (Math.random() - 0.5) * 1.5; // Slower speed
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.size = 30 + Math.random() * 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03; // Slower rotation
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Bounce off edges
        if (this.x <= this.size || this.x >= canvas.width - this.size) {
          this.vx *= -1;
        }
        if (this.y <= this.size || this.y >= canvas.height - this.size) {
          this.vy *= -1;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
      }
    }

    // Create bouncing elements (optimized for smooth performance)
    const elements = [];
    for (let i = 0; i < 25; i++) {
      elements.push(new BouncingElement());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elements.forEach(element => {
        element.update();
        element.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bouncing-canvas" />;
}
