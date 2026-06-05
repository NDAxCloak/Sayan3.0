import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Activity, Radio, BarChart3, Users, Download, HelpCircle, Flame, Eye } from "lucide-react";
import { VisitorAnalytics } from "../types";

// Helper keys for localStorage
const ANALYTICS_KEY = "sayan_portfolio_analytics_v1";

const defaultAnalytics: VisitorAnalytics = {
  pageViews: 1,
  domainExpansionsActive: 0,
  sectionHits: {
    hero: 1,
    experience: 0,
    projects: 0,
    skills: 0,
    blogs: 0,
    contact: 0,
  },
  skillsExpanded: {
    technical: 0,
    business: 0,
    soft: 0,
  },
  likesCount: {
    "ai-shadow-clone": 0,
    "divergent-fist-analytics": 0,
    "domain-expansion-visuals": 0,
  },
  contactFormSubmissions: 0,
  resumeDownloads: 0,
};

// Singleton tracking helper that component can call
export function getStoredAnalytics(): VisitorAnalytics {
  if (typeof window === "undefined") return defaultAnalytics;
  const stored = localStorage.getItem(ANALYTICS_KEY);
  if (!stored) {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(defaultAnalytics));
    return defaultAnalytics;
  }
  try {
    const parsed = JSON.parse(stored);
    // Fill in keys if they are missing
    return { ...defaultAnalytics, ...parsed, sectionHits: { ...defaultAnalytics.sectionHits, ...parsed.sectionHits }, skillsExpanded: { ...defaultAnalytics.skillsExpanded, ...parsed.skillsExpanded }, likesCount: { ...defaultAnalytics.likesCount, ...parsed.likesCount } };
  } catch (e) {
    return defaultAnalytics;
  }
}

export function updateAnalytics(updater: (current: VisitorAnalytics) => VisitorAnalytics) {
  if (typeof window === "undefined") return;
  const current = getStoredAnalytics();
  const updated = updater(current);
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(updated));
  // Dispatch custom event for listener re-renders
  window.dispatchEvent(new Event("sayan_analytics_updated"));
}

export function trackSectionView(sectionId: string) {
  updateAnalytics((prev) => {
    const sectionHits = { ...prev.sectionHits };
    if (sectionHits[sectionId] !== undefined) {
      sectionHits[sectionId] += 1;
    } else {
      sectionHits[sectionId] = 1;
    }
    return { ...prev, sectionHits };
  });
}

// Global visitor mock estimates (simulating combined recruiter telemetry to look professional)
const combinedTelemetry = {
  globalViews: 2438,
  activeSorcerers: 14,
  pactsClosed: 42,
  averageAttentionSeconds: 154,
};

interface AnalyticsPanelProps {
  onCollapse?: () => void;
  isDomainExpanded?: boolean;
}

