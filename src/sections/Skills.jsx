import { motion } from "framer-motion";
import * as Si from "react-icons/si";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { skills } from "../utils/data";

function SkillCard({ skill, index }) {
  const { theme } = useTheme();
  const IconComponent = Si[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="neo-card p-5 flex items-center gap-3 cursor-default group"
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `${skill.color}15`,
          border: `1px solid ${skill.color}40`,
        }}
      >
        {IconComponent ? (
          <IconComponent size={20} color={skill.color} />
        ) : (
          <span className="text-lg" style={{ color: skill.color }}>
            ●
          </span>
        )}
      </div>
      <span
        className="text-sm font-medium"
        style={{
          color: "var(--text-primary)",
          fontFamily: "var(--font-heading)",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { theme } = useTheme();

  return (
    <section id="skills" className="section-container">
      <SectionHeading
        title="Skills & Tools"
        subtitle="Technologies I use to build modern applications"
      />

      <div className="max-w-5xl mx-auto space-y-10">
        {Object.entries(skills).map(([category, items], catIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <h3
              className="text-lg font-bold mb-4 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: [
                    "var(--accent-primary)",
                    "var(--accent-secondary)",
                    "var(--accent-tertiary)",
                    "var(--accent-quaternary)",
                  ][catIdx % 4],
                }}
              />
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
