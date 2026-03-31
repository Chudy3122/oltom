"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/kalkulator", label: "Kalkulator" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-narrow px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.5rem",
                letterSpacing: "0.22em",
                fontWeight: 300,
                color: "var(--charcoal)",
              }}
            >
              OLTOM
            </span>
            <span
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                color: "var(--warm-gray)",
                marginTop: "2px",
              }}
            >
              WNĘTRZA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--sand-dark)"
                      : "var(--warm-gray)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--charcoal)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    pathname === link.href
                      ? "var(--sand-dark)"
                      : "var(--warm-gray)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--charcoal)" }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "white",
            borderColor: "var(--border)",
          }}
        >
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color:
                    pathname === link.href
                      ? "var(--sand-dark)"
                      : "var(--warm-gray)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
