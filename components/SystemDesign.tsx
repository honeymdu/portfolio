"use client";

import { useState } from "react";
import {
  ArrowRight,
  Server,
  Database,
  MessageSquare,
  Shield,
  Globe,
  Mic,
  Volume2,
  BarChart3,
  Users,
  BookOpen,
  Cpu,
} from "lucide-react";

type Tab = "translator" | "prepfi";

interface ArchNode {
  icon: React.ElementType;
  label: string;
  sub?: string;
  color: string;
}

interface TradeOff {
  decision: string;
  chosen: string;
  tradeOff: string;
}

interface DesignData {
  title: string;
  description: string;
  color: string;
  flow: ArchNode[][];
  components: { icon: React.ElementType; name: string; role: string; color: string }[];
  tradeoffs: TradeOff[];
  nfrs: { metric: string; target: string }[];
}

const DESIGNS: Record<Tab, DesignData> = {
  translator: {
    title: "Real-Time Multilingual Voice Translation",
    description:
      "An event-driven pipeline that converts spoken audio to translated speech in under 500ms — across 4 language pairs — at production call center scale.",
    color: "indigo",
    flow: [
      [
        { icon: Globe, label: "Vonage Voice API", sub: "Inbound call", color: "indigo" },
      ],
      [
        { icon: Shield, label: "API Gateway", sub: "Auth + routing", color: "gray" },
      ],
      [
        { icon: Mic, label: "STT Service", sub: "Google Cloud Speech", color: "blue" },
        { icon: MessageSquare, label: "Translation Service", sub: "Google Cloud Translate", color: "purple" },
        { icon: Volume2, label: "TTS Service", sub: "Google Cloud TTS", color: "emerald" },
      ],
      [
        { icon: MessageSquare, label: "Message Queue", sub: "Async decoupling", color: "amber" },
      ],
      [
        { icon: Database, label: "PostgreSQL", sub: "Transcripts + logs", color: "cyan" },
        { icon: BarChart3, label: "Analytics Service", sub: "Agent dashboard", color: "pink" },
      ],
    ],
    components: [
      { icon: Globe, name: "Vonage Voice API", role: "Inbound/outbound call streams. Sends audio chunks via webhook to our STT service.", color: "indigo" },
      { icon: Mic, name: "STT Microservice", role: "Streams audio to Google Cloud Speech-to-Text. Returns partial and final transcripts with confidence scores.", color: "blue" },
      { icon: Cpu, name: "Translation Microservice", role: "Fine-tuned domain model via Google Cloud Translation. Handles context-window management for mid-sentence fragments.", color: "purple" },
      { icon: Volume2, name: "TTS Microservice", role: "Converts translated text to speech using Google Cloud TTS. Streams audio back to the caller through Vonage.", color: "emerald" },
      { icon: MessageSquare, name: "Message Queue (Kafka)", role: "Decouples each pipeline stage. Absorbs burst traffic. Allows each service to scale independently.", color: "amber" },
      { icon: BarChart3, name: "Analytics Service", role: "Consumes transcript events, persists to PostgreSQL, powers live agent dashboard with translation logs and call metrics.", color: "pink" },
      { icon: Shield, name: "API Gateway", role: "JWT authentication, rate limiting, and request routing across microservices. Circuit breaker pattern on AI service calls.", color: "gray" },
    ],
    tradeoffs: [
      {
        decision: "Async pipeline via Kafka vs. synchronous chain",
        chosen: "Kafka between stages",
        tradeOff: "Slight ordering complexity in exchange for independent scaling and fault isolation per stage.",
      },
      {
        decision: "Partial transcript handling",
        chosen: "Buffer partial results with 300ms window",
        tradeOff: "Slight lag increase vs. broken translations from premature fragment dispatch.",
      },
      {
        decision: "AI service failure",
        chosen: "Circuit breaker + fallback to raw transcript display",
        tradeOff: "Degraded experience vs. complete call failure.",
      },
      {
        decision: "Deployment: GCP Cloud Run vs. GKE",
        chosen: "Cloud Run (serverless containers)",
        tradeOff: "Cold start risk vs. zero node management overhead and automatic scaling to zero.",
      },
    ],
    nfrs: [
      { metric: "End-to-End Latency", target: "< 500ms" },
      { metric: "Translation Accuracy", target: "~90% (domain-tuned)" },
      { metric: "Language Pairs", target: "EN ↔ FR, ES, AR, ZH" },
      { metric: "Availability", target: "99.9% (multi-region GCP)" },
      { metric: "Concurrent Calls", target: "Auto-scaled via Cloud Run" },
    ],
  },
  prepfi: {
    title: "PrepFi — Scalable Microservices EdTech Platform",
    description:
      "A B2B educational platform built for institutional scale — multi-tenant, role-isolated, with async report generation and gamified assessment workflows.",
    color: "purple",
    flow: [
      [{ icon: Users, label: "React Frontend", sub: "Role-based UI", color: "gray" }],
      [{ icon: Shield, label: "API Gateway", sub: "Auth + RBAC routing", color: "indigo" }],
      [
        { icon: Users, label: "Auth Service", sub: "JWT + RBAC", color: "blue" },
        { icon: BookOpen, label: "Test Engine", sub: "Question bank", color: "purple" },
        { icon: BarChart3, label: "Assessment Processor", sub: "Scoring", color: "emerald" },
        { icon: Database, label: "Report Generator", sub: "Async via Hangfire", color: "amber" },
        { icon: MessageSquare, label: "Notification Service", sub: "Email/Push", color: "pink" },
      ],
      [
        { icon: Database, label: "SQL Server (per-service)", sub: "Database isolation", color: "cyan" },
        { icon: Cpu, label: "Hangfire Workers", sub: "Background jobs", color: "gray" },
      ],
    ],
    components: [
      { icon: Shield, name: "API Gateway + Auth Service", role: "Validates JWT tokens, enforces RBAC. Teacher, Parent, Student roles route to different service subsets. Token introspection is cached to avoid per-request DB hits.", color: "indigo" },
      { icon: BookOpen, name: "Test Engine Service", role: "Manages question banks, test templates, assignment to student groups, and randomization. Teachers interact with this exclusively.", color: "purple" },
      { icon: BarChart3, name: "Assessment Processor", role: "Handles test submission, auto-scoring, and answer sheet storage. Fires domain events consumed by Report Generator and Notification Service.", color: "emerald" },
      { icon: Database, name: "Report Generator Service", role: "Async report compilation via Hangfire background jobs. Fixed N+1 query patterns with compound indexes and bulk reads. Reports pre-computed and cached.", color: "amber" },
      { icon: MessageSquare, name: "Notification Service", role: "Consumes domain events to send assignment alerts, grade notifications, and tournament results to relevant roles only.", color: "pink" },
      { icon: Cpu, name: "Tournament Engine", role: "Gamified assessment and competition layer. Manages leaderboards, scoring windows, and real-time ranking updates using optimistic concurrency.", color: "blue" },
    ],
    tradeoffs: [
      {
        decision: "Report generation: sync vs. async",
        chosen: "Async via Hangfire background workers",
        tradeOff: "Report not instantly available vs. no request timeouts under heavy load. Users receive notification on completion.",
      },
      {
        decision: "Database per service vs. shared schema",
        chosen: "Database per service",
        tradeOff: "Cross-service joins require API calls, but each service can be scaled, migrated, and backed up independently.",
      },
      {
        decision: "RBAC enforcement location",
        chosen: "Centralized at gateway + token claims",
        tradeOff: "Slight latency at gateway vs. duplicated authorization logic across 5 services.",
      },
      {
        decision: "Leaderboard consistency",
        chosen: "Eventual consistency with versioned writes",
        tradeOff: "Rankings may lag seconds vs. pessimistic locks that would bottleneck high-submission windows.",
      },
    ],
    nfrs: [
      { metric: "Report Generation Speed", target: "+45% improvement" },
      { metric: "User Roles", target: "3 (Teacher, Parent, Student)" },
      { metric: "Microservices", target: "5 independently deployable" },
      { metric: "Async Job Framework", target: "Hangfire (persistent)" },
      { metric: "Multi-tenancy", target: "Institution-level isolation" },
    ],
  },
};

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700",
  blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
  purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
  emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
  amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
  cyan: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700",
  pink: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700",
  gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
};

