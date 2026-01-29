
import React, { useEffect } from 'react';
import { motion } from 'https://esm.sh/framer-motion@^11.0.0';
import { Project } from '../types';
import { ProjectVisualization } from '../App';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xl" 
        onClick={onClose} 
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-5xl max-h-[90vh] glass-dark rounded-3xl overflow-hidden border border-white/10 relative z-10 flex flex-col md:flex-row shadow-[0_0_120px_rgba(0,0,0,0.6)]"
      >
        {/* Animated Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-sky-500/10 blur-[100px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[100px] rounded-full"
          />
          <div className="absolute inset-0 bg-grid-isometric opacity-10" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
        >
          <svg className="w-5 h-5 text-white/50 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Visuals */}
        <div className="md:w-[45%] h-56 md:h-auto bg-zinc-900/40 border-b md:border-b-0 md:border-r border-white/5 relative flex items-center justify-center overflow-hidden z-10">
          <ProjectVisualization size="large" />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent" />
          
          <div className="relative z-10 text-center p-8">
             <motion.p 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[10px] font-mono text-sky-500 font-bold uppercase tracking-[0.4em] mb-4"
             >
               Module.Active
             </motion.p>
             <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none break-words"
             >
               {project.title}
             </motion.h2>
          </div>
        </div>

        {/* Right Side: Data */}
        <div className="md:w-[55%] p-8 md:p-14 overflow-y-auto custom-scrollbar relative z-10">
          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">System_Overview</h3>
              </div>
              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {project.description}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">Technical_Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((t, idx) => (
                  <motion.span 
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-bold text-sky-400 uppercase tracking-wider hover:border-sky-500/30 transition-colors"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">Core_Objectives</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "High-concurrency data processing pipeline.",
                  "Enterprise-grade security and authentication.",
                  "Scalable microservices architecture."
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 text-sm text-zinc-400 group">
                    <span className="text-sky-500/50 font-mono mt-0.5 text-[10px]">[{String(i + 1).padStart(2, '0')}]</span>
                    <span className="group-hover:text-zinc-200 transition-colors font-light">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.link && (
              <motion.a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(56,189,248,0.12)" }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center py-5 border border-sky-500/20 rounded-2xl text-sky-400 text-[11px] font-black uppercase tracking-widest hover:border-sky-500/40 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              >
                Access Production Site ➜
              </motion.a>
            )}
            
            <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-2">
              <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
                Ref: 0x-PRJ-{project.title.replace(/\s+/g, '').substring(0,6).toUpperCase()}-NODE
              </p>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="w-1 h-1 bg-sky-500/40 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
