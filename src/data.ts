import { Project, Experience, Education, SkillCategory, BlogPost } from "./types";

export const ProjectsData: Project[] = [
  {
    id: "ai-productivity-assistant",
    title: "AI Productivity Assistant",
    subtitle: "Python Automation & Workflow Optimization",
    category: "automation",
    duration: "2026",
    description: [
      "Designed and developed a Python-based AI productivity assistant to automate repetitive business processes across Excel, Word, Power BI, and web-based applications.",
      "Engineered automated workflows for spreadsheet management, report generation, document creation, and routine administrative tasks, accelerating task completion by 80%.",
      "Integrated Python libraries including Pandas, OpenPyXL, Python-Docx, and Pyttsx3 to build scalable spreadsheet processors that enhanced accuracy and eliminated manual oversight.",
      "Implemented a modular framework supporting intelligent task-execution and natural language report querying for non-technical retail and operations team members."
    ],
    skills: ["Python", "Pandas", "OpenPyXL", "Pyttsx3", "Excel Automation", "KPI Processing"],
    stats: [
      { label: "Efficiency Boost", value: "+80%" },
      { label: "Manual Effort Saved", value: "20 hrs/wk" },
      { label: "Data Accuracy", value: "99.9%" }
    ],
    jjkGrade: "Special Grade cursed tool",
    cursedEnergyCost: 85
  },
  {
    id: "ecommerce-beast",
    title: "Eco-Energy Cart",
    subtitle: "High-Throughput E-commerce Stack",
    category: "development",
    duration: "2024 - 2025",
    description: [
      "Architected and deployed over 3 high-impact e-commerce platforms with integrated live inventory syncing, secure electronic checkout streams, and automated invoicing.",
      "Developed interactive mobile-first user interfaces using modern CSS frameworks and optimized state management, boosting mobile conversion rate metrics by over 40%.",
      "Built clean, audited RESTful backend gateways and custom-tuned relational schema queries capable of handling over 1000 active daily transactions."
    ],
    skills: ["JavaScript", "HTML5", "CSS3", "REST APIs", "SQL", "Node.js", "State Management"],
    stats: [
      { label: "Mobile Usability", value: "+40%" },
      { label: "Daily Transactions", value: "1,000+" },
      { label: "Platforms Deployed", value: "3" }
    ],
    jjkGrade: "Grade 1 Cursed Technique",
    cursedEnergyCost: 70
  },
  {
    id: "baazar-operation-dashboard",
    title: "Baazar Retail Intelligence",
    subtitle: "Interactive KPI Metrics & Sales Analyzer",
    category: "analytics",
    duration: "2025 - 2026",
    description: [
      "Consolidated multi-stream point-of-sale datasets into unified high-visibility operational cockpits tracking gross margins, inventory shrinkage rates, and average ticket size.",
      "Designed predictive models within Power BI and advanced Excel environments to identify peak traffic periods, guiding floor deployment and checkout allocation schemas.",
      "Translated raw auditing records into actionable reports, driving shrinkage reductions of 12% across pilot Bengal retail clusters."
    ],
    skills: ["Power BI", "Advanced Excel", "Sales Auditing", "KPI Tracking", "Root Cause Analysis", "Data Visualization"],
    stats: [
      { label: "Shrinkage Saved", value: "12%" },
      { label: "Bengal Cluster Ranking", value: "Top 3" },
      { label: "Reconciliation Accuracy", value: "99.8%" }
    ],
    jjkGrade: "Grade 1 Barrier Domain",
    cursedEnergyCost: 65
  }
];

