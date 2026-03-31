"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--linen)" }}
    >
      {/* Dekoracyjne elementy */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-20"
        style={{
          background:
            "linear-gradient(135deg, var(--sand) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-10"
        style={{
          background: "radial-gradient(circle, var(--sand) 0%, transparent 70%)",
        }}
      />

      <div className="container-narrow px-6 md:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Etykieta */}
          <div
            className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="divider" style={{ margin: "0" }} />
            <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
              Projektowanie wnętrz
            </span>
          </div>

          {/* Główny nagłówek */}
          <h1
            className={`heading-xl mb-8 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ color: "var(--charcoal)", fontWeight: 300 }}
          >
            Tworzymy
            <br />
            <em style={{ fontStyle: "italic", color: "var(--sand-dark)" }}>
              przestrzenie
            </em>
            <br />
            pełne charakteru
          </h1>

          {/* Opis */}
          <p
            className={`mb-12 max-w-lg transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "1rem",
              lineHeight: "1.9",
              color: "var(--warm-gray)",
            }}
          >
            Kompleksowe projektowanie wnętrz — od pierwszej koncepcji po
            ostatnie wykończenie. Każde wnętrze to unikalna historia, którą
            piszemy razem z Tobą.
          </p>

          {/* CTA */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="/realizacje" className="btn-primary">
              Zobacz realizacje
            </Link>
            <Link href="/kontakt" className="btn-outline">
              Umów konsultację
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "var(--warm-gray)",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "3rem",
            backgroundColor: "var(--sand)",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
    </section>
  );
}
