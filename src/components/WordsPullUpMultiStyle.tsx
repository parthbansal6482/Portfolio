import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export default function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const wordsList: { word: string; className: string }[] = [];
  
  segments.forEach((segment) => {
    const words = segment.text.split(' ');
    words.forEach((word) => {
      if (word.length > 0) {
        wordsList.push({
          word,
          className: segment.className || '',
        });
      }
    });
  });

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
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {wordsList.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pt-[0.1em] -mt-[0.1em] pb-[0.2em] -mb-[0.2em]">
          <motion.span
            variants={wordVariants}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
