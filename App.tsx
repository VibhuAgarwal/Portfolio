
import React, { useState, useEffect } from 'react';
import GlassCard from './components/GlassCard';
import SectionHeader from './components/SectionHeader';
import { EXPERIENCES, PROJECTS, SKILL_GROUPS } from './constants';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  const moveX = (mousePosition.x - window.innerWidth / 2) / 80;
  const moveY = (mousePosition.y - window.innerHeight / 2) / 80;

  return (
    <div className="min-h-screen relative selection:bg-sky-500/30">
      {/* Universal Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] bg-sky-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-indigo-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6 pointer-events-none">
        <div className="glass-dark px-5 py-2.5 rounded-full flex items-center gap-8 pointer-events-auto shadow-2xl border border-white/5 backdrop-blur-3xl">
          <div className="flex items-center gap-2 pr-5 border-r border-white/10 group cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 group-hover:text-emerald-400 transition-colors">Operational</span>
          </div>
          {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="text-[11px] font-bold text-zinc-500 hover:text-white transition-all uppercase tracking-tighter"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 relative">
        
        {/* HERO SECTION */}
        <section id="about" className="min-h-[80vh] flex flex-col justify-center items-center mb-16 pt-20 scroll-mt-32">
          <div className="section-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div 
            style={{ transform: `translate(${moveX}px, ${moveY}px)` }}
            className="transition-transform duration-300 ease-out w-full"
          >
            <GlassCard className="max-w-5xl mx-auto p-10 md:p-14 border-white/10 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
                <div className="radar-pulse w-full h-full left-0 top-0" style={{ animationDelay: '0s' }} />
                <div className="radar-pulse w-full h-full left-0 top-0" style={{ animationDelay: '2s' }} />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
                <div className="relative shrink-0 mx-auto lg:mx-0">
                  <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vibhor&backgroundColor=050507&baseColor=f1f1f1" 
                      alt="Vibhor" 
                      className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 scan-line" />
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-sky-500/10 backdrop-blur-xl border-t border-sky-500/20 text-center">
                       <span className="text-[8px] font-mono font-bold text-sky-400 uppercase tracking-widest">Auth: Verified</span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-6">
                    <span className="w-1 h-1 rounded-full bg-sky-500" /> Senior Software Engineer
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-gradient mb-4 tracking-tighter leading-[0.9]">
                    Vibhor Agarwal
                  </h1>
                  <p className="text-sm md:text-base text-zinc-400 font-light mb-8 leading-relaxed max-w-3xl">
                    Senior Software Engineer with <span className="text-white font-medium">5+ years of experience</span> building scalable, high-performance web applications using <span className="text-sky-400">React.js, Next.js, Node.js, Express.js, JavaScript, Tailwind CSS, Redux</span>. Proven record delivering enterprise and startup-grade products. Led full-stack development of a live crypto-fiat on-ramp platform at <span className="text-white font-medium">TransFi</span> and currently driving frontend engineering initiatives at <span className="text-white font-medium">StatusNeo</span>. Strong in <span className="italic">clean architecture, SSR, state management, lazy loading, code-splitting, and performance optimization</span>.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="px-8 py-3.5 bg-sky-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all active:scale-95">
                      Work Trace
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="mb-24 scroll-mt-32 relative">
          <SectionHeader 
            title="Experience Log" 
            subtitle="Deep-dives into systems architecture and high-scale product delivery." 
          />
          
          <div className="space-y-12 relative">
             <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500/20 to-transparent hidden md:block">
                <div className="absolute inset-0 scan-line opacity-50" />
             </div>
             
             {EXPERIENCES.map((exp, idx) => {
               const isCurrent = exp.period.includes('Present');
               return (
                 <div key={idx} className={`relative flex flex-col md:flex-row gap-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                   <div className="md:w-[45%]">
                     <GlassCard className={`relative overflow-hidden group transition-all duration-500 ${isCurrent ? 'lightning-border !bg-transparent border-0' : 'border-white/5 hover:border-sky-500/20'}`}>
                       <div className="flex justify-between items-start mb-6">
                         <div>
                           <h3 className="text-xl font-black text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight flex items-center gap-3">
                             {exp.company}
                             {isCurrent && <span className="inline-block w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_#38bdf8] animate-pulse" />}
                           </h3>
                           <p className="text-zinc-500 text-[10px] font-mono font-bold tracking-widest mt-1 uppercase">{exp.role}</p>
                         </div>
                         <div className="text-[9px] font-mono text-zinc-600 bg-white/5 px-2 py-1 rounded border border-white/5">{exp.period}</div>
                       </div>
                       
                       <ul className="space-y-3 mb-8">
                         {exp.description.map((desc, i) => (
                           <li key={i} className="text-xs text-zinc-400 leading-relaxed flex gap-3 group-hover:text-zinc-300 transition-colors">
                             <span className="text-sky-500/40 font-mono">0{i+1}</span>
                             {desc}
                           </li>
                         ))}
                       </ul>

                       <div className="flex flex-wrap gap-1.5 mb-8">
                         {exp.skills.map((skill) => (
                           <span key={skill} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-black text-zinc-600 uppercase tracking-tighter hover:text-sky-500 hover:border-sky-500/30 transition-all cursor-default">
                             {skill}
                           </span>
                         ))}
                       </div>

                       {exp.performanceMetrics && (
                         <div className="p-4 bg-sky-500/[0.03] border border-sky-500/10 rounded-xl flex items-center gap-4 group-hover:bg-sky-500/[0.05] transition-all data-glow">
                           <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                             <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                           </div>
                           <p className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wide leading-tight">{exp.performanceMetrics}</p>
                         </div>
                       )}
                     </GlassCard>
                   </div>
                   <div className="hidden md:flex md:w-[10%] justify-center items-center">
                      <div className={`w-3 h-3 rounded-full bg-zinc-900 border ${isCurrent ? 'border-sky-500 shadow-[0_0_10px_#38bdf8]' : 'border-white/20'} z-10 transition-all duration-500`} />
                   </div>
                   <div className="hidden md:block md:w-[45%]" />
                 </div>
               );
             })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-24 scroll-mt-32 relative py-12">
          <div className="absolute inset-0 bg-grid-isometric opacity-30 z-[-1]" />
          <SectionHeader 
            title="Internal Product Echoes" 
            subtitle="Engineered internal prototypes and high-scale production platforms. These systems are protected under NDA." 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <GlassCard key={idx} className="flex flex-col group p-0 overflow-hidden min-h-[350px] bg-black/40 border-white/5 hover:border-sky-500/30 transition-all duration-700">
                <div className="h-40 bg-zinc-900/50 relative overflow-hidden border-b border-white/5 flex items-center justify-center">
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] group-hover:opacity-40 transition-opacity" />
                   <div className="z-10 text-center px-6">
                     <p className="text-zinc-600 text-[8px] font-mono mb-2 uppercase tracking-[0.4em]">Sub_System.Instance</p>
                     <h4 className="text-2xl font-black tracking-tighter text-white uppercase group-hover:scale-105 transition-transform duration-500">{project.title}</h4>
                   </div>
                   <div className="absolute bottom-4 right-6 flex items-center gap-2">
                     <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" />
                     <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Internal_Only</span>
                   </div>
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-10 group-hover:text-zinc-200 transition-colors">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex flex-col gap-3">
                       <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Stack.json</span>
                       <div className="flex flex-wrap gap-4">
                        {project.tech.map(t => (
                          <span key={t} className="text-[10px] font-mono text-sky-500/60 uppercase group-hover:text-sky-400 transition-colors">
                            {t}
                          </span>
                        ))}
                       </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-24 scroll-mt-32 relative">
          <SectionHeader title="Technical Stack" subtitle="Core proficiencies across the full product development lifecycle." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_GROUPS.map((group) => (
              <GlassCard key={group.category} className="p-6 group/skill hover:bg-sky-500/[0.02] border-white/5 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_#38bdf8]" />
                  <h4 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em]">{group.category}</h4>
                </div>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item} className="flex flex-col gap-2 group/item">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-300 text-[11px] font-medium group-hover/item:text-white transition-colors uppercase tracking-tight">{item}</span>
                        <span className="text-[8px] font-mono text-zinc-700 opacity-0 group-hover/item:opacity-100 transition-opacity">OK</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/[0.03] rounded-full overflow-hidden relative">
                         <div className="absolute inset-0 scan-line opacity-10" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="pb-16 scroll-mt-32">
          <GlassCard className="p-14 md:p-20 text-center relative overflow-hidden border-sky-500/10 shadow-[0_0_80px_rgba(56,189,248,0.05)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] opacity-60 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-sky-500 font-mono text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Handshake.Request</span>
              <h2 className="text-4xl md:text-6xl font-black mb-10 text-gradient tracking-tighter uppercase leading-[0.9]">
                Ready for the<br/>Next Engineering Hub.
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="mailto:vibhor.agarwal@example.com" className="group relative px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all active:scale-95 shadow-2xl">
                  Transmit Message
                </a>
              </div>
            </div>
          </GlassCard>
        </section>

      </main>

      <footer className="py-10 border-t border-white/5 text-center bg-black/60 backdrop-blur-3xl">
        <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em] mb-4">
          Vibhor Agarwal // Senior Engineer // Last_Updated: 2024.10
        </p>
      </footer>
    </div>
  );
};

export default App;
