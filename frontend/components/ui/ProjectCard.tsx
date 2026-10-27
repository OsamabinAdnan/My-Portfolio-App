'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project, ProjectCategory } from '@/lib/types';
import { resolveImageUrl } from '@/lib/sanity/image';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

const categoryStyles: Record<ProjectCategory, { label: string; badgeClass: string }> = {
  frontend: {
    label: '[FRONTEND]',
    badgeClass: 'bg-[#00ff9f]/10 text-[#00ff9f] border-[#00ff9f]/40 shadow-[0_0_10px_rgba(0,255,159,0.15)]',
  },
  fullstack: {
    label: '[FULLSTACK]',
    badgeClass: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]',
  },
  ai: {
    label: '[AI_AGENT]',
    badgeClass: 'bg-[#ff007f]/10 text-[#ff007f] border-[#ff007f]/40 shadow-[0_0_10px_rgba(255,0,127,0.15)]',
  },
};

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const displayImage = resolveImageUrl(project.image, project.imageUrl);
  const hasImage = Boolean(displayImage && displayImage.length > 0);
  const primaryCat = project.categories[0] || 'frontend';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
      onClick={onClick}
      className="group relative hud-box border border-zinc-800 bg-[#0a0d18]/90 hover:border-[#00f0ff]/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] flex flex-col justify-between overflow-hidden cursor-pointer hud-corner-tl hud-corner-br transition-all duration-300"
    >
      {/* Top Media Container */}
      <div className="aspect-video relative overflow-hidden bg-black border-b border-zinc-850">
        {!isLoaded && hasImage && (
          <div className="absolute inset-0 bg-[#0b0e1a] animate-pulse flex items-center justify-center z-0">
            <div className="w-6 h-6 border-2 border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin" />
          </div>
        )}

        {hasImage ? (
          <Image
            src={displayImage!}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 4}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`object-cover object-top filter contrast-105 transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-85 group-hover:opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-950 font-mono text-[#00f0ff]/40 text-3xl font-bold">
            {String(index + 1).padStart(2, '0')}
          </div>
        )}

        {/* Cyberpunk Scanline Texture */}
        <div className="absolute inset-0 cyber-scanlines opacity-40 pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 sm:top-2.5 sm:left-2.5 sm:right-2.5 z-10 flex items-center justify-between gap-1.5">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00f0ff] bg-black/85 px-1.5 sm:px-2 py-0.5 border border-[#00f0ff]/30 backdrop-blur-sm shrink-0">
            #{String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex flex-wrap justify-end gap-1 sm:gap-1.5">
            {project.categories.map((cat) => {
              const style = categoryStyles[cat] || {
                label: `[${cat.toUpperCase()}]`,
                badgeClass: 'bg-zinc-900 text-zinc-300 border-zinc-700',
              };

              return (
                <span
                  key={cat}
                  className={`text-[8px] sm:text-[9px] font-mono tracking-wider px-1.5 sm:px-2 py-0.5 border backdrop-blur-sm font-semibold ${style.badgeClass}`}
                >
                  {style.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-[#07080f]/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 backdrop-blur-[2px]">
          <span className="cyber-button text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 shadow-[0_0_25px_rgba(0,240,255,0.5)]">
            <span>INSPECT SPEC</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
            <h3 className="text-sm sm:text-base font-bold font-mono text-white tracking-tight group-hover:text-[#00f0ff] transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.deploymentUrl && (
              <a
                href={project.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 hover:text-[#00f0ff] transition-colors p-1"
                title="Launch Live Application"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <p className="text-[11px] sm:text-xs text-zinc-400 font-mono line-clamp-2 leading-relaxed mb-3 sm:mb-4">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-2.5 sm:pt-3 border-t border-zinc-800">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono bg-black/70 text-zinc-300 border border-zinc-800 group-hover:border-zinc-700 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-[#00f0ff]/70 font-bold">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
