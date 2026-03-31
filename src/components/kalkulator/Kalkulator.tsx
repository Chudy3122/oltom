"use client";

import { useState } from "react";
import Link from "next/link";

const pakiety = [
  {
    id: "basic",
    nazwa: "Basic",
    opis: "Projekt koncepcyjny i dobór materiałów",
    cenaM2: 120,
    zawiera: [
      "Projekt koncepcyjny",
      "Moodboard i paleta kolorów",
      "Dobór materiałów i mebli",
      "2 rundy poprawek",
    ],
  },
  {
    id: "standard",
    nazwa: "Standard",
    opis: "Pełny projekt z dokumentacją techniczną",
    cenaM2: 220,
    zawiera: [
      "Wszystko z Basic",
      "Projekt wykonawczy",
      "Rzuty i przekroje techniczne",
      "Specyfikacja materiałowa",
      "4 rundy poprawek",
    ],
    polecany: true,
  },
  {
    id: "premium",
    nazwa: "Premium",
    opis: "Projekt + nadzór autorski do końca realizacji",
    cenaM2: 380,
    zawiera: [
      "Wszystko ze Standard",
      "Nadzór autorski",
      "Koordynacja wykonawców",
      "Stylizacja wnętrz",
      "Nieograniczone poprawki",
      "Sesja fotograficzna",
    ],
  },
];

const typyPomieszczen = [
  { id: "mieszkanie", label: "Mieszkanie", mnoznik: 1.0 },
  { id: "dom", label: "Dom jednorodzinny", mnoznik: 0.95 },
  { id: "apartament", label: "Apartament / Penthouse", mnoznik: 1.2 },
  { id: "biuro", label: "Biuro", mnoznik: 1.1 },
  { id: "lokal", label: "Lokal usługowy", mnoznik: 1.15 },
];

const dodatki = [
  { id: "kuchnia", label: "Projekt zabudowy kuchennej", cena: 2500 },
  { id: "lazienka", label: "Projekt łazienki z doborem płytek", cena: 1800 },
  { id: "szafy", label: "Projekt szaf wnękowych", cena: 1200 },
  { id: "oswietlenie", label: "Projekt oświetlenia", cena: 900 },
  { id: "3d", label: "Wizualizacje 3D (5 ujęć)", cena: 3500 },
];

