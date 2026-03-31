"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutGrid, Image, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/wnetrza-studio/panel", label: "Dashboard", icon: LayoutGrid },
  { href: "/wnetrza-studio/panel/realizacje", label: "Realizacje", icon: Image },
  { href: "/wnetrza-studio/panel/opinie", label: "Opinie", icon: MessageSquare },
];

function NavContent({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="px-6 py-8 border-b" style={{ borderColor: "#3a3a3a" }}>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.1rem",
            letterSpacing: "0.2em",
            fontWeight: 300,
            color: "white",
          }}
        >
          OLTOM
        </span>
        <br />
        <span
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.35em",
            color: "var(--sand)",
          }}
        >
          PANEL ADMINA
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/wnetrza-studio/panel"
              ? pathname === href
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 transition-colors"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                color: active ? "white" : "var(--warm-gray)",
                backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                textDecoration: "none",
                borderRadius: "2px",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t" style={{ borderColor: "#3a3a3a" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 w-full transition-colors"
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.8rem",
            color: "var(--warm-gray)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e74c3c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-gray)")}
        >
          <LogOut size={16} />
          Wyloguj się
        </button>
      </div>
    </>
  );
}

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex w-60 flex-col min-h-screen flex-shrink-0"
        style={{ backgroundColor: "var(--charcoal)" }}
      >
        <NavContent pathname={pathname} />
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-14"
        style={{ backgroundColor: "var(--charcoal)" }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1rem",
            letterSpacing: "0.2em",
            fontWeight: 300,
            color: "white",
          }}
        >
          OLTOM{" "}
          <span
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.45rem",
              letterSpacing: "0.35em",
              color: "var(--sand)",
            }}
          >
            PANEL
          </span>
        </span>
        <button
          onClick={() => setOpen(!open)}
          style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          />
          <aside
            className="absolute top-0 left-0 w-64 h-full flex flex-col"
            style={{ backgroundColor: "var(--charcoal)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <NavContent pathname={pathname} onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
