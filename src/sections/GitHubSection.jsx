import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { personalInfo } from "../utils/data";

export default function GitHubSection() {
  const { mode } = useTheme();

  const calendarTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };

  return (
    <section id="github" className="section-container">
      <SectionHeading
        title="GitHub Activity"
        subtitle="My open source contribution graph"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="neo-card p-6 md:p-8 overflow-x-auto">
          <GitHubCalendar
            username={personalInfo.githubUsername}
            theme={calendarTheme}
            blockSize={13}
            blockMargin={4}
            fontSize={13}
            colorScheme={mode}
            style={{
              width: "100%",
              color: "var(--text-secondary)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn-secondary text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View GitHub Profile →
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
