"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Mail, Terminal, Zap, Globe, Cpu, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

const TYPING_STRINGS = [
  "Microservices Architect",
  "Real-Time Systems Engineer",
  "Cloud-Native Backend Lead",
  "AI Integration Specialist",
];

const STATS = [
  { value: "3.5+", label: "Years of Experience" },
  { value: "45%", label: "Perf Gains Delivered" },
  { value: "90%", label: "AI Translation Accuracy" },
  { value: "1M+", label: "Concurrent User Design" },
];

export default function Hero() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = TYPING_STRINGS[typingIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTypingIndex((i) => (i + 1) % TYPING_STRINGS.length);
    }

    setDisplayText(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Floating tech badges */}
      <div className="absolute top-24 left-8 lg:left-24 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium animate-float">
        <Zap className="w-3 h-3" /> Low-Latency Architecture
      </div>
      <div className="absolute top-40 right-8 lg:right-24 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/50 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-xs font-medium animate-float" style={{ animationDelay: "1s" }}>
        <Globe className="w-3 h-3" /> Google Cloud · Docker
      </div>
      <div className="absolute bottom-40 left-8 lg:left-24 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800/50 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs font-medium animate-float" style={{ animationDelay: "2s" }}>
        <Cpu className="w-3 h-3" /> AI/ML Integration
      </div>
      <div className="absolute bottom-40 right-8 lg:right-24 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium animate-float" style={{ animationDelay: "3s" }}>
        <Terminal className="w-3 h-3" /> Java · .NET · Kafka
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-20">
        {/* Profile photo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <Image
              src="/profile.jpg"
              alt="Himanshu Mehra"
              fill
              className="rounded-full object-cover ring-4 ring-indigo-500/30 shadow-xl"
              priority
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-950" />
          </div>
        </div>

        {/* Available badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Open to senior backend roles
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Himanshu Mehra
        </h1>

        {/* Typing subtitle */}
        <div className="h-12 flex items-center justify-center mb-6">
          <span className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text">
            {displayText}
            <span className="border-r-2 border-indigo-500 ml-0.5 animate-pulse">&nbsp;</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          I build backend systems that{" "}
          <span className="text-gray-900 dark:text-white font-semibold">process speech in real-time</span>,
          {" "}
          <span className="text-gray-900 dark:text-white font-semibold">serve millions of users</span>
          , and{" "}
          <span className="text-gray-900 dark:text-white font-semibold">cross language barriers</span>
          {" "}using AI — all with sub-100ms latency.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/honeymdu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
          >
            <GithubIcon className="w-5 h-5" /> GitHub
          </a>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <a
            href="https://linkedin.com/in/himanshu-mehra-ba97a1213"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
          >
            <LinkedinIcon className="w-5 h-5" /> LinkedIn
          </a>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <a
            href="mailto:mehrahoney638@gmail.com"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
          >
            <Mail className="w-5 h-5" /> Email
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors animate-bounce"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
}
