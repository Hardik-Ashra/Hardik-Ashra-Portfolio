/**
 * Projects.jsx
 *
 * Theme fix: project.accent hardcoded hex values are replaced with CSS
 * variable references. Each project in data.js should now have an
 * `accentVar` field (e.g. "var(--accent-primary)") instead of / alongside
 * a hex `accent`.
 *
 * If your data still uses hex `accent`, we derive a CSS variable key from
 * the project index so you can map each project to a theme token.
 * All sizes, opacities, and color usage patterns are kept exactly as original.
 */

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../utils/data";

// ─── Accent variable mapping ──────────────────────────────────────────────────
/**
 * Maps each project to a CSS variable so colors shift with the active theme.
 * Add as many CSS vars to your theme as you have projects, e.g.:
 *
 *   --project-accent-0: #61dafb;   (light theme)
 *   --project-accent-0: #38bdf8;   (dark theme)
 *
 * Or reuse your existing accent tokens if you have fewer projects than tokens.
 *
 * Fallback order: project.accentVar → --project-accent-{i} → --accent-primary
 */
const PROJECT_ACCENT_VARS = [
  "var(--project-accent-0, var(--accent-primary))",
  "var(--project-accent-1, var(--accent-secondary))",
  "var(--project-accent-2, var(--accent-tertiary))",
  "var(--project-accent-3, var(--accent-primary))",
  "var(--project-accent-4, var(--accent-secondary))",
  "var(--project-accent-5, var(--accent-tertiary))",
];

/** Returns the theme-aware accent CSS expression for a given project index */
const getAccent = (project, index) =>
  project.accentVar ?? PROJECT_ACCENT_VARS[index % PROJECT_ACCENT_VARS.length];

// ─── Motion config ────────────────────────────────────────────────────────────

const cardEntrance = (index) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { delay: index * 0.1, duration: 0.5 },
});

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  // Consuming theme so card re-renders when theme switches
  const { theme } = useTheme();

  const accent = getAccent(project, index);
  const hasLiveLink = project.live && project.live !== "#";

  return (
    <motion.div
      {...cardEntrance(index)}
      className="neo-card overflow-hidden group relative"
    >
      {/* Accent top bar — theme-aware color, original h-1.5 size */}
      <div className="h-1.5" style={{ background: accent }} />

      {/* Hover glow overlay — original pattern, theme-aware accent */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 7%, transparent), transparent, color-mix(in srgb, ${accent} 5%, transparent))`,
        }}
      />

      <div className="p-7 relative z-10">
        {/* ── Title row ── */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="text-xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
              }}
            >
              {project.title}
            </h3>

            {project.subtitle && (
              <p
                className="text-sm mt-0.5"
                style={{
                  color: accent, // ← theme-aware
                  fontFamily: "var(--font-mono)",
                }}
              >
                {project.subtitle}
              </p>
            )}
          </div>

          {/* ── Links ── */}
          <div className="flex items-center gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  border: "var(--card-border)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={16} />
              </motion.a>
            )}

            {hasLiveLink && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: accent, // ← theme-aware
                  color: "white",
                  border: "var(--card-border)",
                  // box-shadow can't use CSS vars in spread syntax easily,
                  // so we keep it as a CSS variable reference:
                  boxShadow: `0 2px 8px color-mix(in srgb, ${accent} 25%, transparent)`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt size={12} />
              </motion.a>
            )}
          </div>
        </div>

        {/* ── Description ── */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* ── Tech stack pills — theme-aware accent tint ── */}
        <div className="flex flex-wrap gap-2.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                // color-mix lets us tint using CSS vars — fully theme-aware
                background: `color-mix(in srgb, ${accent} 10%, var(--bg-secondary))`,
                color: accent, // ← theme-aware
                border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="section-container">
      <SectionHeading
        title="Featured Projects"
        subtitle="Products I've designed, built, and shipped"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
