
import React from 'react';
import { motion } from 'https://esm.sh/framer-motion@^11.0.0';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-14 relative flex flex-col items-center text-center">
      <div className="flex items-center gap-4 mb-3">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 30 }}
          viewport={{ once: true }}
          className="h-[1px] bg-sky-500/50" 
        />
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{title}</h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 30 }}
          viewport={{ once: true }}
          className="h-[1px] bg-sky-500/50" 
        />
      </div>
      {subtitle && (
        <p className="text-zinc-500 text-sm max-w-2xl font-light tracking-wide px-4">
          <span className="text-sky-500/50 mr-2 font-mono text-[10px]">#_INFO:</span>
          {subtitle}
        </p>
      )}
      
      {/* Centered decorative accent */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 h-[2px] w-32 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent"
      />
    </div>
  );
};

export default SectionHeader;
