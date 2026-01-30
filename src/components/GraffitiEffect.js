"use client";

import React, { useRef, useEffect } from "react";

const GraffitiEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const points = [];
        const maxPoints = 50;
        let mouse = { x: width / 2, y: height / 2 };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Add point on move
            points.push({
                x: mouse.x,
                y: mouse.y,
                age: 0,
                color: Math.random() > 0.5 ? '#fbbf24' : '#60a5fa' // Yellow or Blue
            });
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and Draw points
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                p.age += 1; // Age the point

                // Remove old points
                if (p.age > maxPoints) {
                    points.splice(i, 1);
                    i--;
                    continue;
                }

                const radius = (maxPoints - p.age) * 0.5; // Shrink
                const alpha = 1 - p.age / maxPoints;

                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = alpha * 0.6; // Transparency
                ctx.fill();

                ctx.globalAlpha = 1;
            }

            // Connect points with lines for "Graffiti" stroke feel
            if (points.length > 1) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    // Bezier curve for smoothness? Or simple line.
                    // Simple line for specific 'marker' feel
                    const p = points[i];
                    const prev = points[i - 1];
                    const cpX = (prev.x + p.x) / 2;
                    const cpY = (prev.y + p.y) / 2;
                    ctx.quadraticCurveTo(prev.x, prev.y, cpX, cpY);
                }
                ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"; // Slate-500 fading
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-5 pointer-events-none mix-blend-multiply"
        />
    );
};

export default GraffitiEffect;
