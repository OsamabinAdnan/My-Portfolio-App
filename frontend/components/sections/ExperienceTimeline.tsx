'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '@/lib/sanity/client';
import { experiencesQuery } from '@/lib/sanity/queries';
import type { Experience } from '@/lib/types';

export function ExperienceTimeline() {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await client.fetch(experiencesQuery);
        if (data && data.length > 0) {
          setExperienceList(data);
        }
      } catch (err) {
        console.error('Failed to load experiences from Sanity:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative bg-[#07080f] border-t border-zinc-900 cyber-grid overflow-hidden"
    >
      {/* Ambient Cyber Backlight */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#ff007f]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span>CHRONOLOGY</span>
            <span>::</span>
            <span className="text-[#ff007f]">PROFESSIONAL_TRAJECTORY</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-zinc-850 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight uppercase">
              CAREER &amp; <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5">MILESTONES</span>
            </h2>
            <div className="text-[11px] sm:text-xs font-mono text-[#00ff9f]">
              [INDUSTRY // ACADEMIA // AI]
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line with Cyber Glow */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#00f0ff]/40 shadow-[0_0_8px_rgba(0,240,255,0.3)] -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-6 sm:space-y-10 lg:space-y-12">
            {isLoading ? (
              [0, 1, 2, 3].map((index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="relative">
                    <div className="flex flex-col md:flex-row items-start">
                      {/* Left Side (Desktop) */}
                      <div
                        className={`hidden md:block w-1/2 ${
                          isEven ? 'pr-12 text-right' : 'order-2 pl-12 text-left'
                        }`}
                      >
                        <div className="hud-box p-5 lg:p-6 border border-zinc-800/80 bg-[#0a0d18]/70 text-left hud-corner-tl hud-corner-br animate-pulse space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-zinc-850/80">
                            <div className="h-5 w-20 bg-[#00f0ff]/10 border border-[#00f0ff]/20" />
                            <div className="h-3 w-16 bg-[#ff007f]/20" />
                          </div>
                          <div className="h-4 w-3/4 bg-zinc-800" />
                          <div className="h-3 w-1/3 bg-[#00ff9f]/20" />
                          <div className="space-y-1.5 pt-1">
                            <div className="h-2.5 w-full bg-zinc-850" />
                            <div className="h-2.5 w-4/5 bg-zinc-850" />
                          </div>
                        </div>
                      </div>

                      {/* Center Indicator */}
                      <div className="absolute left-4 md:left-1/2 top-5 sm:top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#07080f] border-2 border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] animate-pulse" />
                      </div>

                      {/* Right Side (or Mobile View) */}
                      <div
                        className={`w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0 ${
                          isEven ? 'order-2 md:pl-12' : 'md:pr-12'
                        }`}
                      >
                        <div className="md:hidden hud-box p-4 border border-zinc-800/80 bg-[#0a0d18]/70 hud-corner-tl hud-corner-br animate-pulse space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-zinc-850/80">
                            <div className="h-5 w-20 bg-[#00f0ff]/10 border border-[#00f0ff]/20" />
                            <div className="h-3 w-16 bg-[#ff007f]/20" />
                          </div>
                          <div className="h-4 w-3/4 bg-zinc-800" />
                          <div className="h-3 w-1/3 bg-[#00ff9f]/20" />
                          <div className="space-y-1.5 pt-1">
                            <div className="h-2.5 w-full bg-zinc-850" />
                            <div className="h-2.5 w-4/5 bg-zinc-850" />
                          </div>
                        </div>

                        {/* Ghost timestamp placeholder for desktop balance */}
                        <div className={`hidden md:block ${isEven ? 'text-left' : 'text-right'} pt-6`}>
                          <div className={`h-3 w-40 bg-zinc-850/50 animate-pulse ${isEven ? 'mr-auto' : 'ml-auto'}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              experienceList.map((exp, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div key={exp.id || index} className="relative group">
                  <div className="flex flex-col md:flex-row items-start">
                    {/* Left Side (Desktop) */}
                    <div
                      className={`hidden md:block w-1/2 ${
                        isEven ? 'pr-12 text-right' : 'order-2 pl-12 text-left'
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="hud-box p-5 lg:p-6 border border-zinc-800 bg-[#0a0d18]/90 hover:border-[#00f0ff]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] text-left hud-corner-tl hud-corner-br transition-all"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-3 pb-2 border-b border-zinc-850">
                          <span className="px-2.5 py-0.5 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] font-bold">
                            {exp.year}
                          </span>
                          <span className="text-[#ff007f] font-mono font-semibold">
                            NODE #{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="text-base font-bold font-mono text-white mb-1 group-hover:text-[#00f0ff] transition-colors">
                          {exp.role}
                        </h3>

                        <div className="text-xs text-[#00ff9f] font-mono font-medium mb-3">
                          {exp.company}
                        </div>

                        <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                          {exp.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline Center Node with Glowing Ring */}
                    <div className="absolute left-4 md:left-1/2 top-5 sm:top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#07080f] border-2 border-[#00f0ff] shadow-[0_0_12px_#00f0ff] group-hover:bg-[#00f0ff] transition-colors" />
                    </div>

                    {/* Right Side (or Mobile View) */}
                    <div
                      className={`w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0 ${
                        isEven
                          ? 'md:pl-12 order-1 md:order-2'
                          : 'md:pr-12 md:text-right order-1'
                      }`}
                    >
                      <div className="md:hidden">
                        <div className="hud-box p-4 border border-zinc-800 bg-[#0a0d18]/90 text-left">
                          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 mb-2.5 pb-2 border-b border-zinc-850">
                            <span className="px-2 py-0.5 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] font-bold">
                              {exp.year}
                            </span>
                            <span className="text-[#ff007f] font-mono font-semibold">
                              NODE #{String(index + 1).padStart(2, '0')}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold font-mono text-white mb-1">
                            {exp.role}
                          </h3>

                          <div className="text-[11px] sm:text-xs text-[#00ff9f] font-mono font-medium mb-2.5">
                            {exp.company}
                          </div>

                          <p className="text-[11px] sm:text-xs text-zinc-300 font-mono leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>

                      {/* Ghost timestamp tag for desktop balance */}
                      <div className={`hidden md:block ${isEven ? 'text-left' : 'text-right'} pt-6`}>
                        <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
                          // {exp.year} // <span className="text-zinc-400 font-medium">{exp.company}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
