import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';

interface GradientCardProps {
  variants?: Variants;
  layout?: boolean;
  custom?: number;
}

export default function GradientCard({ variants, layout, custom }: GradientCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Interactive parallax displacement for the inner glow gradient
  const gradientX = useTransform(mouseXSpring, [-0.5, 0.5], ["12%", "-12%"]);
  const gradientY = useTransform(mouseYSpring, [-0.5, 0.5], ["12%", "-12%"]);

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
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      layout={layout}
      custom={custom}
      ref={ref}
      className="relative w-full h-full min-h-[300px] lg:min-h-[400px] [perspective:1000px] group"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onBlur={handleMouseLeave}
      tabIndex={0}
    >
      <motion.div
        className="w-full h-full relative rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-end p-6 sm:p-8 bg-[#050505] border border-neutral-900 group-hover:border-neutral-800 transition-colors duration-500 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        {/* Generative, Morphing Background Aura using website colors (Sage Green and Seed Shell Cream) */}
        {/* Features slow, perpetual micro-motion loops as per /taste-design */}
        <motion.div 
          className="absolute -inset-16 [transform-style:preserve-3d] [transform:translateZ(10px)] pointer-events-none"
          style={{ x: gradientX, y: gradientY }}
        >
          {/* Morphing silk/metallic white wave gradient resembling the user's reference image */}
          <motion.div 
            className="absolute inset-0 opacity-45 group-hover:opacity-65 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(200, 200, 200, 0.12) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(150, 150, 150, 0.08) 65%, rgba(255, 255, 255, 0) 85%)'
            }}
            animate={{
              x: [0, 35, -25, 0],
              y: [0, -30, 20, 0],
              rotate: [0, 4, -4, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Grain overlay for the tactile paper/film texture - increased intensity to match image */}
        <div className="absolute inset-0 w-full h-full bg-noise opacity-[0.55] mix-blend-overlay pointer-events-none [transform:translateZ(15px)] rounded-2xl md:rounded-[2rem]" />
        
        {/* Vignette edge mask to keep the corners clean and dark */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none [transform:translateZ(18px)] rounded-2xl md:rounded-[2rem]" 
          style={{
            background: 'radial-gradient(circle at center, transparent 40%, rgba(5, 5, 5, 0.85) 100%)'
          }}
        />

        {/* Content of the card with parallax pop-out */}
        <div className="relative z-20 text-left [transform:translateZ(25px)] pointer-events-none">
          <span className="text-[#E1E0CC] font-serif italic text-3xl sm:text-4xl md:text-[2.5rem] tracking-normal leading-tight block drop-shadow-2xl">
            Selected systems & architecture.
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
