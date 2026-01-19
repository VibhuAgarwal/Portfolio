
import React from 'react';
import { motion } from 'https://esm.sh/framer-motion@^11.0.0';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-14 relative">
      <div className="flex items-center gap-4 mb-3">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          className="h-[1px] bg-sky-500" 
        />
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-zinc-500 text-sm max-w-2xl font-light tracking-wide pl-14">
          <span className="text-sky-500/50 mr-2 font-mono text-[10px]">#_INFO:</span>
          {subtitle}
        </p>
      )}
      
      {/* Decorative accent */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -bottom-4 left-14 h-[2px] w-24 bg-gradient-to-r from-sky-500/40 to-transparent origin-left"
      />
    </div>
  );
};

export default SectionHeader;
