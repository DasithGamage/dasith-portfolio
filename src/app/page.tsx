"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const NotesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Data
const workExperience = [
  {
    company: "IFS",
    logo: "/ifs-logo.png",
    role: "Experienced Software Engineer",
    period: "Jul 2025 - Present",
    url: "https://www.ifs.com/",
  },
  {
    company: "IFS",
    logo: "/ifs-logo.png",
    role: "Associate Software Engineer",
    period: "Jul 2023 - Jul 2025",
    url: "https://www.ifs.com/",
  },
  {
    company: "IFS",
    logo: "/ifs-logo.png",
    role: "Software Engineer Intern",
    period: "Jul 2022 - Jun 2023",
    url: "https://www.ifs.com/",
  },
  {
    company: "Search Worldwide",
    logo: "/search-worldwide-logo.png",
    role: "Digital Researcher",
    period: "Apr 2019 - Jun 2022",
    url: "https://www.searchworldwide.com/",
  },
];

const education = [
  {
    school: "Curtin University",
    logo: "/curtin-logo.png",
    degree: "Master of Artificial Intelligence",
    period: "Feb 2026 - Feb 2027",
    url: "https://www.curtin.edu.au/",
  },
  {
    school: "University of Westminster",
    logo: "/westminster-logo.png",
    degree: "BEng (Hons) Software Engineering",
    period: "2020 - Sep 2025",
    url: "https://www.westminster.ac.uk/",
  },
  {
    school: "Royal College Colombo",
    logo: "/royal-college-logo.png",
    degree: "High School Diploma",
    period: "2016 - 2019",
    url: "https://www.royalcollege.lk/",
  },
];

const mlSkills = [
  "Python", "PyTorch", "TensorFlow", "scikit-learn", "Matplotlib",
  "Hugging Face", "LangChain", "NLP", "Tableau", "R", "Supabase"
];

const languages = [
    { name: "English", flag: "🇬🇧" },
  { name: "Sinhala", flag: "🇱🇰" },
];

const projects = [
  {
    date: "September 18th, 2025",
    title: "Understanding Severe Crashes",
    institution: "University of Melbourne",
    description: "Built an interactive Tableau dashboard to analyze how weather, time, vehicle age, and intersections influence severe crash risks in Victoria.",
    icon: "https://ext.same-assets.com/758970161/1982086705.jpeg",
    links: [
      { type: "dashboard", label: "Dashboard" },
      { type: "interactive", label: "Interactive", url: "https://public.tableau.com/shared/3RSCYMJF2" },
    ],
  },
  {
    date: "June 11th, 2025",
    title: "Investigating Social Living Arrangements with NLP",
    institution: "University of Melbourne",
    description: "Applied NLP techniques on MIMIC-III discharge notes to infer patient living status (alone vs. not alone). Compared TF-IDF + Logistic Regression with BERT.",
    icon: "https://ext.same-assets.com/758970161/3832017242.webp",
    links: [
      { type: "report", label: "Report" },
    ],
  },
  {
    date: "May 9th, 2025",
    title: "Automated Fact-Checking with Transformers",
    institution: "University of Melbourne",
    description: "Built an automated fact-checking system for climate-related claims. Combined Sentence Transformers + FAISS for retrieval with BERT for classification.",
    icon: "https://ext.same-assets.com/758970161/4200856075.jpeg",
    links: [
      { type: "report", label: "Report" },
    ],
  },
  {
    date: "Oct 20th, 2024",
    title: "Predicting Supreme Court Rulings",
    institution: "University of Melbourne",
    description: "Explored Decision Trees and Random Forests for predicting US Supreme Court appeal outcomes.",
    icon: "https://ext.same-assets.com/758970161/795805715.jpeg",
    links: [
      { type: "report", label: "Report" },
    ],
  },
];

const studyMaterials = [
  {
    title: "Complete AI/ML Notes Bundle",
    pages: "66 pages",
    updated: "Updated Oct 2025",
    description: "Get all 5 comprehensive study notes in one package! Save $16 when you buy the complete collection covering all essential AI/ML topics.",
    tags: ["Machine Learning", "NLP", "AI Planning", "Ethics in AI", "All Topics Included"],
    price: "$29",
    priceType: "One-time",
    discount: "SAVE $16",
    image: "https://ext.same-assets.com/758970161/462578383.jpeg",
  },
  {
    title: "Introduction to Machine Learning",
    pages: "15 pages",
    updated: "Updated May 2025",
    description: "Foundational machine learning concepts including supervised learning, unsupervised learning, model evaluation, and optimization techniques.",
    tags: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Cross-Validation", "Feature Engineering", "Optimization"],
    price: "$9",
    priceType: "One-time",
    image: "https://ext.same-assets.com/758970161/3784191359.jpeg",
  },
];

