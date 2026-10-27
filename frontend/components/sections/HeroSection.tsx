'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { CyberTorusKnot } from '@/components/ui/CyberTorusKnot';
import { client } from '@/lib/sanity/client';
import { profileQuery } from '@/lib/sanity/queries';
import { resolveImageUrl } from '@/lib/sanity/image';

interface HeroSectionProps {
  isReady?: boolean;
}

const COLOR_CYCLE = [
  {
    color: 'text-[#00f0ff]',
    border: 'border-[#00f0ff]',
    badgeBg: 'bg-[#00f0ff]/10',
    dot: 'bg-[#00f0ff]',
  },
  {
    color: 'text-[#ff0055]',
    border: 'border-[#ff0055]',
    badgeBg: 'bg-[#ff0055]/10',
    dot: 'bg-[#ff0055]',
  },
  {
    color: 'text-[#00ff9f]',
    border: 'border-[#00ff9f]',
    badgeBg: 'bg-[#00ff9f]/10',
    dot: 'bg-[#00ff9f]',
  },
];

const DEFAULT_ROLES = [
  {
    title: 'AGENTIC AI DEVELOPER',
    color: 'text-[#00f0ff]',
    border: 'border-[#00f0ff]',
    badgeBg: 'bg-[#00f0ff]/10',
    dot: 'bg-[#00f0ff]',
  },
  {
    title: 'WEB DEVELOPER',
    color: 'text-[#ff0055]',
    border: 'border-[#ff0055]',
    badgeBg: 'bg-[#ff0055]/10',
    dot: 'bg-[#ff0055]',
  },
  {
    title: 'DIGITAL MARKETER',
    color: 'text-[#00ff9f]',
    border: 'border-[#00ff9f]',
    badgeBg: 'bg-[#00ff9f]/10',
    dot: 'bg-[#00ff9f]',
  },
];

const STAT_ACCENTS = [
  { text: 'text-[#00f0ff]', hoverBorder: 'hover:border-[#00f0ff]/40' },
  { text: 'text-[#ff0055]', hoverBorder: 'hover:border-[#ff0055]/40' },
  { text: 'text-[#00ff9f]', hoverBorder: 'hover:border-[#00ff9f]/40' },
  { text: 'text-[#00f0ff]', hoverBorder: 'hover:border-[#00f0ff]/40' },
  { text: 'text-[#ff0055]', hoverBorder: 'hover:border-[#ff0055]/40' },
];

const DEFAULT_STATS = [
  { label: 'EXPERIENCE', value: '2+' },
  { label: 'PROJECTS DELIVERED', value: '10+' },
  { label: 'TECHNOLOGIES', value: '20+' },
  { label: 'AI AGENTS DEPLOYED', value: '3+' },
];

