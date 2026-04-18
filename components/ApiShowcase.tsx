"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

type ApiTab = "translate" | "prepfi" | "ride";

interface Endpoint {
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  requestBody?: string;
  response: string;
  notes?: string;
}

const API_GROUPS: Record<ApiTab, { title: string; base: string; color: string; endpoints: Endpoint[] }> = {
  translate: {
    title: "Voice Translation API",
    base: "https://api.voicetranslate.internal/v1",
    color: "indigo",
    endpoints: [
      {
        method: "POST",
        path: "/calls/initiate",
        description: "Start a new translation call session with source and target language config.",
        requestBody: JSON.stringify(
          {
            agentId: "agent_9f3a8c",
            inboundNumber: "+15551234567",
            sourceLanguage: "en-US",
            targetLanguage: "fr-FR",
            domain: "insurance",
            callbackUrl: "https://agent.dashboard.internal/webhook/transcript",
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            callId: "call_2f4e9a1b",
            sessionToken: "eyJhbGciOiJIUzI1NiJ9...",
            streamEndpoint: "wss://stream.voicetranslate.internal/call_2f4e9a1b",
            status: "ACTIVE",
            estimatedLatencyMs: 380,
            createdAt: "2025-08-15T10:32:01Z",
          },
          null,
          2
        ),
        notes: "Returns a WebSocket endpoint for real-time transcript streaming.",
      },
      {
        method: "GET",
        path: "/calls/{callId}/transcripts",
        description: "Retrieve full translated transcript log for a completed call.",
        response: JSON.stringify(
          {
            callId: "call_2f4e9a1b",
            duration: 312,
            totalSegments: 47,
            transcripts: [
              {
                segmentId: 1,
                speakerRole: "AGENT",
                originalText: "Good morning, how can I help you today?",
                translatedText: "Bonjour, comment puis-je vous aider aujourd'hui?",
                sourceLanguage: "en-US",
                targetLanguage: "fr-FR",
                confidence: 0.96,
                latencyMs: 412,
                timestamp: "2025-08-15T10:32:08Z",
              },
            ],
            averageConfidence: 0.913,
            averageLatencyMs: 394,
          },
          null,
          2
        ),
      },
      {
        method: "POST",
        path: "/models/fine-tune/evaluate",
        description: "Evaluate domain-specific translation accuracy against a golden test set.",
        requestBody: JSON.stringify(
          {
            domain: "insurance",
            languagePair: "en-fr",
            testSetId: "ts_insurance_fr_v3",
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            evaluationId: "eval_9a3c",
            bleuScore: 0.89,
            domainAccuracy: 0.913,
            terminologyPrecision: 0.945,
            testedSamples: 1200,
            status: "COMPLETED",
          },
          null,
          2
        ),
      },
    ],
  },
  prepfi: {
    title: "PrepFi EdTech API",
    base: "https://api.prepfi.internal/v1",
    color: "purple",
    endpoints: [
      {
        method: "POST",
        path: "/tests/assign",
        description: "Teacher assigns a test to a student group with configurable parameters.",
        requestBody: JSON.stringify(
          {
            teacherId: "tchr_84a2c1",
            testTemplateId: "tpl_math_q3_2025",
            studentGroupId: "grp_grade9_a",
            scheduledAt: "2025-09-10T09:00:00Z",
            durationMinutes: 60,
            randomizeQuestions: true,
            enableTournamentMode: false,
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            assignmentId: "asgn_c7f2d9",
            status: "SCHEDULED",
            affectedStudents: 34,
            notificationsQueued: 34,
            testStartsAt: "2025-09-10T09:00:00Z",
            reportAvailableAfter: "2025-09-10T10:15:00Z",
          },
          null,
          2
        ),
        notes: "Notification service dispatches alerts to students asynchronously.",
      },
      {
        method: "GET",
        path: "/reports/student/{studentId}/summary",
        description: "Parent or teacher fetches aggregated performance summary for a student.",
        response: JSON.stringify(
          {
            studentId: "std_7b3e2f",
            studentName: "Arjun Sharma",
            overallScore: 82.4,
            rank: 7,
            totalStudents: 34,
            subjectBreakdown: [
              { subject: "Mathematics", avgScore: 88.5, testsAttempted: 5 },
              { subject: "Science", avgScore: 76.2, testsAttempted: 4 },
            ],
            improvement: "+12.3%",
            generatedAt: "2025-09-11T08:00:00Z",
          },
          null,
          2
        ),
      },
      {
        method: "GET",
        path: "/tournaments/leaderboard/{tournamentId}",
        description: "Fetch real-time tournament rankings with score and completion status.",
        response: JSON.stringify(
          {
            tournamentId: "trn_fall2025_q3",
            status: "ACTIVE",
            endsAt: "2025-09-15T18:00:00Z",
            totalParticipants: 128,
            leaderboard: [
              { rank: 1, studentName: "Priya K.", score: 980, timeTakenSecs: 2840, badge: "GOLD" },
              { rank: 2, studentName: "Arjun S.", score: 965, timeTakenSecs: 3012, badge: "SILVER" },
              { rank: 3, studentName: "Rohit M.", score: 940, timeTakenSecs: 2950, badge: "BRONZE" },
            ],
            lastUpdated: "2025-09-14T14:22:31Z",
          },
          null,
          2
        ),
      },
    ],
  },
  ride: {
    title: "Uber Clone Ride API",
    base: "https://api.uberclone.internal/v1",
    color: "amber",
    endpoints: [
      {
        method: "POST",
        path: "/rides/request",
        description: "Rider requests a ride — triggers geospatial driver matching.",
        requestBody: JSON.stringify(
          {
            riderId: "rider_4c8f2e",
            pickup: { lat: 28.6139, lng: 77.2090, address: "Connaught Place, Delhi" },
            dropoff: { lat: 28.5355, lng: 77.3910, address: "Noida Sector 18" },
            rideType: "ECONOMY",
            paymentMethod: "WALLET",
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            rideId: "ride_9e1a4f",
            status: "MATCHING",
            estimatedPickupMins: 4,
            matchedDriver: {
              driverId: "drv_2b7c3a",
              name: "Rajesh Kumar",
              rating: 4.87,
              vehicleNumber: "DL 4C AB 1234",
              distanceKm: 1.2,
              etaSeconds: 240,
            },
            fare: {
              baseFare: 45.00,
              distanceFare: 112.50,
              total: 157.50,
              currency: "INR",
            },
            routePolyline: "encoded_polyline_string_here",
          },
          null,
          2
        ),
        notes: "Uses PostGIS radius search + strategy pattern for driver selection.",
      },
      {
        method: "GET",
        path: "/drivers/nearby",
        description: "Returns available drivers within radius using geospatial index.",
        response: JSON.stringify(
          {
            searchRadius: "5km",
            center: { lat: 28.6139, lng: 77.2090 },
            availableDrivers: 12,
            drivers: [
              {
                driverId: "drv_2b7c3a",
                distanceKm: 1.2,
                etaSeconds: 240,
                rating: 4.87,
                vehicleType: "ECONOMY",
                currentLocation: { lat: 28.6211, lng: 77.2018 },
              },
            ],
          },
          null,
          2
        ),
      },
    ],
  },
};