function AppleEmoji({ emoji, size = "w-10 h-10" }: { emoji: string; size?: string }) {
  const codePoint = [...emoji].map(e => e.codePointAt(0)?.toString(16)).join('-');
  const src = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${codePoint}.png`;
  return <img src={src} alt={emoji} className={`inline-block ${size} align-middle`} />;
}
function DockIcon({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useMotionValue(Infinity);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      distance.set(Math.abs(e.clientX - center));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [distance]);

  const size = useTransform(distance, [0, 80, 160], [52, 36, 28]);
  const smoothSize = useSpring(size, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ width: smoothSize, height: smoothSize }}
      className="flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background">
        {/* Floating Dock */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-1 px-3 py-2 bg-card border border-border rounded-full shadow-lg">
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                    <HomeIcon />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Home</TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                    <NotesIcon />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Notes</TooltipContent>
              </Tooltip>
            </DockIcon>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://github.com/DasithGamage" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors hover:text-gray-500">
                    <GitHubIcon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://www.linkedin.com/in/dasithgamage" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors hover:text-blue-600">
                    <LinkedInIcon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://www.instagram.com/dasith99/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-all dock-instagram">
                    <InstagramIcon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Instagram</TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://www.tiktok.com/@dasithgamage" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-all dock-tiktok">
                    <TikTokIcon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>TikTok</TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://x.com/GamageDasith" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors hover:text-sky-500">
                    <XIcon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>X</TooltipContent>
              </Tooltip>
            </DockIcon>
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://youtube.com/@dasithgamagetv" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors hover:text-red-500">
                    <YouTubeIcon />
                  </a>
                </TooltipTrigger>
                <TooltipContent>YouTube</TooltipContent>
              </Tooltip>
            </DockIcon>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={toggleTheme} className="w-full h-full flex items-center justify-center rounded-full hover:bg-accent transition-colors">
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isDark ? "Light mode" : "Dark mode"}</TooltipContent>
              </Tooltip>
            </DockIcon>
          </div>
        </div>

        <div className="mx-auto px-6 py-24 pb-32" style={{ maxWidth: '672px' }}>
          {/* Hero Section */}
          <section className="mb-12">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="text-5xl font-bold tracking-tight mb-3 flex items-center gap-5">
                  Hi, I'm Dasith <AppleEmoji emoji="🙌" size="w-14 h-14" />
                </h1>
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  AI & Machine Learning Enthusiast. Software Engineer at IFS. Graduate Student at the Curtin University. I do{" "}
                  <a href="https://www.tiktok.com/@dasithgamage" target="_blank" rel="noopener noreferrer" className="font-semibold tiktok-link">
                    TikTok
                  </a>{" "}
                  content about my student journey!
                </p>
                <a href="/notes" className="inline-flex items-center gap-1 mt-4 text-foreground hover:underline transition-all duration-300 ease-in-out hover:gap-3 hover:translate-x-1 font-semibold">
                  → Tap for my study materials
                </a>
              </div>
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border border-border bg-muted">
                <Image
                  src="/profile.jpg"
                  alt="Dasith"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-foreground/70 leading-relaxed">
              I'm currently pursuing a Master's in Artificial Intelligence at{" "}
              <a href="https://www.curtin.edu.au/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Curtin University
              </a>
              . My focus is on machine learning, data-driven systems, and real-world AI applications. Beyond my studies, I work as a Software Engineer at{" "}
              <a href="https://www.ifs.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                IFS
              </a>
              {" "}and spend time building AI-powered projects. These projects allow me to explore advanced AI techniques while solving practical problems.
            </p>
          </section>

          {/* Instagram Reels */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Posts</h2>
              <a href="https://www.instagram.com/dasith99/" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                View all →
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { url: "https://www.instagram.com/reel/DUsk0BuE38O/", thumb: "/post1.mp4", type: "video" },
                { url: "https://www.instagram.com/p/DUTB1frEeCW/", thumb: "/post2.jpg", type: "image" },
                { url: "https://www.instagram.com/reel/DRED25ykTiT/", thumb: "/post3.mp4", type: "video" },
              ].map((post, i) => (
                <a
                  key={i}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-xl overflow-hidden aspect-square bg-muted group block"
                >
                  {post.type === "video" ? (
                    <video
                      src={post.thumb}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={post.thumb}
                      alt={`Instagram post ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <InstagramIcon />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Work Experience</h2>
            <div className="space-y-2">
              {workExperience.map((work, index) => (
                <a
                  key={index}
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-accent transition-colors group"
                >
                 <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={work.logo}
                  alt={work.company}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold flex items-center gap-1 text-foreground">
                      {work.company}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                        <ExternalLinkIcon />
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{work.role}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{work.period}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            <div className="space-y-2">
              {education.map((edu, index) => (
                <a
                  key={index}
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-accent transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={edu.logo}
                      alt={edu.school}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold flex items-center gap-1">
                      {edu.school}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                        <ExternalLinkIcon />
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{edu.period}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-4">Skills</h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3">Machine Learning / AI</h3>
              <div className="flex flex-wrap gap-2">
                {mlSkills.map((skill, index) => (
                 <Badge key={index} variant="default" className="px-3 py-1 font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md">
                    {skill}
                 </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 font-medium flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <AppleEmoji emoji={lang.flag} size="w-5 h-5" />
                    <span>{lang.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge variant="default" className="mb-4 text-sm px-4 py-1.4">
                Machine Learning / Artificial Intelligence
              </Badge>
              <h2 className="text-5xl font-bold mb-4">I like building models</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                During my time in university, I completed multiple assignments focused on ML and AI. Each project was an opportunity to train models, experiment with algorithms, and apply AI techniques to solve real problems.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border/50" />
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="relative flex gap-6 pl-0 pb-4">
                    <div className="relative z-10 w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={project.icon}
                        alt={project.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-1">{project.date}</p>
                      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.institution}</p>
                      <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                      <div className="flex gap-2">
                        {project.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            variant={link.type === "interactive" ? "outline" : "default"}
                            size="sm"
                            className="h-8 text-xs"
                            asChild={!!link.url}
                          >
                            {link.url ? (
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.type === "dashboard" && <ChartIcon />}
                                {link.type === "interactive" && <GlobeIcon />}
                                {link.type === "report" && <FileTextIcon />}
                                <span className="ml-1">{link.label}</span>
                              </a>
                            ) : (
                              <>
                                {link.type === "dashboard" && <ChartIcon />}
                                {link.type === "interactive" && <GlobeIcon />}
                                {link.type === "report" && <FileTextIcon />}
                                <span className="ml-1">{link.label}</span>
                              </>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Study Materials */}
          <section id="study-materials" className="mb-16 scroll-mt-8">
            <div className="text-center mb-8">
              <Badge variant="default" className="mb-4 text-sm px-4 py-1.5">
                Study Notes
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Study Materials</h2>
              <p className="text-foreground/60 max-w-lg mx-auto">
                Comprehensive notes from my AI & ML journey. Battle-tested materials I created and refined through my studies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {studyMaterials.map((material, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-40 bg-muted overflow-hidden">
                    {material.discount && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        {material.discount}
                      </span>
                    )}
                    <Image
                      src={material.image}
                      alt={material.title}
                      width={400}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {material.pages} • {material.updated}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {material.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {material.tags.slice(0, 4).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {material.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{material.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold">{material.price}</span>
                        <span className="text-sm text-muted-foreground ml-2">{material.priceType}</span>
                      </div>
                      <Button size="sm" className="gap-1">
                        <NotesIcon />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center mt-6 text-muted-foreground">
              Or explore other notes{" "}
              <a href="#" className="text-foreground font-bold hover:underline">here</a>
            </p>
          </section>

          {/* Contact */}
          <section className="text-center">
            <Badge variant="default" className="mb-4 text-sm px-4 py-1.5">
              Contact
            </Badge>
            <h2 className="text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-foreground/70 mb-3 text-base">
              Want to chat? Just shoot me a dm{" "}
              <a href="https://www.tiktok.com/@dasithgamage" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold hover:underline">
                with a direct question on TikTok
              </a>
              , I like to respond to whoever has the same interests
            </p>
            <p className="text-foreground/70 text-base">
              For work inquiries, reach me directly at{" "}
              <a href="mailto:dasithcg@gmail.com" className="text-foreground font-bold hover:underline">
                dasithcg@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </TooltipProvider>
  );
}