export const ExperiencesData: Experience[] = [
  {
    id: "baazar-style",
    role: "Senior Operations & Business Associate, Accounts",
    company: "BAAZAR STYLE RETAIL LTD",
    location: "Kolkata, India",
    period: "Feb 2025 – Apr 2026",
    isCurrent: false,
    bullets: [
      "Managed high-volume financial POS business transactions, ensuring 99.8%+ reconciliation accuracy and audit compliance.",
      "Generated daily sales/operational analytical reports, translating dense ledger files into strategic presentations for regional directors.",
      "Collaborated with cross-functional inventory teams during store layout updates, raising average basket value and tracking peak-hour throughput.",
      "Assisted in training checkout staff, reducing register bottleneck periods by 25% through standardized queue-clearing procedures."
    ],
    type: "operations",
    jjkRoleGrade: "Grade 1 Sorcerer"
  },
  {
    id: "baazar-trainee",
    role: "Trainee Head Cashier / Lead Cashier",
    company: "BAAZAR STYLE RETAIL LTD",
    location: "Howrah, India",
    period: "Feb 2025 – Jan 2026",
    bullets: [
      "Ensured maximum till accuracy and supervised multi-lane POS checkout grids handling high cash intake volumes daily.",
      "Devised cash-handling compliance procedures that minimized discrepancies down to lower historical margins.",
      "Pioneered checkout cross-sales templates for active cashiers, increasing accessory add-on conversions at register bounds."
    ],
    type: "operations",
    jjkRoleGrade: "Semi-Grade 1 Sorcerer"
  },
  {
    id: "automation-consultant",
    role: "Digital Solutions & Automation Consultant",
    company: "Independent Freelance & Software Tester",
    location: "Kolkata, India",
    period: "Aug 2024 – Feb 2025",
    bullets: [
      "Spearheaded custom automated script injection, lowering client data entry duration by more than 15 hours a week.",
      "Formulated client dashboards and report generators via JavaScript and Power BI, mapping core metrics including pipeline bottlenecks and sales anomalies.",
      "Established comprehensive regression test cases, identifying critical functional flaws across 4 application releases prior to production rollouts."
    ],
    type: "consulting",
    jjkRoleGrade: "Special Grade Automation Wizard"
  },
  {
    id: "freelance-developer",
    role: "Full Stack Developer",
    company: "Startup Project Collaborator",
    location: "Kolkata, India",
    period: "May 2022 – Dec 2025",
    bullets: [
      "Engineered scalable UI code with high-performance responsive styling protocols, maintaining structural fidelity on ultra-small viewport dimensions.",
      "Integrated secure web hooks, email triggers, and payment processor sandboxes, delivering solid transactional end-to-end paths.",
      "Constructed custom local schemas to cache repeating queries, ensuring snappy transition states on remote networks."
    ],
    type: "engineering",
    jjkRoleGrade: "Grade 2 Developer"
  }
];

export const EducationsData: Education[] = [
  {
    id: "calcutta-univ",
    degree: "Bachelor of Arts",
    institution: "University of Calcutta",
    location: "Kolkata, India",
    year: "Graduated 2026"
  },
  {
    id: "webel",
    degree: "Diploma in Software Application",
    institution: "WEBEL Institute (West Bengal Electronics)",
    location: "Kolkata, India",
    year: "Graduated 2022"
  },
  {
    id: "tutedude",
    degree: "Full Stack Web Development Certification",
    institution: "tutedude (IIT Delhi Alumni Academic Initiative)",
    year: "Certified 2026"
  },
  {
    id: "high-school",
    degree: "Higher Secondary (12th Grid, High School Diploma)",
    institution: "Santragachi Kedarnath Institution",
    year: "Graduated 2020"
  }
];

export const SkillsData: SkillCategory[] = [
  {
    title: "Cursed Core Methods (Technical Skills)",
    grade: "Special Grade Spark",
    icon: "Cpu",
    flairColor: "from-cyan-500 to-blue-600",
    skills: ["JavaScript (ES6+)", "HTML5 & Semantic Web", "CSS3 / Tailwind Integration", "Node.js Runtime", "RESTful Interfaces", "Workflow Automation with AI"]
  },
  {
    title: "Domain Analysis (Business & Analytics)",
    grade: "Grade 1 Barrier",
    icon: "BarChart3",
    flairColor: "from-purple-500 to-fuchsia-600",
    skills: ["Advanced Excel (VLOOKUP, Pivots, Macros)", "Power BI Interactive Dashboards", "KPI Auditing & Performance Tracking", "Sales Data Root Cause Analysis", "Relational SQL Query Optimization"]
  },
  {
    title: "Shikigami Command (Leadership & Soft Skills)",
    grade: "Grade 1 Sorcerer",
    icon: "Users2",
    flairColor: "from-teal-500 to-emerald-600",
    skills: ["Team Leadership & Mentoring", "Cross-Functional Collaboration", "Problem-Solving Under Pressure", "High-Stakes Stakeholder Management", "Operations Bottleneck Audits", "Process Improvement Methodologies"]
  }
];

