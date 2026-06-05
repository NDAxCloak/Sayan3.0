import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, Clock, ThumbsUp, ChevronDown, ChevronUp, AlignLeft, Sparkles } from "lucide-react";
import { BlogPost } from "../types";
import { BlogsData } from "../data";
import { updateAnalytics } from "./AnalyticsPanel";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>(BlogsData);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (blogId: string) => {
    if (expandedId === blogId) {
      setExpandedId(null);
    } else {
      setExpandedId(blogId);
      // Track section hits for blogs
      updateAnalytics((prev) => ({
        ...prev,
        sectionHits: {
          ...prev.sectionHits,
          blogs: (prev.sectionHits.blogs || 0) + 1,
        },
      }));
    }
  };

  const handleLike = (e: React.MouseEvent, blogId: string) => {
    e.stopPropagation(); // Avoid triggering expand/collapse

    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => {
        if (b.id === blogId) {
          const newLikes = b.engagement.likes + 1;
          
          // Sync with unified analytics tracker
          updateAnalytics((prev) => {
            const likesCount = { ...prev.likesCount };
            likesCount[blogId] = (likesCount[blogId] || 0) + 1;
            return {
              ...prev,
              likesCount,
            };
          });

          return {
            ...b,
            engagement: {
              ...b.engagement,
              likes: newLikes,
            },
          };
        }
        return b;
      })
    );
  };

  return (
    <div id="blog-panel-container" className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1 px-2.5 text-[9px] font-mono tracking-widest text-[#a855f7] border border-purple-500/20 bg-purple-950/20 rounded-none uppercase font-bold">
          Design Logs
        </div>
        <p className="text-[11px] text-gray-400 font-mono">
          Deciphering process optimization & automation patterns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blogs.map((b) => {
          const isExpanded = expandedId === b.id;

          return (
            <motion.div
              layout="position"
              id={`blog-card-${b.id}`}
              key={b.id}
              className={`p-5 transition-all duration-300 rounded-none border flex flex-col justify-between ${
                isExpanded
                  ? "bg-white/5 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/40"
              }`}
              onClick={() => toggleExpand(b.id)}
            >
              <div>
                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-gray-400 mb-2.5">
                  <span className="flex items-center gap-1 italic">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {b.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-purple-400" />
                    {b.readTime}
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto">
                    {b.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded-none bg-black/30 border border-white/5 text-gray-300 text-[9px] hover:border-purple-500/30 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-display font-bold text-white tracking-tight leading-snug cursor-pointer hover:text-cyan-400 transition-colors flex items-start justify-between gap-4">
                  {b.title}
                  <span className="text-gray-500 pt-0.5">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#a855f7]" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </h3>

                <p className="text-xs text-gray-400 mt-2 leading-relaxed font-sans">
                  {b.summary}
                </p>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`blog-expanded-body-${b.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-300 space-y-3 font-sans leading-relaxed selection:bg-[#a855f7]/30">
                      {/* Custom simplified markdown parser that renders bold paths properly */}
                      {b.content.split("\n\n").map((para, pIdx) => {
                        if (para.trim().startsWith("###")) {
                          return (
                            <h4 key={pIdx} className="text-sm font-bold text-white pt-2 flex items-center gap-1 text-cyan-300">
                              <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
                              {para.replace("###", "").trim()}
                            </h4>
                          );
                        } else if (para.trim().startsWith("*")) {
                          return (
                            <ul key={pIdx} className="list-disc pl-5 py-1 text-gray-300 space-y-1 font-sans">
                              {para
                                .split("\n")
                                .filter((item) => item.trim())
                                .map((listItem, lIdx) => (
                                  <li key={lIdx}>{listItem.replace("*", "").trim()}</li>
                                ))}
                            </ul>
                          );
                        } else if (para.trim().startsWith("1.")) {
                          return (
                            <ol key={pIdx} className="list-decimal pl-5 py-1 text-gray-300 space-y-1 font-sans">
                              {para
                                .split("\n")
                                .filter((item) => item.trim())
                                .map((listItem, lIdx) => (
                                  <li key={lIdx}>{listItem.replace(/^\d+\.\s*/, "").trim()}</li>
                                ))}
                            </ol>
                          );
                        }
                        
                        // Default paragraph
                        return (
                          <p key={pIdx} className="text-gray-300 leading-relaxed font-sans">
                            {para.trim()}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactions bar */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono text-gray-500">
                <span className="flex items-center gap-1 text-gray-400">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                  {b.engagement.views + (isExpanded ? 1 : 0)} Views
                </span>

                <button
                  id={`like-btn-${b.id}`}
                  onClick={(e) => handleLike(e, b.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/20 text-purple-400 hover:text-white rounded-none transition-all duration-200 active:scale-90"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
                  {b.engagement.likes} Likes
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
