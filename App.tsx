
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'https://esm.sh/framer-motion@^11.0.0';
import GlassCard from './components/GlassCard';
import SectionHeader from './components/SectionHeader';
import ContactForm from './components/ContactForm';
import ProjectModal from './components/ProjectModal';
import { EXPERIENCES, PROJECTS, SKILL_GROUPS } from './constants';
import { Project } from './types';

const getSkillIcon = (name: string) => {
  const iconMap: Record<string, string> = {
    'react.js': 'react',
    'next.js': 'nextdotjs',
    'javascript (es6+)': 'javascript',
    'html5': 'html5',
    'css3': 'css3',
    'redux': 'redux',
    'node.js': 'nodedotjs',
    'express.js': 'express',
    'mongodb': 'mongodb',
    'postgresql': 'postgresql',
    'mysql': 'mysql',
    'git': 'git',
    'github': 'github',
    'jenkins': 'jenkins',
    'datadog': 'datadog',
    'tailwind css': 'tailwindcss',
    'typescript': 'typescript',
    'prisma': 'prisma',
    'material ui': 'mui',
    'shadcn ui': 'shadcnui',
    'context api': 'react',
    'rest api design': 'postman',
    'jwt': 'jsonwebtokens',
    'stripe': 'stripe',
    'supabase': 'supabase',
    'mixpanel': 'mixpanel'
  };
  
  const slug = name.toLowerCase().trim();
  const iconSlug = iconMap[slug] || slug.replace(/[\.\s\+]/g, (m) => m === '.' ? 'dot' : m === '+' ? 'plus' : '').replace(/\s+/g, '');
  
  return `https://cdn.simpleicons.org/${iconSlug}/ffffff`;
};

export const ProjectVisualization = ({ size = "small" }: { size?: "small" | "large" }) => (
  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden select-none">
    <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
      <path d="M0,50 Q50,20 100,50 T200,50" fill="none" stroke="var(--accent)" strokeWidth={size === "large" ? "0.2" : "0.5"} />
      <path d="M0,60 Q50,90 100,60 T200,60" fill="none" stroke="var(--accent)" strokeWidth={size === "large" ? "0.2" : "0.5"} />
      <circle cx="50" cy="35" r={size === "large" ? "1" : "2"} fill="var(--accent)" />
      <circle cx="150" cy="65" r={size === "large" ? "1" : "2"} fill="var(--accent)" />
      <line x1="0" y1="20" x2="200" y2="20" stroke="white" strokeWidth="0.1" strokeDasharray="2,2" />
      <line x1="0" y1="80" x2="200" y2="80" stroke="white" strokeWidth="0.1" strokeDasharray="2,2" />
    </svg>
    <div className={`absolute ${size === "large" ? "top-8 left-8" : "top-4 left-4"} font-mono ${size === "large" ? "text-[8px]" : "text-[6px]"} text-zinc-500 whitespace-pre`}>
      {`0x8823_ARCH_MAP\nSTABLE_NODE: ACTIVE\nLATENCY: 14ms\nENCRYPTION: AES-256\nUPLINK: STABLE`}
    </div>
  </div>
);

const HeroBackgroundElements = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const x1 = useTransform(mouseX, [-1, 1], [-30, 30]);
  const y1 = useTransform(mouseY, [-1, 1], [-30, 30]);
  const x2 = useTransform(mouseX, [-1, 1], [40, -40]);
  const y2 = useTransform(mouseY, [-1, 1], [40, -40]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <motion.div style={{ x: x1, y: y1 }} className="absolute top-[10%] left-[15%] w-24 h-24 border border-sky-500/10 rounded-full" />
      <motion.div style={{ x: x2, y: y2 }} className="absolute bottom-[20%] right-[10%] w-32 h-32 border border-white/5 rounded-lg rotate-12" />
      <motion.div style={{ x: x1, y: y2 }} className="absolute top-[40%] right-[20%] w-12 h-12 flex items-center justify-center">
        <div className="w-[1px] h-full bg-sky-500/20 absolute rotate-45" />
        <div className="w-[1px] h-full bg-sky-500/20 absolute -rotate-45" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.02)_0%,transparent_50%)]" />
    </div>
  );
};

