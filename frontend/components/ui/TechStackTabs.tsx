'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { techStackQuery, techCategoriesQuery } from '@/lib/sanity/queries';
import { resolveImageUrl } from '@/lib/sanity/image';
import type { TechStackItem } from '@/lib/types';

const defaultTabs: { key: string; label: string; activeClass: string }[] = [
  { key: 'all', label: '[ALL]', activeClass: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
  { key: 'ai', label: '[AI_ENGINEERING]', activeClass: 'bg-[#ff007f] text-white border-[#ff007f]' },
  { key: 'frontend', label: '[FRONTEND]', activeClass: 'bg-[#00ff9f] text-black border-[#00ff9f]' },
  { key: 'backend', label: '[BACKEND]', activeClass: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
  { key: 'devops', label: '[DEV-OPS]', activeClass: 'bg-[#a855f7] text-white border-[#a855f7]' },
  { key: 'digital-marketing', label: '[MARKETING]', activeClass: 'bg-[#ffe600] text-black border-[#ffe600]' },
  { key: 'others', label: '[SYSTEMS]', activeClass: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
];

export function TechStackTabs() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [techItems, setTechItems] = useState<TechStackItem[]>([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [itemsPerRow, setItemsPerRow] = useState(8);
  const [tabs, setTabs] = useState(defaultTabs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTech() {
      try {
        const [data, categoriesData] = await Promise.all([
          client.fetch(techStackQuery),
          client.fetch(techCategoriesQuery),
        ]);
        if (data && data.length > 0) {
          setTechItems(data);
        }
        if (categoriesData && categoriesData.length > 0) {
          const colorCycles = [
            'bg-[#ff007f] text-white border-[#ff007f]',
            'bg-[#00ff9f] text-black border-[#00ff9f]',
            'bg-[#00f0ff] text-black border-[#00f0ff]',
            'bg-[#ff007f] text-white border-[#ff007f]',
            'bg-[#00ff9f] text-black border-[#00ff9f]',
            'bg-[#00f0ff] text-black border-[#00f0ff]',
          ];
          const dynamicTabs = [
            { key: 'all', label: '[ALL]', activeClass: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
            ...categoriesData.map((cat: { key: string; title: string }, i: number) => ({
              key: cat.key,
              label: cat.title.startsWith('[') ? cat.title : `[${cat.title.toUpperCase().replace(/\s+/g, '_')}]`,
              activeClass: colorCycles[i % colorCycles.length],
            })),
          ];
          setTabs(dynamicTabs);
        }
      } catch (err) {
        console.error('Failed to load tech stack from Sanity:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTech();
  }, []);

  // Dynamically detect column count based on viewport width matching Tailwind grid
  useEffect(() => {
    function updateItemsPerRow() {
      if (window.innerWidth >= 1280) {
        setItemsPerRow(8);
      } else if (window.innerWidth >= 1024) {
        setItemsPerRow(6);
      } else if (window.innerWidth >= 768) {
        setItemsPerRow(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerRow(3);
      } else {
        setItemsPerRow(2);
      }
    }

    updateItemsPerRow();
    window.addEventListener('resize', updateItemsPerRow);
    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setVisibleRows(2);
  };

  const filteredTechStack = activeTab === 'all'
    ? techItems
    : techItems.filter((item) => item.category === activeTab);

  const maxInitialItems = itemsPerRow * 2;
  const isExpandable = filteredTechStack.length > maxInitialItems;
  const currentLimit = visibleRows * itemsPerRow;
  const isAllShown = currentLimit >= filteredTechStack.length;

  const displayedTechStack = isExpandable
    ? filteredTechStack.slice(0, currentLimit)
    : filteredTechStack;

  const handleToggleRows = () => {
    if (isAllShown) {
      setVisibleRows(2);
      const el = document.getElementById('tech-matrix');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setVisibleRows((prev) => prev + 2);
    }
  };

  return (
    <section id="tech-matrix" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative bg-[#07080f] border-t border-zinc-900 cyber-grid overflow-hidden">
      {/* Ambient Cyber Light */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span>CAPABILITIES</span>
            <span>::</span>
            <span className="text-[#ff007f]">CORE_ARSENAL</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-zinc-850 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight uppercase">
              TECH <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5">MATRIX</span>
            </h2>
            <div className="text-[11px] sm:text-xs font-mono text-[#00f0ff]">
              FRAMEWORKS &amp; APIS [{displayedTechStack.length} / {filteredTechStack.length}]
            </div>
          </div>
        </div>

        {/* HUD Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mb-6 sm:mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-2 py-0.5 min-[380px]:px-2.5 min-[380px]:py-1 sm:px-3 sm:py-1.5 text-[9px] min-[380px]:text-[10px] sm:text-xs font-mono tracking-wider border font-bold transition-all cursor-pointer ${
                  isActive
                    ? `${tab.activeClass} shadow-[0_0_15px_rgba(0,240,255,0.3)]`
                    : 'border-zinc-800 bg-[#0c0e1a] text-zinc-400 hover:text-white hover:border-zinc-600'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 min-[380px]:gap-2.5 sm:gap-3.5 md:gap-4">
            {Array.from({ length: 16 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-square flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-[#0a0d18]/80 border border-zinc-800/80 hud-corner-tl hud-corner-br animate-pulse"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-850/80 rounded-sm mb-2 border border-zinc-800/80" />
                <div className="h-2 w-12 bg-zinc-800/80 rounded-sm" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 min-[380px]:gap-2.5 sm:gap-3.5 md:gap-4"
          >
            <AnimatePresence>
              {displayedTechStack.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && filteredTechStack.length === 0 && (
          <div className="text-center py-16 border border-zinc-850 bg-[#0c0e1a] font-mono text-xs text-zinc-400">
            [NO_TECHNOLOGIES_FOUND_IN_THIS_CATEGORY]
          </div>
        )}

        {/* Show More / Show Less Button */}
        {isExpandable && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleToggleRows}
              className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-[#0a0d18] border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase hover:bg-[#00f0ff] hover:text-black transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] cursor-pointer"
            >
              <span>{isAllShown ? 'SHOW LESS' : 'SHOW MORE'}</span>
              {isAllShown ? (
                <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

interface TechCardProps {
  tech: TechStackItem;
  index: number;
}

function TechCard({ tech, index }: TechCardProps) {
  const logoSrc = resolveImageUrl(tech.iconImage, tech.logo) || tech.logo;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: (index % 12) * 0.02, duration: 0.25 }}
      className="group relative flex flex-col items-center justify-between p-2 min-[380px]:p-2.5 sm:p-3.5 md:p-4 bg-[#0a0d18] border border-zinc-800 hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-200 hud-corner-tl"
    >
      <div className="w-8 h-8 min-[380px]:w-10 min-[380px]:h-10 sm:w-12 sm:h-12 flex items-center justify-center p-1 sm:p-2 bg-black border border-zinc-800 group-hover:border-[#00f0ff]/50 transition-colors mb-1.5 sm:mb-3">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={tech.name}
            width={32}
            height={32}
            loading="lazy"
            style={{ width: 'auto', height: 'auto' }}
            className="w-5 h-5 min-[380px]:w-6 min-[380px]:h-6 sm:w-8 sm:h-8 object-contain transition-all duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="font-mono font-bold text-[#00f0ff] text-xs sm:text-sm">{tech.name.charAt(0)}</span>
        )}
      </div>

      <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-mono text-zinc-300 group-hover:text-white text-center leading-tight transition-colors line-clamp-1">
        {tech.name}
      </span>
    </motion.div>
  );
}
