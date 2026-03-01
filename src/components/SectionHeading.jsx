import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function SectionHeading({ title, subtitle }) {
  const { theme } = useTheme();

  const decorStyle = {
    height: "4px",
    width: "50px",
    background: "var(--accent-primary)",
    borderRadius: theme === "neobrutalism" ? "0" : "4px",
    boxShadow:
      theme === "neobrutalism"
        ? "2px 2px 0 var(--shadow-color)"
        : "0 2px 8px var(--glow-color)",
    flexShrink: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="hidden sm:block" style={decorStyle} />
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>
        <div className="hidden sm:block" style={decorStyle} />
      </div>
      {subtitle && (
        <p
          className="text-sm sm:text-base"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
