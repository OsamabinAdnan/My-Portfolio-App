"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const glitchRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!glitchRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".glitch-text", {
        textShadow: "2px 2px #ffffff, -2px -2px #333333",
        duration: 0.12,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.6,
      });
    }, glitchRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#050505] font-mono cyber-grid overflow-hidden">
      <div ref={glitchRef} className="relative z-10 text-center max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hud-box p-8 sm:p-12 border border-zinc-800 bg-[#08080a] hud-corner-tl hud-corner-br"
        >
          {/* Status readout */}
          <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-3 mb-6 border-b border-zinc-850">
            <span>HTTP_STATUS: 404</span>
            <span>NODE: UNRESOLVED</span>
          </div>

          <h1 className="glitch-text text-7xl sm:text-9xl font-black text-white leading-none mb-4">
            404
          </h1>

          <div className="space-y-3 mb-8">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase">
              [TRANSMISSION_LOST // NODE_NOT_FOUND]
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The requested route does not exist in the active Sanity index or filesystem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/"
              className="cyber-button w-full sm:w-auto"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>RETURN_HOME</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="cyber-button-ghost w-full sm:w-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS_NODE</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
