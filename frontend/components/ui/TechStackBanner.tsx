'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/lib/sanity/client';
import { techStackQuery } from '@/lib/sanity/queries';

const ACCENT_COLORS = [
  'text-white',
  'text-[#00f0ff]',
  'text-zinc-200',
  'text-[#00ff9f]',
  'text-white',
  'text-[#ff007f]',
];

const placeholderTicker = [
  { name: 'AGENTIC_AI' },
  { name: 'NEXT_JS' },
  { name: 'REACT' },
  { name: 'FAST_API' },
  { name: 'PYTHON' },
  { name: 'TYPESCRIPT' },
  { name: 'TAILWIND_CSS' },
  { name: 'SANITY_CMS' },
];

export function TechStackBanner() {
  const [techList, setTechList] = useState<any[]>([]);

  useEffect(() => {
    async function loadTech() {
      try {
        const data = await client.fetch(techStackQuery);
        if (data && data.length > 0) {
          setTechList(data);
        }
      } catch (err) {
        console.error('Failed to load banner tech:', err);
      }
    }
    loadTech();
  }, []);

  const activeList = techList.length > 0 ? techList : placeholderTicker;
  const frontendTechs = activeList.filter(t => !t.category || t.category === 'frontend' || t.category === 'ai');
  const backendTechs = activeList.filter(t => !t.category || t.category === 'backend' || t.category === 'devops' || t.category === 'others' || t.category === 'digital-marketing');

  const baseA = frontendTechs.length >= 6 ? frontendTechs : activeList;
  const baseB = backendTechs.length >= 6 ? backendTechs : activeList;

  // Triplicate list to guarantee full screen coverage on any resolution (including 4K)
  const trackA = [...baseA, ...baseA, ...baseA];
  const trackB = [...baseB, ...baseB, ...baseB];

  return (
    <section className="relative z-10 py-8 sm:py-14 md:py-18 bg-[#07080f] overflow-hidden border-y border-zinc-900 cyber-grid font-mono">
      {/* Ambient Cyber Neon Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[220px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[220px] bg-[#ff007f]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Scanline Texture */}
      <div className="absolute inset-0 cyber-scanlines opacity-25 pointer-events-none" />

      {/* Edge Fades for Smooth Seamless In/Out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-44 md:w-60 bg-gradient-to-r from-[#07080f] via-[#07080f]/90 to-transparent z-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-44 md:w-60 bg-gradient-to-l from-[#07080f] via-[#07080f]/90 to-transparent z-30" />

      {/* Top Banner Track (Continuous Infinite Scroll Left) */}
      <div className="relative z-20 w-[115vw] sm:w-[120vw] transform -rotate-1 sm:-rotate-2 -translate-x-[5%] sm:-translate-x-[7%] py-1">
        <div className="relative bg-[#090b16]/95 border-y border-[#00f0ff]/30 py-2 sm:py-3.5 shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-md">
          <motion.div
            className="flex w-max flex-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 160,
              repeat: Infinity,
            }}
          >
            {/* First Half */}
            <div className="flex shrink-0 items-center gap-5 sm:gap-10 pr-5 sm:pr-10">
              {trackA.map((tech, index) => {
                const colorClass = ACCENT_COLORS[index % ACCENT_COLORS.length];
                return (
                  <div key={`a1-${tech.name}-${index}`} className="flex items-center gap-5 sm:gap-10 shrink-0">
                    <span className={`font-mono font-extrabold text-sm min-[380px]:text-base sm:text-2xl md:text-3xl uppercase tracking-wider ${colorClass}`}>
                      {tech.name}
                    </span>
                    <span className="text-[#00f0ff]/60 text-[10px] sm:text-sm font-mono font-bold tracking-widest">//</span>
                  </div>
                );
              })}
            </div>

            {/* Second Half (Exact Mirror for Seamless Infinite Loop) */}
            <div className="flex shrink-0 items-center gap-5 sm:gap-10 pr-5 sm:pr-10" aria-hidden="true">
              {trackA.map((tech, index) => {
                const colorClass = ACCENT_COLORS[index % ACCENT_COLORS.length];
                return (
                  <div key={`a2-${tech.name}-${index}`} className="flex items-center gap-5 sm:gap-10 shrink-0">
                    <span className={`font-mono font-extrabold text-sm min-[380px]:text-base sm:text-2xl md:text-3xl uppercase tracking-wider ${colorClass}`}>
                      {tech.name}
                    </span>
                    <span className="text-[#00f0ff]/60 text-[10px] sm:text-sm font-mono font-bold tracking-widest">//</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Banner Track (Continuous Infinite Scroll Right) */}
      <div className="relative z-10 w-[115vw] sm:w-[120vw] transform rotate-1 sm:rotate-2 -translate-x-[5%] sm:-translate-x-[7%] -mt-1.5 sm:-mt-3 py-1">
        <div className="relative bg-[#070810]/95 border-y border-[#ff007f]/30 py-2 sm:py-3.5 shadow-[0_0_25px_rgba(255,0,127,0.15)] backdrop-blur-md">
          <motion.div
            className="flex w-max flex-nowrap"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              ease: 'linear',
              duration: 175,
              repeat: Infinity,
            }}
          >
            {/* First Half */}
            <div className="flex shrink-0 items-center gap-5 sm:gap-10 pr-5 sm:pr-10">
              {trackB.map((tech, index) => {
                const colorClass = ACCENT_COLORS[(index + 3) % ACCENT_COLORS.length];
                return (
                  <div key={`b1-${tech.name}-${index}`} className="flex items-center gap-5 sm:gap-10 shrink-0">
                    <span className={`font-mono font-extrabold text-sm min-[380px]:text-base sm:text-2xl md:text-3xl uppercase tracking-wider ${colorClass}`}>
                      {tech.name}
                    </span>
                    <span className="text-[#ff007f]/60 text-[10px] sm:text-sm font-mono font-bold tracking-widest">::</span>
                  </div>
                );
              })}
            </div>

            {/* Second Half (Exact Mirror for Seamless Infinite Loop) */}
            <div className="flex shrink-0 items-center gap-5 sm:gap-10 pr-5 sm:pr-10" aria-hidden="true">
              {trackB.map((tech, index) => {
                const colorClass = ACCENT_COLORS[(index + 3) % ACCENT_COLORS.length];
                return (
                  <div key={`b2-${tech.name}-${index}`} className="flex items-center gap-5 sm:gap-10 shrink-0">
                    <span className={`font-mono font-extrabold text-sm min-[380px]:text-base sm:text-2xl md:text-3xl uppercase tracking-wider ${colorClass}`}>
                      {tech.name}
                    </span>
                    <span className="text-[#ff007f]/60 text-[10px] sm:text-sm font-mono font-bold tracking-widest">::</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
