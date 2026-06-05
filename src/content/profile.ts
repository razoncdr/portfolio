/**
 * Single source of truth for all portfolio content.
 *
 * Presentation (the React components) reads from this file and never hard-codes
 * copy. To update your rating, add a project, or tweak a bullet, edit HERE — you
 * shouldn't need to touch any component. Later phases (live Codeforces stats, a
 * blog index, etc.) can add new fields/files alongside this without disruption.
 */

export type Social = {
  label: string;
  href: string;
  /** icon key resolved in components/ui/icons.tsx */
  icon: "mail" | "github" | "linkedin" | "codeforces";
  /** shown as the visible handle/value */
  handle: string;
};

export type Skill = {
  category: string;
  items: string[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  /** achievement-oriented bullets */
  points: string[];
  /** tech tags surfaced as chips */
  stack: string[];
};

export type Project = {
  name: string;
  /** one-line pitch */
  tagline: string;
  description: string;
  stack: string[];
  status?: "In progress";
  /** optional links — fill these in when the repos/demos are public */
  repo?: string;
  demo?: string;
};

export type Achievement = {
  category: string;
  detail: string;
  /** optional profile link — category renders as a link when present */
  href?: string;
  /**
   * Stable discriminator for rows whose detail is overridden with live data.
   * The static `detail` doubles as the fallback when the API is unavailable.
   */
  source?: "leetcode";
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  result: string;
};

export type Stat = {
  /** short label, e.g. "Codeforces" */
  label: string;
  /** emphasised value, e.g. "Expert · 1745" */
  value: string;
  /**
   * Stable discriminator so a future live-stats fetcher (Phase 4) can target a
   * specific stat (e.g. overwrite the Codeforces value) without matching on the
   * display label.
   */
  source?: "codeforces" | "codechef" | "icpc" | "problems";
};

/** LeetCode username — used by the live-stats fetcher and the profile link. */
export const leetcodeHandle = "razoncdr";

export type Profile = {
  name: string;
  title: string;
  location: string;
  /** short hero blurb */
  tagline: string;
  /** longer About paragraph(s) */
  about: string[];
  email: string;
  socials: Social[];
  /** headline numbers shown in the hero */
  stats: Stat[];
  skills: Skill[];
  experience: Job[];
  projects: Project[];
  achievements: Achievement[];
  education: Education[];
  languages: string[];
};

export const profile: Profile = {
  name: "Rejwanul Haque Rajon",
  title: "Software Engineer · Backend-focused",
  location: "Sylhet, Bangladesh",
  tagline:
    "Backend engineer building enterprise data pipelines, BI systems, and real-time applications. Codeforces Expert who likes the parts where correctness and performance actually matter.",
  about: [
    "I'm a backend-focused software engineer with professional experience building enterprise data pipelines, in-house BI systems, and real-time applications. I work primarily in C# / ASP.NET Core with MongoDB, and I'm comfortable across the stack when a feature needs it.",
    "Competitive programming is where I sharpened my problem-solving: I'm a Codeforces Expert (max 1745) with 2500+ problems solved across platforms, and I've competed at ICPC Dhaka Regionals. That habit shows up in my work — I pick up new stacks quickly in production and care about getting the edge cases right.",
  ],
  email: "rejwanul7296@gmail.com",
  socials: [
    {
      label: "Email",
      href: "mailto:rejwanul7296@gmail.com",
      icon: "mail",
      handle: "rejwanul7296@gmail.com",
    },
    {
      label: "GitHub",
      href: "https://github.com/razoncdr",
      icon: "github",
      handle: "github.com/razoncdr",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rejwanul-haque-rajon-4b37aa282/",
      icon: "linkedin",
      handle: "in/rejwanul-haque-rajon-4b37aa282",
    },
    {
      // NOTE: verify this handle — I assumed "razoncdr" to match your GitHub/AtCoder.
      // Update href + handle in this one place if your Codeforces handle differs.
      label: "Codeforces",
      href: "https://codeforces.com/profile/razoncdr",
      icon: "codeforces",
      handle: "codeforces.com/profile/razoncdr",
    },
  ],
  stats: [
    { label: "Codeforces", value: "Expert · max 1745", source: "codeforces" },
    { label: "Problems solved", value: "2500+" },
    { label: "ICPC Dhaka Regional 2024", value: "Rank 33" },
    { label: "CodeChef", value: "5★ · max 2022" },
  ],
  skills: [
    {
      category: "Languages & Frameworks",
      items: [
        "C#",
        "ASP.NET Core",
        "Python (Django)",
        "C / C++",
        "JavaScript",
        "TypeScript",
        "React",
      ],
    },
    {
      category: "Databases",
      items: [
        "MongoDB",
        "MongoDB Aggregation Pipeline",
        "MSSQL",
        "SQLite",
        "Redis",
      ],
    },
    {
      category: "Architecture & Tools",
      items: [
        "Clean Architecture",
        "Microservices",
        "RabbitMQ",
        "Centrifugo",
        "Event Sourcing",
        "Command Consumer",
        "Power BI",
        "DAX",
        "Git",
        "GitHub",
      ],
    },
    {
      category: "Concepts",
      items: [
        "OOP",
        "RBAC",
        "Real-time Systems",
        "Event-Driven Architecture",
        "Data Visualisation",
      ],
    },
  ],
  experience: [
    {
      company: "Orbitax Bangladesh Limited",
      role: "Associate Software Engineer",
      period: "Nov 2025 – Present",
      location: "Dhaka, Bangladesh",
      points: [
        "Built Power BI dashboards for enterprise clients, then contributed to replacing Power BI with an in-house BI system — implementing DAX-equivalent measure logic and a full GMT Report.",
        "Delivered QDMTT data-fetching pipelines for four countries (Turkey, France, Ireland, Vietnam) using a complex query service that abstracts MongoDB and Excel behind SQL-like aggregation and transformations.",
        "Worked across a C# backend with MongoDB, RabbitMQ, Centrifugo, Command Consumers, and Event Sourcing.",
      ],
      stack: [
        "C#",
        "MongoDB",
        "RabbitMQ",
        "Centrifugo",
        "Command Consumers",
        "Event Sourcing",
        "Power BI",
        "DAX",
      ],
    },
    {
      company: "Appifylab",
      role: "Software Engineer Intern",
      period: "May 2025 – Oct 2025",
      location: "Sylhet, Bangladesh",
      points: [
        "Built an analytics dashboard for ezyStudio and a full webinar platform on the Cloudflare Realtime Kit SDK, with role-based sessions (host, presenter, viewer) including screen sharing and stage management.",
        "Picked up JavaScript, TypeScript, React, and SQL rapidly under production pressure — completed LeetCode's SQL 50 in three days.",
      ],
      stack: [
        "TypeScript",
        "React",
        "JavaScript",
        "SQL",
        "Cloudflare Realtime Kit",
      ],
    },
  ],
  projects: [
    {
      name: "TaskForge.NET",
      tagline: "Team-based task management with RBAC.",
      description:
        "Generic Repository + Unit of Work pattern, topological sort & DSU for task ordering, pagination, email verification, AJAX modals, and secure file attachments.",
      stack: ["ASP.NET Core", "Clean Architecture", "SQL Server", "RBAC"],
      repo: "https://github.com/Learnathon-By-Geeky-Solutions/brainstormers/tree/main/TaskForge.NET",
    },
    {
      name: "TeamSync",
      tagline: "Real-time team collaboration board.",
      description:
        "JWT authentication, event-driven notifications, and live chat over SignalR — an end-to-end real-time collaboration workspace.",
      stack: [".NET 8", "Angular", "MongoDB", "Redis", "RabbitMQ", "SignalR"],
      status: "In progress",
      repo: "https://github.com/razoncdr/TeamSync",
    },
    {
      name: "Hall Management System",
      tagline: "Full-stack hall management for Sylhet Engineering College.",
      description:
        "Room allocation, fee tracking, and admin tools built on an ER-diagram-driven schema.",
      stack: ["Django", "Bootstrap", "SQLite"],
      repo: "https://github.com/razoncdr/Hall_Mangement_System",
    },
  ],
  achievements: [
    {
      category: "ICPC",
      detail: "Dhaka Regional 2024 — Rank 33 · 2022 — Rank 61",
    },
    {
      category: "IUPC",
      detail:
        "MU IUPC 2024 (Sylhet Div.) — Rank 2 · CUET 2024 — Rank 19 · KUET 2025 — Rank 25 · BUET 2024 — Rank 49",
    },
    {
      category: "Codeforces",
      detail: "Expert · max rating 1745 · 1700+ problems solved",
      href: "https://codeforces.com/profile/razoncdr",
    },
    {
      category: "CodeChef",
      detail: "5★ · max rating 2022 · 250+ problems solved",
      href: "https://www.codechef.com/users/razoncdr",
    },
    {
      category: "AtCoder",
      detail: "razoncdr",
      href: "https://atcoder.jp/users/razoncdr",
    },
    {
      // detail below is the static FALLBACK — overridden with live API data
      // (see lib/leetcode.ts + the Achievements component).
      category: "LeetCode",
      detail: "115 solved · 52 Easy · 52 Medium · 11 Hard",
      href: `https://leetcode.com/u/${leetcodeHandle}/`,
      source: "leetcode",
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      school: "Sylhet Engineering College",
      period: "Jan 2020 – Apr 2025",
      result: "CGPA 3.89 / 4.0",
    },
  ],
  languages: ["Bengali (Native)", "English (Intermediate)", "Hindi (Spoken)"],
};
