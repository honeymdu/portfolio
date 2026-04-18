"use client";

import { useState, useTransition, useRef } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

type ContactState = { success?: boolean; error?: string } | null;

const WEB3FORMS_KEY = "f4f71a7c-b1d8-4873-84f3-910a42f30af6";

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
  indigo:
    "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400",
  blue: "bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-800/40 text-blue-600 dark:text-blue-400",
  gray: "bg-gray-50 dark:bg-gray-800/60 border-gray-100 dark:border-gray-700/60 text-gray-600 dark:text-gray-400",
};

function ContactForm() {
  const [state, setState] = useState<ContactState>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setState({ error: "All fields are required." });
      return;
    }

    startTransition(async () => {
      try {
        const body = new FormData();
        body.append("access_key", WEB3FORMS_KEY);
        body.append("name", name);
        body.append("email", email);
        body.append("message", message);
        body.append("subject", `Portfolio message from ${name}`);
        body.append("from_name", name);
        body.append("botcheck", "");

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body,
        });
        const data = await res.json();
        if (data.success) {
          setState({ success: true });
          formRef.current?.reset();
        } else {
          setState({ error: data.message ?? "Failed to send. Please email me directly at mehrahoney638@gmail.com." });
        }
      } catch {
        setState({ error: "Failed to send. Please email me directly at mehrahoney638@gmail.com." });
      }
    });
  }

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Message sent!</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role, project, or just say hello..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
      >
        <Send className="w-4 h-4" />
        {isPending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

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

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — form */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">Send a message</h3>
            <ContactForm />
          </div>

          {/* Right — links + location */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {CONTACT_LINKS.map(({ icon: Icon, label, value, href, description, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`flex flex-col gap-2 p-4 rounded-xl border ${colorMap[color]} hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/60 dark:bg-black/20 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{label}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">{value}</p>
              </a>
            ))}

            <div className="mt-2 flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs">Bahadurgarh, India · Open to remote and relocation</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for new opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
