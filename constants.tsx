
import { Experience, Project, SkillGroup } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: "StatusNeo",
    role: "Senior Consultant",
    period: "May 2025 — Present",
    description: [
      "Designed and developed end-to-end features using React.js, Next.js, Node.js, and Express.js for enterprise-grade applications.",
      "Built and maintained REST APIs with secure authentication and optimized database queries.",
      "Implemented scalable state management using Redux and improved frontend performance by 30% through memoization and code-splitting.",
      "Integrated backend services with third-party systems and internal platforms, ensuring reliability and data consistency.",
      "Used React Query for efficient server-state management, reducing API response times by 40%."
    ],
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Redux", "React Query"],
    performanceMetrics: "30% performance boost; 40% reduction in response latency"
  },
  {
    company: "TransFi",
    role: "Full Stack Developer",
    period: "Feb 2025 — May 2025",
    description: [
      "Led development of a live crypto–fiat on-ramp platform with scalable frontend flows and secure backend services.",
      "Built APIs using Node.js, Express.js, MongoDB covering KYC, payments, and transaction lifecycles.",
      "Reduced frontend load time by 30% via code-splitting, memoization, and data caching."
    ],
    skills: ["Node.js", "Express.js", "MongoDB", "Fintech", "Payment Gateways"],
    performanceMetrics: "30% load time reduction; Live crypto-fiat production launch"
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Full Stack Developer",
    period: "Apr 2021 — Feb 2025",
    description: [
      "Improved web application performance by 30% through React optimization and lazy loading.",
      "Developed backend services using Node.js, Express.js for data aggregation and integrations.",
      "Designed REST APIs with JWT authentication and role-based access control.",
      "Automated workflows, reducing ServiceNow tickets by 60%."
    ],
    skills: ["React", "Node.js", "Express.js", "JWT", "RBAC", "Automation"],
    performanceMetrics: "60% reduction in support tickets; 30% performance improvement"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "6E Operation Control Centre Hub",
    description: "Enterprise flight operations system for IndiGo with real-time data aggregation APIs. Orchestrates mission-critical airline operations visualization.",
    tech: ["Next.js", "React.js", "TypeScript", "Node.js"],
  },
  {
    title: "Honeywell Manufacturing Portal",
    description: "MERN Stack Manufacturing workflow platform with role-based access, audits, and optimized MongoDB queries.",
    tech: ["MERN Stack", "MongoDB", "React", "Node.js"],
  },
  {
    title: "E-Commerce Web Application",
    description: "Full-stack platform with JWT auth, Stripe payments, admin dashboards, and optimized search APIs.",
    tech: ["MERN Stack", "JWT", "Stripe", "React"],
  },
  {
    title: "Airbnb Clone",
    description: "End-to-end booking platform with SSR, authentication, and database-backed listings using Supabase.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Supabase"],
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Redux", "Context API", "Tailwind CSS", "Material UI", "Shadcn UI"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST API Design", "Authentication", "Webhooks", "Integrations"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL"]
  },
  {
    category: "Tools & Ecosystem",
    items: ["Git", "GitHub", "CI/CD", "Jenkins", "Datadog", "Mixpanel", "StatCounter", "Prisma"]
  }
];
