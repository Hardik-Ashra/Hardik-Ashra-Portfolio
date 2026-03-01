import { motion } from "framer-motion";
import { HiChip, HiTemplate, HiServer, HiCube } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { visionInterests } from "../utils/data";

const iconMap = { HiChip, HiTemplate, HiServer, HiCube };

export default function Vision() {
  const { theme } = useTheme();

  return (
    <section className="section-container">
      <SectionHeading title="Future Vision" subtitle="Where I'm heading next" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base leading-relaxed mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          I'm currently focused on becoming a world-class full-stack engineer,
          building high-quality software products and developer tools. I'm
          always excited to collaborate on innovative products and challenging
          engineering problems.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {visionInterests.map((interest, i) => {
            const IconComp = iconMap[interest.icon];
            return (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="neo-card p-6 flex items-center gap-4"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "var(--card-border)",
                    boxShadow: "var(--card-shadow)",
                    color: "var(--accent-primary)",
                  }}
                >
                  {IconComp && <IconComp size={20} />}
                </div>
                <span
                  className="text-sm font-medium text-left"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {interest.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
