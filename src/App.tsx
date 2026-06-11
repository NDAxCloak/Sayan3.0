import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  BarChart3,
  Users2,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Briefcase,
  GraduationCap,
  Flame,
  Code2,
  Zap,
  Info,
  ExternalLink,
  Target,
  FileSpreadsheet,
  Terminal,
  Layers,
  ChevronRight,
} from "lucide-react";

// Sub-components
import CursedCursor from "./components/CursedCursor";
import CursedBackground from "./components/CursedBackground";
import AnalyticsPanel, { trackSectionView, updateAnalytics, getStoredAnalytics } from "./components/AnalyticsPanel";
import ResumeDownload from "./components/ResumeDownload";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";

// Data
import { ProjectsData, ExperiencesData, EducationsData, SkillsData } from "./data";
import { Project } from "./types";

export default function App() {
  // Domain Expansion states
  const [isDomainExpanded, setIsDomainExpanded] = useState(false);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<"all" | "automation" | "development" | "analytics">("all");
  const [investedProjectEnergy, setInvestedProjectEnergy] = useState<Record<string, number>>({});
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);
  const [recruiterFameLevel, setRecruiterFameLevel] = useState("Grade 4 Recruiter Candidate");

  // Track scroll activity to update analytics automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollPos / (height || 1);

      if (pct > 0.1 && pct < 0.3) {
        trackSectionView("experience");
      } else if (pct >= 0.3 && pct < 0.5) {
        trackSectionView("projects");
      } else if (pct >= 0.5 && pct < 0.7) {
        trackSectionView("skills");
      } else if (pct >= 0.7 && pct < 0.9) {
        trackSectionView("blogs");
      } else if (pct >= 0.9) {
        trackSectionView("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Recruiter fame level based on interaction amount
  useEffect(() => {
    const handleStatsUpdate = () => {
      const stats = getStoredAnalytics();
      const clicks = Object.values(stats.sectionHits).reduce((a, b) => a + b, 0);
      const loops = stats.domainExpansionsActive;
      const contact = stats.contactFormSubmissions;

      if (contact > 0) {
        setRecruiterFameLevel("Special Grade Recruiter Partner (Vow Sealed)");
      } else if (loops > 2) {
        setRecruiterFameLevel("Grade 1 Sorcerer Recruiter (Void Master)");
      } else if (clicks > 15) {
        setRecruiterFameLevel("Grade 2 Sorcerer Recruiter");
      } else if (clicks > 5) {
        setRecruiterFameLevel("Grade 3 Sorcerer Recruiter");
      } else {
        setRecruiterFameLevel("Grade 4 Recruiter Candidate");
      }
    };

    handleStatsUpdate();
    window.addEventListener("sayan_analytics_updated", handleStatsUpdate);
    return () => window.removeEventListener("sayan_analytics_updated", handleStatsUpdate);
  }, []);

  // Trigger Domain Expansion state
  const handleDomainExpansionToggle = () => {
    const nextState = !isDomainExpanded;
    setIsDomainExpanded(nextState);

    updateAnalytics((prev) => ({
      ...prev,
      domainExpansionsActive: prev.domainExpansionsActive + (nextState ? 1 : 0),
    }));
  };

  // Invest cursed energy into a project (fun interaction!)
  const handleInvestEnergy = (projectId: string, cost: number) => {
    setInvestedProjectEnergy((prev) => {
      const current = prev[projectId] || 0;
      const nextVal = current >= 100 ? 0 : Math.min(current + 25, 100);

      // Track interaction impact
      updateAnalytics((prevStats) => {
        const hits = { ...prevStats.sectionHits };
        hits.projects = (hits.projects || 0) + 1;
        return { ...prevStats, sectionHits: hits };
      });

      return {
        ...prev,
        [projectId]: nextVal,
      };
    });
  };

  const filteredProjects = ProjectsData.filter((proj) => {
    if (selectedProjectCategory === "all") return true;
    return proj.category === selectedProjectCategory;
  });

  const skillIconMap = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5 text-purple-400" />;
      case "Users2":
        return <Users2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="relative text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-white">
      {/* Visual background and custom flame particle cursor */}
      <CursedBackground />
      <CursedCursor />

      {/* Floating Interactive Title Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            id="brand-logo"
            href="#hero"
            onClick={() => trackSectionView("hero")}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-none group-hover:scale-y-110 transition-transform" />
            <div className="font-display font-black tracking-wider text-sm flex flex-col">
              <span className="text-white group-hover:text-cyan-400 transition-colors uppercase leading-none">
                SAYAN PATRA
              </span>
              <span className="text-[8px] text-cyan-400 font-mono tracking-wider leading-3 font-bold uppercase">
                FOUNDER, RIKSAAN SDS
              </span>
            </div>
          </a>

          {/* Nav links (hidden on ultra-small mobile, clean scrolling) */}
          <nav className="hidden md:flex items-center space-x-6 text-[10px] uppercase tracking-widest font-bold text-gray-300">
            <a
              id="nav-link-experience"
              href="#experience"
              onClick={() => trackSectionView("experience")}
              className="hover:text-cyan-400 transition-colors"
            >
              Milestones
            </a>
            <a
              id="nav-link-projects"
              href="#projects"
              onClick={() => trackSectionView("projects")}
              className="hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
            <a
              id="nav-link-skills"
              href="#skills"
              onClick={() => trackSectionView("skills")}
              className="hover:text-purple-400 transition-colors"
            >
              Techniques
            </a>
            <a
              id="nav-link-blog"
              href="#blog"
              onClick={() => trackSectionView("blogs")}
              className="hover:text-fuchsia-400 transition-colors"
            >
              Scrolls
            </a>
            <a
              id="nav-link-contact"
              href="#contact"
              onClick={() => trackSectionView("contact")}
              className="text-cyan-400"
            >
              Vow [Active]
            </a>
          </nav>

          {/* Domain Expansion Toggle Button */}
          <div className="flex items-center gap-3">
            {/* Sorcerer Recruit Rank Badge */}
            <div className="hidden sm:inline-flex flex-col text-right">
              <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Recruiter Rank</span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold leading-none">{recruiterFameLevel}</span>
            </div>

            <button
              id="btn-domain-expansion-trigger"
              onClick={handleDomainExpansionToggle}
              className={`text-[9.5px] uppercase font-mono tracking-widest px-4 py-2 border font-bold transition-all duration-300 relative inline-flex items-center gap-1.5 shadow-none rounded-none group ${
                isDomainExpanded
                  ? "bg-purple-900/30 border-purple-500 text-purple-300 shadow-none animate-pulse"
                  : "bg-cyan-500/5 border-cyan-500/30 text-cyan-400 shadow-none hover:border-cyan-400 hover:bg-cyan-500/10"
              }`}
            >
              <Zap className="w-3 h-3 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>{isDomainExpanded ? "Collapse Domain" : "Domain Expansion"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-12 md:space-y-20 relative">
        {/* Full-Screen Simulated Infinite Void Modal Overlay */}
        <AnimatePresence>
          {isDomainExpanded && (
            <motion.div
              layoutId="infinite-void"
              id="modal-infinite-void"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/98 flex items-center justify-center p-4 backdrop-blur-lg"
            >
              <div
                id="void-stars-bg"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#030712] to-black opacity-95 pointer-events-none"
              />

              <div className="max-w-4xl w-full relative z-10 space-y-6 pt-10 pb-10">
                {/* Immersive Title Graphic */}
                <div className="text-center space-y-2">
                  <span className="text-[9px] tracking-[0.4em] uppercase font-mono text-purple-400 block font-bold">
                    DOMAIN EXPANSION ACTIVE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tighter text-white uppercase select-none">
                    INFINITE VOID <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">TELEMETRY</span>
                  </h2>
                  <p className="text-xs text-gray-400 max-w-lg mx-auto font-sans leading-relaxed">
                    Recruiter interactions, scroll parameters, and coordinate proposals visualised inside our isolated metaphysical dashboard.
                  </p>
                </div>

                {/* Dashboard Panel Wrapper */}
                <AnalyticsPanel 
                  onCollapse={handleDomainExpansionToggle} 
                  isDomainExpanded={isDomainExpanded} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 1: HERO / BRAND CARD */}
        <section id="hero" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 p-6 sm:p-10 rounded-none relative overflow-hidden">
            {/* Visual glow backdrop for Hero */}
            <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[20%] w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 font-mono text-[9px] tracking-widest uppercase font-bold">
                <Target className="w-3.5 h-3.5" />
                <span>Special Grade Assignment</span>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] tracking-[0.3em] font-mono text-cyan-400 font-bold uppercase">Founder & Lead Developer of Riksaan SDS</div>
                <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tighter text-white uppercase leading-none">
                  SAYAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">PATRA</span>
                </h1>
                <p className="text-sm text-gray-400 font-mono">Specialization: Immersive Custom Websites & Web Applications</p>
                <p className="text-xs text-purple-400 font-mono mt-1 font-semibold">Riksaan SDS representing: We build digital experiences that drive impact.</p>
              </div>

              <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-xl">
                I am Sayan Patra, Founder of Riksaan SDS. We help small businesses build a professional digital footprint through custom websites, web applications, and digital solutions that help them attract customers and grow online.
              </p>

              {/* Contact metadata tokens in Gojo format */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400 pt-3 border-t border-white/10 max-w-md">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Kolkata, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>patrasayan883@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>+91 6289435087</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <code className="text-[9px] text-[#a855f7] font-bold">certified: MICRO1 DEVELOPER</code>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 font-mono">
                <a
                  id="btn-fast-riksaan"
                  href="https://riksaansds.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] uppercase tracking-widest font-bold rounded-none transition-transform hover:scale-[1.02] flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  Riksaan SDS
                </a>
                <a
                  id="btn-fast-pact"
                  href="#contact"
                  onClick={() => trackSectionView("contact")}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] uppercase tracking-widest border border-white/10 rounded-none transition-colors flex items-center gap-1.5"
                >
                  Seal Covenant
                </a>
                <a
                  id="btn-fast-github"
                  href="https://github.com/NDAxCloak"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] uppercase tracking-widest border border-white/10 rounded-none transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  GitHub API
                </a>
                <a
                  id="btn-fast-linkedin"
                  href="https://linkedin.com/in/patrasayan"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] uppercase tracking-widest border border-white/10 rounded-none transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-4 h-4 text-purple-400" />
                  LinkedIn Main
                </a>
                <a
                  id="btn-fast-instagram"
                  href="https://www.instagram.com/patrasayan0926?igsh=Z2twN3pocnZ3bjJy"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] uppercase tracking-widest border border-white/10 rounded-none transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  Instagram Feed
                </a>
              </div>
            </div>

            {/* Resume Integration ATS Widget side-bar */}
            <div className="lg:col-span-5 h-full flex flex-col justify-between">
              <ResumeDownload />
            </div>
          </div>
        </section>

        {/* SECTION 2: WORK EXPERIENCE & MILESTONES */}
        <section id="experience" className="scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">Career Leylines</span>
                <h2 className="text-base font-display font-black tracking-widest uppercase text-white flex items-center gap-1.5">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  Operations & Engineering Chronicle
                </h2>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider hidden sm:inline">
                Dynamic Logs [Verified]
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Timeline list */}
              <div className="lg:col-span-8 space-y-6">
                {ExperiencesData.map((exp) => (
                  <div
                    id={`exp-card-${exp.id}`}
                    key={exp.id}
                    className="p-6 bg-white/5 border border-white/10 rounded-none hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-300 flex gap-4"
                  >
                    {/* Circle badge marker */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-8 h-8 bg-black border border-cyan-500/30 flex items-center justify-center font-mono text-[10px] text-cyan-400 font-bold rounded-none">
                        {exp.type === "operations" ? "Ops" : exp.type === "engineering" ? "Dev" : "Csl"}
                      </div>
                      <div className="w-0.5 h-full bg-white/5 mt-2" />
                    </div>

                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                            {exp.role}
                          </h3>
                          <p className="text-[11px] font-mono text-cyan-400">
                            {exp.company} <span className="text-gray-500">//</span> {exp.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-0.5 text-[9px] font-mono rounded-none bg-black border border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                            {exp.period}
                          </span>
                          <span className="block text-[8px] font-mono text-purple-400 uppercase font-bold mt-1 tracking-widest">
                            ⚔️ Rank: {exp.jjkRoleGrade}
                          </span>
                        </div>
                      </div>

                      {/* Bullet chronicles */}
                      <ul className="list-disc pl-4 text-xs text-gray-400 space-y-1.5 font-sans leading-relaxed pt-1">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education Grid Card on side */}
              <div className="lg:col-span-4 space-y-5">
                <div className="p-6 bg-white/5 border border-white/10 rounded-none space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest font-mono font-bold text-cyan-400 flex items-center gap-1.5 border-b border-white/10 pb-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    Academic Grid Settings
                  </h3>

                  <div className="space-y-4">
                    {EducationsData.map((edu) => (
                      <div id={`edu-card-${edu.id}`} key={edu.id} className="space-y-1 font-sans">
                        <span className="text-[9px] font-mono text-gray-500 block italic">{edu.year}</span>
                        <h4 className="text-xs font-display font-bold text-white tracking-wide uppercase">
                          {edu.degree}
                        </h4>
                        <p className="text-[10px] text-cyan-400 font-mono">
                          {edu.institution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro operational insight visual card */}
                <div className="p-5 bg-white/5 border-l-2 border-cyan-500 rounded-none space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    <Target className="w-3.5 h-3.5" />
                    <span>Audit Synergy Analysis</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      As seen in Sayan's 1-year sequence at **Baazar Style Retail**, his POS cash audit logs achieved less than 0.1% audit discrepancy variance. Simultaneously, Sayan deployed 3 live transactional startup codebases, proving the dual dexterity of operational accountability and reactive architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROJECT GALLERY */}
        <section id="projects" className="scroll-mt-20">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">Cursed Projects</span>
                <h2 className="text-base font-display font-black tracking-widest uppercase text-white flex items-center gap-1.5">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  The Cursed Weapon Archive
                </h2>
              </div>

              {/* Interactive Category Filters */}
              <div className="flex flex-wrap gap-1 bg-black p-0.5 rounded-none border border-white/10 text-[9px] font-mono tracking-wider">
                <button
                  id="filter-all"
                  onClick={() => setSelectedProjectCategory("all")}
                  className={`px-3 py-1.5 uppercase rounded-none transition-colors ${
                    selectedProjectCategory === "all"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  All Tools
                </button>
                <button
                  id="filter-automation"
                  onClick={() => setSelectedProjectCategory("automation")}
                  className={`px-3 py-1.5 uppercase rounded-none transition-colors ${
                    selectedProjectCategory === "automation"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  AI Automation
                </button>
                <button
                  id="filter-development"
                  onClick={() => setSelectedProjectCategory("development")}
                  className={`px-3 py-1.5 uppercase rounded-none transition-colors ${
                    selectedProjectCategory === "development"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Web Dev
                </button>
                <button
                  id="filter-analytics"
                  onClick={() => setSelectedProjectCategory("analytics")}
                  className={`px-3 py-1.5 uppercase rounded-none transition-colors ${
                    selectedProjectCategory === "analytics"
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Data Analytics
                </button>
              </div>
            </div>

            {/* Responsive Projects Grid Card layout in Editorial format */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => {
                const energy = investedProjectEnergy[proj.id] || 0;

                return (
                  <div
                    id={`project-card-${proj.id}`}
                    key={proj.id}
                    className="p-6 bg-white/5 border border-white/10 rounded-none hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Energy glow indicator */}
                    {energy > 0 && (
                      <span
                        className="absolute inset-0 bg-cyan-400/[0.015] pointer-events-none"
                        style={{ opacity: energy / 100 }}
                      />
                    )}

                    <div className="space-y-4">
                      {/* Card meta */}
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono px-2 py-0.5 bg-black border border-white/5 text-gray-400 rounded-none">
                          {proj.duration}
                        </span>
                        <span className="text-[9px] tracking-wider uppercase font-mono text-purple-400 font-bold text-right">
                          {proj.jjkGrade}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] font-mono text-cyan-400">
                          {proj.subtitle}
                        </p>
                      </div>

                      {/* Descriptions */}
                      <div className="space-y-1.5 text-[11px] font-sans text-gray-400 leading-relaxed">
                        {proj.description.slice(0, 2).map((sentence, sIdx) => (
                          <p key={sIdx}>{sentence}</p>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.skills.map((pill) => (
                          <span
                            key={pill}
                            className="bg-black/30 text-gray-300 px-2.5 py-0.5 rounded-none text-[9px] font-mono border border-white/5 hover:border-cyan-500/20"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom stats and interactions widget */}
                    <div className="pt-4 mt-4 border-t border-white/5 space-y-4">
                      {/* Raw Project metrics */}
                      {proj.stats && (
                        <div className="grid grid-cols-3 gap-2 text-center text-gray-300 font-mono text-[10px]">
                          {proj.stats.map((stat, idx) => (
                            <div key={idx} className="p-1.5 rounded-none bg-black/40 border border-white/5">
                              <span className="block text-gray-400 text-[8px] uppercase tracking-wider leading-snug">{stat.label}</span>
                              <span className="block font-black text-cyan-400 mt-0.5">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Cursed Energy Loader */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[9px] font-mono uppercase text-gray-400 tracking-wider">
                          <span>Energy Load</span>
                          <span className="text-purple-400">{energy}% Loaded</span>
                        </div>
                        <div className="h-1 bg-black rounded-none overflow-hidden relative">
                          <div
                            className="h-full bg-cyan-400 transition-all duration-300"
                            style={{ width: `${energy}%` }}
                          />
                        </div>
                        <button
                          id={`btn-inject-energy-${proj.id}`}
                          onClick={() => handleInvestEnergy(proj.id, proj.cursedEnergyCost)}
                          className="w-full text-center text-[9px] uppercase tracking-widest font-mono py-2 rounded-none bg-black hover:bg-white/5 text-gray-400 hover:text-white border border-white/10 transition-all outline-none"
                        >
                          {energy === 0 ? "✓ Load Grid" : energy >= 100 ? "⚡ Limit Unleashed" : "⚡ Channel grid (+25%)"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: SKILL GRADES */}
        <section id="skills" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Header info */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#a855f7] font-bold">Sorcery Arsenal</span>
                <h2 className="text-sm font-display font-black tracking-widest uppercase text-white flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-purple-400 animate-pulse" />
                  Tactical Operations Specifications
                </h2>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Operations, automations, and tech methodologies mapped inside high-energy modular frameworks. Toggle a spec matrix tier below.
              </p>

              {/* Left Selector column in Editorial format */}
              <div className="space-y-2 pt-2">
                {SkillsData.map((cat, idx) => (
                  <button
                    id={`skill-cat-btn-${idx}`}
                    key={idx}
                    onClick={() => {
                      setActiveSkillCategory(idx);
                      // Track skill expansion in telemetry
                      updateAnalytics((prev) => {
                        const skillsExpanded = { ...prev.skillsExpanded };
                        const key = idx === 0 ? "technical" : idx === 1 ? "business" : "soft";
                        skillsExpanded[key] = (skillsExpanded[key] || 0) + 1;
                        return { ...prev, skillsExpanded };
                      });
                    }}
                    className={`w-full p-4 rounded-none border text-left flex items-center justify-between transition-all duration-300 outline-none ${
                      activeSkillCategory === idx
                        ? "bg-white/10 border-cyan-500/50 text-white"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-none bg-black/40 border border-white/10">
                        {skillIconMap(cat.icon)}
                      </div>
                      <div>
                        <span className="text-xs font-display font-bold uppercase tracking-wide block">{cat.title}</span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Grade: {cat.grade}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right details expanded grid in Editorial format */}
            <div className="lg:col-span-7">
              <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-none h-full space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Active Specification Codex</span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold animate-pulse">✓ Operational Ready</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {SkillsData[activeSkillCategory].skills.map((s, idx) => (
                    <div
                      id={`skill-badge-${idx}`}
                      key={idx}
                      className="p-3 bg-white/5 border border-white/5 hover:border-cyan-500/40 rounded-none flex items-center gap-2.5 transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 rounded-none bg-cyan-400 group-hover:scale-125 transition-transform" />
                      <span className="text-xs font-sans text-gray-300 group-hover:text-white transition-colors">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-gray-500 leading-relaxed p-3 bg-black/40 border border-white/10 rounded-none">
                  <span className="text-cyan-400 font-bold">Resonated Potential:</span> Deep capabilities in relational databases, advanced Excel workflows, interactive Power BI tracking dashboards, and robust Python code scrapers.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BLOG PORTFOLIO LOGS */}
        <section id="blog" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#a855f7] font-bold">Insights</span>
                <h2 className="text-sm font-display font-black tracking-widest uppercase text-white flex items-center gap-1.5">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  Tactical Scroll Logs (Insights)
                </h2>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Exploring Sayan's automated software recipes and analytics systems. Select any log card to view detail indexes.
              </p>
              
              <div className="p-5 bg-white/5 border border-white/10 rounded-none flex gap-3 text-[11px] text-gray-400 leading-normal font-sans">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                 Selecting any article below triggers immediate trace analytics inside our isolated memory.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BlogSection />
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT PACT FORM */}
        <section id="contact" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Context Left Column */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 font-bold">Encrypted Link</span>
                <h2 className="text-sm font-display font-black tracking-widest uppercase text-white flex items-center gap-1.5 animate-pulse">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  Binding Vow Registry
                </h2>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Establishing a "Binding Vow" links direct secure parameters for joint operations. Coordinate positions or query software solutions instantly.
              </p>

              {/* Direct connection coordinates card in Gojo style */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-none space-y-2 font-mono text-[11px] text-gray-300">
                <div className="font-bold text-cyan-400 uppercase text-[9px] tracking-widest border-b border-white/5 pb-2 mb-2">
                  Direct Frequencies
                </div>
                <div>
                  <span className="text-[#a855f7]">STARTUP:</span> <a href="https://riksaansds.netlify.app/" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">Riksaan SDS</a>
                </div>
                <div>
                  <span className="text-purple-400">SMTP:</span> patrasayan883@gmail.com
                </div>
                <div>
                  <span className="text-cyan-400">SIGNAL:</span> +91 6289435087
                </div>
                <div>
                  <span className="text-pink-400">INSTAGRAM:</span> <a href="https://www.instagram.com/patrasayan0926?igsh=Z2twN3pocnZ3bjJy" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">@patrasayan0926</a>
                </div>
                <div>
                  <span className="text-gray-400">TELEGRAM:</span> NDAxCloak
                </div>
              </div>
            </div>

            {/* Submission card right column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Styled Footer in Gojo format */}
      <footer className="mt-20 border-t border-white/10 bg-[#0c0c0e]/80 py-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wide text-gray-400">© 2026 RIKSAAN SDS // S. PATRA ARCHIVE</p>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest">FOUNDER & LEAD DEVELOPER // OPERATIONS ARCHITECT</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-none bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
              <span className="text-gray-500 uppercase tracking-widest text-[9px]">Status: Optimal</span>
            </div>
            <span className="text-gray-700">|</span>
            <a
              id="footer-riksaan-link"
              href="https://riksaansds.netlify.app/"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-[#a855f7] font-extrabold text-[#a855f7] transition-colors uppercase tracking-wider"
            >
              Riksaan SDS
            </a>
            <a
              id="footer-github-link"
              href="https://github.com/NDAxCloak"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-cyan-400 transition-colors uppercase font-bold tracking-wider"
            >
              GitHub
            </a>
            <a
              id="footer-linkedin-link"
              href="https://linkedin.com/in/patrasayan"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-cyan-400 transition-colors uppercase font-bold tracking-wider"
            >
              LinkedIn
            </a>
            <a
              id="footer-instagram-link"
              href="https://www.instagram.com/patrasayan0926?igsh=Z2twN3pocnZ3bjJy"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-cyan-400 transition-colors uppercase font-bold tracking-wider"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
