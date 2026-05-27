import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export default function WordsPullUp({ text, className = '', showAsterisk = false, style }: WordsPullUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;
        
        return (
          <span key={wordIndex} className="inline-block overflow-hidden mr-[0.22em] last:mr-0 py-[0.1em] -my-[0.1em]">
            <motion.span
              variants={wordVariants}
              className="inline-block relative"
            >
              {isLastWord && showAsterisk ? (
                <>
                  {word.slice(0, -1)}
                  <span className="relative inline-block">
                    {word.slice(-1)}
                    <span 
                      className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-light leading-none"
                    >
                      *
                    </span>
                  </span>
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
