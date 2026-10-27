'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '@/lib/sanity/client';
import { projectsQuery, projectCategoriesQuery } from '@/lib/sanity/queries';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectModal } from '@/components/ui/ProjectModal';
import type { Project } from '@/lib/types';

const initialTabs: { key: string; label: string; activeColor: string }[] = [
  { key: 'all', label: '[ALL_SYSTEMS]', activeColor: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
];

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tabs, setTabs] = useState(initialTabs);

  useEffect(() => {
    async function loadProjects() {
      try {
        const [sanityData, categoriesData] = await Promise.all([
          client.fetch(projectsQuery),
          client.fetch(projectCategoriesQuery),
        ]);
        if (sanityData && sanityData.length > 0) {
          setProjectsList(sanityData);
        }
        if (categoriesData && categoriesData.length > 0) {
          const colorCycles = [
            'bg-[#ff007f] text-white border-[#ff007f]',
            'bg-[#00f0ff] text-black border-[#00f0ff]',
            'bg-[#00ff9f] text-black border-[#00ff9f]',
          ];
          const dynamicTabs = [
            { key: 'all', label: '[ALL_SYSTEMS]', activeColor: 'bg-[#00f0ff] text-black border-[#00f0ff]' },
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

  const filtered = projectsList.filter((p) => {
    const matchesTab = activeTab === 'all' || p.categories?.includes(activeTab);
    const matchesQuery =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#07080f] text-white pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 xl:px-16 cyber-grid relative overflow-hidden">
      {/* Ambient Cyber Neon Backlights */}
      <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-[#ff007f]/10 rounded-full blur-[140px] pointer-events-none" />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

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
            <span className="text-[#ff007f] font-bold">[PROJECT_ARCHIVE]</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[9px] sm:text-[11px] font-mono text-[#00f0ff] mb-2 sm:mb-3 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>DEPLOYED_REPOSITORIES &amp; ARCHITECTURES</span>
            </div>
            <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-mono font-extrabold tracking-tight uppercase">
              <span className="text-white">PROJECT </span>
              <span className="text-[#00f0ff] border-b-2 border-[#00f0ff] pb-0.5 sm:pb-1">
                SHOWCASE
              </span>
            </h1>
          </div>

          <div className="text-[11px] sm:text-xs font-mono text-zinc-400 text-left sm:text-right">
            <div>TOTAL REPOSITORIES: <strong className="text-white">{projectsList.length}</strong></div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-zinc-850">
          {/* Tabs */}
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
              placeholder="SEARCH_PROJECTS..."
              className="w-full bg-[#0c0e1a] border border-zinc-800 pl-9 pr-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
            />
          </div>
        </div>

        {/* Counter */}
        <div className="text-[11px] sm:text-xs font-mono text-zinc-400 mb-5 sm:mb-6 flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="text-[#00f0ff] font-bold">[SYNCING_STUDIO_REPOSITORIES...]</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-[#00f0ff]" />
              <span>DISPLAYING {filtered.length} OF {projectsList.length} PROJECTS</span>
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
                <div className="w-full aspect-video bg-zinc-900/80 border-b border-zinc-850" />
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-4 w-3/4 bg-zinc-800" />
                  <div className="h-3 w-full bg-zinc-850" />
                  <div className="h-3 w-4/5 bg-zinc-850" />
                </div>
                <div className="p-4 sm:p-5 pt-0 flex gap-2">
                  <div className="h-8 flex-1 bg-zinc-850/80 border border-zinc-800" />
                  <div className="h-8 flex-1 bg-zinc-850/80 border border-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center border border-zinc-800 bg-[#0c0e1a]">
            <div className="text-zinc-400 font-mono text-sm">[NO_MATCHING_REPOSITORIES_FOUND]</div>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 border border-[#00f0ff] text-xs font-mono text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors"
            >
              RESET_FILTERS
            </button>
          </div>
        ) : (
          /* Projects Grid */
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project._id || project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
