/* ============================================================
   PROFILE DATA — single source of truth for the whole site.
   ⚠️  TODO(handles): confirm the 4 values below before deploy.
   Live Codeforces/LeetCode heatmaps read these handles.
   ============================================================ */

export const HANDLES = {
  github: "anmol-284",
  linkedin: "https://www.linkedin.com/in/anmol-sahu-0a237225a/",
  leetcode: "Anmol_Sahu",
  codeforces: "Graph_01",
} as const;

// Free Web3Forms access key — paste yours from https://web3forms.com (takes 30s,
// just enter your email). When set, the contact form delivers straight to your
// inbox. Left blank, the form falls back to opening the visitor's mail client.
export const CONTACT_FORM_KEY = "8b9d414f-42a9-44ae-9476-0b9f4309dbb2";

export const profile = {
  name: "Anmol Sahu",
  firstName: "Anmol",
  initials: "AS",
  // Recruiter-facing one-liner
  title: "Software Engineer",
  roles: [
    "Backend Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "Problem Solver",
  ],
  tagline:
    "I build fast, production-grade backends and the polished frontends that sit on top of them.",
  // Hero paragraph
  summary:
    "SDE Intern at Leap Finance shipping fintech features to production. I cut API latency by 60% with Elasticsearch, build Spring Boot + PostgreSQL services, and craft Next.js interfaces — backed by a competitive-programming habit (LeetCode Knight, 2199+ problems solved).",
  location: "Bengaluru, India",
  email: "anmolsahu8423@gmail.com",
  phone: "+91 7318143883",
  availability: "Open to SWE / Full-Stack / Backend roles · 2026",
  resumeUrl: "/Anmol-Sahu-Resume.pdf",
} as const;

