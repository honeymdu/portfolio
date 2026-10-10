"use client";

import { Building2, MapPin, Calendar } from "lucide-react";

const EXPERIENCE = [
  {
    company: "Binary Semantics Limited",
    role: "Software Developer – Java",
    period: "August 2026 – Present",
    location: "Gurugram, India",
    current: true,
    description:
      "Developing enterprise backend applications in the Marine Insurance domain using Java and Spring Boot, with a focus on reliable business workflows, API development, data processing, and performance optimization.",
    highlights: [
      "Contributing to the development and optimization of an enterprise Marine Insurance platform, building backend APIs and business workflows across client management, policy and certificate processing, endorsements, underwriting approvals, and business insights.",
      "Develop business insights APIs and optimize SQL queries and data access.",
      "Implement business validations, service integrations, and transaction-oriented operations.",
      "Debug issues, perform API testing, and support QA deployments.",
      "Collaborate with frontend developers, QA engineers, and cross-functional teams.",
    ],
    stack: ["Java", "Spring Boot", "REST APIs", "SQL", "Microservices", "API Integration", "Postman"],
  },
  {
    company: "Servoedge Technologies Private Limited",
    role: "Project Lead – Java Backend Developer",
    period: "February 2025 – June 2026",
    location: "Noida, India",
    current: false,
    description:
      "Led backend development and architectural implementation across enterprise EdTech and AI-powered real-time communication platforms, focusing on system design, scalability, integrations, and production readiness.",
    highlights: [
      "Led backend delivery of a B2B EdTech platform, implementing microservices, REST APIs, role-based access control, and optimized database models.",
      "Improved assessment report generation performance by 75%.",
      "Led backend development of a real-time multilingual voice translation platform using Java, Spring Boot, and microservices.",
      "Integrated Google Cloud Speech-to-Text, Translation, Text-to-Speech, and Vonage Voice APIs.",
      "Implemented asynchronous processing and low-latency service orchestration.",
      "Supported live transcript dashboards and translation workflows.",
      "Achieved approximately 90% average translation accuracy in live testing.",
      "Deployed containerized services using Docker and Google Cloud Run.",
    ],
    stack: ["Java", "Spring Boot", "Microservices", "Google Cloud", "Docker", "REST APIs", "Vonage APIs", "System Design"],
  },
  {
    company: "Xtreme Softech Private Limited",
    role: "Software Development Engineer",
    period: "August 2022 – February 2025",
    location: "Gurugram, India",
    current: false,
    description:
      "Built and maintained enterprise software and backend applications, contributing to API development, application modernization, cloud deployment, and business process automation.",
    highlights: [
      "Developed Java REST APIs using Spring and Hibernate.",
      "Modernized legacy codebases to improve functionality and maintainability.",
      "Collaborated with cross-functional teams on software delivery.",
      "Worked with DevOps teams to deploy and manage applications on AWS and Azure.",
      "Contributed to .NET Core and C# applications and automated business processes using UiPath.",
      "Worked with Windows and Ubuntu server environments.",
    ],
    stack: ["Java", "Spring", "Hibernate", "REST APIs", "AWS", "Azure", "C#", ".NET Core", "UiPath"],
  },
];

export default function ExperiencePage() {
  return (
    <section id="experience-page" className="py-24 px-4 sm:px-6 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            Experience
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career Journey
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Four years of building production backend systems — from enterprise insurance platforms to
            AI-powered real-time translation. Each role deepened my expertise in distributed architecture,
            cloud-native deployment, and delivering measurable engineering outcomes.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800/40 dark:bg-gray-700/40 hidden md:block" />

          <div className="space-y-12">
            {EXPERIENCE.map((job) => (
              <div
                key={job.company}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 w-3 h-3 rounded-full border-4 border-white dark:border-gray-950 z-10 transition-all duration-300 group-hover:scale-125"
                  style={{
                    background: job.current
                      ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                      : job.company === "Servoedge Technologies Private Limited"
                      ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                      : "linear-gradient(135deg, #a855f7 0%, #d946ef 100%)",
                  }}
                >
                  {job.current && (
                    <span className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>

                {/* Card */}
                <div className="ml-12 md:ml-16 bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-200/60 dark:border-gray-800/40 p-6 sm:p-8 hover:border-indigo-300/50 dark:hover:border-indigo-700/30 hover:shadow-xl dark:hover:shadow-gray-950 transition-all duration-300 relative overflow-hidden">
                  {/* Current badge */}
                  {job.current && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current
                      </span>
                    </div>
                  )}

                  {/* Company identity */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.company}</h2>
                  </div>

                  {/* Job title */}
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{job.role}</h3>

                  {/* Dates and location */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {job.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{job.description}</p>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-6 pl-4">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#8B5CF6]">
                        <p className="text-sm text-gray-300 dark:text-gray-300 leading-relaxed">{highlight}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-2 self-center">Technologies:</span>
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "4+", label: "Years Experience" },
            { value: "3", label: "Companies" },
            { value: "2", label: "Domains" },
            { value: "15+", label: "Technologies" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800/40"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}