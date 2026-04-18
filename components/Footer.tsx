import { Code2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-gray-950 py-10 px-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">Himanshu Mehra</span>
          <span className="text-gray-400 text-sm hidden sm:block">· Backend Engineer</span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Built with Next.js · Tailwind CSS · TypeScript
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/honeymdu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/himanshu-mehra-ba97a1213"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:mehrahoney638@gmail.com"
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
