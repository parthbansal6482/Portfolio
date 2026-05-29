import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';
import HorizontalProjectCard from '../components/HorizontalProjectCard';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';

export default function Projects() {
  const location = useLocation();

  // Scroll Progress tracking for top progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to hash element if redirected from home page
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Flash a brief border highlight to guide user's focus
          element.classList.add('border-primary/50');
          setTimeout(() => {
            element.classList.remove('border-primary/50');
          }, 1500);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  const titleSegments = [
    { text: "All", className: "font-light text-[#E1E0CC]" },
    { text: "Projects.", className: "font-serif italic text-primary ml-2 md:ml-3" }
  ];

  const descSegments = [
    { text: "A curated showcase of", className: "text-neutral-400 font-light" },
    { text: "intelligent engines,", className: "font-serif italic text-primary/80 ml-1.5" },
    { text: "developer platforms, and full-stack systems.", className: "text-neutral-400 font-light ml-1.5" }
  ];

  return (
    <section className="min-h-screen bg-black relative py-32 px-4 md:px-6 flex flex-col items-center">
      {/* Scroll Progress Indicator */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-50"
      />
      {/* Background Noise Overlay */}
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />
      
      <div className="relative z-10 w-full max-w-5xl flex flex-col">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors mb-16 w-fit group font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-20 text-left">
          {/* Eyebrow Label */}
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-primary/60 uppercase mb-3 block">
            Selected Archives
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4 tracking-tight">
            <WordsPullUpMultiStyle segments={titleSegments} className="justify-start !flex" />
          </h1>
          <div className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-4">
            <WordsPullUpMultiStyle segments={descSegments} className="justify-start !flex" />
          </div>
        </div>

        {/* Horizontal Projects List */}
        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <div key={project.id}>
              {index > 0 && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-neutral-900 to-transparent my-12 origin-center"
                />
              )}
              <HorizontalProjectCard 
                project={project} 
                index={index} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
