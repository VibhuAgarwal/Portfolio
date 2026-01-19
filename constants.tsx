
import { Experience, Project, SkillGroup } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: "StatusNeo",
    role: "Senior Software Engineer (Frontend Architect)",
    period: "Mar 2022 — Present",
    description: [
      "Leading the migration from legacy monolithic architecture to a performant Micro-Frontend (MFE) system using Module Federation.",
      "Optimized Core Web Vitals across enterprise dashboards, achieving a 40% reduction in Largest Contentful Paint (LCP).",
      "Mentored a team of 6 engineers, establishing rigorous code review standards and CI/CD best practices.",
      "Engineered a custom React UI library used across 3 major product verticals."
    ],
    skills: ["Next.js", "Module Federation", "TypeScript", "Performance Tuning", "Redux Toolkit"],
    performanceMetrics: "30–40% gain in LCP; 98/100 Lighthouse Performance score"
  },
  {
    company: "TransFi",
    role: "Senior Frontend Engineer",
    period: "Feb 2021 — Feb 2022",
    description: [
      "Architected the frontend for a high-security Crypto-to-Fiat gateway with real-time liquidity monitoring.",
      "Implemented complex state management for multi-step KYC/AML verification flows using React Query.",
      "Ensured PCI-DSS compliance and high security for global payment gateway integrations (Stripe, Wyre).",
      "Reduced bundle size by 35% through aggressive tree-shaking and dynamic imports."
    ],
    skills: ["React", "Crypto APIs", "KYC Systems", "Web Security", "Payment Gateways"],
    performanceMetrics: "35% bundle reduction; 100% API uptime during launch"
  },
  {
    company: "TCS",
    role: "Software Engineer (Full Stack)",
    period: "July 2019 — Jan 2021",
    description: [
      "Developed high-availability automation tools for enterprise infrastructure management.",
      "Built a Node.js-based RBAC system that secured sensitive financial data for Fortune 500 clients.",
      "Automated regression testing suites, saving approximately 120 man-hours per sprint cycle."
    ],
    skills: ["Node.js", "Express", "PostgreSQL", "Unit Testing", "Enterprise Automation"],
    performanceMetrics: "120h/sprint saved; 60% increase in dev velocity"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "IndiGo OCC Hub",
    description: "A mission-critical mission control center dashboard for real-time fleet orchestration and ground operations monitoring.",
    tech: ["Next.js", "Socket.io", "Highcharts", "PostgreSQL"],
  },
  {
    title: "Honeywell Manufacturing",
    description: "Industrial IoT platform for real-time equipment diagnostics and predictive maintenance visualization.",
    tech: ["MERN Stack", "MQTT", "D3.js", "Azure"],
  },
  {
    title: "TransFi Checkout",
    description: "A production-grade, embeddable widget for instant crypto purchasing with custom branding support.",
    tech: ["React", "Styled Components", "Ethers.js"],
  },
  {
    title: "System Architecture Board",
    description: "Internal tool for mapping complex microservice dependencies and service health visualization.",
    tech: ["React", "React Flow", "Prisma", "Node.js"],
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React 19", "Next.js 15", "TypeScript", "Redux/Zustand", "Tailwind CSS", "Module Federation"]
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Redis", "REST/GraphQL"]
  },
  {
    category: "Architecture",
    items: ["Micro-Frontends", "Design Systems", "Web Performance", "CI/CD", "AWS", "Datadog"]
  }
];