export default function Kalkulator() {
  const [pakiet, setPakiet] = useState("standard");
  const [typ, setTyp] = useState("mieszkanie");
  const [metry, setMetry] = useState(60);
  const [wybraneDodatki, setWybraneDodatki] = useState<string[]>([]);

  const wybranyPakiet = pakiety.find((p) => p.id === pakiet)!;
  const wybranyTyp = typyPomieszczen.find((t) => t.id === typ)!;

  const bazowa = metry * wybranyPakiet.cenaM2 * wybranyTyp.mnoznik;
  const sumaDodatkow = wybraneDodatki.reduce((sum, id) => {
    const d = dodatki.find((d) => d.id === id);
    return sum + (d?.cena || 0);
  }, 0);
  const razem = bazowa + sumaDodatkow;

  function toggleDodatek(id: string) {
    setWybraneDodatki((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  function formatPLN(n: number) {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    }).format(n);
  }

  return (
    <section className="section-padding" style={{ backgroundColor: "white" }}>
      <div className="container-narrow px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Konfiguracja — lewa kolumna */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            {/* Pakiet */}
            <div>
              <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                1. Wybierz pakiet
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pakiety.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPakiet(p.id)}
                    className="text-left p-6 transition-all duration-200 relative"
                    style={{
                      border: `1px solid ${pakiet === p.id ? "var(--charcoal)" : "var(--border)"}`,
                      backgroundColor:
                        pakiet === p.id ? "var(--charcoal)" : "white",
                      cursor: "pointer",
                    }}
                  >
                    {p.polecany && (
                      <span
                        className="absolute top-3 right-3"
                        style={{
                          fontFamily: "'Helvetica Neue', sans-serif",
                          fontSize: "0.55rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--sand)",
                          backgroundColor:
                            pakiet === p.id ? "transparent" : "var(--linen)",
                          padding: "2px 6px",
                        }}
                      >
                        Polecany
                      </span>
                    )}
                    <p
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "1.2rem",
                        fontWeight: 300,
                        color: pakiet === p.id ? "white" : "var(--charcoal)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.nazwa}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.75rem",
                        color:
                          pakiet === p.id ? "rgba(255,255,255,0.6)" : "var(--warm-gray)",
                        lineHeight: "1.5",
                      }}
                    >
                      {p.opis}
                    </p>
                    <p
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "1rem",
                        color: pakiet === p.id ? "var(--sand)" : "var(--charcoal)",
                        marginTop: "1rem",
                      }}
                    >
                      {Math.round(p.cenaM2 * wybranyTyp.mnoznik)} zł / m²
                    </p>
                    {/* Co zawiera */}
                    <ul className="mt-4 flex flex-col gap-1">
                      {p.zawiera.map((item) => (
                        <li
                          key={item}
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.7rem",
                            color:
                              pakiet === p.id
                                ? "rgba(255,255,255,0.5)"
                                : "var(--warm-gray)",
                          }}
                        >
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Typ pomieszczenia */}
            <div>
              <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                2. Typ wnętrza
              </p>
              <div className="flex flex-wrap gap-3">
                {typyPomieszczen.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTyp(t.id)}
                    style={{
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      padding: "0.6rem 1.5rem",
                      border: `1px solid ${typ === t.id ? "var(--charcoal)" : "var(--border)"}`,
                      backgroundColor:
                        typ === t.id ? "var(--charcoal)" : "white",
                      color: typ === t.id ? "white" : "var(--warm-gray)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metraż */}
            <div>
              <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                3. Metraż
              </p>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={5}
                  value={metry}
                  onChange={(e) => setMetry(Number(e.target.value))}
                  className="flex-1"
                  style={{ accentColor: "var(--charcoal)" }}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={20}
                    max={500}
                    value={metry}
                    onChange={(e) =>
                      setMetry(Math.max(20, Math.min(500, Number(e.target.value))))
                    }
                    className="input-base text-center"
                    style={{ width: "80px" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--warm-gray)",
                    }}
                  >
                    m²
                  </span>
                </div>
              </div>
            </div>

            {/* Dodatki */}
            <div>
              <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                4. Dodatki (opcjonalnie)
              </p>
              <div className="flex flex-col gap-3">
                {dodatki.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => toggleDodatek(d.id)}
                    className="flex items-center justify-between p-4 text-left transition-colors"
                    style={{
                      border: `1px solid ${wybraneDodatki.includes(d.id) ? "var(--charcoal)" : "var(--border)"}`,
                      backgroundColor: wybraneDodatki.includes(d.id)
                        ? "var(--linen)"
                        : "white",
                      cursor: "pointer",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          border: `1px solid ${wybraneDodatki.includes(d.id) ? "var(--charcoal)" : "var(--border)"}`,
                          backgroundColor: wybraneDodatki.includes(d.id)
                            ? "var(--charcoal)"
                            : "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {wybraneDodatki.includes(d.id) && (
                          <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Helvetica Neue', sans-serif",
                          fontSize: "0.85rem",
                          color: "var(--charcoal)",
                        }}
                      >
                        {d.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "0.9rem",
                        color: "var(--warm-gray)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      + {formatPLN(d.cena)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Wynik — prawa kolumna (sticky) */}
          <div>
            <div
              className="lg:sticky lg:top-28 p-5 md:p-8"
              style={{ backgroundColor: "var(--linen)", border: "1px solid var(--border)" }}
            >
              <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                Wstępna wycena
              </p>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center">
                  <span
                    style={{
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontSize: "0.8rem",
                      color: "var(--warm-gray)",
                    }}
                  >
                    Pakiet {wybranyPakiet.nazwa}
                  </span>
                  <span
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "0.9rem",
                      color: "var(--charcoal)",
                    }}
                  >
                    {formatPLN(bazowa)}
                  </span>
                </div>
                {wybraneDodatki.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.8rem",
                        color: "var(--warm-gray)",
                      }}
                    >
                      Dodatki ({wybraneDodatki.length})
                    </span>
                    <span
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "0.9rem",
                        color: "var(--charcoal)",
                      }}
                    >
                      {formatPLN(sumaDodatkow)}
                    </span>
                  </div>
                )}
              </div>

              <div
                className="pt-5 mb-8"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  style={{
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--warm-gray)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Łącznie (netto)
                </p>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    lineHeight: 1,
                  }}
                >
                  {formatPLN(razem)}
                </p>
                <p
                  style={{
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "0.72rem",
                    color: "var(--warm-gray)",
                    marginTop: "0.5rem",
                  }}
                >
                  Wycena jest orientacyjna. Ostateczna cena ustalana po konsultacji.
                </p>
              </div>

              <Link href="/kontakt" className="btn-primary block text-center">
                Umów bezpłatną konsultację
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
