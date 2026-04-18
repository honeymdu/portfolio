"use client";

import { useState } from "react";
import {
  Globe,
  BookOpen,
  Car,
  Users,
  UtensilsCrossed,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  Zap,
  Database,
  TrendingUp,
} from "lucide-react";

interface Project {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  period: string;
  type: string;
  color: string;
  tagline: string;
  problem: string;
  architecture: string;
  challenges: string[];
  scaling: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  live?: string;
}

const PROJECTS: Project[] = [
  {
    id: "translator",
    icon: Globe,
    title: "Real-Time Multilingual Voice Translator",
    subtitle: "Servoedge Technologies · Project Lead",
    period: "Aug 2025 – Present",
    type: "Production · AI/ML",
    color: "indigo",
    tagline: "Breaking language barriers in live airline call centers — in under 500ms.",
    problem:
      "Airline agents speaking English needed to conduct live telephone calls with customers who only speak Spanish, French, Arabic, or Chinese. Each party had to hear the conversation in their own language with minimal latency — across a bidirectional phone + browser audio bridge, in real time.",
    architecture:
      "Three Java 21 / Spring Boot 3.5.4 services on Google Cloud Run behind a GCP-managed API Gateway. The Translator Service is the core engine: it opens WebSocket streams from both the agent's browser (PCM16LE, 16kHz) and Vonage (customer phone audio), then routes each audio chunk through a Spring ApplicationEvent pipeline — AudioEvent → SpeechToTextService (Google STT, streaming) → TranscriptEvent → TranslationService (Mono<String>, reactive non-blocking) → TextToSpeechService (Google TTS) → TtsAudioEvent → binary back to the remote party's WebSocket. Active call state is held in a ConcurrentHashMap<String, CallSession> for WebSocket reference management; only serializable fields are flushed to MongoDB on SessionEndEvent. VoIP operations are abstracted behind a CallProviderStrategy interface — Vonage is the current implementation. User Service handles JWT issuance, agent CRUD, and Vonage phone number pool management.",
    challenges: [
      "Bidirectional audio symmetry — agent browser (WebSocket binary) and customer phone (Vonage WebSocket) both run the full STT → Translate → TTS pipeline simultaneously with independent thread pools (audioEventExecutor: 20–40 threads)",
      "In-memory session bridging — WebSocket references can't be serialized; ConcurrentHashMap holds transient call state while MongoDB stores durable fields, flushed atomically on SessionEndEvent",
      "Reactive async translation — TranslationService returns Mono<String>, releasing the calling thread during Google Translate API latency and resuming on response without blocking audio pipeline",
      "AOP-based role enforcement — @Authorize annotation + AuthorizationAspect keeps controller logic clean; UserContextInterceptor populates ThreadLocal from JWT without any controller awareness",
    ],
    scaling:
      "Stateless Translator Service instances on Google Cloud Run autoscale on concurrent call volume. No external message broker between pipeline stages — Spring ApplicationEventPublisher keeps STT→Translate→TTS in-process, eliminating network hops. audioEventExecutor handles up to 40 concurrent STT pipelines each with a 500-event queue. MongoDB stores completed call sessions and full utterance history per conversationUuid.",
    stack: ["Java 21", "Spring Boot 3.5.4", "Spring Reactor", "Google Cloud STT", "Google Cloud TTS", "Google Cloud Translation", "Vonage API", "MongoDB", "Docker", "Google Cloud Run", "GCP API Gateway", "React 19", "TypeScript"],
    metrics: [
      { label: "Translation Accuracy", value: "~90%" },
      { label: "Language Pairs", value: "4" },
      { label: "Audio Latency", value: "< 500ms" },
    ],
  },
  {
    id: "prepfi",
    icon: BookOpen,
    title: "PrepFi — B2B EdTech Microservices Platform",
    subtitle: "Servoedge Technologies · Project Lead",
    period: "Feb 2025 – Present",
    type: "Production · .NET 8",
    color: "purple",
    tagline: "A microservices-first EdTech platform built for institutional scale.",
    problem:
      "Educational institutions needed a unified platform for teachers to create/assign AI-assisted quizzes, track student performance in granular detail, and generate insightful reports — while parents needed restricted visibility into their child's progress only, and students needed a gamified tournament experience.",
    architecture:
      "7 .NET 8 microservices each owning its own PostgreSQL database: AuthService (JWT issuance + Redis session management), UserService (profiles, roles, org hierarchy), QuizService (quizzes, questions, AI job tracking, book ingestion), SubscriptionService, TournamentService (leaderboards + cron scheduling), UserDashboardService (analytics + streaks), and UserRegistrationService. Two Ocelot API gateways (public + admin) use Netflix Eureka for service discovery with RoundRobin load balancing. Services communicate via Refit-typed HTTP clients (Polly retry + timeout) for sync calls and RabbitMQ for all AI workload orchestration. AI capabilities — PDF ingestion, question generation, answer evaluation — are external services integrated exclusively via RabbitMQ queues.",
    challenges: [
      "Per-user JWT signing keys (UserTokenSalts table) — each user gets a unique HS256 key, limiting blast radius of compromise and enabling per-user revocation without global token invalidation",
      "AI integration is entirely async via RabbitMQ — app tier never blocks on AI calls (seconds to minutes); a StaleJobWatchdog hosted service auto-fails jobs with no response within threshold",
      "RBAC across 7 services without duplicated logic — centralized at Ocelot gateway, role claims propagated downstream via X-User-Id / X-User-Role / X-Org-Code headers",
      "Dual EF Core / ADO.NET strategy per service — ORM for standard CRUD, raw Npgsql for complex aggregations — switchable via config without rewriting service logic",
    ],
    scaling:
      "Each service scales independently behind the Ocelot gateway, discovered via Eureka — no hardcoded URLs. RabbitMQ absorbs AI workload bursts and decouples AI services from application tier entirely. Redis caches JWT signing keys (60-min TTL) to avoid per-request DB hits at gateway.",
    stack: [".NET 8", "C#", "React", "PostgreSQL", "Redis", "RabbitMQ", "Ocelot", "Eureka", "Refit", "Polly", "Docker", "JWT", "Entity Framework Core", "AWS S3"],
    metrics: [
      { label: "Report Speed", value: "+45%" },
      { label: "User Roles", value: "3" },
      { label: "Services", value: "7" },
    ],
    live: "https://prepfi.ai",
  },
  {
    id: "uber",
    icon: Car,
    title: "Uber Clone — Ride Booking Backend",
    subtitle: "Personal Project",
    period: "2024",
    type: "OSS · Spring Boot",
    color: "amber",
    tagline: "Full ride lifecycle backend — from geospatial matching to wallet payments.",
    problem:
      "Build a production-grade ride-booking backend that solves the two hardest problems: driver matching at scale and real-time ETA accuracy — both while keeping ride wait times minimal.",
    architecture:
      "Monolith-first with clear domain boundaries: Auth, Ride, Driver, Wallet, Notification. OSRM powers route calculation. PostGIS handles geospatial queries for nearest-driver matching. Strategy pattern abstracts different ride-matching algorithms (distance-first, rating-first, surge-pricing aware).",
    challenges: [
      "Geospatial driver lookup in under 50ms using PostGIS spatial indexes",
      "Strategy pattern for swappable ride-matching algorithms without breaking flow",
      "Wallet concurrency — optimistic locking to prevent double-spend on simultaneous rides",
      "Queue management to fairly distribute rides across available drivers",
    ],
    scaling:
      "Stateless service layers behind a reverse proxy. Read-heavy driver location queries served from a geo-indexed cache. Ride state machine ensures consistency across async steps.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "PostGIS", "OSRM API", "Spring Security", "JWT", "Maven"],
    metrics: [
      { label: "Wait Time Reduction", value: "~50%" },
      { label: "Pattern", value: "Strategy" },
      { label: "DB", value: "PostGIS" },
    ],
    github: "https://github.com/honeymdu/UberApp",
  },
  {
    id: "zomato",
    icon: UtensilsCrossed,
    title: "Zomato Clone — Food Ordering Backend",
    subtitle: "Personal Project",
    period: "2023",
    type: "OSS · Spring Boot",
    color: "emerald",
    tagline: "Restaurant discovery, smart order routing, and delivery optimization in one backend.",
    problem:
      "Build a production-grade food delivery backend that solves order-to-delivery assignment efficiently: matching orders to restaurants and delivery partners based on priority, proximity, and load — while keeping delivery times minimal.",
    architecture:
      "Spring Boot monolith with clear domain separation: Auth, Restaurant, Order, Delivery, Wallet, Notification. OSRM handles delivery route calculation. PostGIS stores and queries restaurant/user geospatial data. An order allocation strategy based on restaurant priority and order priority routes jobs optimally. JWT secures all endpoints.",
    challenges: [
      "Order assignment strategy — custom allocation algorithm reducing delivery time by up to 50%",
      "Geospatial restaurant lookup using PostGIS spatial indexes for sub-50ms nearest-restaurant queries",
      "Wallet concurrency — optimistic locking to prevent double-spend on simultaneous payments",
      "Email-based offer + payment link flow for order confirmation and policy delivery",
    ],
    scaling:
      "Stateless service layers behind a reverse proxy. Read-heavy restaurant/location queries served from geo-indexed cache. Delivery state machine ensures consistency across async assignment steps.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "PostGIS", "OSRM API", "Spring Security", "JWT", "Maven", "Hibernate"],
    metrics: [
      { label: "Delivery Time Cut", value: "~50%" },
      { label: "Pattern", value: "Strategy" },
      { label: "DB", value: "PostGIS" },
    ],
    github: "https://github.com/honeymdu/zotatoFoods",
  },
  {
    id: "linkedin",
    icon: Users,
    title: "LinkedIn Clone — Social Graph Microservices",
    subtitle: "Personal Project",
    period: "2024",
    type: "OSS · Microservices",
    color: "cyan",
    tagline: "Distributed social networking: graph-based connections, Kafka notifications, Docker deployment.",
    problem:
      "Model a real LinkedIn-style social graph where user connections form a network — and notifications fire in real-time as posts, likes, comments, and connection requests occur, all across independent microservices.",
    architecture:
      "5 Spring Boot microservices: User Service (auth + profile), Post Service (CRUD + likes/comments), Connection Service (Neo4j graph), Notification Service (Kafka consumer), and API Gateway (Eureka-registered). Services communicate via Feign Client (sync) and Kafka (async). Each is containerized via Docker.",
    challenges: [
      "Graph modeling in Neo4j — degree-of-connection queries and mutual connection suggestions",
      "Event ordering in Kafka — ensuring notifications arrive after the triggering action completes",
      "Service discovery via Eureka — handling dynamic port registration and health-check routing",
      "JWT propagation across service boundaries via gateway filter chain",
    ],
    scaling:
      "Each service is independently deployable and scalable. Kafka decouples notification throughput from user action latency. Neo4j's native graph storage handles connection depth queries in O(log n).",
    stack: ["Java", "Spring Boot", "Kafka", "Neo4j", "Eureka", "API Gateway", "Feign Client", "JWT", "Docker"],
    metrics: [
      { label: "Services", value: "5" },
      { label: "Graph DB", value: "Neo4j" },
      { label: "Messaging", value: "Kafka" },
    ],
  },
];

