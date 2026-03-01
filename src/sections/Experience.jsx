import { motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../utils/data";

function TimelineItem({ item, index }) {
  const { theme } = useTheme();
  const isLeft = index % 2 === 0;
  const isWork = item.type === "work";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start gap-4 mb-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div className="neo-card p-6">
          <div
            className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""} flex-wrap`}
          >
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold uppercase"
              style={{
                background: isWork
                  ? "var(--accent-primary)"
                  : "var(--accent-tertiary)",
                color: "white",
                border: "var(--card-border)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {item.type}
            </span>
            <span
              className="text-xs"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {item.period}
            </span>
          </div>

          <h3
            className="text-lg font-bold mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--accent-primary)" }}
          >
            {item.org}
          </p>
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.description}
          </p>

          <div
            className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}
          >
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline dot */}
      <div
        className="hidden md:flex flex-col items-center shrink-0"
        style={{ width: "40px" }}
      >
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{
            background: isWork
              ? "var(--accent-primary)"
              : "var(--accent-tertiary)",
            border:
              theme === "neobrutalism"
                ? "3px solid var(--border-color)"
                : "2px solid var(--bg-primary)",
            boxShadow:
              theme === "neobrutalism"
                ? "3px 3px 0 var(--shadow-color)"
                : `0 0 20px ${isWork ? "var(--accent-primary)" : "var(--accent-tertiary)"}40`,
            color: "white",
          }}
          whileHover={{ scale: 1.2 }}
        >
          {isWork ? <HiBriefcase size={16} /> : <HiAcademicCap size={16} />}
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-container">
      <SectionHeading
        title="Experience & Education"
        subtitle="My professional journey so far"
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="timeline-line hidden md:block" />

        {experience.map((item, i) => (
          <TimelineItem key={item.title + item.org} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
