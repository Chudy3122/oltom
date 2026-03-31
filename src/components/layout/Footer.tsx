"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { useRef } from "react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Secret: 5 rapid clicks on the logo redirects to hidden admin login
  const handleLogoClick = () => {
    clickCount.current += 1;

    if (clickTimer.current) clearTimeout(clickTimer.current);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      router.push("/wnetrza-studio");
      return;
    }

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);
  };

  return (
    <footer
      style={{ backgroundColor: "var(--charcoal)", color: "var(--border)" }}
      className="mt-auto"
    >
      <div className="container-narrow px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo + opis */}
          <div className="col-span-1">
            <button
              onClick={handleLogoClick}
              className="flex flex-col items-start leading-none mb-5 bg-transparent border-0 cursor-pointer p-0"
              aria-label="OLTOM Wnętrza"
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.4rem",
                  letterSpacing: "0.22em",
                  fontWeight: 300,
                  color: "white",
                }}
              >
                OLTOM
              </span>
              <span
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.4em",
                  color: "var(--sand)",
                  marginTop: "3px",
                }}
              >
                WNĘTRZA
              </span>
            </button>
            <p
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.85rem",
                lineHeight: "1.8",
                color: "var(--warm-gray)",
              }}
            >
              Tworzymy przestrzenie, które odzwierciedlają
              <br />
              charakter i styl naszych klientów.
            </p>
          </div>

          {/* Nawigacja */}
          <div>
            <p className="heading-sm mb-5" style={{ color: "var(--sand)" }}>
              Nawigacja
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/realizacje", label: "Realizacje" },
                { href: "/kalkulator", label: "Kalkulator wyceny" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "0.8rem",
                    color: "var(--warm-gray)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "white")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--warm-gray)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social + kontakt */}
          <div>
            <p className="heading-sm mb-5" style={{ color: "var(--sand)" }}>
              Znajdź nas
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/oltom_wnetrza"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--warm-gray)", transition: "color 0.2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sand)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--warm-gray)")
                }
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://www.facebook.com/p/OLTOM-Wn%C4%99trza-61555691252825/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--warm-gray)", transition: "color 0.2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sand)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--warm-gray)")
                }
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="mailto:oltom.wnetrza@gmail.com"
                style={{ color: "var(--warm-gray)", transition: "color 0.2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sand)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--warm-gray)")
                }
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.8rem",
                color: "var(--warm-gray)",
                lineHeight: "1.7",
              }}
            >
              oltom.wnetrza@gmail.com
            </p>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #3a3a3a" }}
        >
          <p
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.7rem",
              color: "#555",
              letterSpacing: "0.05em",
            }}
          >
            © {new Date().getFullYear()} OLTOM Wnętrza. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
