/**
 * Hero.jsx — Portfolio Hero Section
 * All spacing via Tailwind. Inline `style` only for CSS variables and
 * font/gradient properties that Tailwind can't reference.
 */

import { useState, useEffect, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaDownload } from "react-icons/fa";
import {
  HiMail,
  HiArrowDown,
  HiCode,
  HiLightningBolt,
  HiGlobe,
} from "react-icons/hi";
import {
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
} from "react-icons/si";
import { useTheme } from "../context/ThemeContext";
import { personalInfo, taglines, highlightCards } from "../utils/data";

// ─── Constants ────────────────────────────────────────────────────────────────

const TAGLINE_INTERVAL_MS = 3500;

const ICON_MAP = { HiCode, HiLightningBolt, HiGlobe };

const ORBIT_ICONS = [
  { Icon: SiReact, color: "#7ecfe0", radius: 280, duration: 22, initialDeg: 0 },
  {
    Icon: SiNodedotjs,
    color: "#7ab87a",
    radius: 320,
    duration: 28,
    initialDeg: 60,
  },
  {
    Icon: SiNextdotjs,
    color: "#999999",
    radius: 260,
    duration: 24,
    initialDeg: 120,
  },
  {
    Icon: SiTailwindcss,
    color: "#6ec6d4",
    radius: 300,
    duration: 20,
    initialDeg: 180,
  },
  {
    Icon: SiTypescript,
    color: "#7a9ec0",
    radius: 340,
    duration: 26,
    initialDeg: 240,
  },
  {
    Icon: SiMongodb,
    color: "#7ab88a",
    radius: 270,
    duration: 23,
    initialDeg: 300,
  },
];

const getSocialLinks = (info) => [
  { Icon: FaGithub, href: info.github, label: "GitHub" },
  { Icon: FaLinkedinIn, href: info.linkedin, label: "LinkedIn" },
  { Icon: HiMail, href: `mailto:${info.email}`, label: "Email" },
];

// ─── Motion helpers ───────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

const springHover = { whileHover: { scale: 1.08, y: -3 } };
const springTap = { whileTap: { scale: 0.93 } };

// ─── Sub-components ───────────────────────────────────────────────────────────

const OrbitRing = memo(function OrbitRing({ shouldAnimate }) {
  if (!shouldAnimate) return null;
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none hidden lg:block opacity-20 z-0"
    >
      {ORBIT_ICONS.map(({ Icon, color, radius, duration, initialDeg }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            transformOrigin: "0 0",
          }}
          initial={{ rotate: initialDeg }}
          animate={{ rotate: initialDeg + 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute flex items-center justify-center w-10 h-10 -left-5 rounded-xl"
            style={{
              top: -radius,
              background: "var(--bg-card)",
              border: "var(--card-border)",
              boxShadow: "var(--card-shadow)",
            }}
            initial={{ rotate: -initialDeg }}
            animate={{ rotate: -(initialDeg + 360) }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <Icon size={18} color={color} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
});

const StatusBadge = memo(function StatusBadge() {
  return (
    <motion.div
      {...fadeUp(0.2)}
      // FIX: was px-2 py-1 — too tight, now proper px-4 py-2
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        border: "var(--card-border)",
        background: "var(--bg-card)",
        boxShadow: "var(--card-shadow)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.82rem",
        color: "var(--text-secondary)",
        letterSpacing: "0.03em",
      }}
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      Available for opportunities
    </motion.div>
  );
});

const AnimatedName = memo(function AnimatedName({ name }) {
  return (
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {name.split("").map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35 + i * 0.035,
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          className="inline-block"
          style={{ minWidth: letter === " " ? "0.3em" : undefined }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
});

const RotatingTagline = memo(function RotatingTagline({ taglines: lines }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % lines.length),
      TAGLINE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className="h-6 overflow-hidden" aria-live="polite" aria-atomic="true">
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.88rem",
          letterSpacing: "0.02em",
        }}
      >
        {lines[index]}
      </motion.p>
    </div>
  );
});

const SocialLinks = memo(function SocialLinks({ links }) {
  return (
    <motion.div
      {...fadeUp(1.1)}
      className="flex items-center justify-center gap-3"
    >
      {links.map(({ Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            border: "var(--card-border)",
            background: "var(--bg-card)",
            boxShadow: "var(--card-shadow)",
            color: "var(--text-primary)",
            backdropFilter: "blur(var(--backdrop-blur))",
          }}
          aria-label={label}
          {...springHover}
          {...springTap}
        >
          <Icon size={20} />
        </motion.a>
      ))}
    </motion.div>
  );
});