export const BlogsData: BlogPost[] = [
  {
    id: "ai-shadow-clone",
    title: "Unleashing the AI Shadow Clone: Automating Retail Workflow Chores",
    summary: "How I engineered a lightweight Python automated stack to eliminate 20 hours a week of physical spreadsheet data copying and reconciliation reporting.",
    date: "May 18, 2026",
    readTime: "5 min read",
    tags: ["Automation", "Python", "Business Efficiency"],
    engagement: { views: 142, likes: 64 },
    content: `
### The Chore: Manual Retail Ledgers
In our retail networks, we frequently received end-of-day register tallies across separate clusters as unstructured Excel sheets, text reports, and email bullet points. Traditionally, compiling this into a unified diagnostic report required an operations coordinator to open each file, copy rows, reconcile tax, and manually build Power BI tables.

### Summoning the Automation Shadow Clone
To solve this, I designed the parent script of the **AI Productivity Assistant**. Built strictly in Python using **Pandas** and **OpenPyXL**:
1. **Dynamic Ingestion Tracker**: The script watches a landing directory; as new ledgers land, it automatically detects their format (CSV, XLS, or TXT).
2. **Deterministic Reconciliation Loop**: It automatically matches cashier registers with bank deposit notifications via transaction timestamps to find discrepancies.
3. **Automated Document Synthesis**: It outputs formatted, styled executive Excel logs completely from code, then fires local audio triggers via **Pyttsx3** notifying the team of processing completion.

### High-Impact Outcomes
* **Manual hours slashed** from 22 hours per week to less than 2 minutes of automated computer execution.
* Corrected math discrepancies to a full 100% precision, preventing human copy-paste slip-ups.
* Allowed managers to visual-track sales peaks on their daily cockpit within 10 minutes of register shutdown.
    `
  },
  {
    id: "divergent-fist-analytics",
    title: "Divergent Fist: Balancing Real-World Operations with Full-Stack Code",
    summary: "Reflecting on the unique synergy between cashier management (people ops) and clean application architecture.",
    date: "June 02, 2026",
    readTime: "4 min read",
    tags: ["Productivity", "Careers", "Operations"],
    engagement: { views: 98, likes: 45 },
    content: `
### Explaining the Connection
At first glance, working as a Lead Cashier in a high-intensity retail workspace (Baazar Style Retail) and debugging full-stack JavaScript react components feel completely unrelated. But just like **Yuji Itadori's Divergent Fist**—where a delayed impact creates a double punch of kinetic force—these two paths multiply each other's strengths.

### Bottleneck Recognition
When thousands of clients queue at a retail cashier counter on holiday weekends, you learn exactly what "bottleneck latency" means. 
* *POS Lag* translates directly to angry queues.
* *Poor visual layout* slows the cashier's physical clicks by up to 3 seconds per customer.

Applying this operational mindset to full-stack engineering means I build applications focusing on:
1. **Minimalistic Cognitive Overhead**: Making buttons obvious and sizing touch boundaries to a standard 44px+ for tactile ease.
2. **Pre-fetching and Caching Data**: Shaving database query milliseconds to make screen transitions feel instant.
3. **Empathetic Layout Flow**: Minimizing the distance an eye must cover to gather context.
    `
  },
  {
    id: "domain-expansion-visuals",
    title: "The Ultimate Domain Expansion: Building High-Performance Visual Portfolios",
    summary: "A technical walkthrough on optimizing heavy web animations, custom cursed trail cursors, and local analytics in React without lagging low-spec mobile screens.",
    date: "June 05, 2026",
    readTime: "6 min read",
    tags: ["React", "CSS Tricks", "Framer Motion"],
    engagement: { views: 215, likes: 112 },
    content: `
### The Design Challenge
For Sayan's professional showcase, the prompt requested a **Jujutsu Kaisen** themed dark canvas with neon accents, dynamic canvas particles, custom animations, and complex cursor followers. While these make an applet feel extremely premium, unmanaged loops can easily drop frame rates to 15fps on mid-range cellphones.

### Optimizing animations with Framer Motion and standard CSS
Here are the core optimization strategies implemented in this portfolio's codebase:
1. **Accelerated Transformations**: Let CSS handle complex translation math where possible. We utilized Tailwind's transition classes and Framer Motion's GPU-bound attributes (\`scale\`, \`opacity\`, \`rotate\`, \`translate3d\`) to prevent browser paint updates from choking.
2. **Debounced Resizing**: Instead of reading cursor movements on every single microsecond, we bound the cursed-energy interactive element using standard state limits and CSS transition ease buffers.
3. **Durable Local Analytics Dashboard**: Rather than spamming cloud servers on every mouse hover, we tracked viewer actions inside a reactive \`localStorage\` schema. This allows users to test their own engagement indicators in real time!
    `
  }
];
