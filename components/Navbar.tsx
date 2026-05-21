"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/ModalContext";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; disabled?: boolean }[];
};

const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Content Production", href: "/content-production" },
      { label: "Brand Identity", href: "/brand-identity" },
      { label: "Paid Advertising", href: "#", disabled: true },
      { label: "All Services →", href: "/services" },
    ],
  },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "red" | "pricing" | "split">("dark");
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { openProjectModal } = useModal();
  const sectionsRef = useRef<Element[]>([]);
  const lastThemeRef = useRef(theme);
  const tickingRef = useRef(false);
  // Track scroll position before locking so we can restore it
  const scrollYRef = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Dynamic theme detection based on live viewport positions
  useEffect(() => {
    const checkTheme = () => {
      const headerEl = headerRef.current || document.querySelector("header");
      if (!headerEl) return;

      const headerRect = headerEl.getBoundingClientRect();
      const navbarBottom = headerRect.bottom; // exact bottom edge of the navbar in the viewport
      
      const sections = Array.from(document.querySelectorAll("[data-theme]"));
      let activeTheme: string | null = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Section is active if its top has crossed the bottom of the navbar, 
        // and its bottom is still below the bottom of the navbar.
        if (rect.top <= navbarBottom && rect.bottom > navbarBottom) {
          activeTheme = section.getAttribute("data-theme");
          break;
        }
      }

      if (!activeTheme) {
        activeTheme = pathname === "/" ? "dark" : "light";
      }

      if (activeTheme !== lastThemeRef.current) {
        lastThemeRef.current = activeTheme as any;
        setTheme(activeTheme as any);
      }
    };

    // Run initial check
    checkTheme();

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        checkTheme();
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkTheme, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkTheme);
    };
  }, [pathname]);

  // iOS-safe scroll lock: fix the body in place instead of overflow:hidden
  // which doesn't work on Mobile Safari
  useEffect(() => {
    if (menuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // prevent layout shift
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      // Restore scroll position
      if (scrollYRef.current > 0) {
        window.scrollTo(0, scrollYRef.current);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isSplit = theme === "split" && isDesktop;
  const isLight = theme === "light" || (!isHome && (theme === "red" || theme === "pricing")) || (theme === "split" && !isDesktop);

  const bgColor = isSplit
    ? "linear-gradient(to right, #050505 0%, #050505 41.666667%, #ffffff 41.666667%, #ffffff 100%)"
    : (isLight ? "#ffffff" : "#050505");
  const textColor = (isLight || isSplit) ? "#000000" : "#FAFAFA";
  const accentColor = "#9A0E1F";

  return (
    <>
      {/* 
        GPU-composited header: translate3d(0,0,0) creates a persistent layer 
        on iOS so the browser never needs to promote it mid-frame (which causes flashes).
        No transitions on background — color changes are instant to avoid intermediate frames.
      */}
      <header
        ref={headerRef}
        className="relative z-[100]"
        style={{
          background: bgColor,
          WebkitTransform: "translate3d(0,0,0)",
          transform: "translate3d(0,0,0)",
        }}
      >
        <div className="container h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="block"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img
              src="/HERO-LOGO.svg"
              alt="Cinmach"
              className="h-[26px] md:h-[32px] w-auto"
              style={{
                filter: (isLight && !isSplit) ? "brightness(0)" : "brightness(0) invert(1)",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-7 lg:gap-9">
              {!isHome && (
                <div className="relative group flex items-center h-full">
                  <Link
                    href="/"
                    className="relative py-2 opacity-60 hover:opacity-100 transition-opacity flex items-center"
                    style={{ color: textColor }}
                    aria-label="Home"
                    title="Return to Home"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] transition-transform duration-300 group-hover:-translate-y-0.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </Link>
                </div>
              )}
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.dropdown && link.dropdown.some((d) => pathname === d.href));
                return (
                  <div key={link.href} className="relative group flex items-center h-full">
                    <Link
                      href={link.href}
                      className="relative py-2 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors flex items-center gap-1.5"
                      style={{ color: isActive ? accentColor : textColor }}
                    >
                      {link.label}
                      {link.dropdown && (
                        <svg
                          className="w-2.5 h-2.5 opacity-50 transition-transform duration-300 group-hover:-rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#9A0E1F]" />
                      )}
                    </Link>

                    {link.dropdown && (
                      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200]">
                        <div className="flex flex-col min-w-[240px] rounded-2xl overflow-hidden border border-black/5 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                          {link.dropdown.map((item, idx) => {
                            if (item.disabled) {
                              return (
                                <div
                                  key={item.label}
                                  className="px-6 py-4 border-b border-black/5 last:border-0 opacity-50 cursor-not-allowed flex items-center justify-between"
                                >
                                  <span className="text-[13px] font-medium tracking-tight text-black/80">
                                    {item.label}
                                  </span>
                                  <span className="text-[9px] font-mono tracking-widest text-[#9A0E1F] uppercase">
                                    Coming Soon
                                  </span>
                                </div>
                              );
                            }
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="px-6 py-4 transition-colors hover:bg-black/5 border-b border-black/5 last:border-0"
                              >
                                <span
                                  className={`block ${
                                    idx === link.dropdown!.length - 1
                                      ? "text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#9A0E1F]"
                                      : "text-[13px] font-medium tracking-tight text-black/80"
                                  }`}
                                >
                                  {item.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => openProjectModal()}
              className="h-9 px-5 text-[9px] font-mono font-black tracking-[0.25em] uppercase rounded-full border border-transparent bg-[#9A0E1F] text-white transition-all duration-300 hover:bg-[#9A0E1F]/90 hover:shadow-[0_0_20px_rgba(154,14,31,0.4)]"
            >
              GET A QUOTE →
            </button>
          </nav>

          {/* Mobile burger — always visible on mobile */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 relative z-[201]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-px origin-center"
                style={{
                  background: menuOpen ? "#000000" : textColor,
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    i === 0 && menuOpen
                      ? "translateY(6px) rotate(45deg)"
                      : i === 2 && menuOpen
                      ? "translateY(-6px) rotate(-45deg)"
                      : "none",
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/*
        Mobile full-screen menu — iOS-optimised approach:
        - Uses CSS opacity + visibility (NO framer-motion) to avoid 
          mid-frame compositing layer creation that causes white flashes
        - translate3d(0,0,0) is applied at all times so the layer is 
          pre-promoted BEFORE the animation starts
        - pointer-events toggled to prevent ghost clicks when hidden
      */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          // Always GPU-composited — no flash because the layer already exists
          WebkitTransform: "translate3d(0,0,0)",
          transform: "translate3d(0,0,0)",
          // Visibility transition prevents ghost clicks and keeps it in the 
          // paint tree so iOS doesn't need to create a new layer mid-animation
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: menuOpen
            ? "opacity 0.25s ease, visibility 0s linear 0s"
            : "opacity 0.25s ease, visibility 0s linear 0.25s",
        }}
      >
        {/* Header */}
        <div
          style={{
            width: "100%",
            height: "56px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            backgroundColor: "#ffffff",
          }}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <img
              src="/HERO-LOGO.svg"
              alt="Cinmach"
              style={{ height: "26px", width: "auto", filter: "brightness(0)" }}
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ padding: "8px", marginRight: "-8px" }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable links */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch" as any,
            backgroundColor: "#ffffff",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", padding: "40px 32px", gap: "32px" }}>
            {!isHome && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "36px",
                    lineHeight: 1,
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  HOME
                </Link>
              </div>
            )}
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} style={{ display: "flex", flexDirection: "column" }}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                        setServicesDropdownOpen(!servicesDropdownOpen);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                    style={{
                      fontSize: "36px",
                      lineHeight: 1,
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: isActive ? accentColor : "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg
                        style={{
                          width: "24px",
                          height: "24px",
                          opacity: 0.3,
                          transform: servicesDropdownOpen ? "rotate(-180deg)" : "none",
                          transition: "transform 0.25s ease",
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {link.dropdown && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        paddingLeft: "16px",
                        borderLeft: "2px solid rgba(0,0,0,0.1)",
                        overflow: "hidden",
                        maxHeight: servicesDropdownOpen ? "300px" : "0px",
                        opacity: servicesDropdownOpen ? 1 : 0,
                        marginTop: servicesDropdownOpen ? "24px" : "0px",
                        transition: "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, margin-top 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {link.dropdown.map((item, idx) => {
                        if (item.disabled) {
                          return (
                            <div
                              key={item.label}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                opacity: 0.5,
                              }}
                            >
                              <span style={{ fontSize: "16px", fontWeight: 500, color: "rgba(0,0,0,0.7)" }}>
                                {item.label}
                              </span>
                              <span
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "monospace",
                                  fontWeight: 700,
                                  letterSpacing: "0.2em",
                                  textTransform: "uppercase",
                                  color: accentColor,
                                }}
                              >
                                Coming Soon
                              </span>
                            </div>
                          );
                        }
                        const isLastItem = idx === link.dropdown!.length - 1;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              fontSize: isLastItem ? "11px" : "16px",
                              fontWeight: isLastItem ? 700 : 500,
                              letterSpacing: isLastItem ? "0.2em" : "normal",
                              textTransform: isLastItem ? "uppercase" : "none",
                              color: isLastItem ? accentColor : "rgba(0,0,0,0.8)",
                              fontFamily: isLastItem ? "monospace" : "inherit",
                              paddingTop: isLastItem ? "8px" : "0",
                            }}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <p
            style={{
              padding: "0 32px 32px",
              color: "rgba(0,0,0,0.2)",
              fontFamily: "monospace",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
            }}
          >
            © 2026 Cinmach Productions
          </p>
        </div>

        {/* Fixed bottom CTA */}
        <div
          style={{
            flexShrink: 0,
            padding: "24px 24px 32px",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            backgroundColor: "#ffffff",
          }}
        >
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openProjectModal(); }}
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "999px",
              backgroundColor: accentColor,
              color: "#ffffff",
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(154,14,31,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            GET A QUOTE
          </button>
        </div>
      </div>
    </>
  );
}
