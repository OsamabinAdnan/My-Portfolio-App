'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink, ShieldCheck, Award } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Certification } from '@/lib/types';
import { resolveImageUrl } from '@/lib/sanity/image';

interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export function CertificateModal({ certification, onClose }: CertificateModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certification) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certification, onClose]);

  if (!certification) return null;

  const certificateImage = resolveImageUrl(certification.badgeImage, certification.badgeUrl);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-[#080a14] border border-[#00f0ff]/50 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col w-full max-w-5xl max-h-[92vh] overflow-hidden font-mono hud-corner-tl hud-corner-br"
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 bg-[#05060e] border-b border-zinc-800">
            <div className="flex items-center gap-2 truncate pr-4">
              <ShieldCheck className="w-4 h-4 text-[#00f0ff] shrink-0" />
              <span className="text-xs text-[#00f0ff] tracking-widest uppercase font-bold hidden sm:inline">
                [CREDENTIAL_INSPECTOR]
              </span>
              <span className="text-zinc-600 hidden sm:inline">//</span>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                {certification.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border border-zinc-800 hover:border-[#ff007f] text-zinc-400 hover:text-[#ff007f] transition-colors cursor-pointer shrink-0"
              aria-label="Close certificate inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col lg:flex-row min-h-full">
              {/* Left / Top: High-Res Certificate Preview */}
              <div className="w-full lg:w-3/5 bg-black/90 relative flex items-center justify-center p-3 sm:p-6 border-b lg:border-b-0 lg:border-r border-zinc-850">
                {certificateImage ? (
                  <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[480px] max-h-[65vh] flex items-center justify-center">
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                        <div className="w-8 h-8 border-2 border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin" />
                      </div>
                    )}
                    <Image
                      src={certificateImage}
                      alt={certification.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className={`object-contain filter contrast-105 transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority
                      loading="eager"
                      onLoad={() => setIsLoaded(true)}
                    />
                    {/* Scanlines texture overlay */}
                    <div className="absolute inset-0 cyber-scanlines opacity-20 pointer-events-none" />
                  </div>
                ) : (
                  <div className="w-full h-64 flex flex-col items-center justify-center text-center p-6 bg-[#0a0d18] border border-zinc-800">
                    <Award className="w-16 h-16 text-[#00f0ff]/50 mb-3" />
                    <div className="text-sm font-bold text-white">{certification.title}</div>
                    <div className="text-xs text-[#00ff9f] mt-1">{certification.issuer}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-3">
                      [CERTIFICATE_PREVIEW_ON_ISSUER_PORTAL]
                    </div>
                  </div>
                )}
              </div>

              {/* Right / Bottom: Credential Spec & Telemetry */}
              <div className="w-full lg:w-2/5 flex flex-col justify-between p-5 sm:p-6 bg-[#080a14]">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-[#00ff9f] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] animate-pulse" />
                      STATUS: VERIFIED CREDENTIAL
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {certification.title}
                    </h3>
                    {certification.credentialName && (
                      <p className="text-xs text-zinc-400 mt-1 font-mono">
                        {certification.credentialName}
                      </p>
                    )}
                  </div>

                  {/* Issuer & Metadata Grid */}
                  <div className="p-3 bg-black/60 border border-zinc-800 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="text-zinc-500">ISSUER:</span>
                      <strong className="text-white text-right">{certification.issuer}</strong>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="text-zinc-500">ISSUE_DATE:</span>
                      <strong className="text-[#00f0ff]">{certification.issueDate}</strong>
                    </div>
                    {certification.credentialId && (
                      <div className="flex items-center justify-between text-zinc-300 truncate">
                        <span className="text-zinc-500">CREDENTIAL_ID:</span>
                        <strong className="text-zinc-200 truncate ml-2">{certification.credentialId}</strong>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {certification.description && (
                    <div>
                      <div className="text-[10px] text-[#00f0ff] uppercase tracking-wider font-bold mb-1.5">
                        // SPECIFICATION_ABSTRACT
                      </div>
                      <p className="text-xs text-zinc-300 font-mono leading-relaxed max-h-36 overflow-y-auto pr-1">
                        {certification.description}
                      </p>
                    </div>
                  )}

                  {/* Skills tags */}
                  {certification.skills && certification.skills.length > 0 && (
                    <div>
                      <div className="text-[10px] text-[#00f0ff] uppercase tracking-wider font-bold mb-1.5">
                        // VERIFIED_COMPETENCIES
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {certification.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[10px] bg-black text-[#00f0ff] border border-[#00f0ff]/30 font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-zinc-800 flex flex-col gap-2">
                  {certification.credentialUrl ? (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button w-full"
                    >
                      <span>LAUNCH ISSUER VERIFICATION</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-center text-[11px] text-zinc-500 font-mono py-2 border border-zinc-850">
                      [INTERNAL_ACADEMIC_RECORD]
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
