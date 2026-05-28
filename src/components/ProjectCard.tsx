import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  variants?: any;
}

export default function ProjectCard({ project, variants }: ProjectCardProps) {
  return (
    <motion.div
      variants={variants}
      className="relative rounded-2xl md:rounded-[2rem] overflow-hidden w-full h-full min-h-[340px] lg:min-h-[400px] flex flex-col justify-end p-6 sm:p-8 bg-neutral-950 border border-neutral-900 group hover:border-neutral-700/80 transition-colors duration-300"
    >
      {/* Clickable link overlaying everything, linking to the specific project on the list page */}
      <Link to={`/projects#${project.id}`} className="absolute inset-0 z-30" aria-label={`View ${project.title}`} />
      
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
            View project &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