export const socials = [
  { label: "GitHub", href: `https://github.com/${HANDLES.github}`, icon: "github" },
  { label: "LinkedIn", href: HANDLES.linkedin, icon: "linkedin" },
  { label: "LeetCode", href: `https://leetcode.com/u/${HANDLES.leetcode}`, icon: "code" },
  { label: "Codeforces", href: `https://codeforces.com/profile/${HANDLES.codeforces}`, icon: "trophy" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
] as const;

/* ---------------- Headline metrics (animated counters) ---------------- */
export const metrics = [
  { value: 60, suffix: "%", label: "API latency cut", sub: "via Elasticsearch" },
  { value: 2199, suffix: "+", label: "DSA problems", sub: "solved" },
  { value: 1935, suffix: "", label: "Peak rating", sub: "LeetCode (Knight)" },
  { value: 8.98, suffix: "", label: "CGPA", sub: "NIT Allahabad", decimals: 2 },
] as const;

/* ---------------- Experience ---------------- */
export const experience = [
  {
    company: "Leap Finance",
    role: "Software Development Engineer Intern",
    period: "Jan 2026 — Jun 2026",
    location: "Bengaluru, India",
    summary:
      "Shipping production fintech features across the stack on the onboarding & eligibility platform.",
    highlights: [
      "Engineered Elasticsearch-based search optimization that cut API response time by 60%.",
      "Built production-grade onboarding workflows with Next.js 13, React and TypeScript.",
      "Developed RESTful API endpoints in Spring Boot backed by PostgreSQL.",
      "Authored database migration scripts and schema updates for onboarding & eligibility flows.",
      "Debugged production issues — re-renders, state inconsistencies and form edge cases.",
      "Owned changes through code reviews, sprint planning and production release cycles.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Spring Boot", "PostgreSQL", "Elasticsearch"],
  },
] as const;

/* ---------------- Projects ---------------- */
export const projects = [
  {
    name: "EarnDrive",
    kind: "Bike Booking & Rental Platform",
    year: "2024",
    accent: "violet",
    problem:
      "Bike owners had no simple way to monetize idle vehicles, and renters lacked a trusted, secure platform with real payments.",
    solution:
      "A full-stack marketplace where users list and rent bikes with secure auth, online payments and optimized media handling.",
    highlights: [
      "Secure JWT auth for signup/login and protected routes.",
      "Razorpay-powered checkout for real online payments.",
      "Cloudinary pipeline for optimized vehicle image & document storage.",
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "Cloudinary", "TailwindCSS"],
    impact: "End-to-end marketplace: auth → listing → payment → fulfillment.",
    live: "https://earn-drivee.vercel.app/",
    source: "https://github.com/anmol-284",
  },
  {
    name: "StudyNotion",
    kind: "E-Learning Platform",
    year: "2024",
    accent: "cyan",
    problem:
      "Instructors and students needed one place to publish, manage, buy and consume online courses with clear role boundaries.",
    solution:
      "A role-based EdTech platform: instructors author and manage courses; students browse, purchase and learn.",
    highlights: [
      "Role-based access control separating instructor and student capabilities.",
      "Full course lifecycle — create, manage, publish and purchase.",
      "Cloudinary-backed media storage and delivery for course content.",
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "Cloudinary", "TailwindCSS"],
    impact: "Complete EdTech flow with separate instructor & student journeys.",
    live: "https://study-notion-frontend-drab-iota.vercel.app/",
    source: "https://github.com/anmol-284",
  },
] as const;

/* ---------------- Skills (galaxy + categories) ---------------- */
export const skillGroups = [
  {
    category: "Languages",
    color: "violet",
    skills: ["C++", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Frontend",
    color: "cyan",
    skills: ["React", "Next.js", "TailwindCSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    color: "emerald",
    skills: ["Spring Boot", "Node.js", "Express.js", "REST APIs"],
  },
  {
    category: "Databases",
    color: "amber",
    skills: ["PostgreSQL", "MongoDB", "Elasticsearch"],
  },
  {
    category: "DevOps & Tools",
    color: "indigo",
    skills: ["Jenkins", "BitBucket", "Git / GitHub", "Metabase"],
  },
  {
    category: "CS Fundamentals",
    color: "violet",
    skills: ["DSA", "OOP", "Operating Systems", "DBMS"],
  },
] as const;

/* ---------------- Achievements ---------------- */
export const achievements = [
  {
    title: "Code with Cisco '25 — Finalist",
    detail: "Selected as a national finalist from 30,000+ applications.",
    tag: "Hackathon",
    icon: "trophy",
  },
  {
    title: "Gold Medal — Highest SPI 9.52",
    detail: "Top academic rank in the Production & Industrial Engineering branch.",
    tag: "Academic",
    icon: "medal",
  },
  {
    title: "LeetCode Knight · Peak 1935",
    detail: "Top 3.65% of all LeetCode users.",
    tag: "Competitive",
    icon: "swords",
  },
  {
    title: "845th / 35,000+ — Weekly Contest 453",
    detail: "Top-percentile finish in a global LeetCode weekly contest.",
    tag: "Competitive",
    icon: "zap",
  },
  {
    title: "Codeforces Pupil · 700+ solved",
    detail: "700+ algorithmic problems solved across platforms.",
    tag: "Competitive",
    icon: "code",
  },
  {
    title: "Mechathon — Top 3 Finalist",
    detail: "Prestigious team web-dev event, MNNIT Avishkar 2024.",
    tag: "Hackathon",
    icon: "rocket",
  },
] as const;

/* ---------------- Leadership ---------------- */
export const leadership = [
  {
    role: "Training & Placement Representative",
    org: "NIT Allahabad",
    period: "Jan 2024 — Present",
    detail: "Coordinated placement operations and recruiter–student alignment for 2000+ candidates.",
  },
  {
    role: "DUGC Member",
    org: "NIT Allahabad",
    period: "Aug 2023 — Present",
    detail: "Represented 200+ students in academic discussions, bridging faculty communication.",
  },
  {
    role: "Student Mentor",
    org: "NIT Allahabad",
    period: "Jan 2024 — Present",
    detail: "Mentored 50+ students, strengthening their problem-solving and analytical skills.",
  },
] as const;

/* ---------------- Education ---------------- */
export const education = [
  {
    school: "Motilal Nehru National Institute of Technology, Allahabad",
    degree: "B.Tech, Production & Industrial Engineering",
    period: "2022 — Present",
    score: "CPI 8.98 / 10",
  },
  {
    school: "Rose Academy Senior Secondary School, Jaipur",
    degree: "Senior Secondary (RBSE)",
    period: "2022",
    score: "92%",
  },
  {
    school: "Rashtrakavi Maithili Sharan Gupt Public School, Chirgaon",
    degree: "Secondary (CBSE)",
    period: "2020",
    score: "91.5%",
  },
] as const;

/* ---------------- Developer journey (timeline) ---------------- */
export const journey = [
  {
    year: "2022",
    title: "Started at NIT Allahabad",
    detail: "Began B.Tech and discovered programming through C++ and DSA.",
    tech: ["C++", "DSA"],
  },
  {
    year: "2023",
    title: "Into the deep end of CS",
    detail: "OOP, OS, DBMS and competitive programming on Codeforces & LeetCode.",
    tech: ["Java", "OOP", "Codeforces"],
  },
  {
    year: "2024",
    title: "Full-stack builder",
    detail: "Shipped EarnDrive & StudyNotion; Top-3 at Mechathon; took on T&P leadership.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    year: "2025",
    title: "Competitive peak",
    detail: "LeetCode Knight (1935), Cisco '25 finalist from 30,000+ applicants.",
    tech: ["C++", "Algorithms"],
  },
  {
    year: "2026",
    title: "Production engineer @ Leap Finance",
    detail: "Real fintech impact: 60% faster APIs, Spring Boot services, Next.js features.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Elasticsearch"],
  },
] as const;

/* ---------------- Competitive-programming stats ---------------- */
export const cpStats = {
  leetcode: {
    rank: "Knight",
    rating: 1935,
    percentile: "Top 3.65%",
    solved: "1286",
    bestContest: "845th / 35,000+",
  },
  codeforces: {
    rank: "Pupil",
    solved: "913",
  },
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "coding", label: "Coding" },
  { id: "contact", label: "Contact" },
] as const;
