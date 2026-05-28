import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';
import HorizontalProjectCard from '../components/HorizontalProjectCard';

export default function Projects() {
  const location = useLocation();

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

  return (
    <section className="min-h-screen bg-black relative py-32 px-4 md:px-6 flex flex-col items-center">
      {/* Background Noise Overlay */}
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />
      
      <div className="relative z-10 w-full max-w-5xl flex flex-col">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-12 w-fit group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4">All Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A curated showcase of production-ready systems, tools, and AI workflows.
          </p>
        </motion.div>

        {/* Horizontal Projects List */}
        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <HorizontalProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
