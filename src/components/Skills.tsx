import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

interface SkillItem {
  name: string;
  iconUrl: string;
}

interface SkillCategory {
  title: string;
  index: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    index: "01",
    skills: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/DEDBC8" },
      { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/DEDBC8" },
      { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/DEDBC8" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/DEDBC8" },
      { name: "Vite", iconUrl: "https://cdn.simpleicons.org/vite/DEDBC8" },
    ]
  },
  {
    title: "Backend & Systems",
    index: "02",
    skills: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/DEDBC8" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/DEDBC8" },
      { name: "FastAPI", iconUrl: "https://cdn.simpleicons.org/fastapi/DEDBC8" },
      { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/DEDBC8" },
      { name: "Supabase", iconUrl: "https://cdn.simpleicons.org/supabase/DEDBC8" },
    ]
  },
  {
    title: "Agentic AI & ML",
    index: "03",
    skills: [
      { name: "Google Gemini", iconUrl: "https://cdn.simpleicons.org/googlegemini/DEDBC8" },
      { name: "Anthropic Claude", iconUrl: "https://cdn.simpleicons.org/anthropic/DEDBC8" },
      { name: "Qdrant", iconUrl: "https://cdn.simpleicons.org/qdrant/DEDBC8" },
    ]
  },
  {
    title: "Data & Infrastructure",
    index: "04",
    skills: [
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/DEDBC8" },
      { name: "Redis", iconUrl: "https://cdn.simpleicons.org/redis/DEDBC8" },
      { name: "Prisma", iconUrl: "https://cdn.simpleicons.org/prisma/DEDBC8" },
      { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/DEDBC8" },
      { name: "Socket.io", iconUrl: "https://cdn.simpleicons.org/socketdotio/DEDBC8" },
    ]
  }
];

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
  isInView: boolean;
  columnVariants: Variants;
  skillVariants: Variants;
}

function SkillCategoryCard({ category, index, isInView, columnVariants, skillVariants }: SkillCategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to map mouse coordinates
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map mouse coordinates to background radial spotlight position
  const glowLeft = useTransform(x, [0, 1], ["-10%", "110%"]);
  const glowTop = useTransform(y, [0, 1], ["-10%", "110%"]);

  // Springs for smooth tilt transitions back and forth
  const tiltSpringConfig = { damping: 20, stiffness: 200 };
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

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        custom={index}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={columnVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.012, y: -4 }}
        className="flex flex-col text-left group/column relative p-6 sm:p-8 rounded-[2rem] border border-neutral-900 hover:border-neutral-800/80 bg-neutral-950/40 hover:bg-neutral-950 transition-colors duration-300 w-full h-full select-none overflow-hidden"
      >
        {/* Spotlight Glow Tracker across the card */}
        <motion.div
          style={{
            left: glowLeft,
            top: glowTop,
            x: '-50%',
            y: '-50%',
          }}
          className="absolute w-[320px] h-[320px] rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none z-0 opacity-0 group-hover/column:opacity-100 transition-opacity duration-500"
        />



        <div className="relative z-10 w-full flex flex-col h-full justify-between">
          <div>
            {/* Category Header */}
            <div className="mb-2">
              <h3 className="font-sans font-medium text-neutral-200 text-lg group-hover/column:text-primary transition-colors duration-300">
                {category.title}
              </h3>
            </div>

            {/* Animated Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="h-[1px] bg-neutral-900 group-hover/column:bg-primary/25 transition-colors duration-500 w-full mb-6 origin-left"
            />

            {/* Skills List */}
            <div className="flex flex-col gap-4">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skillIdx}
                  variants={skillVariants}
                  whileHover="hover"
                  initial="initial"
                  className="flex items-center justify-between py-1 group/item select-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 transition-transform duration-300 group-hover/item:translate-x-2">
                    <img 
                      src={skill.iconUrl} 
                      alt={skill.name} 
                      className="w-4 h-4 object-contain opacity-65 group-hover/item:opacity-100 transition-opacity duration-300"
                    />
                    <span className="text-neutral-400 font-sans text-xs sm:text-sm transition-colors duration-300 group-hover/item:text-[#E1E0CC]">
                      {skill.name}
                    </span>
                  </div>
                  
                  {/* Small visual sprout dot indicator */}
                  <motion.div
                    variants={{
                      initial: { scale: 0, opacity: 0 },
                      hover: { scale: 1, opacity: 0.8 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const titleSegments = [
    { text: "Core Stack", className: "font-light text-[#E1E0CC]" },
    { text: "Capabilities.", className: "font-serif italic text-primary ml-2 md:ml-3" }
  ];

  const descSegments = [
    { text: "A comprehensive breakdown of", className: "text-neutral-400 font-light" },
    { text: "intelligent frameworks,", className: "font-serif italic text-primary/80 ml-1.5" },
    { text: "languages, and systems tools.", className: "text-neutral-400 font-light ml-1.5" }
  ];

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 18,
        delay: index * 0.15,
        staggerChildren: 0.05,
        delayChildren: index * 0.15 + 0.15
      }
    })
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 16
      }
    }
  };

  return (
    <section id="skills" className="bg-black py-24 px-4 md:px-6 relative flex flex-col items-center border-t border-neutral-900/40">
      {/* Background Noise Overlay */}
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center justify-center max-w-3xl">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-primary/60 uppercase mb-3 block">
            Technical Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4 tracking-tight">
            <WordsPullUpMultiStyle segments={titleSegments} className="justify-center !flex" />
          </h2>
          <div className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed mt-2 text-center mx-auto">
            <WordsPullUpMultiStyle segments={descSegments} className="justify-center !flex" />
          </div>
        </div>

        {/* Categories Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8"
        >
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <SkillCategoryCard
              key={catIdx}
              category={category}
              index={catIdx}
              isInView={isInView}
              columnVariants={columnVariants}
              skillVariants={skillVariants}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
