'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  '[BOOT] INITIALIZING_CORE_SYSTEMS...',
  '[CMS] SANITY.IO LINK: CONNECTED',
  '[AI_CORE] OPENAI AGENTS SDK READY',
  '[SPEC] AGENTIC AI ARCHITECTURE VERIFIED',
  '[DISPLAY] CYBERPUNK_HUD_ACTIVE',
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Cyan particle field
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 12 + 6;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
      setProgress(Math.floor(currentProgress));
      setLogIndex(Math.min(Math.floor((currentProgress / 100) * BOOT_LOGS.length), BOOT_LOGS.length - 1));
    }, 70);

    let animationId = 0;
    const animate = () => {
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(progressInterval);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted, onComplete]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-[100] flex items-center justify-center font-mono">
        <div className="text-[#00f0ff] text-xs tracking-widest">[LOADING_CORE...]</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center p-6 font-mono cyber-grid">
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-6 bg-[#07080f]/95 border border-[#00f0ff]/40 hud-corner-tl hud-corner-br shadow-[0_0_40px_rgba(0,240,255,0.15)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800 text-[10px] text-zinc-400">
          <span className="text-[#00f0ff] font-bold">SYSTEM_BOOT // OSAMABINADNAN</span>
          <span className="text-[#00f0ff] font-bold font-mono">{progress}%</span>
        </div>

        {/* Dynamic Log Line */}
        <div className="h-10 text-xs text-white flex items-center mb-4 truncate font-bold">
          <span className="text-[#00f0ff] mr-2">&gt;</span>
          {BOOT_LOGS[logIndex]}
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-1.5 bg-zinc-950 border border-[#00f0ff]/30 overflow-hidden shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]">
          <div
            className="absolute inset-y-0 left-0 bg-[#00f0ff] shadow-[0_0_14px_#00f0ff] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-3 mt-4 border-t border-zinc-900 text-[9px] text-zinc-500">
          <span className="text-zinc-400">CORE_ENGINE_INITIALIZED</span>
          <span className="text-[#00f0ff]">STATUS: [BOOTING]</span>
        </div>
      </div>
    </div>
  );
}
