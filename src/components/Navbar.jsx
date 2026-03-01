import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiColorSwatch, HiSun, HiMoon } from "react-icons/hi";

import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, mode, setTheme, toggleMode, THEMES } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const dropdownRef = useRef(null);

  /* ------------------------------ SCROLL ------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "#hero";

      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.4) {
          current = link.href;
        }
      });

      // Fix last section (Contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        current = "#contact";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------- OUTSIDE CLICK ------------------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* --------------------------- NAV CLICK --------------------------- */

  const handleNavClick = (href) => {
    setMobileOpen(false);

    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* ------------------------------------------------------------------ */

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed  top-0 left-0 right-0 z-50 w-full"
        style={{
          background: scrolled ? "var(--bg-nav)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
        }}
      >
        <div className="w-full">
          <div className="max-w-[1280px] mx-auto h-16 px-6 flex items-center justify-between">
            {/* LOGO */}
            {/* <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="font-bold text-lg tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={{ color: "var(--accent-primary)" }}>H</span>
              <span style={{ color: "var(--text-primary)" }}>ardik</span>
            </motion.a> */}

            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onClick?.("#hero");
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Hardik Ashra — home"
            >
              {/* ── Monogram mark ─────────────────────────────────────────── */}
              <div
                className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden shrink-0"
                style={{
                  background: "var(--accent-primary)",
                  border: "var(--card-border)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {/* Letters */}
                <span
                  className="relative z-10 font-black leading-none tracking-tighter"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.95rem",
                    color: "var(--btn-hover-text, white)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  HA
                </span>

                {/* Diagonal slash — geometric accent detail */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    clipPath: "polygon(52% 0%, 62% 0%, 48% 100%, 38% 100%)",
                  }}
                />
              </div>

              {/* ── Wordmark ──────────────────────────────────────────────── */}
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Hardik
                  <span
                    className="ml-1"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    Ashra
                  </span>
                </span>

                {/* Subtitle line — hides on very small screens */}
                <span
                  className="hidden sm:block"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  Full-Stack Dev
                </span>
              </div>
            </motion.a>

            {/* DESKTOP NAV */}

            <div className="hidden md:flex items-center gap-2 relative">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2  text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  style={{
                    color:
                      activeSection === link.href
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                  }}
                >
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "var(--bg-secondary)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>

            {/* RIGHT SIDE */}

            <div className="flex items-center gap-3">
              {/* CMD K */}

              <motion.button
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", {
                      key: "k",
                      metaKey: true,
                    }),
                  )
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-1 hidden md:flex items-center gap-2 rounded-xl text-xs font-medium"
                style={{
                  border: "var(--card-border)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <span className="px-1 py-0.5 rounded bg-red-600/5 dark:bg-white/10">
                  ⌘
                </span>

                <span className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">
                  K
                </span>
              </motion.button>

              {/* DARK MODE */}

              <motion.button
                onClick={toggleMode}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  border: "var(--card-border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mode}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    {mode === "light" ? (
                      <HiSun size={18} />
                    ) : (
                      <HiMoon size={18} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* THEME SELECTOR */}

              <div ref={dropdownRef} className="relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    border: "var(--card-border)",
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <HiColorSwatch size={18} />
                </motion.button>

                <AnimatePresence>
                  {themeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-52 rounded-xl overflow-hidden"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      }}
                    >
                      {/* {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id);
                            setThemeDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:opacity-80 transition-opacity"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ background: t.color }}
                          />

                          {t.label}
                        </button>
                      ))} */}
                      {THEMES.map((t) => {
                        const isActive = theme === t.id;

                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              setTheme(t.id);
                              setThemeDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all rounded-lg"
                            style={{
                              color: isActive
                                ? "var(--accent-primary)"
                                : "var(--text-primary)",

                              background: isActive
                                ? "var(--bg-secondary)"
                                : "transparent",

                              fontWeight: isActive ? "600" : "500",
                            }}
                          >
                            <span
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{
                                background: t.color,
                                boxShadow: isActive
                                  ? `0 0 0 2px var(--bg-card), 0 0 0 4px ${t.color}`
                                  : "none",
                              }}
                            />

                            {t.label}

                            {isActive && (
                              <span
                                className="ml-auto text-xs"
                                style={{ color: "var(--accent-primary)" }}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* MOBILE MENU TOGGLE */}

              <motion.button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl"
                style={{
                  border: "var(--card-border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE BACKDROP */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* MOBILE MENU PANEL */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-40 flex flex-col"
            style={{
              background: "var(--bg-card)",
              borderLeft: "1px solid var(--border-color)",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Panel Header */}
            <div
              className="flex items-center justify-between px-6 h-16 shrink-0"
              style={{ borderBottom: "1px solid var(--border-color)" }}
            >
              <span className="font-bold text-lg tracking-tight">
                {/* <span style={{ color: "var(--accent-primary)" }}>H</span>
                <span style={{ color: "var(--text-primary)" }}>ardik</span> */}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl"
                style={{
                  border: "var(--card-border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                <HiX size={18} />
              </motion.button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left p-2 rounded-xl text-sm font-medium flex items-center gap-3 transition-all"
                    style={{
                      color: isActive
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                      background: isActive
                        ? "var(--bg-secondary)"
                        : "transparent",
                      borderLeft: `2px solid ${isActive ? "var(--accent-primary)" : "transparent"}`,
                    }}
                  >
                    <span className="flex-1">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="mobileActiveIndicator"
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--accent-primary)" }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