const colorVariants: Record<string, { bg: string; border: string; badge: string; tag: string; accent: string }> = {
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    border: "border-indigo-200 dark:border-indigo-800/40",
    badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300",
    tag: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
    accent: "text-indigo-600 dark:text-indigo-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800/40",
    badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
    tag: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
    accent: "text-purple-600 dark:text-purple-400",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800/40",
    badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
    tag: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
    accent: "text-amber-600 dark:text-amber-400",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    border: "border-cyan-200 dark:border-cyan-800/40",
    badge: "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300",
    tag: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300",
    accent: "text-cyan-600 dark:text-cyan-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800/40",
    badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
    tag: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
};

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured work
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Systems designed for real constraints: latency, scale, accuracy, and production resilience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => {
            const colors = colorVariants[project.color];
            const Icon = project.icon;
            const isExpanded = expanded === project.id;

            return (
              <div
                key={project.id}
                className={`rounded-2xl border ${colors.border} bg-white dark:bg-gray-900 overflow-hidden transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-gray-900`}
              >
                {/* Card header */}
                <div className={`p-6 ${isExpanded ? "" : ""}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${colors.accent}`} />
                      </div>
                      <div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
                          {project.type}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5">{project.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{project.subtitle}</p>
                  <p className={`text-sm font-medium ${colors.accent} mb-4`}>{project.tagline}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {project.metrics.map(({ label, value }) => (
                      <div key={label} className={`rounded-lg p-2.5 ${colors.bg} text-center`}>
                        <div className={`text-sm font-bold ${colors.accent}`}>{value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors.tag}`}>
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium text-gray-400">
                        +{project.stack.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => toggle(project.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold ${colors.accent} hover:opacity-80 transition-opacity`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" /> Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" /> Deep dive — problem, architecture, challenges
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-800 p-6 space-y-5 bg-gray-50 dark:bg-gray-900/60">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Problem</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.problem}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Architecture</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.architecture}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Key Challenges</h4>
                      </div>
                      <ul className="space-y-2">
                        {project.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.accent.replace("text-", "bg-")} flex-shrink-0`} />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Scaling Approach</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.scaling}</p>
                    </div>

                    {/* Full stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors.tag}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