export function HeroSection({ isReady = true }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [graphicMode, setGraphicMode] = useState<'3d' | 'portrait'>('3d');
  const [profileData, setProfileData] = useState<any>(null);

  const roles = useMemo(() => {
    if (profileData?.rotatingTitles && Array.isArray(profileData.rotatingTitles) && profileData.rotatingTitles.length > 0) {
      return profileData.rotatingTitles.map((item: string, idx: number) => {
        const style = COLOR_CYCLE[idx % COLOR_CYCLE.length];
        return {
          title: String(item).toUpperCase(),
          ...style,
        };
      });
    }
    return DEFAULT_ROLES;
  }, [profileData?.rotatingTitles]);

  const statsList =
    profileData?.stats && profileData.stats.length > 0
      ? profileData.stats
      : DEFAULT_STATS;

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await client.fetch(profileQuery);
        if (data) {
          setProfileData(data);
        }
      } catch (err) {
        console.error('Failed to load profile in HeroSection:', err);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    if (roles.length === 0) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    if (!heroRef.current || !isReady) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
      });

      gsap.from('.hero-title-main', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
      });

      gsap.from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
      });

      gsap.from('.hero-ctas', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
      });

      gsap.from('.hero-stats', {
        opacity: 0,
        duration: 1,
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between pt-20 sm:pt-28 lg:pt-36 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden cyber-grid"
    >
      {/* Radiant Cyberpunk Ambient Backlight */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff0055]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Grid: Left Content + Right 3D Wireframe Torus Knot */}
      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 xl:gap-12 items-center my-auto relative z-10">

        {/* Left Column (Content) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Top Holographic Badges */}
          <div className="hero-badge flex flex-wrap items-center gap-1.5 sm:gap-2.5 mb-3 sm:mb-5 lg:mb-6">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 bg-black/60 border border-[#00f0ff]/40 text-[9px] sm:text-[11px] font-mono tracking-widest text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              [SYS: ACTIVE // v2.6]
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 bg-[#00ff9f]/10 border border-[#00ff9f]/40 text-[#00ff9f] text-[9px] sm:text-[11px] font-mono tracking-widest font-semibold shadow-[0_0_12px_rgba(0,255,159,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
              ONLINE
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 bg-black/50 border border-zinc-800 text-zinc-400 text-[9px] sm:text-[11px] font-mono tracking-widest">
              KARACHI, PK
            </span>
          </div>

          {/* Main Title Block */}
          <div className="hero-title-main mb-2.5 sm:mb-4 lg:mb-5">
            <div className="font-mono text-xs sm:text-base md:text-xl text-white tracking-wider mb-1 sm:mb-2 font-bold flex items-center gap-2">
              <span className="text-white">&gt;</span>
              <span>Hello! This is</span>
            </div>
            <h1 className="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-mono font-extrabold tracking-tight leading-[1.1] break-words">
              <span className="text-[#00f0ff] drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">
                {profileData?.name?.toUpperCase() || 'OSAMA BIN ADNAN'}
              </span>
            </h1>
          </div>

          {/* and I'm */}
          <div className="font-mono text-[11px] sm:text-sm text-zinc-400 tracking-widest uppercase mb-1.5 sm:mb-2.5 flex items-center gap-2 font-semibold">
            <span>and I&apos;m</span>
          </div>

          {/* Rotating Role Terminal Box */}
          <div className="hero-desc mb-4 sm:mb-6 lg:mb-8 w-full max-w-xl">
            <div className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-3 bg-[#0b0e1b]/95 border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.18)] hud-corner-tl hud-corner-br min-h-[44px] sm:min-h-[58px]">
              <span className="text-[#00f0ff] font-bold text-xs sm:text-base select-none shrink-0">&gt;</span>
              <div className="overflow-hidden relative flex-1 h-7 sm:h-9 flex items-center">
                <AnimatePresence mode="wait">
                  {roles[roleIndex % roles.length] && (
                    <motion.div
                      key={roles[roleIndex % roles.length].title}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex items-center gap-1.5 sm:gap-2.5 whitespace-nowrap overflow-hidden"
                    >
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${roles[roleIndex % roles.length].dot} animate-pulse shrink-0`} />
                      <span className={`font-mono font-extrabold text-xs min-[380px]:text-sm sm:text-xl md:text-2xl lg:text-3xl tracking-tight sm:tracking-wider whitespace-nowrap ${roles[roleIndex % roles.length].color} drop-shadow-[0_0_15px_currentColor]`}>
                        {roles[roleIndex % roles.length].title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="w-1.5 sm:w-2 h-3.5 sm:h-4 bg-[#00f0ff] animate-pulse shrink-0 ml-1 sm:ml-2" />
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-ctas flex items-center">
            <Link
              href="/projects"
              className="swipe-button group !px-3.5 !py-1.5 sm:!px-6 sm:!py-2.5 !text-[11px] sm:!text-xs inline-flex items-center gap-1.5 sm:gap-2 w-auto"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Cyber Torus Knot & Holographic Stage */}
        <div className="lg:col-span-5 relative flex items-center justify-center w-full h-[260px] sm:h-[380px] lg:h-[480px] xl:h-[520px] max-w-[540px] mx-auto bg-[#0a0d18]/90 border border-[#00f0ff]/30 shadow-[0_0_35px_rgba(0,240,255,0.18)] overflow-hidden hud-corner-tl hud-corner-br">
          {/* Target Reticle Framing */}
          <div className="absolute inset-3 sm:inset-4 border border-[#00f0ff]/20 pointer-events-none z-20" />

          {/* Top Telemetry & Mode Switcher */}
          <div className="absolute top-2.5 sm:top-3 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-wider">
            <span className="flex items-center gap-1.5 bg-black/80 px-2 py-0.5 border border-[#00f0ff]/40 text-[#00f0ff] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
              {graphicMode === '3d' ? '3D_GEOM: TORUS_KNOT' : 'HOLO_DOSSIER: OSAMA'}
            </span>

            {/* Toggle Mode Button */}
            <button
              type="button"
              onClick={() => setGraphicMode((m) => (m === '3d' ? 'portrait' : '3d'))}
              className="px-2 py-0.5 bg-[#0a0d18] border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)] flex items-center gap-1 cursor-pointer text-[9px] sm:text-[10px]"
              aria-label="Toggle graphic mode"
            >
              <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>{graphicMode === '3d' ? '[VIEW PHOTO]' : '[VIEW 3D KNOT]'}</span>
            </button>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-wider pointer-events-none">
            <span className="text-[#ff0055] bg-black/80 px-1.5 sm:px-2 py-0.5 border border-[#ff0055]/40 font-bold">
              CORE: RED_PLASMA
            </span>
            <span className="text-[#00ff9f] bg-black/80 px-1.5 sm:px-2 py-0.5 border border-[#00ff9f]/40 font-bold">
              FPS: 60 // STABLE
            </span>
          </div>

          {/* Cyber Scanline Texture */}
          <div className="absolute inset-0 cyber-scanlines opacity-30 pointer-events-none z-10" />

          {/* Visual Display */}
          {graphicMode === '3d' ? (
            <div className="w-full h-full relative z-0 flex items-center justify-center p-2">
              <CyberTorusKnot isReady={isReady} className="w-full h-full" />
            </div>
          ) : (
            <div className="relative w-full h-full min-h-[260px] sm:min-h-[380px] lg:min-h-[480px] xl:min-h-[520px] flex items-center justify-center">
              <Image
                src={resolveImageUrl(profileData?.avatarImage, '/osama-about.png') || '/osama-about.png'}
                alt={profileData?.name || 'Osama bin Adnan'}
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-top filter contrast-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-transparent to-transparent opacity-80" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom HUD Telemetry Strip */}
      <div className="hero-stats max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full pt-5 sm:pt-8 border-t border-zinc-850/80 mt-5 sm:mt-8 lg:mt-10 relative z-10">
        <div
          className={`grid gap-2.5 sm:gap-4 text-left ${
            statsList.length <= 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : statsList.length === 4
              ? 'grid-cols-2 md:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
          }`}
        >
          {statsList.map((stat: any, idx: number) => {
            const accent = STAT_ACCENTS[idx % STAT_ACCENTS.length];
            return (
              <div
                key={stat._key || stat.label || idx}
                className={`p-2.5 sm:p-3.5 bg-[#0c0e1a]/80 border border-zinc-800 ${accent.hoverBorder} transition-colors flex flex-col justify-between`}
              >
                <div className={`text-[8px] sm:text-[10px] ${accent.text} font-mono tracking-wider sm:tracking-widest uppercase font-semibold leading-tight line-clamp-2`}>
                  // {stat.label}
                </div>
                <div className="text-base sm:text-2xl font-bold font-mono text-white mt-1 sm:mt-1.5">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
