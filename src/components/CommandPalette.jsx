import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  HiHome,
  HiUser,
  HiCog,
  HiChartBar,
  HiFolder,
  HiBriefcase,
  HiMail,
  HiColorSwatch,
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { commandPaletteActions } from "../utils/data";

const iconComponents = {
  HiHome,
  HiUser,
  HiCog,
  HiChartBar,
  HiFolder,
  HiBriefcase,
  HiMail,
  HiColorSwatch,
  FaGithub,
  FaLinkedinIn,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, setTheme, THEMES } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setActiveIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const filtered = commandPaletteActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAction = (action) => {
    setOpen(false);
    if (action.url) {
      window.open(action.url, "_blank");
    } else if (action.action === "toggleTheme") {
      const currentIdx = THEMES.findIndex((t) => t.id === theme);
      const nextIdx = (currentIdx + 1) % THEMES.length;
      setTheme(THEMES[nextIdx].id);
    } else if (action.section) {
      const el = document.getElementById(action.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyNav = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      handleAction(filtered[activeIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="command-palette-backdrop"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="command-palette"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid var(--border-color)" }}
            >
              <HiFolder size={18} style={{ color: "var(--text-muted)" }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyNav}
                className="flex-1 bg-transparent border-none outline-none text-sm"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-body)",
                }}
              />
              <kbd
                className="text-xs px-2 py-1 rounded"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="py-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <div
                  className="px-5 py-6 text-center text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  No results found
                </div>
              ) : (
                filtered.map((action, i) => {
                  const IconComp = iconComponents[action.iconName];
                  return (
                    <motion.button
                      key={action.id}
                      onClick={() => handleAction(action)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left text-sm cursor-pointer"
                      style={{
                        background:
                          i === activeIndex
                            ? "var(--bg-secondary)"
                            : "transparent",
                        color:
                          i === activeIndex
                            ? "var(--accent-primary)"
                            : "var(--text-primary)",
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      whileHover={{ x: 4 }}
                    >
                      {IconComp && <IconComp size={16} />}
                      <span className="font-medium">{action.label}</span>
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
