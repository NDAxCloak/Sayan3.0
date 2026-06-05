export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "automation" | "development" | "analytics";
  duration: string;
  description: string[];
  skills: string[];
  stats?: { label: string; value: string }[];
  demoUrl?: string;
  githubUrl?: string;
  jjkGrade: string; // JJK Classification, e.g. "Special Grade"
  cursedEnergyCost: number; // Fun JJK stat
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  type: "operations" | "engineering" | "consulting";
  jjkRoleGrade: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  year: string;
  grade?: string;
}

export interface SkillCategory {
  title: string;
  grade: string; // JJK Grade
  icon: string; // Lucide icon name
  skills: string[];
  flairColor: string; // CSS border/shadow color
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown details
  date: string;
  readTime: string;
  tags: string[];
  engagement: {
    views: number;
    likes: number;
  };
}

export interface VisitorAnalytics {
  pageViews: number;
  domainExpansionsActive: number;
  sectionHits: Record<string, number>;
  skillsExpanded: Record<string, number>;
  likesCount: Record<string, number>;
  contactFormSubmissions: number;
  resumeDownloads: number;
}
