'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  resumeUrl?: string;
}

export function MobileMenu({ resumeUrl = '/OsamabinAdnan-Resume.pdf' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/certifications', label: 'CERTIFICATIONS' },
    { href: '/#experience', label: 'EXPERIENCE' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center w-9 h-9 border border-[#00f0ff] bg-[#0a0d18] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[290px] sm:w-[320px] bg-[#07080f] border-l border-[#00f0ff]/30 z-50 flex flex-col font-mono"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#0a0d18]">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-6 h-6 border border-[#00f0ff]/60 bg-black/90 overflow-hidden shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    <Image
                      src="/Neon Cyan Geometric O.webp"
                      alt="Logo"
                      fill
                      sizes="24px"
                      className="object-contain p-0.5"
                    />
                  </div>
                  <span className="text-xs font-bold text-white tracking-widest uppercase">
                    [NAV_TERMINAL]
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-zinc-800 hover:border-[#ff007f] text-zinc-400 hover:text-[#ff007f] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Bar */}
              <div className="px-5 py-2 bg-black/80 border-b border-zinc-850 text-[10px] text-[#00f0ff] tracking-wider flex items-center justify-between">
                <span>STATUS: ONLINE</span>
                <span>DATASET: PROD</span>
              </div>

              {/* Links */}
              <div className="flex-1 px-4 py-6 flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href) && !item.href.includes('#');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 text-xs tracking-wider border font-bold transition-all ${
                        isActive
                          ? 'border-[#00f0ff] bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                          : 'border-zinc-850 bg-[#0a0d18] text-zinc-300 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-zinc-800 bg-[#0a0d18]">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button w-full"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>[RESUME.PDF]</span>
                </a>
                <div className="mt-3 text-center text-[10px] text-zinc-500 tracking-widest">
                  OSAMA BIN ADNAN // 2026
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
