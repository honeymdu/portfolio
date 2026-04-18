"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
  { label: "Home",     href: "/v2" },
  { label: "About",    href: "/v2/about" },
  { label: "Projects", href: "/v2/projects" },
  { label: "Skills",   href: "/v2/skills" },
  { label: "Contact",  href: "/v2/contact" },
];

export default function V2Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Floating pill nav — desktop */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/40 rounded-2xl shadow-xl shadow-black/10 px-2 py-2">
          {PAGES.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/60"
                }`}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logo — top left */}
      <div className="fixed top-5 left-6 z-50 hidden md:flex items-center gap-2">
        <Link href="/v2" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <span className="text-white text-xs font-bold">HM</span>
          </div>
        </Link>
      </div>

      {/* Hire me — top right */}
      <div className="fixed top-5 right-6 z-50 hidden md:block">
        <a
          href="mailto:mehrahoney638@gmail.com"
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Hire Me
        </a>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="flex items-center justify-around h-14 px-2 max-w-sm mx-auto">
          {PAGES.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                <div className={`w-1 h-1 rounded-full transition-all duration-200 ${active ? "bg-indigo-600 scale-150" : "bg-transparent"}`} />
                {page.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
