
import React, { useState, useEffect } from 'react';
import GlassCard from './components/GlassCard';
import SectionHeader from './components/SectionHeader';
import { EXPERIENCES, PROJECTS, SKILL_GROUPS } from './constants';

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<string>('Frontend');

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

  const moveX = (mousePosition.x - window.innerWidth / 2) / 60;
  const moveY = (mousePosition.y - window.innerHeight / 2) / 60;

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-sky-500/30">
      {/* Background Dynamics */}
      <div className="bg-blob top-[-5%] left-[-5%] opacity-30" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} />
      <div className="bg-blob bottom-[-5%] right-[-5%] opacity-10" style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', transform: 'rotate(180deg)' }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6 pointer-events-none">
        <div className="glass-dark px-4 py-2 rounded-full flex items-center gap-6 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2 pr-4 border-r border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Available</span>
          </div>
          {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="text-xs font-semibold text-zinc-400 hover:text-white transition-all hover:scale-105"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative">
        
        {/* Hero Section */}
        <section id="about" className="min-h-[90vh] flex flex-col justify-center items-center mb-40 scroll-mt-32">
          <div 
            style={{ transform: `translate(${moveX}px, ${moveY}px)` }}
            className="transition-transform duration-100 ease-out w-full"
          >
            <GlassCard className="max-w-4xl mx-auto p-12 text-center md:text-left flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-3xl rounded-full" />
              
              {/* Profile Image Visualization */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden border border-white/10 glass bg-zinc-900 shadow-inner">
                {/* Visualizing a senior engineer: No cartoon avatar, but a professional placeholder style or real photo */}
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vibhor&backgroundColor=050507&baseColor=f1f1f1" 
                  alt="Vibhor Agarwal" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 scan-line" />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 backdrop-blur-md text-[10px] font-mono text-center text-sky-400 border-t border-white/5">
                  UID: VA-7729-ENGR
                </div>
              </div>

              <div className="flex-grow">
                <div className="inline-block px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-6">
                  Senior Software Engineer
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4 tracking-tighter">
                  Vibhor Agarwal
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 font-light mb-8 leading-relaxed">
                  Building the future of <span className="text-white font-medium">Fintech</span> and <span className="text-white font-medium">Enterprise Systems</span> with React architecture that scales.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
                    Experience Trace
                  </a>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="px-6 py-3 glass hover:bg-white/5 rounded-xl font-bold transition-all">
                    Initiate Contact
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-40 scroll-mt-32">
          <SectionHeader 
            title="Professional History" 
            subtitle="Deep engineering contributions to critical financial and industrial infrastructures." 
          />
          <div className="grid gap-12 relative">
            <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-sky-500/50 via-white/5 to-transparent hidden md:block" />
            
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2">
                  <GlassCard className="relative group hover:border-sky-500/40 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors tracking-tight">{exp.company}</h3>
                        <p className="text-sky-500 text-sm font-mono">{exp.role}</p>
                      </div>
                      <span className="text-zinc-500 text-[10px] font-mono border border-white/5 px-2 py-1 rounded bg-white/5">{exp.period}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-3">
                          <span className="text-sky-500/50 shrink-0">//</span>
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {exp.performanceMetrics && (
                      <div className="flex items-center gap-3 p-4 bg-sky-500/5 border-l-2 border-sky-500 rounded-r-lg">
                        <div className="text-sky-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <p className="text-xs font-mono text-sky-400">{exp.performanceMetrics}</p>
                      </div>
                    )}
                  </GlassCard>
                </div>
                <div className="hidden md:flex md:w-1/2 items-center justify-center opacity-20 pointer-events-none select-none">
                  <span className="text-8xl font-black text-white/5 tracking-tighter uppercase">{exp.company.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="mb-40 scroll-mt-32">
          <SectionHeader 
            title="Product Portfolios" 
            subtitle="Engineered for performance, built for real-world impact." 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <GlassCard key={idx} className="flex flex-col group p-0 overflow-hidden min-h-[400px]">
                <div className="h-56 bg-zinc-900 relative overflow-hidden flex items-center justify-center border-b border-white/10">
                   <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                   <div className="z-10 text-center">
                     <p className="text-zinc-600 text-[10px] font-mono mb-2 uppercase tracking-widest">Repository Path</p>
                     <h4 className="text-2xl font-bold tracking-tighter text-white/80 group-hover:text-white transition-all group-hover:scale-110">{project.title}</h4>
                   </div>
                   <div className="absolute top-4 right-4 flex gap-1">
                     <div className="w-1 h-1 rounded-full bg-sky-500" />
                     <div className="w-1 h-1 rounded-full bg-white/20" />
                     <div className="w-1 h-1 rounded-full bg-white/20" />
                   </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex gap-4">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono text-sky-500/80 uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-500 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-40 scroll-mt-32">
          <SectionHeader title="Stack Analysis" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_GROUPS.map((group) => (
              <GlassCard key={group.category} className="hover:bg-sky-500/5 transition-all">
                <h4 className="text-xs font-mono text-sky-500 uppercase tracking-widest mb-6 pb-2 border-b border-white/10">{group.category}</h4>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item} className="flex justify-between items-center group/item">
                      <span className="text-zinc-300 group-hover/item:text-white transition-colors">{item}</span>
                      <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 w-full transform translate-x-[-10%] group-hover/item:translate-x-0 transition-transform duration-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="pb-24">
          <GlassCard className="p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent opacity-50" />
            <div className="relative z-10">
              <span className="text-sky-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Connection Terminal</span>
              <h2 className="text-5xl font-bold mb-8 text-gradient">System established. Ready for collab.</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <a href="mailto:vibhor.agarwal@example.com" className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all">
                  Open Mail Client
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-10 py-4 glass rounded-xl font-bold hover:bg-white/10 transition-all">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </GlassCard>
        </section>

      </main>

      <footer className="py-12 border-t border-white/5 text-center bg-black/50">
        <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
          Engineered by Vibhor Agarwal // v2.0.25 // SSR Ready
        </p>
      </footer>
    </div>
  );
};

export default App;
