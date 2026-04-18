"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PAGES = [
  { label: "Home",     href: "/v2" },
  { label: "About",    href: "/v2/about" },
  { label: "Projects", href: "/v2/projects" },
  { label: "Skills",   href: "/v2/skills" },
  { label: "Contact",  href: "/v2/contact" },
];

export default function V2PageNav() {
  const pathname = usePathname();
  const index = PAGES.findIndex((p) => p.href === pathname);
  const prev = PAGES[index - 1];
  const next = PAGES[index + 1];

  return (
    <div className="flex items-center justify-between pt-10 pb-24 md:pb-12 max-w-5xl mx-auto px-6">
      <div className="flex-1">
        {prev && (
          <Link
            href={prev.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200/80 dark:border-gray-800/60 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {prev.label}
          </Link>
        )}
      </div>

      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/40 text-xs font-mono text-gray-400 dark:text-gray-500 tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(PAGES.length).padStart(2, "0")}
      </span>

      <div className="flex-1 flex justify-end">
        {next && (
          <Link
            href={next.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200/80 dark:border-gray-800/60 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all group"
          >
            {next.label}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
