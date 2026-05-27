import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedLetter from './AnimatedLetter';

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const headingSegments = [
    { text: "I am Parth Bansal,", className: "font-normal text-[#E1E0CC]" },
    { text: "a full-stack AI engineer & designer.", className: "italic font-serif text-[#E1E0CC]" },
    { text: "I build intelligent agents, real-time engines, and interactive web experiences.", className: "font-normal text-[#E1E0CC]" },
  ];

  const paragraphText = "Currently pursuing a BTech in Computer Science at BMU, I specialize in full-stack engineering and agentic AI systems. From architecting Docker-sandboxed execution platforms to building LLM-powered commerce intelligence systems, I craft digital artifacts with technical precision and design-forward aesthetics.";
  const characters = paragraphText.split("");

  return (
    <section id="our-story" className="bg-black py-20 px-4 md:px-6 flex justify-center items-center">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full max-w-6xl text-center flex flex-col items-center justify-center border border-neutral-900">
        
        {/* Top Label */}
        <span className="text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-6 block">
          Visual arts & Code
        </span>

        {/* Main Heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] tracking-tight">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Body Paragraph with scroll reveal */}
        <p
          ref={paragraphRef}
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-center mt-8 md:mt-12 flex flex-wrap justify-center gap-x-[0.05em]"
        >
          {characters.map((char, index) => (
            <AnimatedLetter
              key={index}
              char={char}
              index={index}
              totalChars={characters.length}
              progress={scrollYProgress}
            />
          ))}
        </p>

      </div>
    </section>
  );
}
