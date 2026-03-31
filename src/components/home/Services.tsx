"use client";

import Link from "next/link";

const services = [
  {
    nr: "01",
    title: "Projekt koncepcyjny",
    desc: "Moodboard, paleta kolorów, dobór materiałów i mebli. Wizja przestrzeni przed jej realizacją.",
  },
  {
    nr: "02",
    title: "Projekt wykonawczy",
    desc: "Kompletna dokumentacja techniczna — rzuty, przekroje, specyfikacje materiałowe dla ekip remontowych.",
  },
  {
    nr: "03",
    title: "Nadzór autorski",
    desc: "Czuwamy nad realizacją projektu, koordynujemy wykonawców, dbamy o zgodność z koncepcją.",
  },
  {
    nr: "04",
    title: "Stylizacja wnętrz",
    desc: "Dobór dekoracji, tekstyliów i dodatków. Ostatni szlif, który tchnął duszę w przestrzeń.",
  },
];

export default function Services() {
  return (
    <section className="section-padding" style={{ backgroundColor: "var(--linen)" }}>
      <div className="container-narrow px-6 md:px-8">
        {/* Nagłówek */}
        <div className="max-w-xl mb-16">
          <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
            Usługi
          </span>
          <div className="divider" />
          <h2 className="heading-lg" style={{ color: "var(--charcoal)" }}>
            Co oferujemy
          </h2>
        </div>

        {/* Karty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {services.map((s) => (
            <div
              key={s.nr}
              className="p-10 group transition-colors duration-300"
              style={{ backgroundColor: "white" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.8rem",
                  color: "var(--sand)",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {s.nr}
              </span>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  marginBottom: "1rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: "1.8",
                  color: "var(--warm-gray)",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link href="/kalkulator" className="btn-outline">
            Oblicz wstępną wycenę
          </Link>
        </div>
      </div>
    </section>
  );
}
