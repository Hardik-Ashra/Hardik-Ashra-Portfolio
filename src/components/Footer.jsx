/**
 * Footer.jsx
 *
 * Improvements:
 * - Refined three-column layout with clear visual hierarchy
 * - Subtle top border glow instead of a hard line
 * - Icon links with smooth scale+color transition instead of opacity flicker
 * - Kbd shortcut hint refined — softer, more legible
 * - All layout spacing via Tailwind; style only for CSS vars
 */

import { FaGithub, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { personalInfo } from "../utils/data";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { Icon: FaGithub, href: personalInfo.github, label: "GitHub" },
  { Icon: FaLinkedinIn, href: personalInfo.linkedin, label: "LinkedIn" },
  { Icon: HiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full"
      style={{
        background: "var(--bg-secondary)",
        // Subtle gradient top border instead of a flat 1px line
        borderTop: "1px solid var(--border-color)",
      }}
    >
      {/* Thin accent gradient line at very top */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent-primary) 50%, transparent 100%)",
          opacity: 0.25,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* ── Left: Copyright ─────────────────────────────────────── */}
        <p
          className="text-sm tracking-wide order-2 md:order-1"
          style={{ color: "var(--text-muted)" }}
        >
          © {year}{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            {personalInfo.name ?? "Hardik Ashra"}
          </span>
          {" · "}Built with{" "}
          <FaHeart
            className="inline mx-0.5 mb-0.5 text-rose-400 opacity-80"
            size={11}
            aria-label="love"
          />{" "}
          and React.
        </p>

        {/* ── Center: Social icons ─────────────────────────────────── */}
        <div className="flex items-center gap-1 order-1 md:order-2">
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "var(--text-muted)" }}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.93 }}
              // CSS-var color change on hover via data attribute trick isn't
              // possible in Tailwind, so we layer a transparent hover bg instead
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </div>

        {/* ── Right: Keyboard shortcut hint ───────────────────────── */}
        <p
          className="text-xs tracking-wider order-3 flex items-center gap-1.5"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Press
          <kbd
            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs"
            style={{
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.02em",
            }}
          >
            ⌘K
          </kbd>
          for commands
        </p>
      </div>
    </footer>
  );
}