const RevealSection = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`scroll-mt-32 relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll();
  
  const springConfig = { stiffness: 150, damping: 30, restDelta: 0.001 };
  const smoothMouseX = useSpring(0, springConfig);
  const smoothMouseY = useSpring(0, springConfig);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      smoothMouseX.set((clientX - centerX) / centerX);
      smoothMouseY.set((clientY - centerY) / centerY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleDownloadCV = () => {
    const fileName = 'Resume_Vibhor.pdf';
    const link = document.createElement('a');
    link.href = `./${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const foregroundX = useTransform(smoothMouseX, [ -1, 1 ], [ -15, 15 ]);
  const foregroundY = useTransform(smoothMouseY, [ -1, 1 ], [ -15, 15 ]);
  const backgroundX = useTransform(smoothMouseX, [ -1, 1 ], [ 40, -40 ]);
  const backgroundY = useTransform(smoothMouseY, [ -1, 1 ], [ 40, -40 ]);
  const midgroundX = useTransform(smoothMouseX, [ -1, 1 ], [ 20, -20 ]);
  const midgroundY = useTransform(smoothMouseY, [ -1, 1 ], [ 20, -20 ]);

  return (
    <div className="min-h-screen relative selection:bg-sky-500/30 overflow-hidden">
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <div 
        className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.04), transparent 80%)`
        }}
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-sky-500 z-[100] origin-left shadow-[0_0_8px_#0ea5e9]" 
        style={{ scaleX }} 
      />

      <motion.div 
        className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#030305]"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] bg-sky-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-indigo-500/5 blur-[150px] rounded-full" />
      </motion.div>

      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ x: midgroundX, y: midgroundY }}
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white/[0.02] rounded-full rotate-45" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 border border-white/[0.01] rounded-3xl -rotate-12" />
      </motion.div>

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6 pointer-events-none">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-dark px-5 py-2.5 rounded-full flex items-center gap-8 pointer-events-auto shadow-2xl border border-white/5 backdrop-blur-3xl"
        >
          <div className="flex items-center gap-2 pr-5 border-r border-white/10 group cursor-default">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" 
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 transition-colors">Immediate Joiner</span>
          </div>
          {['About', 'Skills', 'Experience', 'Projects'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="relative text-[11px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-tighter group/nav"
            >
              {item}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sky-500 transition-all duration-300 group-hover/nav:w-full" 
              />
            </a>
          ))}
        </motion.div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        
        <RevealSection id="about" className="min-h-[70vh] flex flex-col justify-center items-center mb-8 pt-20">
          <motion.div 
            style={{ x: foregroundX, y: foregroundY }} 
            className="w-full relative"
          >
            <div className="section-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
            
            <GlassCard className="max-w-5xl mx-auto p-10 md:p-14 border-white/10 relative overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
              <HeroBackgroundElements mouseX={smoothMouseX} mouseY={smoothMouseY} />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
                <div className="radar-pulse w-full h-full left-0 top-0" style={{ animationDelay: '0s' }} />
                <div className="radar-pulse w-full h-full left-0 top-0" style={{ animationDelay: '2s' }} />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
                <div className="relative shrink-0 mx-auto lg:mx-0">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl"
                  >
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vibhor&backgroundColor=050507&baseColor=f1f1f1" 
                      alt="Vibhor Agarwal" 
                      className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 scan-line" />
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-sky-500/10 backdrop-blur-xl border-t border-sky-500/20 text-center flex items-center justify-center gap-1.5 overflow-hidden">
                       <motion.svg 
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.8, type: 'spring' }}
                         className="w-2.5 h-2.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                       >
                         <motion.path 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 0.5, delay: 1 }}
                           strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" 
                         />
                       </motion.svg>
                       <span className="text-[8px] font-mono font-bold text-sky-400 uppercase tracking-widest relative">
                        Auth: Verified
                        <motion.span 
                          animate={{ x: ['-100%', '200%'] }} 
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-8 skew-x-12 opacity-50"
                        />
                       </span>
                    </div>
                  </motion.div>
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-4"
                  >
                    <span className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" /> Senior Software Engineer
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-black text-gradient mb-3 tracking-tighter leading-[0.9]"
                  >
                    Vibhor Agarwal
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm md:text-base text-zinc-400 font-light mb-8 leading-relaxed max-w-3xl"
                  >
                    Senior Software Engineer with <span className="text-white font-medium">5+ years of experience</span> building scalable, high-performance web applications using <span className="text-sky-400">React.js, Next.js, Node.js, Express.js, JavaScript, Tailwind CSS, Redux</span>. Currently driving frontend engineering initiatives at <span className="text-white font-medium">StatusNeo</span>. Specialist in <span className="italic">clean architecture, SSR, and performance optimization</span>.
                  </motion.p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <motion.a 
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      href="#skills" 
                      onClick={(e) => scrollToSection(e, 'skills')} 
                      className="px-8 py-3 bg-sky-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all"
                    >
                      View Stack ➜
                    </motion.a>
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadCV}
                      className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:border-sky-500/40 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download CV
                    </motion.button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </RevealSection>

        <RevealSection id="skills" className="mb-24">
          <SectionHeader title="Technical Core" subtitle="Comprehensive stack across frontend, backend, and platform tooling." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_GROUPS.map((group, groupIdx) => (
              <motion.div 
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIdx * 0.1 }}
              >
                <GlassCard className="p-6 group/skill hover:bg-sky-500/[0.04] border-white/10 transition-all duration-500 h-full relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_#38bdf8]" 
                    />
                    <h4 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em]">{group.category}</h4>
                  </div>
                  <div className="space-y-4 relative z-10">
                    {group.items.map((item, itemIdx) => (
                      <motion.div 
                        key={item} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (groupIdx * 0.1) + (itemIdx * 0.05) }}
                        className="group/item relative"
                      >
                        <motion.div 
                          whileHover={{ 
                            scale: 1.05, 
                            x: 8,
                            backgroundColor: "rgba(56, 189, 248, 0.08)",
                          }}
                          className="flex justify-between items-center p-2 -m-2 rounded-lg transition-all duration-300 border border-transparent hover:border-sky-500/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.1)] cursor-default"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0 relative">
                              <img 
                                src={getSkillIcon(item)} 
                                alt={item} 
                                className="w-4 h-4 object-contain opacity-70 brightness-90 grayscale group-hover/item:opacity-100 group-hover/item:grayscale-0 group-hover/item:brightness-100 transition-all duration-500"
                                style={{ 
                                  filter: 'drop-shadow(0 0 0px transparent)'
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.filter = 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.6))';
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)';
                                }}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).classList.add('hidden');
                                  const fallback = (e.target as HTMLImageElement).nextElementSibling;
                                  if (fallback) fallback.classList.remove('hidden');
                                }}
                              />
                              <div className="hidden w-2.5 h-2.5 bg-sky-500/40 rounded-full border border-sky-500/20 shadow-[0_0_8px_rgba(56,189,248,0.3)] animate-pulse" title="System Node" />
                            </div>
                            <span className="text-zinc-300 text-xs font-medium group-hover/item:text-white transition-colors uppercase tracking-tight truncate">{item}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 overflow-hidden shrink-0">
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              className="text-[8px] font-mono text-sky-500/60 flex items-center gap-1.5 whitespace-nowrap"
                            >
                              <span className="w-1 h-1 bg-sky-500 rounded-full animate-pulse" />
                              VERIFIED
                            </motion.span>
                          </div>
                        </motion.div>
                        
                        <div className="w-full h-[1px] bg-white/[0.05] rounded-full overflow-hidden relative mt-1">
                           <motion.div 
                             className="absolute inset-0 bg-sky-500/20"
                             initial={{ x: "-100%" }}
                             whileHover={{ x: "100%" }}
                             transition={{ duration: 0.6 }}
                           />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute bottom-[-20px] right-[-10px] text-[40px] font-black text-white/[0.02] uppercase pointer-events-none select-none">
                    {group.category.split(' ')[0]}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="experience" className="mb-24">
          <SectionHeader 
            title="Experience Log" 
            subtitle="Audit of systems architecture and platform delivery." 
          />
          
          <div className="space-y-12 relative">
             <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500/20 to-transparent hidden md:block">
                <motion.div 
                  className="absolute inset-0 scan-line opacity-50" 
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
             </div>
             
             {EXPERIENCES.map((exp, idx) => {
               const isCurrent = exp.period.includes('Present');
               return (
                 <motion.div 
                   key={idx} 
                   className={`relative flex flex-col md:flex-row gap-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                 >
                   <div className="md:w-[45%]">
                     <GlassCard className={`relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(56,189,248,0.1)] ${isCurrent ? 'lightning-data-border' : 'border-white/5 hover:border-sky-500/20'}`}>
                       <div className="flex justify-between items-start mb-6">
                         <div>
                           <motion.h3 className="text-xl font-black text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight flex items-center gap-3">
                             {exp.company}
                             {isCurrent && <motion.span 
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="inline-block w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_12px_#38bdf8]" 
                             />}
                           </motion.h3>
                           <p className="text-zinc-500 text-[10px] font-mono font-bold tracking-widest mt-1 uppercase">{exp.role}</p>
                         </div>
                         <div className="text-[8px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 select-none">{exp.period}</div>
                       </div>
                       
                       <ul className="space-y-3 mb-8">
                         {exp.description.map((desc, i) => (
                           <li key={i} className="text-xs text-zinc-400 leading-relaxed flex gap-4 group-hover:text-zinc-200 transition-colors">
                             <span className="text-sky-500/40 font-mono text-[10px] mt-0.5">[{i+1}]</span>
                             {desc}
                           </li>
                         ))}
                       </ul>

                       <div className="flex flex-wrap gap-2 mb-8">
                         {exp.skills.map((skill) => (
                           <motion.span 
                            key={skill} 
                            whileHover={{ 
                              y: -3, 
                              backgroundColor: "rgba(56,189,248,0.15)", 
                              color: "#38bdf8", 
                              borderColor: "rgba(56,189,248,0.3)",
                              filter: "brightness(1.2)"
                            }}
                            className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded-md text-[8px] font-black text-zinc-500 uppercase tracking-tighter transition-all cursor-default"
                           >
                             {skill}
                           </motion.span>
                         ))}
                       </div>

                       {exp.performanceMetrics && (
                         <motion.div 
                           whileHover={{ x: 5 }}
                           className="p-4 bg-sky-500/[0.03] border border-sky-500/10 rounded-xl flex items-center gap-4 group-hover:bg-sky-500/[0.06] transition-all data-glow"
                         >
                           <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                             <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                           </div>
                           <p className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wide leading-tight">{exp.performanceMetrics}</p>
                         </motion.div>
                       )}
                     </GlassCard>
                   </div>
                   <div className="hidden md:flex md:w-[10%] justify-center items-center">
                      <motion.div 
                        whileHover={{ scale: 1.5 }}
                        className={`w-4 h-4 rounded-full bg-zinc-900 border-2 ${isCurrent ? 'border-sky-500 shadow-[0_0_15px_#38bdf8]' : 'border-white/20'} z-10 transition-all duration-500 relative`}
                      >
                        {isCurrent && <div className="absolute inset-0 bg-sky-500 rounded-full animate-ping opacity-20" />}
                      </motion.div>
                   </div>
                   <div className="hidden md:block md:w-[45%]" />
                 </motion.div>
               );
             })}
          </div>
        </RevealSection>

        <RevealSection id="projects" className="mb-24 py-4">
          <div className="absolute inset-0 bg-grid-isometric opacity-20 z-[-1]" />
          <SectionHeader 
            title="Technical Artifacts" 
            subtitle="Architectural footprints of mission-critical systems. Click to explore details." 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <GlassCard className="h-full flex flex-col p-0 overflow-hidden min-h-[340px] bg-black/80 border-white/10 group-hover:border-sky-500/40 transition-all duration-500 relative z-10 shadow-2xl">
                  <div className="h-40 bg-zinc-900/40 relative overflow-hidden border-b border-white/10 flex items-center justify-center">
                    <ProjectVisualization />
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] group-hover:opacity-40 transition-opacity duration-700" />
                    
                    <div className="z-10 text-center px-6">
                      <p className="text-zinc-600 text-[8px] font-mono mb-2 uppercase tracking-[0.5em]">SYSTEM_MODULE_v2.0</p>
                      <h4 className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-sky-400 transition-colors duration-500">{project.title}</h4>
                    </div>
                    
                    <motion.div 
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                      className="absolute bottom-4 right-5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 group-hover:border-sky-500/30 transition-colors"
                    >
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 rounded-full bg-sky-500" 
                      />
                      <span className="text-[8px] font-mono text-zinc-400 group-hover:text-sky-400 uppercase tracking-widest transition-colors">Explore_Module</span>
                    </motion.div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow relative">
                    <p className="text-zinc-400 text-sm leading-relaxed mb-10 group-hover:text-zinc-100 transition-colors duration-300 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mt-auto">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-[1px] w-6 bg-sky-500/40" />
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Dependency_Map</span>
                        </div>
                        <div className="flex flex-wrap gap-5">
                          {project.tech.slice(0, 4).map(t => (
                            <motion.span 
                              key={t} 
                              whileHover={{ x: 4, color: "#38bdf8" }}
                              className="text-[11px] font-mono text-sky-500/40 uppercase transition-all flex items-center gap-2"
                            >
                              <span className="text-[8px] opacity-30">#</span>{t}
                            </motion.span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="text-[11px] font-mono text-zinc-600 uppercase">+{project.tech.length - 4} MORE</span>
                          )}
                        </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="contact" className="pb-16">
          <SectionHeader title="Connection Protocol" subtitle="Establish a secure communication link for technical collaboration." />
          <GlassCard className="p-10 md:p-16 text-center relative overflow-hidden border-sky-500/20 shadow-[0_0_100px_rgba(56,189,248,0.08)] bg-black/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] opacity-80 pointer-events-none" />
            <div className="relative z-10">
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-sky-500 font-mono text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block"
              >
                Sync_Request.Handshake
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient tracking-tighter uppercase leading-[0.9]">
                Initialize Protocol.
              </h2>
              <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
                Open to senior engineering roles, technical lead opportunities, and architectural consulting. 
                Broadcast your signal below.
              </p>
              
              <ContactForm />
            </div>
          </GlassCard>
        </RevealSection>

      </main>

      <footer className="py-10 border-t border-white/5 text-center bg-[#030305] relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.5em]">
            Vibhor Agarwal // Senior System Engineer // {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
             <a href="https://www.linkedin.com/in/vibhor-agarwal12" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-zinc-700 hover:text-sky-500 transition-colors uppercase tracking-widest">LinkedIn</a>
             <a href="https://github.com/vibhuagarwal" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-zinc-700 hover:text-sky-500 transition-colors uppercase tracking-widest">GitHub</a>
             <a href="#" className="text-[9px] font-mono text-zinc-700 hover:text-sky-500 transition-colors uppercase tracking-widest">Terminal_Log</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
