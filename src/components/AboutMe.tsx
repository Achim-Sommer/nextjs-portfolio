'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiDocker, SiMongodb, SiGit,
  SiPython, SiJavascript, SiLua, SiMysql,
  SiGithub, SiPostgresql
} from 'react-icons/si';
import { FiMapPin, FiCoffee, FiMail, FiCode, FiTerminal, FiHeadphones, FiMoon } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';
import { HiOutlineBriefcase } from 'react-icons/hi2';

// ─── Terminal-Zeilen (außerhalb für stabile Referenz) ────────
const TERMINAL_LINES = [
  { prompt: '~/portfolio', cmd: 'whoami', output: 'Achim Sommer — Full Stack Developer' },
  { prompt: '~/portfolio', cmd: 'cat interests.txt', output: 'Web Dev, System Architecture, UI/UX, Open Source' },
  { prompt: '~/portfolio', cmd: 'git log --oneline -1', output: 'a1b2c3d feat: Building amazing web experiences ✨' },
  { prompt: '~/portfolio', cmd: 'uptime', output: 'coding since 2016 · 8+ years experience' },
];

// ─── Tech Stack Daten ────────────────────────────────────────
const TECH_ITEMS = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
];

const TECH_TAGS = [
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Lua', icon: SiLua, color: '#2C2D72' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
];

