import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import ProjectCard from './ProjectCard';
import GradientCard from './GradientCard';
import { projects } from '../data/projects';

export default function Features() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  const line1Segments = [
    { text: "Production-grade systems", className: "font-serif italic text-primary" },
    { text: " built for the ", className: "font-sans font-light text-[#E1E0CC] mx-1.5 sm:mx-2" },
    { text: "modern\u00A0web.", className: "font-serif italic text-primary" }
  ];
  const line2Segments = [
    { text: "Powered by", className: "font-sans font-light text-neutral-400" },
    { text: "engineering.", className: "font-serif italic text-primary/80 ml-1.5 sm:ml-2" },
    { text: "Guided by", className: "font-sans font-light text-neutral-400 ml-1.5 sm:ml-2" },
    { text: "design.", className: "font-serif italic text-primary/80 ml-1.5 sm:ml-2" }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: (custom: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: custom * 0.15,
      },
    }),
  };

  return (
    <section id="projects" className="min-h-screen bg-black relative pt-12 pb-24 px-4 md:px-6 overflow-hidden flex flex-col items-center">
      {/* Background Noise Overlay */}
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Header Text */}
        <div className="flex flex-col gap-2 items-center justify-center mb-24 text-center max-w-none w-full mx-auto">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight tracking-tight">
            <WordsPullUpMultiStyle segments={line1Segments} />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight tracking-tight">
            <WordsPullUpMultiStyle segments={line2Segments} />
          </div>
        </div>

        {/* Grid (1 Animated card + All Projects) */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 lg:gap-2 w-full"
        >
          {/* Card 1: Grain Gradient Card with 3D Tilt */}
          <GradientCard variants={cardVariants} layout />

          {/* Cards: Projects */}
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const isNew = showAll && index >= 3;
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  variants={cardVariants} 
                  initial={isNew ? "hidden" : undefined}
                  animate={isNew ? "visible" : undefined}
                  exit="hidden"
                  layout
                  custom={isNew ? index - 3 : 0}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {!showAll && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <button 
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#DEDBC8]/20 text-[#E1E0CC] hover:bg-[#DEDBC8] hover:text-black transition-all duration-300 font-mono text-xs sm:text-sm tracking-widest uppercase hover:scale-105"
            >
              View all projects 
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
