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
    <div className="perspective-1000 w-full mb-12">
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
        className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-neutral-800/80 transition-colors duration-500 w-full min-h-[320px] relative group"
      >
        {/* Left Column: Video Block */}
        <div 
          style={{ transform: 'translateZ(10px)' }}
          className="w-full md:w-[38%] relative aspect-video md:aspect-auto min-h-[220px] md:min-h-0 border-b md:border-b-0 md:border-r border-neutral-900 overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/30 to-transparent pointer-events-none z-10" />
        </div>

        {/* Right Column: Project Details (with layered 3D depth) */}
        <div className="w-full md:w-[62%] p-6 sm:p-8 flex flex-col justify-between relative min-h-[260px] md:min-h-0 overflow-visible">
          <div>
            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              style={{ transform: 'translateZ(30px)' }}
              className="text-2xl sm:text-3xl font-normal text-[#E1E0CC] mb-3 group-hover:text-primary transition-colors duration-300 transform-gpu"
            >
              {project.title}
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              style={{ transform: 'translateZ(15px)' }}
              className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl transform-gpu"
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
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 text-[10px] sm:text-xs text-[#E1E0CC] select-none"
                >
                  <img 
                    src={skill.iconUrl} 
                    alt={skill.name}
                    className="w-3.5 h-3.5 object-contain"
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-805 text-[#E1E0CC] hover:bg-neutral-800 hover:border-neutral-700 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105"
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