// ═══════════════════════════════════════════════════════════════
// Animated Counter — zählt beim Scrollen hoch
// ═══════════════════════════════════════════════════════════════
function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v: number) => setCount(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

// ═══════════════════════════════════════════════════════════════
// Mini Terminal — auto-typing Effekt
// ═══════════════════════════════════════════════════════════════
function MiniTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [completed, setCompleted] = useState<typeof TERMINAL_LINES>([]);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      const t = setTimeout(() => {
        setCompleted([]);
        setCurrentLine(0);
        setCurrentChar(0);
        setShowOutput(false);
      }, 4000);
      return () => clearTimeout(t);
    }

    const line = TERMINAL_LINES[currentLine];

    // Tippen
    if (currentChar < line.cmd.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 45 + Math.random() * 35);
      return () => clearTimeout(t);
    }

    // Output anzeigen
    if (!showOutput) {
      const t = setTimeout(() => setShowOutput(true), 250);
      return () => clearTimeout(t);
    }

    // Nächste Zeile
    const t = setTimeout(() => {
      setCompleted((prev) => [...prev, TERMINAL_LINES[currentLine]]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
      setShowOutput(false);
    }, 1400);
    return () => clearTimeout(t);
  }, [currentLine, currentChar, showOutput]);

  return (
    <div className="font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5 select-none">
      {completed.map((l, i) => (
        <div key={i}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-blue-400 shrink-0">{l.prompt}</span>
            <span className="text-emerald-400 shrink-0">$</span>
            <span className="text-gray-300">{l.cmd}</span>
          </div>
          <p className="text-gray-500 pl-2 sm:pl-4 break-words">{l.output}</p>
        </div>
      ))}

      {currentLine < TERMINAL_LINES.length && (
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-blue-400 shrink-0">{TERMINAL_LINES[currentLine].prompt}</span>
            <span className="text-emerald-400 shrink-0">$</span>
            <span className="text-gray-300">
              {TERMINAL_LINES[currentLine].cmd.slice(0, currentChar)}
            </span>
            <span className="inline-block w-[7px] h-[14px] bg-gray-300 animate-pulse" />
          </div>
          {showOutput && (
            <motion.p
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-500 pl-2 sm:pl-4 break-words"
            >
              {TERMINAL_LINES[currentLine].output}
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Bento Card — wiederverwendbare Karte mit Glasmorphismus
// ═══════════════════════════════════════════════════════════════
function BentoCard({
  children,
  className = '',
  delay = 0,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -5, transition: { duration: 0.3 } } : undefined}
      className={`
        relative overflow-hidden rounded-3xl
        bg-gradient-to-b from-white/[0.05] to-white/[0.02]
        backdrop-blur-2xl
        border border-white/[0.07]
        shadow-[0_2px_40px_rgba(0,0,0,0.35)]
        hover:border-white/[0.14]
        hover:shadow-[0_8px_50px_rgba(59,130,246,0.06)]
        transition-[border-color,box-shadow] duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GitHub-Stats Typ
// ═══════════════════════════════════════════════════════════════
interface GitHubData {
  stats?: {
    repos: number;
    stars: number;
    contributions: number;
    mainLanguages: Record<string, number>;
  };
}

// ═══════════════════════════════════════════════════════════════
// Haupt-Komponente
// ═══════════════════════════════════════════════════════════════
export default function AboutMe() {
  const [github, setGithub] = useState<GitHubData>({});

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => { if (!d.error) setGithub(d); })
      .catch(() => {});
  }, []);

  const stats = github.stats;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Subtiler Hintergrund: Dot-Grid + langsam fließender Gradient */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Dot-Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Slow Gradient Shift — fließt langsam wie bei Apple Keynotes */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4, #8b5cf6, #3b82f6)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 16s ease infinite',
          }}
        />
      </div>

      {/* Keyframes werden inline injected */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section id="about-me" className="relative py-14 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* ── Überschrift ────────────────────────────────── */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              {/* Glow hinter dem Text */}
              <div className="absolute inset-0 blur-[60px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full scale-150" />
              <h2 className="relative text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Über Mich
                </span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-sm sm:text-base max-w-md mx-auto"
            >
              Full Stack Entwickler aus Leidenschaft, Gamer aus Überzeugung.
            </motion.p>
          </div>

          {/* ── Bento Grid ─────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

            {/* ╔═══ Über Mich — groß (2 Spalten, 2 Zeilen) ═══╗ */}
            <BentoCard className="sm:col-span-2 lg:row-span-2 p-7 sm:p-9" delay={0}>
              {/* Deko-Dots */}
              <div className="flex gap-2 mb-7">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Achim Sommer
                  </h3>
                  <p className="text-blue-400 font-semibold mt-1.5 text-sm sm:text-base">
                    Dualer Wirtschaftsinformatik-Student &amp; Full Stack Entwickler
                  </p>
                </div>

                <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed max-w-lg">
                  Seit 2016 entwickle ich leidenschaftlich Webanwendungen und
                  Gaming-Projekte. Von React-Apps über FiveM-Server bis hin zu
                  System-Architekturen&nbsp;– ich liebe es, technische
                  Herausforderungen in elegante Lösungen zu verwandeln.
                </p>

                {/* Wissenschaftliche Arbeiten */}
                <div className="pt-1 space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-gray-600 font-semibold">
                    Wissenschaftliche Arbeiten
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { note: '1,0', title: 'Generative KI zur Erstellung von Management-Summaries aus SAP S/4HANA' },
                      { note: '1,3', title: 'No-Code/Low-Code Plattformen für Unternehmen' },
                      { note: '1,7', title: 'EU KI Act — Auswirkungen auf KMU' },
                      { note: '1,7', title: 'Java-Anwendung: Wertpapier-Depot-Rechner zur KPI-Berechnung' },
                      { note: '2,3', title: 'Joiner–Mover–Leaver-Prozess in hybrider AD/Entra-ID-Umgebung' },
                    ].map((a, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <span className="shrink-0 text-emerald-400 font-mono font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded">
                          {a.note}
                        </span>
                        <span className="text-gray-400">{a.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kontakt */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3">
                  <a
                    href="https://github.com/Achim-Sommer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.18] transition-all text-sm text-gray-300"
                  >
                    <SiGithub className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="mailto:contact@achimsommer.com"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.18] transition-all text-sm text-gray-300"
                  >
                    <FiMail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>

              {/* Deko-Code im Hintergrund */}
              <span className="absolute -bottom-6 -right-3 text-[100px] font-mono text-white/[0.02] font-black select-none pointer-events-none leading-none">
                {'</>'}
              </span>
            </BentoCard>

            {/* ╔═══ Tech Stack ══════════════════════════════╗ */}
            <BentoCard className="p-5 sm:p-6" delay={0.08}>
              <div className="flex items-center gap-2 mb-5">
                <FiCode className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Tech Stack
                </h4>
              </div>

              {/* Icon-Grid */}
              <div className="grid grid-cols-4 gap-3">
                {TECH_ITEMS.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.12, y: -3 }}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <div
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-white/[0.2] transition-all duration-300"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 18px ${tech.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <tech.icon className="w-[18px] h-[18px]" style={{ color: tech.color }} />
                    </div>
                    <span className="text-[10px] text-gray-600 group-hover:text-gray-300 transition-colors duration-200">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/[0.05]">
                {TECH_TAGS.map((t) => (
                  <span
                    key={t.name}
                    className="px-2 py-0.5 text-[10px] rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/[0.14] transition-all cursor-default"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </BentoCard>

            {/* ╔═══ GitHub Stats ════════════════════════════╗ */}
            <BentoCard className="p-5 sm:p-6" delay={0.14}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SiGithub className="w-4 h-4 text-gray-400" />
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    GitHub
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-emerald-500/80 font-medium">live</span>
                </div>
              </div>

              <div className="space-y-5">
                {/* Zahlen */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-extrabold text-white font-mono tracking-tight">
                      <AnimatedCounter target={stats?.repos ?? 0} />
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">Repositories</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white font-mono tracking-tight">
                      <AnimatedCounter target={stats?.stars ?? 0} />
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">Stars</p>
                  </div>
                </div>

                <div>
                  <p className="text-xl font-bold text-white font-mono">
                    <AnimatedCounter target={stats?.contributions ?? 0} />
                  </p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Contributions</p>
                </div>

                {/* Sprachen-Balken */}
                {stats?.mainLanguages && Object.keys(stats.mainLanguages).length > 0 && (
                  <div className="space-y-2 pt-1">
                    {Object.entries(stats.mainLanguages)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([lang, count]) => {
                        const total = Object.values(stats.mainLanguages).reduce((s, v) => s + v, 0);
                        const pct = Math.round((count / total) * 100);
                        return (
                          <div key={lang} className="flex items-center gap-2.5">
                            <span className="text-[10px] text-gray-500 w-[60px] truncate">{lang}</span>
                            <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${pct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                              />
                            </div>
                            <span className="text-[10px] text-gray-600 w-7 text-right font-mono">{pct}%</span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </BentoCard>

            {/* ╔═══ Erfahrung & Bildung ════════════════════╗ */}
            <BentoCard className="p-5 sm:p-6" delay={0.18}>
              <div className="flex items-center gap-2 mb-5">
                <HiOutlineBriefcase className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Erfahrung
                </h4>
              </div>

              <div className="space-y-4">
                {/* IT-Leiter */}
                <div className="relative pl-4 border-l-2 border-emerald-500/40">
                  <div className="absolute -left-[5px] top-[5px] w-2 h-2 rounded-full bg-emerald-500 ring-[3px] ring-emerald-500/20" />
                  <p className="text-sm font-semibold text-white">IT-Leiter</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Schumacher Gruppe · Juli 2025 — Heute</p>
                </div>

                {/* SAP-Entwickler */}
                <div className="relative pl-4 border-l-2 border-blue-500/40">
                  <div className="absolute -left-[5px] top-[5px] w-2 h-2 rounded-full bg-blue-500 ring-[3px] ring-blue-500/20" />
                  <p className="text-sm font-semibold text-white">SAP-Entwickler</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">ROOS IT · Mrz — Jun 2025</p>
                </div>

                {/* Sysadmin */}
                <div className="relative pl-4 border-l-2 border-purple-500/40">
                  <div className="absolute -left-[5px] top-[5px] w-2 h-2 rounded-full bg-purple-500 ring-[3px] ring-purple-500/20" />
                  <p className="text-sm font-semibold text-white">Systemadministrator</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Johanniter · Aug 2023 — Feb 2025</p>
                </div>

                {/* Studium */}
                <div className="relative pl-4 border-l-2 border-cyan-500/40">
                  <div className="absolute -left-[5px] top-[5px] w-2 h-2 rounded-full bg-cyan-500 ring-[3px] ring-cyan-500/20" />
                  <p className="text-sm font-semibold text-white">B.Sc. Wirtschaftsinformatik</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">FOM Köln · 2023 — Heute</p>
                </div>

                {/* Selbstständig */}
                <div className="relative pl-4 border-l-2 border-gray-600/40">
                  <div className="absolute -left-[5px] top-[5px] w-2 h-2 rounded-full bg-gray-500 ring-[3px] ring-gray-500/20" />
                  <p className="text-sm font-semibold text-white">Selbstständiger Entwickler</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Seit 2016</p>
                </div>
              </div>
            </BentoCard>

            {/* ╔═══ Standort & Status ══════════════════════╗ */}
            <BentoCard className="p-5 sm:p-6" delay={0.22}>
              <div className="flex items-center gap-2 mb-4">
                <FiMapPin className="w-4 h-4 text-red-400" />
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Standort
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xl font-bold text-white">Aachen</p>
                  <p className="text-sm text-gray-500">Deutschland 🇩🇪</p>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs text-gray-400">Verfügbar für Projekte</span>
                </div>

                <div className="pt-2 space-y-2 border-t border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <FiCoffee className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-xs text-gray-400">
                      <span className="text-amber-400 font-mono font-bold">3+</span> Kaffee am Tag
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiTerminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-xs text-gray-400">
                      <span className="text-blue-400 font-medium">VS Code</span> Enthusiast
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <IoGameControllerOutline className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="text-xs text-gray-400">
                      <span className="text-purple-400 font-medium">Gamer</span> seit Tag 1
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiMoon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="text-xs text-gray-400">
                      <span className="text-indigo-400 font-medium">Dark Mode</span> only
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiHeadphones className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-xs text-gray-400">
                      Coden mit <span className="text-rose-400 font-medium">Lo-Fi Beats</span>
                    </span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* ╔═══ Mini Terminal — volle Breite ════════════╗ */}
            <BentoCard
              className="col-span-1 sm:col-span-2 lg:col-span-4 p-5 sm:p-6"
              delay={0.26}
              hover={false}
            >
              {/* Terminal-Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[11px] text-gray-600 font-mono">~/achim-sommer — zsh</span>
              </div>

              {/* Terminal-Body */}
              <div className="bg-black/40 rounded-2xl p-4 sm:p-5 h-[180px] sm:h-[200px] overflow-hidden">
                <MiniTerminal />
              </div>
            </BentoCard>
          </div>
        </div>
      </section>
    </div>
  );
}
