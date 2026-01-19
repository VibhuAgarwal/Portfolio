
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gradient mb-2">{title}</h2>
      {subtitle && <p className="text-zinc-400 max-w-2xl">{subtitle}</p>}
      <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-transparent rounded-full mt-4" />
    </div>
  );
};

export default SectionHeader;
