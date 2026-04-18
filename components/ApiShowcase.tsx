"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

type ApiTab = "translate" | "zomato" | "ride";

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
    title: "Voice Translator API",
    base: "https://translator.ezeeflights.internal/api",
    color: "indigo",
    endpoints: [
      {
        method: "POST",
        path: "/call/create",
        description: "Agent initiates an outbound call. Translator Service calls Vonage via CallProviderStrategy, receives a conversationUuid, and returns the WebSocket endpoint the agent browser should connect to for audio streaming.",
        requestBody: JSON.stringify(
          {
            agentId: "agent_9f3a8c",
            toNumber: "+33612345678",
            targetLanguageVonage: "fr-FR",
            targetLanguageAgent: "en-US",
            preferredVoiceVonage: "fr-FR-Standard-A",
            preferredVoiceAgent: "en-US-Standard-B",
            translationEnabled: true,
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            conversationUuid: "CON-4f2e9a1b-8c3d",
            callUuid: "CALL-7b3e2f",
            status: "RINGING",
            agentStreamEndpoint: "wss://translator.ezeeflights.internal/agent_stream?conversation_uuid=CON-4f2e9a1b-8c3d",
            message: "Connect browser WebSocket to agentStreamEndpoint and stream PCM16LE 16kHz mono audio.",
          },
          null,
          2
        ),
        notes: "Agent browser opens WebSocket to agentStreamEndpoint, sends binary PCM frames. Server pushes text control messages back: agent-transcript, lang-change, translation-mode.",
      },
      {
        method: "POST",
        path: "/call/language/{conversationUuid}",
        description: "Change target language mid-call without interrupting the audio stream. Fires a LanguageChangeEvent that reinitializes the STT and TTS sessions for the affected call leg.",
        requestBody: JSON.stringify(
          {
            targetLanguageVonage: "es-ES",
            preferredVoiceVonage: "es-ES-Standard-A",
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            conversationUuid: "CON-4f2e9a1b-8c3d",
            updated: true,
            targetLanguageVonage: "es-ES",
            message: "Language change applied. STT and TTS sessions reinitialized for customer leg.",
          },
          null,
          2
        ),
        notes: "LanguageChangeEvent is dispatched in-process via Spring ApplicationEventPublisher — no call interruption.",
      },
      {
        method: "GET",
        path: "/call/session/{conversationUuid}",
        description: "Fetch full call session including embedded utterance history. Active calls are served from ConcurrentHashMap; completed calls from MongoDB.",
        response: JSON.stringify(
          {
            conversationUuid: "CON-4f2e9a1b-8c3d",
            agentId: "agent_9f3a8c",
            callStatus: "COMPLETED",
            callDurationSeconds: 312,
            targetLanguageAgent: "en-US",
            targetLanguageVonage: "fr-FR",
            translationEnabled: true,
            callUterances: [
              {
                speaker: "AGENT",
                originalText: "Good morning, how can I help you?",
                translatedText: "Bonjour, comment puis-je vous aider?",
                timestamp: "2025-08-15T10:32:08Z",
              },
              {
                speaker: "CUSTOMER",
                originalText: "Je voudrais changer mon vol.",
                translatedText: "I would like to change my flight.",
                timestamp: "2025-08-15T10:32:14Z",
              },
            ],
          },
          null,
          2
        ),
      },
    ],
  },
  zomato: {
    title: "Zomato Clone API",
    base: "https://api.zotatofoods.internal/v1",
    color: "emerald",
    endpoints: [
      {
        method: "POST",
        path: "/restaurants/nearby",
        description: "Find open restaurants within a radius using PostGIS spatial index. Results ranked by order priority and restaurant priority score.",
        requestBody: JSON.stringify(
          {
            location: { lat: 28.6139, lng: 77.209 },
            radiusKm: 5,
            cuisine: "NORTH_INDIAN",
            sortBy: "RELEVANCE",
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            total: 12,
            restaurants: [
              {
                restaurantId: "rst_4a8c2f",
                name: "Spice Garden",
                distanceKm: 1.4,
                etaMinutes: 28,
                rating: 4.3,
                cuisine: ["NORTH_INDIAN", "CHINESE"],
                isOpen: true,
                priorityScore: 0.91,
              },
            ],
            searchRadiusKm: 5,
            center: { lat: 28.6139, lng: 77.209 },
          },
          null,
          2
        ),
        notes: "Uses PostGIS ST_DWithin on a spatial index — sub-50ms lookup regardless of restaurant count.",
      },
      {
        method: "POST",
        path: "/orders/place",
        description: "Place an order. Triggers the order allocation strategy — assigns to best-fit restaurant based on order priority and restaurant load.",
        requestBody: JSON.stringify(
          {
            customerId: "cust_9b3e1a",
            restaurantId: "rst_4a8c2f",
            items: [
              { itemId: "itm_butter_chicken", quantity: 2, notes: "extra spicy" },
              { itemId: "itm_naan", quantity: 4 },
            ],
            deliveryAddress: { lat: 28.6211, lng: 77.2018, label: "Home" },
            paymentMethod: "WALLET",
          },
          null,
          2
        ),
        response: JSON.stringify(
          {
            orderId: "ord_7c4f2b",
            status: "CONFIRMED",
            estimatedDeliveryMins: 35,
            assignedRestaurant: "rst_4a8c2f",
            fare: { subtotal: 480, deliveryFee: 30, total: 510, currency: "INR" },
            paymentStatus: "DEBITED",
            trackingEndpoint: "/orders/ord_7c4f2b/track",
          },
          null,
          2
        ),
        notes: "Wallet debit uses optimistic locking to prevent double-spend on concurrent orders.",
      },
      {
        method: "GET",
        path: "/orders/{orderId}/track",
        description: "Real-time order tracking — delivery partner location via OSRM, live ETA recalculation, and order state machine transitions.",
        response: JSON.stringify(
          {
            orderId: "ord_7c4f2b",
            status: "OUT_FOR_DELIVERY",
            deliveryPartner: {
              name: "Ravi S.",
              phone: "+91 98XXXXXXXX",
              currentLocation: { lat: 28.617, lng: 77.205 },
              distanceToCustomerKm: 0.8,
              etaMinutes: 7,
            },
            timeline: [
              { state: "CONFIRMED", at: "2025-09-10T12:00:01Z" },
              { state: "PREPARING", at: "2025-09-10T12:02:14Z" },
              { state: "PICKED_UP", at: "2025-09-10T12:28:45Z" },
              { state: "OUT_FOR_DELIVERY", at: "2025-09-10T12:29:03Z" },
            ],
          },
          null,
          2
        ),
        notes: "OSRM recalculates ETA on each location ping. State machine ensures no invalid transitions (e.g. DELIVERED → PREPARING).",
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
