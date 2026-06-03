import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const line1Segments = [
    { text: "Production-grade systems built for the modern web.", className: "text-[#E1E0CC] font-normal text-center" }
  ];
  const line2Segments = [
    { text: "Powered by engineering. Guided by design.", className: "text-gray-500 font-normal text-center" }
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
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Top 3 projects to display next to the static video card
  const topProjects = projects.filter(p => ['autoflow', 'ecommerce-agent', 'duality'].includes(p.id));

  return (
    <section id="projects" className="min-h-screen bg-black relative py-24 px-4 md:px-6 overflow-hidden flex flex-col items-center">
      {/* Background Noise Overlay */}
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Header Text */}
        <div className="flex flex-col gap-2 items-center justify-center mb-16 text-center max-w-3xl mx-auto">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle segments={line1Segments} />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle segments={line2Segments} />
          </div>
        </div>

        {/* 4-Column Card Grid (1 Video placeholder + 3 Projects) */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 lg:gap-2 lg:h-[480px] w-full"
        >
          {/* Card 1: Static Video Card */}
          <motion.div
            variants={cardVariants}
            data-cursor="play"
            className="relative rounded-2xl md:rounded-[2rem] overflow-hidden w-full h-full min-h-[300px] lg:min-h-0 flex flex-col justify-end p-6 sm:p-8 bg-neutral-950 border border-neutral-900"
          >
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0 pointer-events-none z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
            
            <div className="relative z-20 text-left">
              <span className="text-[#E1E0CC] font-normal text-xl sm:text-2xl tracking-tight leading-tight block">
                Your creative canvas.
              </span>
            </div>
          </motion.div>

          {/* Cards 2, 3, 4: Featured Projects */}
          {topProjects.map(project => (
            <ProjectCard key={project.id} project={project} variants={cardVariants} />
          ))}
        </motion.div>

        {/* Links to projects page */}
        <div className="mt-16">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[#E1E0CC] hover:text-primary transition-colors text-lg group">
            View all projects 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
