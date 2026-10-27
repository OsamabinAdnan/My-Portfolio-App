'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Binary } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { profileQuery } from '@/lib/sanity/queries';
import { resolveImageUrl } from '@/lib/sanity/image';
import type { Profile } from '@/lib/types';

export function About() {
  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await client.fetch(profileQuery);
        if (data && data.name) {
          setProfileData(data);
        }
      } catch (err) {
        console.error('Failed to load profile from Sanity:', err);
      }
    }
    loadProfile();
  }, []);

  const statGradients = [
    'text-[#00f0ff]',
    'text-[#ff0055]',
    'text-[#00ff9f]',
    'text-[#00f0ff]',
  ];

  const avatarSrc = resolveImageUrl(profileData?.avatarImage, '/osama-about.png') || '/osama-about.png';
  const displayName = profileData?.name || 'Osama bin Adnan';
  const displayId = displayName.toUpperCase().replace(/\s+/g, '_');

  return (
    <section
      id="about-intro"
      className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative bg-[#07080f] border-t border-zinc-900 cyber-grid overflow-hidden"
    >
      {/* Background ambient backlights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 lg:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span>SYSTEM_DOSSIER</span>
            <span>::</span>
            <span className="text-[#ff0055]">PROFILE</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-zinc-850 pb-3 sm:pb-4">
            <h2 className="text-lg min-[380px]:text-xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight uppercase">
              ABOUT <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5">THE DEVELOPER &amp; DIGITAL MARKETER</span>
            </h2>
            <div className="text-[11px] sm:text-xs font-mono text-[#00ff9f] flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
              STATUS: [OPERATIONAL]
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left - Portrait Dossier Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="w-full max-w-[280px] min-[380px]:max-w-[320px] sm:max-w-[400px] lg:max-w-[435px] xl:max-w-[455px] 2xl:max-w-[475px] hud-box p-3 sm:p-4 border border-[#00f0ff]/30 bg-[#0c0e1a]/90 hud-corner-tl hud-corner-br shadow-[0_0_30px_rgba(0,240,255,0.12)]">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-2.5 mb-2.5 sm:pb-3 sm:mb-3 border-b border-zinc-800">
                <span className="flex items-center gap-1.5 text-[#00f0ff]">
                  <Binary className="w-3.5 h-3.5" />
                  ID_SCAN: {displayId}
                </span>
                <span className="text-zinc-500">PK_LOC: 24.8607° N</span>
              </div>

              {/* Image Frame with Scanlines */}
              <div className="relative w-full aspect-[4/5] min-h-[250px] sm:min-h-[380px] md:min-h-[440px] overflow-hidden bg-black border border-zinc-800">
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 475px"
                  className="object-cover filter contrast-110"
                  priority
                />
                <div className="absolute inset-0 cyber-scanlines opacity-35 pointer-events-none" />

                {/* Cyber HUD Overlay */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 bg-[#07080f]/90 border border-[#00f0ff]/40 p-2.5 sm:p-3 backdrop-blur-sm shadow-xl">
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest font-bold">
                    {profileData?.subtitle || 'DUAL COMPETENCY PROFILE'}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-extrabold text-white tracking-wide mt-0.5">
                    {profileData?.title || 'FullStack & Agentic AI Developer'}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 sm:mt-3 flex items-center justify-end text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                <span className="text-[#00ff9f] flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AUTHENTICATED
                </span>
              </div>
            </div>
          </div>

          {/* Right - Dossier Body & Key Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="p-3.5 sm:p-6 bg-[#0a0d18]/90 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-lg whitespace-pre-line">
              <span className="text-[#00f0ff] font-bold">&gt; BIO_READOUT: </span>
              {(profileData?.about || '').replace(/\\n/g, '\n')}
            </div>

            {/* Stats Telemetry Strip with Cyberpunk Accents */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-5 sm:pt-6 border-t border-zinc-800">
              {(profileData?.stats || []).map((stat, idx) => (
                <div
                  key={stat.label || idx}
                  className="p-2.5 sm:p-3.5 bg-[#0c0e1a] border border-zinc-800 text-left hover:border-zinc-700 transition-colors"
                >
                  <div className={`text-lg sm:text-3xl font-mono font-extrabold ${statGradients[idx % statGradients.length]}`}>
                    {stat.value}
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-wider sm:tracking-widest mt-0.5 sm:mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
