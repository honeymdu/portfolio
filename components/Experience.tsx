"use client";

import { Briefcase, TrendingUp, Users, Zap } from "lucide-react";

const EXPERIENCE = [
  {
    company: "Servoedge Technologies Pvt. Ltd.",
    role: "Project Lead — Java | .NET",
    period: "February 2025 – Present",
    location: "Noida, India",
    type: "Full-time",
    color: "indigo",
    highlights: [
      {
        icon: Zap,
        text: "Architected and shipped PrepFi, a B2B EdTech microservices platform on .NET Core + React — delivered role-based access for 3 user personas (teacher, parent, student) and improved report generation speed by 45%.",
      },
      {
        icon: TrendingUp,
        text: "Led end-to-end delivery of a real-time multilingual voice translation system processing live inbound/outbound calls — integrated Google Cloud Speech-to-Text, Translation, and TTS APIs with Vonage Voice, achieving ~90% domain-specific accuracy.",
      },
      {
        icon: Zap,
        text: "Designed a low-latency, event-driven call processing pipeline using Java microservices and async orchestration — system sustains high call concurrency without queue degradation.",
      },
      {
        icon: TrendingUp,
        text: "Built gamified tournament and assessment engine that measurably boosted user engagement and contributed to the 45% speed improvement in report generation workflows.",
      },
      {
        icon: Users,
        text: "Served as Technical Architect on Astro App — delivered full HLD and solution architecture targeting 1M concurrent users after discovery and load analysis.",
      },
      {
        icon: Zap,
        text: "Deployed and scaled all microservices using Docker and Google Cloud Run with automated scaling rules — zero downtime across production releases.",
      },
      {
        icon: Users,
        text: "Mentored junior engineers, owned sprint planning, enforced code review standards, and coordinated with product and QA for on-time delivery.",
      },
    ],
    stack: [".NET Core", "Java", "React", "Google Cloud", "Docker", "Vonage", "Kafka", "REST APIs"],
  },
  {
    company: "Xtreme Softech Pvt. Ltd.",
    role: "Software Development Engineer",
    period: "August 2022 – February 2025",
    location: "Gurugram, India",
    type: "Full-time",
    color: "purple",
    highlights: [
      {
        icon: TrendingUp,
        text: "Modernized legacy codebases to current engineering standards — achieved a 40% increase in functionality, maintainability score, and reduced tech-debt by rearchitecting core modules.",
      },
      {
        icon: Zap,
        text: "Developed production Java REST APIs using Spring Boot and Hibernate for insurance platforms (Hunting Insurance, Bicyclic Insurance) — handling user onboarding, policy issuance, payment flows, and email delivery.",
      },
      {
        icon: Users,
        text: "Drove cross-functional collaboration with design, product, and DevOps — contributed to a 25% improvement in customer satisfaction scores via improved API reliability and UX flows.",
      },
      {
        icon: TrendingUp,
        text: "Spearheaded .NET Core application development using C# and VB.NET — built and delivered business-critical features from spec to production on AWS and Azure.",
      },
      {
        icon: Zap,
        text: "Automated Collection Entry and Order Entry workflows using UiPath RPA — eliminated manual data entry from Outlook-to-ERP pipeline, reducing errors and processing time significantly.",
      },
      {
        icon: Users,
        text: "Managed cloud deployments on AWS (EC2, Windows/Ubuntu) and Azure — handled provisioning, scaling, and operational monitoring.",
      },
    ],
    stack: ["Java", "Spring Boot", "Hibernate", ".NET Core", "C#", "UiPath", "AWS", "Azure", "Oracle DB"],
  },
];

const colorVariants: Record<string, { border: string; badge: string; dot: string; tag: string }> = {
  indigo: {
    border: "border-indigo-200 dark:border-indigo-800/40",
    badge: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/30",
    dot: "bg-indigo-500",
    tag: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  },
  purple: {
    border: "border-purple-200 dark:border-purple-800/40",
    badge: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800/30",
    dot: "bg-purple-500",
    tag: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Where I&apos;ve built things
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Ownership, not just contribution. Impact, not just output.
          </p>
        </div>

        <div className="space-y-10">
          {EXPERIENCE.map((job) => {
            const colors = colorVariants[job.color];
            return (
              <div
                key={job.company}
                className={`relative rounded-2xl border ${colors.border} bg-gray-50/80 dark:bg-gray-900/50 p-6 sm:p-8 hover:shadow-xl dark:hover:shadow-gray-950 transition-all duration-300 overflow-hidden`}
              >
                {/* Left accent bar */}
                <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-full ${job.color === "indigo" ? "bg-gradient-to-b from-indigo-500 to-purple-500" : "bg-gradient-to-b from-purple-500 to-pink-500"}`} />
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.role}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company}</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                      {job.period}
                    </span>
                    <span className="text-xs text-gray-400">{job.type}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-6">
                  {job.highlights.map(({ text }, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${colors.tag}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
