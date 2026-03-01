import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { aboutText } from "../utils/data";

export default function About() {
  const { theme } = useTheme();
  const paragraphs = aboutText.split("\n\n");

  return (
    <section id="about" className="section-container">
      <SectionHeading title="About Me" subtitle="The story behind the code" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Text Content */}
        <motion.div
          className="lg:col-span-3 space-y-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {p}
            </motion.p>
          ))}

          {/* Interests pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2.5 pt-4"
          >
            {[
              "Intuitive UIs",
              "Scalable APIs",
              "AI Workflows",
              "Dev Productivity",
            ].map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--accent-primary)",
                  border: "var(--card-border)",
                  boxShadow: "var(--card-shadow)",
                  fontFamily: "var(--font-mono)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Code Block / Terminal */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="neo-card overflow-hidden"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
            }}
          >
            {/* Terminal Header */}
            <div
              className="flex p-2 items-center gap-2"
              style={{
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span
                className="ml-2 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                about.js
              </span>
            </div>
            {/* Code Content */}
            <div
              className="p-2 space-y-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                <span style={{ color: "var(--accent-secondary)" }}>const</span>{" "}
                developer = {"{"}
              </p>
              <p className="pl-4">
                <span style={{ color: "var(--accent-primary)" }}>name</span>:{" "}
                <span style={{ color: "var(--accent-tertiary)" }}>
                  "Hardik Ashra"
                </span>
                ,
              </p>
              <p className="pl-4">
                <span style={{ color: "var(--accent-primary)" }}>role</span>:{" "}
                <span style={{ color: "var(--accent-tertiary)" }}>
                  "Full-Stack Dev"
                </span>
                ,
              </p>
              <p className="pl-4">
                <span style={{ color: "var(--accent-primary)" }}>stack</span>: [
                <span style={{ color: "var(--accent-tertiary)" }}>"React"</span>
                ,{" "}
                <span style={{ color: "var(--accent-tertiary)" }}>
                  "Next.js"
                </span>
                ],
              </p>
              <p className="pl-4">
                <span style={{ color: "var(--accent-primary)" }}>focus</span>:{" "}
                <span style={{ color: "var(--accent-tertiary)" }}>
                  "AI-First Dev"
                </span>
                ,
              </p>
              <p className="pl-4">
                <span style={{ color: "var(--accent-primary)" }}>
                  available
                </span>
                : <span style={{ color: "var(--accent-tertiary)" }}>true</span>,
              </p>
              <p>{"}"};</p>
              <p className="pt-2">
                <span style={{ color: "var(--accent-secondary)" }}>
                  export default
                </span>{" "}
                developer;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
