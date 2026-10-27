'use client';

import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Radio, 
  ArrowUp, 
  Layers, 
  Github, 
  Linkedin, 
  Instagram, 
  Facebook,
  Youtube,
  MessageCircle,
  Send,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { profileQuery, socialLinksQuery } from '@/lib/sanity/queries';
import Link from 'next/link';

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

export function Footer() {
  const [profileData, setProfileData] = useState<any>(null);
  const [dedicatedSocials, setDedicatedSocials] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [karachiTime, setKarachiTime] = useState('');

  // Fetch dynamic profile and social links
  useEffect(() => {
    async function loadProfile() {
      try {
        const [data, sLinks] = await Promise.all([
          client.fetch(profileQuery),
          client.fetch(socialLinksQuery),
        ]);
        if (data && data.name) {
          setProfileData(data);
        }
        if (sLinks && sLinks.length > 0) {
          setDedicatedSocials(sLinks);
        }
      } catch (err) {
        console.error('Failed to load profile for footer:', err);
      }
    }
    loadProfile();
  }, []);

  // Live Karachi time ticker
  useEffect(() => {
    function updateClock() {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setKarachiTime(formatter.format(new Date()));
      } catch (e) {
        setKarachiTime('');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const allSocials = dedicatedSocials.length > 0
    ? dedicatedSocials
    : (profileData?.socials || []);

  const emailSocial = allSocials.find((s: any) => s.platform === 'email');
  const emailAddress = emailSocial?.label || emailSocial?.url?.replace('mailto:', '') || 'imosamabinadnan@gmail.com';

  const socialLinks = allSocials.filter((s: any) => s.platform !== 'email' && s.showInFooter !== false) as Array<{
    _id?: string;
    platform: string;
    url: string;
    label: string;
    iconUrl?: string;
  }>;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (social: any) => {
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
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <footer
      id="contact"
      className="relative pt-14 sm:py-20 lg:pt-24 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#04050a] border-t border-zinc-800 font-mono cyber-grid overflow-hidden"
    >
      {/* Top glowing neon separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/60 via-[#ff007f]/40 to-transparent" />

      {/* Ambient Neon Backlights (strictly Cyan and Cyber Red/Pink, zero purple) */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#ff007f]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10">
        {/* Top Header Section Call To Action */}
        <div className="mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-zinc-850">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span>COMMUNICATION</span>
            <span>::</span>
            <span className="text-[#ff007f]">SYSTEM_DISPATCH</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white tracking-tight uppercase">
              LET&apos;S <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5">COLLABORATE</span>
            </h2>

            <a
              href={`mailto:${emailAddress}`}
              className="swipe-button inline-flex group shrink-0 self-start sm:self-auto w-full sm:w-auto justify-center text-center"
            >
              <span>DISPATCH TRANSMISSION</span>
              <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            Bridging modern Full-Stack &amp; Agentic AI engineering with data-driven Digital Marketing strategy. Architecting intelligent autonomous workflows, high-performance web platforms, and growth-driven digital marketing campaigns.
          </p>
        </div>

        {/* 3 Columns Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
          {/* Column 1 - Contact Coordinates */}
          <div className="p-4 sm:p-6 lg:p-7 bg-[#0a0d18]/90 border border-zinc-800 hover:border-[#00f0ff]/50 hud-corner-tl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] group">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="text-[11px] text-[#00f0ff] uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                // DIRECT_COORDINATES
              </div>
              <span className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-0.5 bg-[#07080f]">
                PRIMARY_COMMS
              </span>
            </div>

            <div className="space-y-5 text-xs">
              {/* Electronic Mail with Copy Button */}
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider flex items-center justify-between">
                  <span>ELECTRONIC_MAIL</span>
                  {copied && (
                    <span className="text-[#00ff9f] flex items-center gap-1 font-bold text-[10px]">
                      <Check className="w-3 h-3" /> COPIED TO CLIPBOARD
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="flex-1 text-white hover:text-[#00f0ff] text-xs sm:text-sm font-bold truncate transition-colors bg-[#07080f] px-3 py-2 border border-zinc-800 group-hover:border-[#00f0ff]/30 block"
                  >
                    {emailAddress}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                    className="px-3 py-2 bg-[#07080f] border border-zinc-800 hover:border-[#00f0ff] hover:text-[#00f0ff] text-zinc-400 transition-all flex items-center justify-center cursor-pointer shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#00ff9f]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Physical Location with Live Karachi Time */}
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider flex items-center justify-between">
                  <span>PHYSICAL_LOCATION</span>
                  {karachiTime && (
                    <span className="text-[#00f0ff] text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      PKT {karachiTime}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 p-3 bg-[#07080f] border border-zinc-800 flex items-center justify-between text-zinc-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span className="font-bold">Karachi, Pakistan</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">UTC+05:00</span>
                </div>
              </div>

              {/* Status Availability */}
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                  STATUS_AVAILABILITY
                </div>
                <div className="mt-1.5 p-3 bg-[#00ff9f]/5 border border-[#00ff9f]/30 text-[#00ff9f] flex items-center gap-2.5 font-bold shadow-[0_0_15px_rgba(0,255,159,0.08)]">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff9f] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff9f]" />
                  </span>
                  <span className="text-[11px] uppercase tracking-wide leading-tight">
                    AVAILABLE FOR AI, IT AND DIGITAL MARKETER ROLE WORLDWIDE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 - Network Transmitters (Zero purple, real icons, interactive tiles) */}
          <div className="p-4 sm:p-6 lg:p-7 bg-[#0a0d18]/90 border border-zinc-800 hover:border-[#00f0ff]/50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] group">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="text-[11px] text-[#00f0ff] uppercase tracking-widest font-bold flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
                // NETWORK_TRANSMITTERS
              </div>
              <span className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-0.5 bg-[#07080f]">
                {socialLinks.length} NODES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social._id || social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-2 min-[380px]:p-2.5 sm:p-3.5 bg-[#07080f] border border-zinc-800 text-zinc-300 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] transition-all duration-200 text-center group/btn font-mono"
                  aria-label={social.label || social.platform}
                >
                  <div className="w-6 h-6 min-[380px]:w-7 min-[380px]:h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#00f0ff] group-hover/btn:text-black group-hover/btn:scale-110 transition-transform mb-1 sm:mb-1.5">
                    {getSocialIcon(social)}
                  </div>
                  <span className="text-[9px] min-[380px]:text-[10px] uppercase font-bold tracking-wider group-hover/btn:text-black transition-colors truncate max-w-full">
                    {social.label || social.platform}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 text-zinc-400 group-hover/btn:text-black/80 mt-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            <div className="mt-4 pt-3.5 border-t border-zinc-850 flex items-center justify-between text-[10px] text-zinc-400">
              <span>ENCRYPTED_CHANNELS</span>
              <span className="text-[#00ff9f]">AVG_RESPONSE &lt; 12H</span>
            </div>
          </div>

          {/* Column 3 - Site Navigation */}
          <div className="p-4 sm:p-6 lg:p-7 bg-[#0a0d18]/90 border border-zinc-800 hover:border-[#ff007f]/50 hud-corner-br flex flex-col justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] group">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="text-[11px] text-[#ff007f] uppercase tracking-widest font-bold flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#ff007f]" />
                  // SITE_ARCHITECTURE
                </div>
                <span className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-0.5 bg-[#07080f]">
                  DIRECTORY
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <Link
                  href="/"
                  className="p-2.5 bg-[#07080f] border border-zinc-800 hover:border-[#00f0ff]/50 text-zinc-300 hover:text-white flex items-center justify-between transition-all group/link"
                >
                  <span className="group-hover/link:text-[#00f0ff] transition-colors font-bold tracking-wider">
                    HOME
                  </span>
                  <span className="text-zinc-500 group-hover/link:text-[#00f0ff] group-hover/link:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>

                <Link
                  href="/projects"
                  className="p-2.5 bg-[#07080f] border border-zinc-800 hover:border-[#00f0ff]/50 text-zinc-300 hover:text-white flex items-center justify-between transition-all group/link"
                >
                  <span className="group-hover/link:text-[#00f0ff] transition-colors font-bold tracking-wider">
                    PROJECTS
                  </span>
                  <span className="text-zinc-500 group-hover/link:text-[#00f0ff] group-hover/link:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>

                <Link
                  href="/certifications"
                  className="p-2.5 bg-[#07080f] border border-zinc-800 hover:border-[#00ff9f]/50 text-zinc-300 hover:text-white flex items-center justify-between transition-all group/link"
                >
                  <span className="group-hover/link:text-[#00ff9f] transition-colors font-bold tracking-wider">
                    CERTIFICATIONS
                  </span>
                  <span className="text-zinc-500 group-hover/link:text-[#00ff9f] group-hover/link:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>

                <Link
                  href="/#experience"
                  className="p-2.5 bg-[#07080f] border border-zinc-800 hover:border-[#ff007f]/50 text-zinc-300 hover:text-white flex items-center justify-between transition-all group/link"
                >
                  <span className="group-hover/link:text-[#ff007f] transition-colors font-bold tracking-wider">
                    EXPERIENCE
                  </span>
                  <span className="text-zinc-500 group-hover/link:text-[#ff007f] group-hover/link:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Resume / CV Link Footer */}
            <div className="mt-4 pt-3.5 border-t border-zinc-850 flex items-center justify-between text-[10px] text-zinc-400">
              <a
                href={profileData?.resumeFileUrl || profileData?.resumeUrl || '/OsamabinAdnan-Resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00f0ff] transition-colors flex items-center gap-1 font-bold"
              >
                <span>CURRICULUM_VITAE</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span className="text-[#00f0ff]">PDF // VIEW_RESUME</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Return to Top */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 sm:pr-28">
          <div className="text-center sm:text-left">
            <span className="text-zinc-300 font-bold">© {new Date().getFullYear()} OSAMA BIN ADNAN.</span>{' '}
            <span className="text-zinc-500">AESTHETIC CYBERPUNK ARCHITECTURE.</span>
          </div>

          {/* Return to top cyber button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0d18] border border-zinc-800 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer group"
          >
            <span>RETURN_TO_ORBIT</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#00f0ff]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
