import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    if (!project) {
      navigate('/projects');
      return;
    }

    const fetchMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(project.markdownFile);
        if (!response.ok) throw new Error('Failed to fetch markdown');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setContent('# Error loading project details');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [project, navigate]);

  if (!project) return null;

  return (
    <section className="min-h-screen bg-black relative py-24 px-4 md:px-6">
      <div className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0 z-0" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col">
        {/* Back navigation */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-10 w-fit">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        {/* Premium Project Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 p-6 sm:p-8 rounded-[2rem] bg-neutral-950 border border-neutral-900 overflow-hidden relative"
        >
          {/* Left Column: Visual Video Box */}
          <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-auto md:h-[280px] border border-neutral-800/40">
            <video
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0 pointer-events-none z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
          </div>

          {/* Right Column: Title, Simple Description, and Skill Logos */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal text-[#E1E0CC] mb-4">
                {project.title}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 text-[10px] sm:text-xs text-[#E1E0CC] select-none"
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
            </div>
          </div>
        </motion.div>

        {/* Separator */}
        <hr className="border-neutral-900 mb-16" />

        {/* Markdown Content (README) */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none prose-headings:font-normal prose-a:text-primary hover:prose-a:text-[#E1E0CC] prose-img:rounded-xl prose-img:border prose-img:border-neutral-800"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </motion.div>
        )}
      </div>
    </section>
  );
}
