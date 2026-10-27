'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Sparkles,
  ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '@/lib/sanity/client';
import { certificationsQuery, certificationCategoriesQuery } from '@/lib/sanity/queries';
import { resolveImageUrl } from '@/lib/sanity/image';
import { CertificateModal } from '@/components/ui/CertificateModal';
import type { Certification } from '@/lib/types';

const initialTabs: { key: string; label: string; activeColor: string }[] = [
  { key: 'all', label: '[ALL_CREDENTIALS]', activeColor: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
];

export default function CertificationsPage() {
  const [certificationsList, setCertificationsList] = useState<Certification[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [tabs, setTabs] = useState(initialTabs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCertifications() {
      try {
        const [sanityCerts, sanityCategories] = await Promise.all([
          client.fetch(certificationsQuery),
          client.fetch(certificationCategoriesQuery),
        ]);

        if (sanityCerts && sanityCerts.length > 0) {
          setCertificationsList(sanityCerts);
        }

        if (sanityCategories && sanityCategories.length > 0) {
          const colorCycles = [
            'bg-[#ff007f] text-white border-[#ff007f]',
            'bg-[#00f0ff] text-black border-[#00f0ff]',
            'bg-[#00ff9f] text-black border-[#00ff9f]',
          ];
          const dynamicTabs = [
            { key: 'all', label: '[ALL_CREDENTIALS]', activeColor: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
            ...sanityCategories.map((cat: { key: string; title: string }, i: number) => ({
              key: cat.key,
              label: cat.title.startsWith('[') ? cat.title : `[${cat.title.toUpperCase().replace(/\s+/g, '_')}]`,
              activeColor: colorCycles[i % colorCycles.length],
            })),
          ];
          setTabs(dynamicTabs);
        }
      } catch (err) {
        console.error('Failed to load certifications from Sanity:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCertifications();
  }, []);

  const filtered = certificationsList.filter((cert) => {
    const matchesTab = activeTab === 'all' || cert.category === activeTab;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      q === '' ||
      cert.title.toLowerCase().includes(q) ||
      (cert.credentialName && cert.credentialName.toLowerCase().includes(q)) ||
      cert.issuer.toLowerCase().includes(q) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
      cert.description.toLowerCase().includes(q) ||
      (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(q)));
    return matchesTab && matchesQuery;
  });

  return (
    <>
      {/* Lightbox / Modal for Enlarging Certificate Image */}
      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      <div className="min-h-screen bg-[#07080f] text-white pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 xl:px-16 cyber-grid relative overflow-hidden">
        {/* Radiant Cyber Ambient Backlights */}
        <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-80 right-10 w-[450px] h-[450px] bg-[#ff007f]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-zinc-850">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-zinc-400 hover:text-[#00f0ff] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>[BACK_TO_HOME]</span>
            </Link>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono">
              <span className="text-[#00ff9f] font-bold">[VERIFIED_RECORDS]</span>
            </div>
          </div>

          {/* Header Title */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#00ff9f]/10 border border-[#00ff9f]/40 text-[9px] sm:text-[11px] font-mono text-[#00ff9f] mb-2 sm:mb-3 shadow-[0_0_15px_rgba(0,255,159,0.15)]">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>OFFICIAL_CREDENTIALS // PROOF_OF_COMPETENCE</span>
            </div>
            <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-mono font-extrabold tracking-tight uppercase">
              <span className="text-white">CERTIFICATIONS &amp; </span>
              <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5 sm:pb-1">
                ACCREDITATIONS
              </span>
            </h1>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-zinc-300 font-mono max-w-2xl leading-relaxed">
              Verified technical certifications in Agentic AI engineering, Generative AI systems, digital analytics, and industrial operations.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-zinc-850">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-mono tracking-wider border font-bold transition-all cursor-pointer ${
                      isActive
                        ? `${tab.activeColor} shadow-[0_0_20px_rgba(0,240,255,0.4)]`
                        : 'border-zinc-800 bg-[#0a0d18] text-zinc-400 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}

              {/* Skeleton placeholder pills while categories load from Studio */}
              {isLoading && (
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <div className="h-[27px] sm:h-[31px] w-24 sm:w-28 bg-[#0a0d18] border border-zinc-800 animate-pulse" />
                  <div className="h-[27px] sm:h-[31px] w-20 sm:w-24 bg-[#0a0d18] border border-zinc-800 animate-pulse hidden min-[480px]:block" />
                </div>
              )}
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_CREDENTIALS..."
                className="w-full bg-[#0c0e1a] border border-zinc-800 pl-9 pr-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
              />
            </div>
          </div>

          {/* Counter */}
          <div className="text-[11px] sm:text-xs font-mono text-zinc-400 mb-5 sm:mb-6 flex items-center gap-2">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="text-[#00f0ff] font-bold">[SYNCING_STUDIO_CREDENTIALS...]</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                <span>DISPLAYING {filtered.length} OF {certificationsList.length} CREDENTIALS</span>
              </>
            )}
          </div>

          {/* Loading Skeleton Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border border-zinc-800 bg-[#0a0d18]/70 flex flex-col justify-between animate-pulse overflow-hidden"
                >
                  <div className="w-full aspect-[16/10] bg-zinc-900/80 border-b border-zinc-850" />
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-3 w-28 bg-zinc-800/80" />
                    <div className="h-4 w-4/5 bg-zinc-800" />
                    <div className="h-3 w-3/5 bg-zinc-850" />
                    <div className="space-y-1.5 pt-2">
                      <div className="h-2.5 w-full bg-zinc-850/80" />
                      <div className="h-2.5 w-4/5 bg-zinc-850/80" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 pt-0 flex gap-2">
                    <div className="h-8 flex-1 bg-zinc-850/80 border border-zinc-800" />
                    <div className="h-8 flex-1 bg-zinc-850/80 border border-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty Search State */
            <div className="py-20 text-center border border-zinc-800 bg-[#0c0e1a] font-mono">
              <Award className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <div className="text-zinc-400 text-xs sm:text-sm">[NO_MATCHING_CREDENTIALS_FOUND]</div>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-1.5 border border-[#00f0ff] text-xs font-mono text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors cursor-pointer"
              >
                RESET_FILTERS
              </button>
            </div>
          ) : (
            /* Certifications Grid (Uniform Layout, No Separate Flagship Block) */
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
              >
                {filtered.map((cert, index) => {
                  const imageSrc = resolveImageUrl(cert.badgeImage, cert.badgeUrl);

                  return (
                    <motion.div
                      key={cert._id || cert.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: (index % 6) * 0.06 }}
                      className="group relative hud-box border border-zinc-800 bg-[#0a0d18]/90 flex flex-col justify-between hover:border-[#00f0ff]/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 hud-corner-tl hud-corner-br overflow-hidden"
                    >
                      <div>
                        {/* Prominent Certificate Preview Frame (Click to Enlarge) */}
                        <div
                          onClick={() => setSelectedCert(cert)}
                          className="relative w-full aspect-[16/10] bg-black/90 border-b border-zinc-850 overflow-hidden cursor-pointer group/img"
                          title="Click to view full credential"
                        >
                          {imageSrc ? (
                            <div className="relative w-full h-full p-2.5 sm:p-3 flex items-center justify-center">
                              <Image
                                src={imageSrc}
                                alt={cert.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={index < 4}
                                loading={index < 4 ? 'eager' : 'lazy'}
                                className="object-contain filter contrast-105 transition-transform duration-300 group-hover/img:scale-105"
                              />
                              {/* Cyber Scanlines Overlay */}
                              <div className="absolute inset-0 cyber-scanlines opacity-20 pointer-events-none" />
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-[#0a0d18] to-black border-zinc-800 text-center relative">
                              {/* Target reticle corner marks */}
                              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]/40" />
                              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]/40" />
                              <Award className="w-12 h-12 text-[#00f0ff]/60 mb-2 transition-transform group-hover/img:scale-110" />
                              <span className="text-xs font-bold text-white tracking-wide line-clamp-1 px-4">
                                {cert.title}
                              </span>
                              <span className="text-[10px] text-[#00ff9f] tracking-wider mt-1">
                                {cert.issuer}
                              </span>
                            </div>
                          )}

                          {/* Top Badges on Image */}
                          <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
                            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[#00f0ff] bg-black/85 px-1.5 sm:px-2 py-0.5 border border-[#00f0ff]/30 backdrop-blur-sm font-bold">
                              {cert.issueDate}
                            </span>
                            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 bg-black/85 px-1.5 py-0.5 border border-zinc-800 backdrop-blur-sm">
                              {cert.credentialId || 'VERIFIED'}
                            </span>
                          </div>

                          {/* Hover Overlay: Enlarge Credential */}
                          <div className="absolute inset-0 bg-[#07080f]/80 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-20 backdrop-blur-[2px]">
                            <span className="cyber-button text-[11px] sm:text-xs py-1.5 px-3.5 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                              <ZoomIn className="w-3.5 h-3.5 text-[#00f0ff]" />
                              <span>ENLARGE CREDENTIAL</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 sm:p-5">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00ff9f] font-bold mb-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#00ff9f]" />
                            <span className="truncate">{cert.issuer}</span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold font-mono text-white mb-1.5 leading-snug group-hover:text-[#00f0ff] transition-colors line-clamp-1">
                            {cert.title}
                          </h3>

                          {cert.credentialName && (
                            <p className="text-[11px] text-zinc-400 font-mono mb-2.5 line-clamp-1">
                              {cert.credentialName}
                            </p>
                          )}

                          <p className="text-[11px] sm:text-xs text-zinc-300 font-mono leading-relaxed mb-4 line-clamp-3">
                            {cert.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Skills & Action Buttons */}
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-2.5 mb-3.5 border-t border-zinc-800">
                            {cert.skills.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono bg-black/60 border border-zinc-800 text-zinc-300"
                              >
                                {s}
                              </span>
                            ))}
                            {cert.skills.length > 4 && (
                              <span className="px-1 py-0.5 text-[9px] font-mono text-[#00f0ff] font-bold">
                                +{cert.skills.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          {/* Enlarge inspect trigger */}
                          <button
                            type="button"
                            onClick={() => setSelectedCert(cert)}
                            className="flex-1 cyber-button-ghost text-[10px] sm:text-[11px] py-1.5 sm:py-2 text-center justify-center cursor-pointer"
                          >
                            <span>INSPECT</span>
                            <ZoomIn className="w-3 h-3" />
                          </button>

                          {/* External verification URL */}
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 cyber-button text-[10px] sm:text-[11px] py-1.5 sm:py-2 text-center justify-center"
                              title="Verify on issuing authority portal"
                            >
                              <span>VERIFY</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
