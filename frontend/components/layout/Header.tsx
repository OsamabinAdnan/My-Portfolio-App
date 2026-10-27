'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { FileText } from 'lucide-react';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { client } from '@/lib/sanity/client';
import { profileQuery } from '@/lib/sanity/queries';

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/OsamabinAdnan-Resume.pdf');
  const pathname = usePathname();

  useEffect(() => {
    setIsReady(true);
    async function loadResume() {
      try {
        const data = await client.fetch(profileQuery);
        if (data?.resumeFileUrl) {
          setResumeUrl(data.resumeFileUrl);
        } else if (data?.resumeUrl) {
          setResumeUrl(data.resumeUrl);
        }
      } catch (err) {
        console.error('Failed to load resume:', err);
      }
    }
    loadResume();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      gsap.from('.header-content', {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, headerRef);

    return () => ctx.revert();
  }, [isReady]);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/certifications', label: 'CERTIFICATIONS' },
    { href: '/#experience', label: 'EXPERIENCE' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#07080f]/90 backdrop-blur-md border-b border-[#00f0ff]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Top Cyber Telemetry Line */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 bg-black/80 border-b border-zinc-900 text-[10px] tracking-widest font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#00ff9f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
            SYS: ACTIVE
          </span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">NODE: KARACHI_PK</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">LATENCY: 12MS</span>
        </div>
      </div>

      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-3.5">
        <div className="header-content flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative w-8 h-8 border border-[#00f0ff]/60 flex items-center justify-center bg-black/90 overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:border-[#00f0ff] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] transition-all">
              <Image
                src="/Neon Cyan Geometric O.webp"
                alt="Osama bin Adnan Logo"
                fill
                sizes="32px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-extrabold text-sm sm:text-base tracking-wider text-white group-hover:text-[#00f0ff] transition-colors">
                OSAMABINADNAN<span className="text-[#ff007f]">.</span>
              </span>
              <span className="text-[9px] text-[#00f0ff]/80 font-mono tracking-widest uppercase">
                [DEVELOPER // DIGITAL MARKETER]
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href) && !item.href.includes('#');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 border font-bold ${
                    isActive
                      ? 'border-[#00f0ff] bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'border-transparent text-zinc-300 hover:text-black hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Resume */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button-fill"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>[RESUME.PDF]</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <MobileMenu resumeUrl={resumeUrl} />
        </div>
      </div>
    </header>
  );
}
