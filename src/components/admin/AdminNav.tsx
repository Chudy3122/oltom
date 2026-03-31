"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutGrid, Image, MessageSquare, LogOut } from "lucide-react";

const links = [
  { href: "/wnetrza-studio/panel", label: "Dashboard", icon: LayoutGrid },
  { href: "/wnetrza-studio/panel/realizacje", label: "Realizacje", icon: Image },
  { href: "/wnetrza-studio/panel/opinie", label: "Opinie", icon: MessageSquare },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside
      className="w-60 flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Logo */}
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

      {/* Linki */}
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

      {/* Wyloguj */}
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
    </aside>
  );
}
