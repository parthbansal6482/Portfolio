import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="min-h-screen bg-black relative py-32 px-4 md:px-6 flex flex-col items-center">
      {/* Background Noise Overlay */}
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />
      
      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4">All Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of systems, applications, and tools built with passion.
          </p>
        </motion.div>

        {/* Detailed Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variants={cardVariants} 
              mode="detailed" 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
