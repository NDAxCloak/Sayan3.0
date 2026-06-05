import { useState } from "react";
import { Download, FileText, Printer, CheckCircle, Copy, FileCode } from "lucide-react";
import { updateAnalytics } from "./AnalyticsPanel";

export default function ResumeDownload() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadMarkdown = () => {
    // Generate Sayan's clean Markdown resume for the recruiter's quick import
    const resumeText = `# SAYAN PATRA
Howrah, Kolkata, India | +91 6289435087 | patrasayan883@gmail.com
GitHub: github.com/NDAxCloak | LinkedIn: linkedin.com/in/patrasayan

## PROFESSIONAL HEADLINE
Tech-Enabled Operations Specialist | Data Analytics | Workflow Automation

## PROFESSIONAL SUMMARY
Tech-enabled Operations Specialist with a passion for using data, automation, and technology to solve business challenges and drive operational excellence. Experienced in optimizing workflows, automating reporting processes, and supporting digital initiatives through analytics and frontend development capabilities. Micro1 certified Full Stack Developer.

## EDUCATION
- **Calcutta University** - Bachelor of Arts, 2026
- **WEBEL Institute** - Diploma in Software Application, 2022
- **tutedude (IIT Delhi Alumni Academic Initiative)** - Full Stack Web Development Certification, 2026
- **Santragachi Kedarnath Institution** - High School Diploma, 2020

## WORK EXPERIENCE
### BAAZAR STYLE RETAIL LTD | Senior Operations & Business Associate, Accounts
*Feb 2025 - Apr 2026 | Kolkata, India*
- Managed high-volume POS financial reconciliation with 99.8%+ accuracy.
- Analyzed transaction trends across pilot cluster grids to report on inventory shrinkage and cashier speed metrics.
- Developed cash training procedures, improving active counter checkout velocity by 25%.

### DIGITAL SOLUTIONS & AUTOMATION CONSULTANT | Software tester and developer
*Aug 2024 - Feb 2025 | Kolkata, India*
- Engineered Python automated reporting scripts, saving clients 15+ administrative hours weekly.
- Designed analytical dashboards using Power BI and custom JS metrics tracking sales channels.
- Developed testing architectures, resolving severe database/logic conflicts before client release schedules.

### Startup Project Developer | Freelancer
*May 2022 - Dec 2025 | Kolkata, India*
- Developed responsive web assets and payment micro-gateways for e-commerce, improving conversion indices.

## CORE SKILLS
- **Technical**: JavaScript, HTML5, CSS3, REST APIs, Python scripting, automated web scrapers.
- **Tools**: Advanced Excel (Macros, Pivots), Power BI, SQL, Dashboard analytics.
- **Operations & Soft**: Team Coordination, Process Improvement, KPI Audits, Problem-Solving.
`;

    const blob = new Blob([resumeText], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Sayan_Patra_Resume_Automation.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Track download in localStorage
    updateAnalytics((prev) => ({
      ...prev,
      resumeDownloads: prev.resumeDownloads + 1,
    }));

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("patrasayan883@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="resume-hub-component"
      className="p-6 bg-white/5 border border-white/10 rounded-none space-y-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold text-cyan-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-cyan-400" />
            Resume Dossier Station
          </h3>
          <p className="text-gray-400 text-xs mt-2 leading-relaxed font-sans">
            Download Sayan's credentials optimized for automatic parsed workflows, or copy direct SMTP frequencies.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1 font-mono">
        <button
          id="btn-download-resume-markdown"
          onClick={handleDownloadMarkdown}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 px-3 text-[10px] uppercase tracking-widest font-bold bg-cyan-500/5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-none transition-all duration-300"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Retrieved!
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              Download Dossier
            </>
          )}
        </button>

        <button
          id="btn-copy-email-fast"
          onClick={copyToClipboard}
          className="flex-shrink-0 flex items-center justify-center gap-1 py-2 px-3 text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded-none transition-all duration-300"
          title="Copy Sayan's Email address to clipboard"
        >
          {copied ? (
            <>
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-gray-400" />
              Email Signal
            </>
          )}
        </button>

        <button
          id="btn-trigger-print-window"
          onClick={() => {
            window.print();
            updateAnalytics((prev) => ({
              ...prev,
              resumeDownloads: prev.resumeDownloads + 1,
            }));
          }}
          className="flex-shrink-0 flex items-center justify-center gap-1 py-2 px-3 text-[10px] uppercase tracking-widest bg-purple-500/5 border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 rounded-none transition-all duration-300"
          title="Open printable browser mode"
        >
          <Printer className="w-3.5 h-3.5" />
          Print Frame
        </button>
      </div>
    </div>
  );
}
