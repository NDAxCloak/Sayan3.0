import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, FileCheck, RefreshCw, AlertCircle, ShieldAlert } from "lucide-react";
import { updateAnalytics } from "./AnalyticsPanel";

interface BindingVowData {
  name: string;
  email: string;
  purpose: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<BindingVowData>({
    name: "",
    email: "",
    purpose: "recruitment",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sealing the binding vow in 1.2s delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Track submission inside localStorage
      updateAnalytics((prev) => ({
        ...prev,
        contactFormSubmissions: prev.contactFormSubmissions + 1,
      }));
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      purpose: "recruitment",
      message: "",
    });
    setIsSuccess(false);
  };

  return (
    <div
      id="contact-vow-container"
      className="p-6 bg-cyan-500 text-black rounded-none border border-cyan-400 relative overflow-hidden"
    >
      {/* Editorial accents */}
      <div className="absolute top-0 right-0 p-3 text-black/10 text-4xl italic font-black font-mono pointer-events-none select-none">
        VOICE
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            id="vow-submission-form"
            key="vow-form-key"
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5 text-black">
                <ShieldAlert className="w-4 h-4 text-black animate-pulse" />
                Initiate Connection (Binding Vow)
              </h3>
              <p className="text-black/80 text-[11px] mt-1 leading-relaxed font-sans">
                Establish high-priority Operations or Developer coordination. Sayan pledges swift workflow optimization audits.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {/* Name field */}
              <div className="space-y-1">
                <label htmlFor="input-vow-name" className="text-[9px] uppercase font-bold opacity-70 block">
                  Subject Identity (Name) *
                </label>
                <input
                  id="input-vow-name"
                  type="text"
                  required
                  placeholder="Name/Entity/Clan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/10 border-b border-black/30 p-2 text-xs focus:outline-none focus:border-black placeholder-black/30 font-sans"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label htmlFor="input-vow-email" className="text-[9px] uppercase font-bold opacity-70 block">
                  Signal Frequency (Email) *
                </label>
                <input
                  id="input-vow-email"
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/10 border-b border-black/30 p-2 text-xs focus:outline-none focus:border-black placeholder-black/30 font-sans"
                />
              </div>

              {/* Purpose field */}
              <div className="space-y-1">
                <label htmlFor="select-vow-purpose" className="text-[9px] uppercase font-bold opacity-70 block">
                  Covenant Designation
                </label>
                <select
                  id="select-vow-purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-black/10 border-b border-black/30 p-2 text-xs focus:outline-none focus:border-black font-sans appearance-none"
                >
                  <option value="recruitment" className="bg-cyan-600 text-white">Full-Time Operations Engagement</option>
                  <option value="automation" className="bg-cyan-600 text-white">Workflow Optimization Task</option>
                  <option value="freelance" className="bg-cyan-600 text-white">Web Development Project</option>
                  <option value="intel" className="bg-cyan-600 text-white">General Insight Inquiry</option>
                </select>
              </div>

              {/* Message field */}
              <div className="space-y-1">
                <label htmlFor="textarea-vow-message" className="text-[9px] uppercase font-bold opacity-70 block">
                  Transmission Details *
                </label>
                <textarea
                  id="textarea-vow-message"
                  required
                  rows={3}
                  placeholder="Describe your operational bottleneck or project outline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/10 border-b border-black/30 p-2 text-xs focus:outline-none focus:border-black placeholder-black/30 font-sans resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                id="btn-seal-binding-vow"
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-black text-white text-[10px] py-3 uppercase tracking-widest font-bold mt-2 hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Channelling Energy...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Seal Covenant
                  </span>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            id="vow-sealed-receipt"
            key="vow-success-key"
            className="space-y-4 py-6 text-center text-black"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-black/10 border border-black/35 rounded-full flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6 text-black animate-bounce" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs uppercase tracking-widest font-black text-black">
                Binding Vow Sealed
              </h3>
              <p className="text-black/80 text-[11px] max-w-sm mx-auto font-sans leading-relaxed">
                Your parameters are locked into Sayan's regional terminal system. Anticipate a dynamic return signal shortly.
              </p>
            </div>

            {/* Signed Pact receipt details */}
            <div className="p-3 bg-black/15 border border-black/20 rounded-none font-mono text-[9px] text-left text-black/90 space-y-1 max-w-xs mx-auto">
              <div>
                <span className="font-bold">STATUS:</span> OPERATIONAL_RESONANCE
              </div>
              <div className="truncate">
                <span className="font-bold">SENDER:</span> {formData.name}
              </div>
              <div>
                <span className="font-bold">PACT:</span> {formData.purpose.toUpperCase()}
              </div>
            </div>

            <div className="pt-2">
              <button
                id="btn-vow-form-reset"
                onClick={handleReset}
                className="text-[10px] font-mono px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                Establish Another Pact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
