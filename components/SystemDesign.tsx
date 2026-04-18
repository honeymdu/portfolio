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
  Zap,
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
      "An in-process Spring event pipeline that converts bidirectional phone + browser audio to translated speech in under 500ms — 4 language pairs, production airline call center scale.",
    color: "indigo",
    flow: [
      [
        { icon: Users, label: "Agent Browser (React)", sub: "PCM16LE · 16kHz WebSocket", color: "gray" },
        { icon: Globe, label: "Customer Phone", sub: "Vonage Voice API", color: "indigo" },
      ],
      [
        { icon: Shield, label: "GCP API Gateway", sub: "JWT validation · routing", color: "gray" },
      ],
      [
        { icon: Server, label: "Translator Service", sub: "Java 21 · Spring Boot 3.5", color: "indigo" },
        { icon: Users, label: "User Service", sub: "JWT · agents · phone pool", color: "blue" },
      ],
      [
        { icon: Mic, label: "SpeechToTextService", sub: "Google STT · streaming", color: "blue" },
        { icon: Zap, label: "Spring App Events", sub: "In-process async pipeline", color: "amber" },
        { icon: Volume2, label: "TextToSpeechService", sub: "Google TTS · PCM out", color: "emerald" },
      ],
      [
        { icon: MessageSquare, label: "TranslationService", sub: "Google Translate · Mono<String>", color: "purple" },
        { icon: Database, label: "MongoDB", sub: "Sessions · utterances", color: "cyan" },
      ],
    ],
    components: [
      { icon: Shield, name: "GCP API Gateway", role: "Managed gateway layer: centralized JWT validation via JWKS endpoint (forwarded to User Service), OAuth2 support, route-level API versioning, and TLS termination.", color: "gray" },
      { icon: Server, name: "Translator Service (Core)", role: "Java 21 / Spring Boot 3.5.4 core engine. Manages two WebSocket streams per call: AgentWebSocketHandler (browser PCM audio) and VonageWebSocketHandler (customer phone audio). ReactiveConversationOrchestrator dispatches Spring ApplicationEvents through the full pipeline.", color: "indigo" },
      { icon: Users, name: "User Service", role: "Handles JWT issuance and validation (HMAC-SHA256), agent CRUD, per-agent language/voice preferences, and Vonage phone number pool management. Translator Service calls it via Feign client for token validation.", color: "blue" },
      { icon: Zap, name: "Spring Event Pipeline", role: "In-process async pipeline using ApplicationEventPublisher. AudioEvent → STT → TranscriptEvent → Translation (Mono<String>, non-blocking) → TTS → TtsAudioEvent → binary back to caller. Dedicated thread pools: audioEventExecutor (20–40 threads, queue 500), languageDetectionExecutor (4 threads). Zero network hops between stages.", color: "amber" },
      { icon: Mic, name: "Google STT + TTS", role: "STT: streaming recognition with one session per call leg (agent + customer independently). TTS: PCM output encoded to match Vonage WebSocket format. Voice selection stored in AgentPreference. Microsoft Cognitive Services included as fallback STT provider.", color: "purple" },
      { icon: Database, name: "MongoDB + In-Memory Sessions", role: "CallSessionManager holds a ConcurrentHashMap<String, CallSession> for active calls — WebSocket refs are transient and can't be persisted. On SessionEndEvent, only serializable fields (utterances, metadata, duration) are flushed to MongoDB, keyed by conversationUuid.", color: "cyan" },
      { icon: Globe, name: "Vonage Strategy Pattern", role: "VoIP operations abstracted behind CallProviderStrategy interface. VonageCallProvider handles outbound dialing, answer webhooks, NCO (Nexmo Call Object) for WebSocket audio streaming, DTMF, mute/unmute, and hangup. Swap to Twilio/Plivo with a new implementation — zero controller changes.", color: "emerald" },
    ],
    tradeoffs: [
      {
        decision: "In-process Spring Events vs. external broker (Kafka)",
        chosen: "Spring ApplicationEventPublisher (in-process)",
        tradeOff: "No inter-stage network latency vs. stages can't be independently deployed. Correct tradeoff for a single-service audio pipeline where microseconds matter.",
      },
      {
        decision: "Strategy pattern for VoIP provider",
        chosen: "CallProviderStrategy interface + VonageCallProvider",
        tradeOff: "One extra abstraction layer vs. swap Vonage for Twilio/Plivo with zero changes to controllers or orchestration logic.",
      },
      {
        decision: "In-memory session store vs. Redis for WebSocket refs",
        chosen: "ConcurrentHashMap in CallSessionManager",
        tradeOff: "Sessions lost on instance restart vs. zero external dependency for sub-millisecond ref lookup during live audio processing.",
      },
      {
        decision: "Reactive Mono<String> vs. blocking translation call",
        chosen: "Project Reactor Mono<String> for translation",
        tradeOff: "Slightly more complex composition vs. thread released during Google Translate API latency — critical when 40 concurrent pipelines are running.",
      },
    ],
    nfrs: [
      { metric: "End-to-End Audio Latency", target: "< 500ms" },
      { metric: "Translation Accuracy", target: "~90%" },
      { metric: "Language Pairs", target: "EN ↔ FR, ES, AR, ZH" },
      { metric: "Audio Format", target: "PCM16LE · 16kHz · mono" },
      { metric: "Concurrent STT Pipelines", target: "40 (audioEventExecutor)" },
      { metric: "Deployment", target: "Google Cloud Run (autoscale)" },
    ],
  },
  prepfi: {
    title: "PrepFi — Scalable Microservices EdTech Platform",
    description:
      "A .NET 8 B2B educational platform — 7 domain microservices, async AI quiz generation via RabbitMQ, per-user JWT signing keys, and Ocelot/Eureka service mesh.",
    color: "purple",
    flow: [
      [{ icon: Users, label: "React Frontend", sub: "Role-based UI", color: "gray" }],
      [{ icon: Shield, label: "Ocelot API Gateway", sub: "Eureka discovery · RoundRobin LB", color: "indigo" }],
      [
        { icon: Users, label: "AuthService", sub: "JWT + Redis sessions", color: "blue" },
        { icon: BookOpen, label: "QuizService", sub: "Questions + AI jobs", color: "purple" },
        { icon: BarChart3, label: "TournamentService", sub: "Leaderboards + cron", color: "emerald" },
        { icon: Database, label: "UserDashboardService", sub: "Analytics + streaks", color: "amber" },
        { icon: MessageSquare, label: "UserService", sub: "Profiles + org hierarchy", color: "pink" },
      ],
      [
        { icon: MessageSquare, label: "RabbitMQ", sub: "Async AI workloads", color: "amber" },
        { icon: Database, label: "Redis", sub: "Token cache · refresh store", color: "cyan" },
      ],
      [
        { icon: Database, label: "PostgreSQL (per-service)", sub: "Schema-isolated DBs", color: "gray" },
        { icon: Cpu, label: "External AI Services", sub: "Ingestion · QGen · Eval", color: "purple" },
      ],
    ],
    components: [
      { icon: Shield, name: "Ocelot API Gateway (×2)", role: "Public + admin gateways with Eureka service discovery. Custom AuthenticationMiddleware validates JWTs using per-user signing keys cached in Redis (60-min TTL). Injects X-User-Id, X-User-Role, X-Org-Code headers downstream.", color: "indigo" },
      { icon: Users, name: "AuthService + UserService", role: "AuthService issues HS256 JWTs using per-user symmetric keys from UserTokenSalts table — key compromise affects one user only. UserService owns user profiles, roles, and multi-tenant org hierarchy.", color: "blue" },
      { icon: BookOpen, name: "QuizService + AI Pipeline", role: "Core quiz engine. Teachers upload PDFs → ingestionQueue → external AI parses structure. Question generation via aiQuestionsJobsQueue. AI answers scored via answer_eval_results. All AI calls are async — app tier never blocks.", color: "purple" },
      { icon: BarChart3, name: "TournamentService", role: "Manages tournament lifecycle, player registrations, and leaderboard rankings. CronBackgroundService handles scheduled start/end transitions and leaderboard refresh. Optimistic concurrency prevents ranking bottlenecks.", color: "emerald" },
      { icon: Database, name: "UserDashboardService", role: "Aggregates activity streams, streak tracking, and performance analytics per student. Read-heavy service designed for dashboard-scale queries with compound indexes.", color: "amber" },
      { icon: Cpu, name: "RabbitMQ AI Orchestration", role: "Three AI service boundaries integrated exclusively via RabbitMQ: PDF Ingestion Service, Question Generator, and Answer Evaluator. StaleJobWatchdog hosted service auto-fails jobs with no response within threshold, preventing UI hangs.", color: "pink" },
      { icon: MessageSquare, name: "Refit + Polly Service Mesh", role: "Synchronous inter-service calls use Refit-typed HTTP clients registered via AddApiClients(). Every outbound client is wrapped in Polly retry + timeout policies. Dual EF Core / ADO.NET strategy per service — switchable via DatabaseSettings config.", color: "gray" },
    ],
    tradeoffs: [
      {
        decision: "Per-user JWT signing keys vs. shared secret",
        chosen: "Per-user HS256 keys in UserTokenSalts",
        tradeOff: "Per-request Redis lookup overhead vs. individual key revocation and blast-radius containment on compromise.",
      },
      {
        decision: "AI integration: async RabbitMQ vs. synchronous HTTP",
        chosen: "Async-first via RabbitMQ exclusively",
        tradeOff: "No real-time AI response vs. app tier never blocked on AI calls (seconds–minutes). AI services swap independently.",
      },
      {
        decision: "Database per service vs. shared schema",
        chosen: "Database per service (PostgreSQL)",
        tradeOff: "Cross-service joins require Refit HTTP calls vs. each service scaling, migrating, and backing up independently.",
      },
      {
        decision: "RBAC enforcement location",
        chosen: "Centralized at Ocelot gateway via token claims",
        tradeOff: "Slight gateway latency vs. duplicated authorization logic across 7 services.",
      },
    ],
    nfrs: [
      { metric: "Report Generation Speed", target: "+45% improvement" },
      { metric: "Microservices", target: "7 independently deployable" },
      { metric: "User Roles", target: "3 (Teacher, Parent, Student)" },
      { metric: "AI Integration", target: "RabbitMQ async (3 AI boundaries)" },
      { metric: "Token Cache", target: "Redis — 60-min TTL per user key" },
      { metric: "Multi-tenancy", target: "Institution-level (org code isolation)" },
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
