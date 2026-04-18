"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "mehrahoney638@gmail.com",
    href: "mailto:mehrahoney638@gmail.com",
    description: "Best for project inquiries and role discussions",
    color: "indigo",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "himanshu-mehra-ba97a1213",
    href: "https://linkedin.com/in/himanshu-mehra-ba97a1213",
    description: "Connect for opportunities and professional updates",
    color: "blue",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/honeymdu",
    href: "https://github.com/honeymdu",
    description: "Browse my open-source projects and code",
    color: "gray",
  },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400",
  blue: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-800/40 text-blue-600 dark:text-blue-400",
  gray: "bg-gray-50 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/60 text-gray-600 dark:text-gray-400",
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let&apos;s build something together
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Open to senior backend engineering roles, technical lead positions, and interesting backend challenges.
            Especially interested in AI-integrated systems, distributed platforms, and cloud-native architecture.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {CONTACT_LINKS.map(({ icon: Icon, label, value, href, description, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`flex flex-col gap-3 p-5 rounded-xl border ${colorMap[color]} hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md group`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/60 dark:bg-black/20 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{label}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
              <p className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">{value}</p>
            </a>
          ))}
        </div>

        {/* Location + availability */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Based in Bahadurgarh, India · Open to remote and relocation</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for new opportunities
            </div>

            <a
              href="mailto:mehrahoney638@gmail.com"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              Send me an email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
