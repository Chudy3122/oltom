import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import OpinaForm from "@/components/realizacje/OpinaForm";
import { Star } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const r = await prisma.realizacja.findUnique({ where: { slug } });
    if (!r) return {};
    return { title: `${r.tytul} | OLTOM Wnętrza`, description: r.opisKrotki };
  } catch {
    return {};
  }
}

export default async function RealizacjaPage({ params }: Props) {
  const { slug } = await params;
  let realizacja;

  try {
    realizacja = await prisma.realizacja.findUnique({
      where: { slug },
      include: {
        opinie: {
          where: { zatwierdzona: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch {
    notFound();
  }

  if (!realizacja) notFound();

  const zdjecia = JSON.parse(realizacja.zdjecia) as string[];

  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero zdjęcie */}
        {zdjecia[0] && (
          <div
            className="relative w-full"
            style={{ height: "70vh", backgroundColor: "var(--linen)" }}
          >
            <Image
              src={zdjecia[0]}
              alt={realizacja.tytul}
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(42,42,42,0.4) 100%)",
              }}
            />
          </div>
        )}

        <div className="section-padding">
          <div className="container-narrow px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
              {/* Lewy — opis */}
              <div className="lg:col-span-2">
                <span
                  className="heading-sm"
                  style={{ color: "var(--sand-dark)" }}
                >
                  {realizacja.kategoria}
                </span>
                <div className="divider" />
                <h1
                  className="heading-lg mb-6"
                  style={{ color: "var(--charcoal)" }}
                >
                  {realizacja.tytul}
                </h1>
                <p
                  style={{
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: "1.9",
                    color: "var(--warm-gray)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {realizacja.opis}
                </p>

                {/* Galeria */}
                {zdjecia.length > 1 && (
                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {zdjecia.slice(1).map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] overflow-hidden"
                        style={{ backgroundColor: "var(--linen)" }}
                      >
                        <Image
                          src={src}
                          alt={`${realizacja.tytul} - zdjęcie ${i + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prawy — meta + opinie */}
              <div>
                {/* Szczegóły */}
                <div
                  className="p-5 md:p-8 mb-8"
                  style={{ backgroundColor: "var(--linen)" }}
                >
                  <p
                    className="heading-sm mb-6"
                    style={{ color: "var(--sand-dark)" }}
                  >
                    Szczegóły projektu
                  </p>
                  <div className="flex flex-col gap-4">
                    {realizacja.powierzchnia && (
                      <div>
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--sand)",
                          }}
                        >
                          Powierzchnia
                        </span>
                        <p
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "1.2rem",
                            color: "var(--charcoal)",
                          }}
                        >
                          {realizacja.powierzchnia} m²
                        </p>
                      </div>
                    )}
                    {realizacja.lokalizacja && (
                      <div>
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--sand)",
                          }}
                        >
                          Lokalizacja
                        </span>
                        <p
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "1.1rem",
                            color: "var(--charcoal)",
                          }}
                        >
                          {realizacja.lokalizacja}
                        </p>
                      </div>
                    )}
                    {realizacja.rok && (
                      <div>
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--sand)",
                          }}
                        >
                          Rok realizacji
                        </span>
                        <p
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "1.1rem",
                            color: "var(--charcoal)",
                          }}
                        >
                          {realizacja.rok}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Opinie */}
                {realizacja.opinie.length > 0 && (
                  <div className="mb-8">
                    <p
                      className="heading-sm mb-6"
                      style={{ color: "var(--sand-dark)" }}
                    >
                      Opinie klientów
                    </p>
                    <div className="flex flex-col gap-6">
                      {realizacja.opinie.map((op) => (
                        <div
                          key={op.id}
                          className="p-6"
                          style={{
                            backgroundColor: "white",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div className="flex gap-1 mb-3">
                            {Array.from({ length: op.ocena }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill="var(--sand)"
                                style={{ color: "var(--sand)" }}
                              />
                            ))}
                          </div>
                          <p
                            style={{
                              fontFamily: "'Helvetica Neue', sans-serif",
                              fontSize: "0.85rem",
                              lineHeight: "1.7",
                              color: "var(--warm-gray)",
                              fontStyle: "italic",
                              marginBottom: "0.75rem",
                            }}
                          >
                            &ldquo;{op.tresc}&rdquo;
                          </p>
                          <p
                            style={{
                              fontFamily: "'Helvetica Neue', sans-serif",
                              fontSize: "0.7rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "var(--charcoal)",
                            }}
                          >
                            — {op.autor}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formularz opinii */}
                <OpinaForm realizacjaId={realizacja.id} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
