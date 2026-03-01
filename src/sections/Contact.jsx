import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaPaperPlane, FaCheck } from "react-icons/fa";
import { HiMail, HiLocationMarker, HiPhone } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { personalInfo } from "../utils/data";

export default function Contact() {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate send then open mailto
    setTimeout(() => {
      const subject = encodeURIComponent(
        `Portfolio Contact from ${formState.name}`,
      );
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }, 800);
  };

  const inputStyle = {
    background: "var(--bg-secondary)",
    border:
      theme === "neobrutalism"
        ? "2px solid var(--border-color)"
        : "1px solid var(--border-color)",
    borderRadius: "var(--radius)",
    padding: "12px 16px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    transition: "all 0.2s ease",
    boxShadow:
      theme === "neobrutalism" ? "2px 2px 0 var(--shadow-color)" : "none",
  };

  return (
    <section id="contact" className="section-container ">
      <SectionHeading
        title="Get In Touch"
        subtitle="Let's build something great together"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Whether it's a product idea, collaboration, or engineering
            opportunity — feel free to reach out. I'm always excited to work on
            innovative products and challenging engineering problems.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: HiMail,
                label: personalInfo.email,
                href: `mailto:${personalInfo.email}`,
              },
              {
                icon: HiPhone,
                label: personalInfo.phone,
                href: `tel:${personalInfo.phone}`,
              },
              { icon: HiLocationMarker, label: personalInfo.location },
            ].map(({ icon: Icon, label, href }) => (
              <motion.div
                key={label}
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
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
                  <Icon size={18} />
                </div>
                {href ? (
                  <a
                    href={href}
                    className="text-sm hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </a>
                ) : (
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-4">
            {[
              { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
              {
                icon: FaLinkedinIn,
                href: personalInfo.linkedin,
                label: "LinkedIn",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-secondary text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} /> {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="neo-card p-6 space-y-4"
        >
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Name
            </label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your name"
              style={inputStyle}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Message
            </label>
            <textarea
              required
              rows={4}
              value={formState.message}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Tell me about your project..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={sending || sent}
            className="neo-btn neo-btn-primary w-full justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <FaCheck /> Message Sent!
                </motion.span>
              ) : sending ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Sending...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <FaPaperPlane size={14} /> Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
