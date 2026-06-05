import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const nameSegments = [
    { text: "Parth Bansal.", className: "font-light text-[#E1E0CC] tracking-tight" },
  ];

  // Parallax Card Mechanics
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const glowLeft = useTransform(x, [0, 1], ["-20%", "120%"]);
  const glowTop = useTransform(y, [0, 1], ["-20%", "120%"]);

  const tiltSpringConfig = { damping: 28, stiffness: 140 };
  const rotateX = useSpring(useTransform(y, [0, 1], [3, -3]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-3, 3]), tiltSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 70, damping: 18 }
    }
  };

  return (
    <section
      id="our-story"
      className="bg-black py-24 md:py-36 px-4 md:px-6 border-t border-neutral-900/40 flex justify-center items-center relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="bg-noise opacity-[0.12] pointer-events-none absolute inset-0 z-0" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-primary/[0.025] blur-[130px] pointer-events-none z-0 rounded-full" />

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center relative z-10"
      >

        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col text-left">

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight font-light text-[#E1E0CC]">
              <WordsPullUpMultiStyle segments={nameSegments} className="!justify-start" />
            </h2>
          </motion.div>

          {/* Designation */}
          <motion.div variants={itemVariants} className="mt-4 sm:mt-5">
            <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-neutral-400">
              Full-Stack AI Engineer{' '}
              <span className="font-serif italic text-primary">& Designer.</span>
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="mt-10 mb-8 h-px bg-neutral-900 w-full"
          />

          {/* Quote */}
          <motion.div variants={itemVariants}>
            <blockquote className="text-base sm:text-lg md:text-xl font-light text-neutral-400 leading-relaxed max-w-xl">
              <span className="font-serif italic text-primary/70 text-2xl leading-none align-text-top mr-1">"</span>
              The most profound technologies are those that disappear.{' '}
              <em className="font-serif text-neutral-300 not-italic">
                They weave themselves into the fabric of everyday life.
              </em>
              <span className="font-serif italic text-primary/70 text-2xl leading-none align-text-bottom ml-1">"</span>
            </blockquote>
            <p className="mt-3 text-xs font-mono text-neutral-600 uppercase tracking-widest">
              — Mark Weiser
            </p>
          </motion.div>

        </div>

        {/* Right Column — 3D Bio Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 w-full"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex flex-col gap-8 text-left p-8 sm:p-10 rounded-[2rem] border border-neutral-900/50 hover:border-neutral-800/70 bg-neutral-950/50 backdrop-blur-sm transition-colors duration-500 overflow-hidden w-full"
          >
            {/* Mouse Spotlight */}
            <motion.div
              style={{ left: glowLeft, top: glowTop, x: '-50%', y: '-50%' }}
              className="absolute w-[350px] h-[350px] rounded-full bg-primary/[0.05] blur-[70px] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* Grain */}
            <div className="absolute inset-0 bg-noise opacity-[0.2] pointer-events-none mix-blend-overlay z-0 rounded-[2rem]" />

            {/* Content */}
            <div className="relative z-10" style={{ transform: 'translateZ(18px)' }}>

              {/* Bio */}
              <p className="text-neutral-400 text-sm sm:text-[0.95rem] leading-[1.8] font-light">
                I specialize in full-stack engineering and agentic AI systems. From architecting Docker-sandboxed execution platforms to building LLM-powered commerce intelligence systems, I craft digital artifacts with technical precision and design-forward aesthetics.
              </p>

              {/* Metadata */}
              <div className="mt-8 pt-7 border-t border-neutral-900/50 grid grid-cols-2 gap-x-6 gap-y-5">

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                    Focus Areas
                  </span>
                  <span className="text-[#E1E0CC] text-sm font-light leading-snug">
                    Agent Architectures & Real-Time Engines
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                    Specialization
                  </span>
                  <span className="text-[#E1E0CC] text-sm font-light leading-snug">
                    Full-Stack & Agentic AI
                  </span>
                </div>

              </div>
            </div>

          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
