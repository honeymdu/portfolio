"use client";

import { Server, Zap, Brain, Cloud } from "lucide-react";

const PILLARS = [
  {
    icon: Server,
    title: "Microservices at Scale",
    description:
      "Designed and delivered multi-service platforms from scratch — handling service boundaries, inter-service contracts, database-per-service patterns, and zero-downtime deployments.",
    color: "indigo",
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    description:
      "Engineered low-latency, event-driven architectures using async processing, Kafka, and WebSocket pipelines capable of handling high call volumes without degradation.",
    color: "yellow",
  },
  {
    icon: Brain,
    title: "AI & ML Integration",
    description:
      "Orchestrated speech-to-text, neural translation, and text-to-speech pipelines — including domain-specific fine-tuning — achieving production-level accuracy in live multilingual systems.",
    color: "purple",
  },
  {
    icon: Cloud,
    title: "Cloud-Native Deployment",
    description:
      "Shipped production services on Google Cloud Run, AWS, and Azure — leveraging Docker, container orchestration, and cloud-managed services for resilience and auto-scaling.",
    color: "cyan",
  },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400",
  yellow: "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-800/30 text-amber-600 dark:text-amber-400",
  purple: "bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-800/30 text-purple-600 dark:text-purple-400",
  cyan: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-100 dark:border-cyan-800/30 text-cyan-600 dark:text-cyan-400",
};

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Engineering systems that matter
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Not just writing code — designing the infrastructure that runs it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Narrative */}
          <div className="space-y-5">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              I&apos;m a <span className="text-gray-900 dark:text-white font-semibold">Java Backend Developer with 4+ years of experience</span> building production-grade applications, scalable backend services, and distributed systems. My work spans enterprise platforms, microservices architecture, cloud integrations, and AI-powered applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My core expertise lies in <span className="text-gray-900 dark:text-white font-semibold">Java, Spring Boot, REST API development, microservices, and database engineering</span>. I focus on building reliable backend systems through thoughtful architecture, efficient query design, asynchronous processing, service integration, and performance optimization.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Currently, at <span className="text-gray-900 dark:text-white font-semibold">Binary Semantics</span>, I&apos;m working on an enterprise Marine Insurance platform, developing backend APIs and business workflows across client management, policy and certificate processing, endorsements, underwriting approvals, and business insights.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Previously, at <span className="text-gray-900 dark:text-white font-semibold">Servoedge Technologies</span>, I led backend development across B2B EdTech and AI-powered real-time communication platforms. My work included microservices architecture, cloud integrations, asynchronous processing, and performance optimization.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Beyond professional work, I independently designed and built <span className="text-gray-900 dark:text-white font-semibold">Travel OS</span>, a B2B travel SaaS platform that combines a Next.js storefront, Supabase, a CRM, vendor data ingestion, and a Spring Boot AI content engine powered by Claude models and Ollama. HMX Global Travels operates as its first live tenant.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I enjoy solving complex engineering problems, making sound architectural decisions, and building software that is maintainable, efficient, and ready for real-world use.
            </p>

            {/* Quick facts */}
            <div className="pt-4 grid grid-cols-2 gap-4">
              {[
                ["Location", "Bahadurgarh, India"],
                ["Current Role", "Project Lead, Servoedge"],
                ["Primary Stack", "Java · .NET · Spring Boot · Next.js"],
                ["Cloud", "GCP · AWS · Azure · Supabase"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">{label}</dt>
                  <dd className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className={`p-5 rounded-xl border ${colorMap[color]} transition-transform duration-200 hover:-translate-y-0.5`}
              >
                <div className="mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