export default function AnalyticsPanel({ onCollapse, isDomainExpanded }: AnalyticsPanelProps) {
  const [localData, setLocalData] = useState<VisitorAnalytics>(defaultAnalytics);
  const [activeTab, setActiveTab] = useState<"personal" | "global">("personal");

  // Sync state with local storage updates
  useEffect(() => {
    setLocalData(getStoredAnalytics());

    const handleUpdate = () => {
      setLocalData(getStoredAnalytics());
    };

    window.addEventListener("sayan_analytics_updated", handleUpdate);
    return () => window.removeEventListener("sayan_analytics_updated", handleUpdate);
  }, []);

  // Increment view count on mount
  useEffect(() => {
    updateAnalytics((prev) => ({
      ...prev,
      pageViews: prev.pageViews + 1,
    }));
  }, []);

  const totalHits = (Object.values(localData.sectionHits) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div
      id="analytics-dashboard-panel"
      className="p-6 bg-[#0c0c0e] border border-white/10 rounded-none shadow-none backdrop-blur-md"
    >
      {/* Panel Nav/Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1 px-2.5 text-[9px] font-mono tracking-widest text-cyan-400 border border-cyan-500/30 bg-cyan-500/5 rounded-none uppercase font-bold animate-pulse">
            System Live
          </div>
          <h2 className="text-sm font-display font-black tracking-widest uppercase text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            Cursed Telemetry HUD
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex p-0.5 rounded-none bg-black/40 border border-white/10">
          <button
            id="tab-btn-personal"
            onClick={() => setActiveTab("personal")}
            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest rounded-none transition-colors ${
              activeTab === "personal"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Your Pact Activity
          </button>
          <button
            id="tab-btn-global"
            onClick={() => setActiveTab("global")}
            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest rounded-none transition-colors ${
              activeTab === "global"
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Global Base
          </button>
        </div>
      </div>

      {activeTab === "personal" ? (
        <div className="mt-6 space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Your Visits</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-cyan-400">{localData.pageViews}</span>
                <span className="text-[10px] text-gray-500 font-mono">cycles</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Domain Flips</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-purple-400">{localData.domainExpansionsActive}</span>
                <span className="text-[10px] text-gray-500 font-mono">triggers</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Inquiry Pacts</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-emerald-400">{localData.contactFormSubmissions}</span>
                <span className="text-[10px] text-gray-500 font-mono">sent</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Resume Pulled</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-amber-400">{localData.resumeDownloads}</span>
                <span className="text-[10px] text-gray-500 font-mono">loads</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section Clicks Tracker */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-none space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-gray-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Interest Distribution Across Areas
              </h3>
              <div className="space-y-3 pt-1 font-mono">
                {Object.entries(localData.sectionHits).map(([sec, val]) => {
                  const pct = totalHits > 0 ? Math.round(((val as number) / totalHits) * 100) : 0;
                  return (
                    <div key={sec} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="capitalize text-gray-300">{sec}</span>
                        <span className="text-gray-400">
                          {val as number} hits <span className="text-cyan-400">({pct}%)</span>
                        </span>
                      </div>
                      <div className="h-1 bg-black rounded-none overflow-hidden">
                        <motion.div
                          className="h-full bg-cyan-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cursed Energy Levels & Skill Interactions */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-none flex flex-col justify-between space-y-4 font-mono">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-300 flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
                  <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  Your Active Skill Synergy Level
                </h3>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-none bg-black/40 border border-white/10">
                    <span className="text-[10px] text-gray-400 block uppercase">Technical</span>
                    <span className="text-base font-black font-display text-cyan-400 mt-1 block">
                      {(((localData.skillsExpanded["technical"] as number) || 0) * 10 + 20)}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-none bg-black/40 border border-white/10">
                    <span className="text-[10px] text-gray-400 block uppercase">Analytics</span>
                    <span className="text-base font-black font-display text-purple-400 mt-1 block">
                      {(((localData.skillsExpanded["business"] as number) || 0) * 15 + 15)}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-none bg-black/40 border border-white/10">
                    <span className="text-[10px] text-gray-400 block uppercase">Soft Ops</span>
                    <span className="text-base font-black font-display text-emerald-400 mt-1 block">
                      {(((localData.skillsExpanded["soft"] as number) || 0) * 12 + 30)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono leading-relaxed text-gray-400 p-3 rounded-none bg-black/40 border border-white/10">
                <span className="text-purple-400 font-bold uppercase text-[9px] tracking-wider block mb-1">Verdict:</span> Each time you toggle Sayan's skill specifications, the telemetry potential resonance increments.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Estimated Recruiter Base */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Recruiter Inbound</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-purple-400">{combinedTelemetry.globalViews}</span>
                <span className="text-[10px] text-gray-500 font-mono">views</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Active Sessions</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-pink-400">{combinedTelemetry.activeSorcerers}</span>
                <span className="text-[10px] text-gray-500 font-mono">live</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Agreements</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-emerald-400">{combinedTelemetry.pactsClosed}</span>
                <span className="text-[10px] text-gray-500 font-mono">pacts</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="text-gray-400 text-[9px] uppercase tracking-widest font-mono block">Average Attention</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-display text-cyan-400">{combinedTelemetry.averageAttentionSeconds}s</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-none text-center py-10">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-none flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold font-sans text-white mb-2 uppercase tracking-wide">Global Density Coordinator</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Frequent signals originate from the **Greater Kolkata Tech Grid** and **International SaaS corridors** seeking operational audit optimization specialists.
            </p>
          </div>
        </div>
      )}

      {/* Collapse Dashboard CTA */}
      {onCollapse && (
        <div className="mt-6 flex justify-end">
          <button
            id="close-analytics-hud"
            onClick={onCollapse}
            className="text-[10px] uppercase font-mono tracking-widest px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all duration-300 active:scale-95 rounded-none font-bold"
          >
            Collapse Telemetry View
          </button>
        </div>
      )}
    </div>
  );
}
