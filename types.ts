
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  performanceMetrics?: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}
