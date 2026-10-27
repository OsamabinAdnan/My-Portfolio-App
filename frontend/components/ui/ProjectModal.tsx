'use client';

import { useState } from 'react';
import { X, ExternalLink, ArrowRight, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/types';
import { resolveImageUrl } from '@/lib/sanity/image';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const previewImage =
    resolveImageUrl(project.mockupImage, project.mockupImageUrl) ||
    resolveImageUrl(project.image, project.imageUrl);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        style={{ zIndex: 9999 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          className="relative bg-[#090b16] border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col w-full max-h-[82vh] max-w-5xl overflow-hidden font-mono hud-corner-tl hud-corner-br"
          initial={{ scale: 0.96, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 15, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3.5 bg-[#05060d] border-b border-zinc-800">
            <div className="flex items-center gap-2 truncate pr-4">
              <Terminal className="w-4 h-4 text-[#00f0ff] shrink-0" />
              <span className="text-xs text-[#00f0ff] tracking-widest uppercase font-bold">
                [PROJECT_SPEC]
              </span>
              <span className="text-zinc-600">//</span>
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border border-zinc-800 hover:border-[#ff007f] text-zinc-400 hover:text-[#ff007f] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col lg:flex-row min-h-full">
              {/* Image Preview Container */}
              <div className="w-full lg:w-3/5 bg-black/60 relative flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-zinc-850">
                {!isLoaded && previewImage && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin" />
                  </div>
                )}
                {previewImage ? (
                  <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px]">
                    <Image
                      src={previewImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className={`object-contain transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority
                      loading="eager"
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-zinc-600 text-xs font-mono">
                    [NO_PREVIEW_AVAILABLE]
                  </div>
                )}
              </div>

              {/* Details Column */}
              <div className="w-full lg:w-2/5 flex flex-col justify-between p-6 bg-[#090b16]">
                <div>
                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-6 whitespace-pre-line">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="text-[10px] text-[#00f0ff] uppercase tracking-widest mb-2 font-bold">
                      // STACK ARCHITECTURE
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-[10px] bg-black text-zinc-300 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2.5">
                  {project.deploymentUrl && (
                    <a
                      href={project.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button w-full"
                    >
                      <span>LAUNCH APPLICATION</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <Link
                    href="/projects"
                    onClick={onClose}
                    className="cyber-button-ghost w-full text-center"
                  >
                    <span>VIEW ALL IN ARCHIVE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
