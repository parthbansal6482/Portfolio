import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  variants?: any;
  mode?: 'minimal' | 'detailed';
}

export default function ProjectCard({ project, variants, mode = 'minimal' }: ProjectCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`relative rounded-2xl md:rounded-[2rem] overflow-hidden w-full h-full min-h-[340px] ${
        mode === 'detailed' ? 'lg:min-h-[460px]' : 'lg:min-h-[400px]'
      } flex flex-col justify-end p-6 sm:p-8 bg-neutral-950 border border-neutral-900 group hover:border-neutral-700/80 transition-colors duration-300`}
    >
      {/* Clickable link overlaying everything */}
      <Link to={`/projects/${project.id}`} className="absolute inset-0 z-30" aria-label={`View details for ${project.title}`} />
      
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
      <div className={`absolute inset-0 bg-gradient-to-t ${
        mode === 'detailed' 
          ? 'from-black/95 via-black/70 to-transparent' 
          : 'from-black/90 via-black/45 to-transparent'
      } pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-85`} />
      
      {/* Card Content */}
      <div className="relative z-20 text-left flex flex-col h-full justify-end">
        <div>
          <span className="text-[#E1E0CC] font-normal text-xl sm:text-2xl tracking-tight leading-tight block">
            {project.title}
          </span>
          
          {mode === 'detailed' && (
            <>
              {/* Short Description */}
              <p className="text-gray-400 text-xs sm:text-sm mt-3 mb-5 leading-relaxed max-w-md">
                {project.description}
              </p>

              {/* Skills logos & name capsules */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900/90 border border-neutral-800/60 text-[10px] sm:text-xs text-[#E1E0CC] select-none"
                    title={skill.name}
                  >
                    <img 
                      src={skill.iconUrl} 
                      alt={skill.name}
                      className="w-3.5 h-3.5 object-contain"
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {mode === 'minimal' && (
            <span className="text-primary text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              View details &rarr;
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
