'use client';

import { useEffect, useMemo, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Github, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Send, 
  MessageSquare, 
  BookOpen, 
  Globe 
} from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { profileQuery, socialLinksQuery } from '@/lib/sanity/queries';

// Crisp modern X (Twitter) icon
function XTwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Crisp modern Threads icon
function ThreadsIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 3.036 0 5.772-1.353 7.625-3.5a1 1 0 0 0-1.536-1.282C16.48 19.08 14.364 20 12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8c4.327 0 7.854 3.435 7.996 7.733-.03 1.94-.972 3.267-2.453 3.267-.936 0-1.643-.585-1.643-1.89V8.6a1 1 0 0 0-2 0v.548C13.235 8.44 12.378 8 11.26 8 8.87 8 7 10.02 7 12.5c0 2.49 1.88 4.5 4.26 4.5 1.488 0 2.584-.716 3.09-1.67.62 1.05 1.764 1.67 3.093 1.67 2.68 0 4.457-2.22 4.496-5.267C21.795 6.014 17.39 2 12 2zm0 13c-1.373 0-2.26-1.146-2.26-2.5 0-1.344.887-2.5 2.26-2.5 1.364 0 2.26 1.156 2.26 2.5 0 1.354-.896 2.5-2.26 2.5z" />
    </svg>
  );
}

export function StickySocialSidebar() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    async function loadSocials() {
      try {
        const dedicatedLinks = await client.fetch(socialLinksQuery);
        if (dedicatedLinks && dedicatedLinks.length > 0) {
          setSocials(dedicatedLinks);
          return;
        }

        const data = await client.fetch(profileQuery);
        if (data && data.socials && data.socials.length > 0) {
          setSocials(data.socials);
        }
      } catch (err) {
        console.error('Failed to load socials for sidebar:', err);
      }
    }
    loadSocials();
  }, []);

  const socialLinks = useMemo(
    () =>
      socials.filter((s) => s.platform !== 'email' && s.showInSidebar !== false),
    [socials]
  );

  const getIcon = (social: any) => {
    if (social.iconUrl) {
      return (
        <img
          src={social.iconUrl}
          alt={social.label || social.platform}
          className="w-4 h-4 object-contain filter invert"
        />
      );
    }
    const p = (social.platform || '').toLowerCase();
    if (p.includes('github')) return <Github className="w-4 h-4" />;
    if (p.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <XTwitterIcon className="w-4 h-4" />;
    if (p.includes('instagram')) return <Instagram className="w-4 h-4" />;
    if (p.includes('facebook')) return <Facebook className="w-4 h-4" />;
    if (p.includes('threads')) return <ThreadsIcon className="w-4 h-4" />;
    if (p.includes('youtube')) return <Youtube className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <MessageCircle className="w-4 h-4" />;
    if (p.includes('discord')) return <MessageSquare className="w-4 h-4" />;
    if (p.includes('telegram')) return <Send className="w-4 h-4" />;
    if (p.includes('medium')) return <BookOpen className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-1/2 lg:z-[60] lg:flex lg:-translate-y-1/2 font-mono">
        <div
          className={`flex items-center transition-transform duration-300 ease-out ${
            isDesktopOpen ? 'translate-x-0' : '-translate-x-[calc(100%-24px)]'
          }`}
        >
          <div className="flex items-center bg-[#07080f]/95 backdrop-blur-xl border border-[#00f0ff]/40 shadow-[0_0_35px_rgba(0,240,255,0.25)] hud-corner-br">
            <div className="px-3.5 py-5 flex flex-col gap-2.5">
              {socialLinks.map((social, idx) => (
                <a
                  key={social._id || social.platform || idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center text-[#00f0ff] bg-[#0a0d18] border border-[#00f0ff]/40 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-200"
                  aria-label={social.label || social.platform}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {getIcon(social)}
                  </span>
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#0a0d18] text-[#00f0ff] border border-[#00f0ff] text-[10px] font-bold font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                    {social.label || social.platform}
                  </div>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsDesktopOpen((v) => !v)}
              className="w-7 h-14 flex items-center justify-center text-[#00f0ff] bg-[#0a0d18] hover:bg-[#00f0ff] hover:text-black border-l border-[#00f0ff]/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
              aria-label={isDesktopOpen ? 'Close social sidebar' : 'Open social sidebar'}
            >
              {isDesktopOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed left-0 top-1/2 z-[60] flex -translate-y-1/2 font-mono">
        <div
          className={`flex items-center transition-transform duration-300 ease-out ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%-18px)]'
          }`}
        >
          <div className="flex items-center bg-[#07080f]/95 backdrop-blur-xl border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
            <div className="px-2.5 py-3.5 flex flex-col gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={social._id || social.platform || idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center text-[#00f0ff] bg-[#0a0d18] border border-[#00f0ff]/40 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all"
                  aria-label={social.label || social.platform}
                >
                  {getIcon(social)}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              className="w-5 h-12 flex items-center justify-center text-[#00f0ff] bg-[#0a0d18] hover:bg-[#00f0ff] hover:text-black border-l border-[#00f0ff]/40 transition-colors cursor-pointer"
              aria-label={isMobileOpen ? 'Close social sidebar' : 'Open social sidebar'}
            >
              {isMobileOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
