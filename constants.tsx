
import { Experience, Project, SkillGroup } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: "StatusNeo",
    role: "Senior Consultant",
    period: "May 2025 — Present",
    description: [
      "Designing and developing end-to-end features using React.js, Next.js, Node.js, and Express.js for enterprise-grade applications.",
      "Building and maintaining REST APIs with secure authentication and optimized database queries.",
      "Improving frontend performance by 30% through memoization, code-splitting, and lazy loading.",
      "Implementing efficient server-state management using React Query, reducing perceived API response times by 40%."
    ],
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "React Query", "Redux"],
    performanceMetrics: "30% performance boost; 40% reduction in response latency"
  },
  {
    company: "TransFi",
    role: "Full Stack Developer",
    period: "Feb 2025 — May 2025",
    description: [
      "Led development of a live crypto–fiat on-ramp platform with scalable frontend flows and secure backend services.",
      "Architected backend APIs for KYC, payments, and transaction lifecycles using Node.js, Express.js, and MongoDB.",
      "Optimized platform performance and load times by 30% through advanced data caching and bundle optimization."
    ],
    skills: ["Node.js", "Express.js", "MongoDB", "Fintech", "Payment Gateways"],
    performanceMetrics: "30% load time reduction; Live crypto-fiat production launch"
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Full Stack Developer",
    period: "Apr 2021 — Feb 2025",
    description: [
      "Enhanced web application performance by 30% through React optimization and sophisticated lazy loading strategies.",
      "Developed robust backend services for data aggregation and role-based access control (RBAC) with JWT authentication.",
      "Automated internal workflows, resulting in a 60% reduction in ServiceNow ticket volume."
    ],
    skills: ["React", "Node.js", "JWT", "RBAC", "Performance Engineering"],
    performanceMetrics: "60% reduction in support tickets; 30% UI speed improvement"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "IndiGo OCC Hub",
    description: "Mission-critical real-time orchestration dashboard for airline operations. Handled complex fleet state transitions and ground operations visualization.",
    tech: ["Next.js", "Socket.io", "Highcharts", "PostgreSQL"],
  },
  {
    title: "Honeywell Manufacturing",
    description: "Industrial IoT platform for equipment diagnostics. Focused on high-throughput data visualization and predictive maintenance UI.",
    tech: ["MERN Stack", "MQTT", "D3.js", "Azure"],
  },
  {
    title: "TransFi Checkout",
    description: "High-security embeddable widget for instant crypto-fiat transactions. Managed complex verification flows and global payment APIs.",
    tech: ["React", "Styled Components", "Ethers.js"],
  },
  {
    title: "Internal E-Commerce Platform",
    description: "Built a custom E-Commerce engine with JWT authentication, Stripe integration, and complex inventory management.",
    tech: ["React", "Node.js", "Stripe", "Prisma"],
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
