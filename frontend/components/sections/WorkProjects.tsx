'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Terminal, ArrowRight } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { projectsQuery, projectCategoriesQuery } from '@/lib/sanity/queries';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectModal } from '@/components/ui/ProjectModal';
import type { Project } from '@/lib/types';

const HOMEPAGE_LIMIT = 6;

const initialTabs: { key: string; label: string; activeColor: string }[] = [
  { key: 'all', label: '[ALL]', activeColor: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
];

export function WorkProjects() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tabs, setTabs] = useState(initialTabs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const [data, categoriesData] = await Promise.all([
          client.fetch(projectsQuery),
          client.fetch(projectCategoriesQuery),
        ]);
        if (data && data.length > 0) {
          setProjectsList(data);
        }
        if (categoriesData && categoriesData.length > 0) {
          const colorCycles = [
            'bg-[#ff007f] text-white border-[#ff007f]',
            'bg-[#00f0ff] text-black border-[#00f0ff]',
            'bg-[#00ff9f] text-black border-[#00ff9f]',
          ];
          const dynamicTabs = [
            { key: 'all', label: '[ALL]', activeColor: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
            ...categoriesData.map((cat: { key: string; title: string }, i: number) => ({
              key: cat.key,
              label: cat.title.startsWith('[') ? cat.title : `[${cat.title.toUpperCase().replace(/\s+/g, '_')}]`,
              activeColor: colorCycles[i % colorCycles.length],
            })),
          ];
          setTabs(dynamicTabs);
        }
      } catch (err) {
        console.error('Failed to load projects from Sanity:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Only show projects marked as "Featured on Homepage" in Sanity Studio
  const featuredProjects = projectsList
    .filter((p) => {
      if (typeof p.featured === 'boolean') {
        return p.featured === true;
      }
      return true;
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const filtered = activeTab === 'all'
    ? featuredProjects
    : featuredProjects.filter((p) => p.categories?.includes(activeTab));

  const displayProjects = filtered.slice(0, HOMEPAGE_LIMIT);

  return (
    <>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <section
        id="work"
        className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative bg-[#07080f] border-t border-zinc-900 cyber-grid overflow-hidden"
      >
        {/* Ambient Backlight */}
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 pb-3 sm:pb-4 border-b border-zinc-850">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <span>PROJECT_ARCHIVE</span>
                <span>::</span>
                <span className="text-[#ff007f]">FEATURED_BUILDS</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-white tracking-tight uppercase">
                FEATURED <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5">PROJECTS</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-mono tracking-wider border font-bold transition-all cursor-pointer ${
                      isActive
                        ? `${tab.activeColor} shadow-[0_0_15px_rgba(0,240,255,0.3)]`
                        : 'border-zinc-800 bg-[#0c0e1a] text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}

              {isLoading && (
                <div className="h-[27px] sm:h-[31px] w-20 bg-[#0c0e1a] border border-zinc-800 animate-pulse" />
              )}
            </div>
          </div>

          {/* Project Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="hud-box border border-zinc-800 bg-[#0a0d18]/80 flex flex-col justify-between animate-pulse overflow-hidden hud-corner-tl hud-corner-br"
                >
                  <div className="w-full aspect-video bg-zinc-900/90 border-b border-zinc-850 relative">
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00f0ff]/40" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00f0ff]/40" />
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-1/2 bg-zinc-800" />
                      <div className="h-3 w-16 bg-[#ff007f]/20" />
                    </div>
                    <div className="h-3 w-full bg-zinc-850" />
                    <div className="h-3 w-4/5 bg-zinc-850" />
                    <div className="flex gap-1.5 pt-2">
                      <div className="h-4 w-14 bg-[#00f0ff]/10 border border-[#00f0ff]/20" />
                      <div className="h-4 w-14 bg-[#00f0ff]/10 border border-[#00f0ff]/20" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 pt-0 flex gap-2">
                    <div className="h-8 flex-1 bg-zinc-850/80 border border-zinc-800" />
                    <div className="h-8 flex-1 bg-zinc-850/80 border border-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
              >
                {displayProjects.length > 0 ? (
                  displayProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id || project.id}
                      project={project}
                      index={index}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center border border-zinc-850 bg-[#0a0d18]/60 font-mono text-zinc-500 text-sm">
                    // NO_FEATURED_PROJECTS_FOUND_IN_THIS_CATEGORY
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Explore All Callout Strip */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-[11px] sm:text-xs font-mono text-zinc-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00f0ff]" />
              <span>SHOWING {displayProjects.length} OF {projectsList.length}</span>
            </div>

            <Link
              href="/projects"
              className="swipe-button group w-full sm:w-auto text-center"
            >
              <span>ACCESS FULL ARCHIVE [{projectsList.length}]</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