const CTAButtons = memo(function CTAButtons({ resumeUrl }) {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      {...fadeUp(1.3)}
      className="flex flex-col sm:flex-row items-center justify-center gap-3"
    >
      <motion.a
        href="#projects"
        onClick={handleScrollToProjects}
        className="neo-btn neo-btn-primary"
        {...springHover}
        {...springTap}
      >
        View Projects <HiArrowDown size={16} aria-hidden="true" />
      </motion.a>
      <motion.a
        href={resumeUrl}
        download
        className="neo-btn neo-btn-secondary"
        {...springHover}
        {...springTap}
      >
        Download Resume <FaDownload size={14} aria-hidden="true" />
      </motion.a>
    </motion.div>
  );
});

const HighlightCards = memo(function HighlightCards({ cards }) {
  return (
    <motion.div
      {...fadeUp(1.5)}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
    >
      {cards.map((card) => {
        const IconComp = ICON_MAP[card.icon];
        return (
          <motion.div
            key={card.title}
            className="neo-card group relative p-8 text-center rounded-2xl"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
              border: "var(--card-border)",
              background: "var(--bg-card)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "var(--bg-secondary)",
                border: "var(--card-border)",
                color: "var(--accent-primary)",
              }}
            >
              {IconComp && <IconComp size={24} />}
            </div>

            <h3
              className="text-base font-semibold mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
              }}
            >
              {card.title}
            </h3>

            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "240px",
                margin: "0 auto",
              }}
            >
              {card.description}
            </p>

            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%)",
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
});

const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <motion.div {...fadeUp(2.0)} aria-hidden="true">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block"
      >
        <HiArrowDown size={20} style={{ color: "var(--text-muted)" }} />
      </motion.div>
    </motion.div>
  );
});

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const socialLinks = getSocialLinks(personalInfo);
  const titleLine = `${personalInfo.title} • ${personalInfo.subtitle.split("•")[0].trim()}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 0 — animated grid */}
      <div className="animated-grid" aria-hidden="true" />

      {/* Layer 1 — orbit ring */}
      <OrbitRing shouldAnimate={!prefersReducedMotion} />

      {/* Layer 2 — content */}
      <div className="section-container relative z-10 flex flex-col items-center text-center w-full pt-28 pb-12">
        {/* ── Group A: Identity ── */}
        <StatusBadge />
        <div className="h-5" /> {/* badge → name */}
        <AnimatedName name={personalInfo.name} />
        <div className="h-3" /> {/* name → title */}
        <motion.p
          {...fadeUp(0.9)}
          className="text-lg sm:text-xl md:text-2xl font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            background:
              "linear-gradient(90deg, var(--text-primary) 0%, var(--text-secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {titleLine}
        </motion.p>
        <div className="h-4" /> {/* title → tagline */}
        <RotatingTagline taglines={taglines} />
        {/* ── Group break A → B ── */}
        <div className="h-9" />
        {/* ── Group B: Actions ── */}
        <SocialLinks links={socialLinks} />
        <div className="h-4" /> {/* social → CTAs */}
        <CTAButtons resumeUrl={personalInfo.resumeUrl} />
        {/* ── Group break B → C ── */}
        <div className="h-14" />
        {/* ── Group C: Stats ── */}
        <HighlightCards cards={highlightCards} />
        <div className="h-10" /> {/* cards → scroll indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
}
