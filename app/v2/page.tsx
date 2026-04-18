import Image from "next/image";
import Link from "next/link";
import { Download, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import V2PageNav from "@/components/V2PageNav";

const STATS = [
  { value: "3.5+", label: "Years Exp" },
  { value: "45%",  label: "Perf Gains" },
  { value: "90%",  label: "AI Accuracy" },
  { value: "1M+",  label: "Concurrent" },
];

const BADGES = ["Java", ".NET", "Spring Boot", "GCP", "Docker", "Kafka", "RabbitMQ", "MongoDB"];

export default function V2Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">

      {/* Background glow orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/8 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/6 dark:bg-cyan-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 mt-4">
        <div className="max-w-2xl mx-auto text-center w-full">

          {/* Profile photo */}
          <div className="flex justify-center mb-7">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 blur-lg opacity-40 scale-110" />
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                <Image
                  src="/profile.jpg"
                  alt="Himanshu Mehra"
                  fill
                  className="rounded-full object-cover ring-2 ring-indigo-500/40 shadow-2xl"
                  priority
                />
                <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-950 shadow-lg shadow-emerald-500/40" />
              </div>
            </div>
          </div>

          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to senior backend roles
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3 leading-[1.05]">
            Himanshu<br className="sm:hidden" />{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">Mehra</span>
          </h1>

          {/* Title */}
          <p className="text-base sm:text-lg font-semibold text-gray-500 dark:text-gray-400 mb-4 tracking-wide uppercase text-xs sm:text-sm">
            Backend Engineer &nbsp;·&nbsp; Project Lead
          </p>

          {/* Bio */}
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed mb-10 text-sm sm:text-base">
            Building microservices, real-time AI systems, and cloud-native platforms that scale — Java · .NET · Spring Boot · GCP.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-0 mb-10 bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800/60 rounded-2xl backdrop-blur-sm overflow-hidden shadow-sm">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className={`flex-1 py-4 text-center ${i < STATS.length - 1 ? "border-r border-gray-200/60 dark:border-gray-800/60" : ""}`}>
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">{value}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {BADGES.map((b) => (
              <span key={b} className="px-3 py-1 rounded-full bg-white dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 text-xs font-medium shadow-sm hover:border-indigo-400/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link
              href="/v2/projects"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/v2/contact"
              className="px-6 py-2.5 rounded-xl border border-gray-300/80 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Get In Touch
            </Link>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-indigo-300/60 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/honeymdu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-medium"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
            <a
              href="https://linkedin.com/in/himanshu-mehra-ba97a1213"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
            <span className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
            <a
              href="mailto:mehrahoney638@gmail.com"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <V2PageNav />
      </div>
    </div>
  );
}
