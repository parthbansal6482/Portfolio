import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { Github } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  variants?: Variants;
  initial?: any;
  animate?: any;
  exit?: any;
  layout?: boolean;
  custom?: number;
}

export default function ProjectCard({ project, variants, initial, animate, exit, layout, custom }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      layout={layout}
      custom={custom}
      ref={ref}
      className="relative w-full h-full min-h-[340px] lg:min-h-[400px] [perspective:1000px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsHovered(true)}
      onBlur={handleMouseLeave}
      tabIndex={0}
    >
      {/* Tilt Container (Inside Perspective) */}
      <motion.div
        className="w-full h-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        {/* Flip Container */}
        <motion.div
          className="w-full h-full relative [transform-style:preserve-3d]"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-end p-6 sm:p-8 bg-neutral-950 border border-neutral-900 group-hover:border-neutral-700/80 transition-colors duration-300"
          style={{ pointerEvents: isHovered ? 'none' : 'auto' }}
        >
          {/* Background Video */}
          <video
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0 pointer-events-none z-0"
          />
          
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-85" />
          
          {/* Card Content */}
          <div className="relative z-20 text-left flex flex-col h-full justify-end">
            <div>
              <span className="text-[#E1E0CC] font-normal text-xl sm:text-2xl tracking-tight leading-tight block">
                {project.title}
              </span>
              <span className="text-primary text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                View details &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col p-6 sm:p-8 bg-[#0a0a0a] border border-neutral-800"
          style={{ transform: 'rotateY(180deg)', pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-[#E1E0CC] font-normal text-2xl sm:text-3xl tracking-tight mb-4">{project.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Logos just below description */}
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                {project.skills.map(skill => (
                  <img 
                    key={skill.name} 
                    src={skill.iconUrl} 
                    alt={skill.name} 
                    title={skill.name}
                    className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end items-end">
              {/* GitHub Button on Bottom Right */}
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-primary text-black hover:bg-[#E1E0CC] transition-colors duration-300 font-medium text-xs sm:text-sm whitespace-nowrap"
                data-cursor="pointer"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