const methodColors: Record<string, string> = {
  GET: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  POST: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  PUT: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  DELETE: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  PATCH: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-3 py-1.5 rounded-t-lg">
        <span className="text-xs font-mono text-gray-400">{label}</span>
        <CopyButton text={code} />
      </div>
      <pre className="bg-gray-900 text-gray-100 text-xs p-4 rounded-b-lg overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ApiShowcase() {
  const [activeTab, setActiveTab] = useState<ApiTab>("translate");
  const [openEndpoint, setOpenEndpoint] = useState<string | null>(null);
  const group = API_GROUPS[activeTab];

  return (
    <section id="api-showcase" className="py-24 px-4 sm:px-6 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            API Showcase
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API design in practice
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            REST endpoint samples from my production and personal projects — clean contracts, meaningful responses.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-xl w-fit mx-auto flex-wrap justify-center">
          {(Object.entries(API_GROUPS) as [ApiTab, typeof API_GROUPS[ApiTab]][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setOpenEndpoint(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {val.title}
            </button>
          ))}
        </div>

        {/* Base URL */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 mb-6">
          <Terminal className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-400 font-mono">Base URL:</span>
          <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{group.base}</span>
        </div>

        {/* Endpoints */}
        <div className="space-y-3">
          {group.endpoints.map((ep) => {
            const key = `${ep.method}-${ep.path}`;
            const isOpen = openEndpoint === key;

            return (
              <div
                key={key}
                className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenEndpoint(isOpen ? null : key)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                >
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${methodColors[ep.method]}`}>
                    {ep.method}
                  </span>
                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300 flex-1">{ep.path}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 hidden sm:block">{ep.description}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80 p-4 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ep.description}</p>
                    {ep.notes && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg px-3 py-2">
                        💡 {ep.notes}
                      </p>
                    )}
                    {ep.requestBody && (
                      <CodeBlock code={ep.requestBody} label="Request Body (JSON)" />
                    )}
                    <CodeBlock code={ep.response} label="Response (200 OK)" />
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
