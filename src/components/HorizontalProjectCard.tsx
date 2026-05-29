import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Github } from 'lucide-react';
import type { Project } from '../data/projects';

interface HorizontalProjectCardProps {
  project: Project;
  index: number;
}

export default function HorizontalProjectCard({ project, index }: HorizontalProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll target for video parallax
  const { scrollYProgress: cardScrollY } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to subtle vertical translation of video
  const videoY = useTransform(cardScrollY, [0, 1], ["-10%", "10%"]);

  // Motion values to map mouse coordinates
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map mouse coordinates to background radial spotlight position
  const glowLeft = useTransform(x, [0, 1], ["-10%", "110%"]);
  const glowTop = useTransform(y, [0, 1], ["-10%", "110%"]);

  // Springs for smooth tilt transitions back and forth
  const tiltSpringConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), tiltSpringConfig);

  // Capture mouse move to determine tilt angle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from 0 to 1
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  // Reset card tilt to flat when mouse leaves
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // Parent animation variables for scroll reveals
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 60, 
        damping: 18,
        delay: index * 0.1,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Staggered reveals for internal items
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="perspective-1000 w-full mb-6">
      <motion.div
        ref={cardRef}
        id={project.id}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        whileHover={{ scale: 1.012, y: -4 }}
        className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-neutral-800/80 transition-colors duration-500 w-full min-h-[320px] relative group"
      >
        {/* Spotlight Glow Tracker across the whole card */}
        <motion.div
          style={{
            left: glowLeft,
            top: glowTop,
            x: '-50%',
            y: '-50%',
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* Left Column: Video Block */}
        <div 
          style={{ transform: 'translateZ(10px)' }}
          className="w-full md:w-[38%] relative aspect-video md:aspect-auto min-h-[220px] md:min-h-0 border-b md:border-b-0 md:border-r border-neutral-900 overflow-hidden z-20"
        >
          <motion.video
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ y: videoY }}
            className="w-full h-[120%] object-cover absolute top-[-10%] left-0 pointer-events-none z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/35 to-transparent pointer-events-none z-10" />
        </div>

        {/* Right Column: Project Details (with layered 3D depth) */}
        <div className="w-full md:w-[62%] p-6 sm:p-8 flex flex-col justify-between relative min-h-[260px] md:min-h-0 overflow-hidden z-20">
          <div className="relative z-10">
            {/* Index & Header Label */}
            <motion.div
              variants={itemVariants}
              style={{ transform: 'translateZ(15px)' }}
              className="flex items-center gap-3 mb-3 select-none transform-gpu"
            >
              <span className="font-serif italic text-primary text-2xl sm:text-3xl">0{index + 1}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <div className="relative mb-4 w-fit">
              <motion.h2 
                variants={itemVariants}
                style={{ transform: 'translateZ(30px)' }}
                className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#E1E0CC] group-hover:text-primary transition-colors duration-300 transform-gpu font-sans tracking-tight"
              >
                {project.title}
              </motion.h2>
              <div className="h-[1px] w-0 group-hover:w-20 bg-primary/30 transition-all duration-550 ease-out mt-1.5" />
            </div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              style={{ transform: 'translateZ(20px)' }}
              className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed mb-6 max-w-xl transform-gpu font-sans text-pretty"
            >
              {project.description}
            </motion.p>

            {/* Tech Stack Skill Badges */}
            <motion.div 
              variants={itemVariants}
              style={{ transform: 'translateZ(10px)' }}
              className="flex flex-wrap gap-2 mb-16 md:mb-0 transform-gpu"
            >
              {project.skills.map((skill, sIndex) => (
                <div 
                  key={sIndex}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900/40 border border-neutral-900 text-[9px] sm:text-[10px] text-neutral-300 select-none font-mono tracking-wider uppercase transition-all duration-300 group-hover:border-neutral-800 group-hover:bg-neutral-900/80 group-hover:text-primary"
                >
                  <img 
                    src={skill.iconUrl} 
                    alt={skill.name}
                    className="w-3.5 h-3.5 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            style={{ transform: 'translateZ(25px)' }}
            className="flex gap-3 absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 transform-gpu"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-[#E1E0CC] hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
