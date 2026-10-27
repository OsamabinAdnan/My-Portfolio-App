'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberTorusKnotProps {
  className?: string;
  isReady?: boolean;
}

export const CyberTorusKnot = React.memo(function CyberTorusKnot({
  className = '',
  isReady = true,
}: CyberTorusKnotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isReady || !containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera (adjusted distance and fov to prevent any clipping of orbitals)
    const camera = new THREE.PerspectiveCamera(46, width / Math.max(height, 1), 0.1, 100);
    camera.position.z = 6.2;

    // WebGL Renderer using the React-managed canvas
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.error('WebGL Context creation failed:', e);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    // Group to hold knot and orbitals (scaled to comfortably fit within frame)
    const group = new THREE.Group();
    group.scale.set(0.92, 0.92, 0.92);
    scene.add(group);

    // 1. Torus Knot Wireframe - Electric Neon Cyan
    const geometry = new THREE.TorusKnotGeometry(1.3, 0.38, 128, 24, 2, 3);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const torusKnot = new THREE.Mesh(geometry, wireframeMaterial);
    group.add(torusKnot);

    // 2. Vertex Points - Radiant Cyber Green
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x00ff9f,
      size: 0.04,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    group.add(points);

    // 3. Inner Holographic Core (Wireframe Icosahedron) - Neon Red
    const coreGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // 4. Cyber Orbital Rings (Cyan & Red)
    const ringGeo1 = new THREE.RingGeometry(2.25, 2.27, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.55, 2.57, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // 5. Ambient Cyber Dust Particles
    const dustCount = 100;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 8;
      dustPositions[i + 1] = (Math.random() - 0.5) * 8;
      dustPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Mouse movement listener
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 1.5;
      targetY = (y / rect.height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Responsive Resize Handler with ResizeObserver
    const updateSize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || container.offsetWidth;
      const h = container.clientHeight || container.offsetHeight;
      if (w <= 0 || h <= 0) return;
      width = w;
      height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', updateSize);

    // Animation Loop
    const startTime = performance.now();
    let lastCheck = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;

      // Periodically verify dimensions in case container was unhidden or resized
      if (now - lastCheck > 500) {
        lastCheck = now;
        if (container.clientWidth > 0 && Math.abs(container.clientWidth - width) > 2) {
          updateSize();
        }
      }

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      group.rotation.x = mouseY * 0.6 + elapsedTime * 0.18;
      group.rotation.y = mouseX * 0.8 + elapsedTime * 0.28;

      // Core counter-rotation
      core.rotation.x = -elapsedTime * 0.4;
      core.rotation.y = elapsedTime * 0.3;

      // Orbitals rotation
      ring1.rotation.z = -elapsedTime * 0.15;
      ring2.rotation.z = elapsedTime * 0.12;

      // Particle dust slow drift
      dust.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-full max-h-full block object-contain"
      />
    </div>
  );
});
