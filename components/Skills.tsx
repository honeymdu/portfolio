"use client";

const SKILL_GROUPS = [
  {
    category: "Languages",
    color: "indigo",
    skills: [
      { name: "Java", level: 95 },
      { name: "C#", level: 88 },
      { name: "SQL", level: 85 },
      { name: "TypeScript", level: 65 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    color: "purple",
    skills: [
      { name: "Spring Boot", level: 95 },
      { name: ".NET Core", level: 90 },
      { name: "Hibernate ORM", level: 88 },
      { name: "JPA", level: 85 },
      { name: "React", level: 65 },
      { name: "Maven", level: 80 },
    ],
  },
  {
    category: "Messaging & Events",
    color: "amber",
    skills: [
      { name: "Apache Kafka", level: 85 },
      { name: "REST APIs", level: 95 },
      { name: "WebSockets", level: 75 },
    ],
  },
  {
    category: "Databases",
    color: "emerald",
    skills: [
      { name: "PostgreSQL + PostGIS", level: 88 },
      { name: "SQL Server (MSSQL)", level: 85 },
      { name: "MongoDB", level: 75 },
      { name: "Neo4j", level: 70 },
      { name: "Oracle DB", level: 72 },
    ],
  },
  {
    category: "Cloud & DevOps",
    color: "cyan",
    skills: [
      { name: "Google Cloud Platform", level: 88 },
      { name: "Docker", level: 90 },
      { name: "AWS (EC2, CodeCommit)", level: 78 },
      { name: "Azure", level: 75 },
      { name: "Cloud Run", level: 85 },
    ],
  },
  {
    category: "Architecture & Concepts",
    color: "pink",
    skills: [
      { name: "Microservices Design", level: 92 },
      { name: "Event-Driven Architecture", level: 88 },
      { name: "RBAC + JWT Auth", level: 90 },
      { name: "API Gateway Patterns", level: 85 },
      { name: "Database Indexing", level: 85 },
      { name: "Design Patterns (GoF)", level: 88 },
    ],
  },
];

const TOOLS = [
  "IntelliJ IDEA", "Visual Studio", "VS Code", "Postman", "Docker Desktop",
  "Git", "GitHub", "Bitbucket", "Azure Repos", "UiPath",
  "Hangfire", "Eureka Discovery", "Feign Client", "OSRM API", "Vonage API",
];

const barColorMap: Record<string, string> = {
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
};

const badgeColorMap: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
  amber: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
  emerald: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  cyan: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300",
  pink: "bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical toolkit
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Hands-on experience across the full backend stack — from language-level to cloud deployment.
          </p>
        </div>

        {/* Skill groups with progress bars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SKILL_GROUPS.map(({ category, color, skills }) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
            >
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${badgeColorMap[color].split(" ").slice(2).join(" ")}`}>
                {category}
              </h3>
              <div className="space-y-3">
                {skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
                      <span className="text-xs text-gray-400">{level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`h-full rounded-full ${barColorMap[color]} transition-all duration-1000`}
                        style={{ width: `${level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools badge cloud */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Tools & Platforms
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {[
            { name: "Java Backend Development", org: "Certified", color: "indigo" },
            { name: "Docker Essentials", org: "Certified", color: "cyan" },
          ].map(({ name, org, color }) => (
            <div
              key={name}
              className={`flex items-center gap-4 p-4 rounded-xl ${badgeColorMap[color]} border border-current/10`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/50 dark:bg-black/20 flex items-center justify-center font-bold text-lg">
                🏆
              </div>
              <div>
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs opacity-70">{org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