export default function SystemDesign() {
  const [activeTab, setActiveTab] = useState<Tab>("translator");
  const design = DESIGNS[activeTab];

  return (
    <section id="system-design" className="py-24 px-4 sm:px-6 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            System Design
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Architecture deep dives
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            How real systems are built — components, tradeoffs, scaling decisions, and non-functional requirements.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl w-fit mx-auto">
          {(["translator", "prepfi"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {tab === "translator" ? "Voice Translator" : "PrepFi Platform"}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {/* Description */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{design.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{design.description}</p>
          </div>

          {/* Architecture flow diagram */}
          <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">
              Data Flow
            </h4>
            <div className="flex flex-col items-center gap-3">
              {design.flow.map((row, rowIdx) => (
                <div key={rowIdx} className="w-full flex flex-col items-center">
                  <div className="flex flex-wrap justify-center gap-3">
                    {row.map(({ icon: Icon, label, sub, color }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium ${colorMap[color]}`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <div>
                          <div className="font-semibold leading-tight">{label}</div>
                          {sub && <div className="text-xs opacity-70 leading-tight">{sub}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  {rowIdx < design.flow.length - 1 && (
                    <ArrowRight className="rotate-90 w-4 h-4 text-gray-400 my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Components breakdown */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              Component Breakdown
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {design.components.map(({ icon: Icon, name, role, color }) => (
                <div
                  key={name}
                  className="bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md dark:hover:shadow-gray-900 transition-shadow"
                >
                  <div className={`w-8 h-8 rounded-lg ${colorMap[color].split(" ").slice(0, 2).join(" ")} flex items-center justify-center mb-3`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{name}</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trade-offs and NFRs grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Trade-offs */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                Design Trade-offs
              </h4>
              <div className="space-y-3">
                {design.tradeoffs.map(({ decision, chosen, tradeOff }) => (
                  <div
                    key={decision}
                    className="bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 p-4"
                  >
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">{decision}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      ✓ {chosen}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{tradeOff}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* NFRs */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                Non-Functional Requirements
              </h4>
              <div className="space-y-2">
                {design.nfrs.map(({ metric, target }) => (
                  <div
                    key={metric}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">{metric}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
