import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

export default async function RealizacjePreview() {
  let realizacje: {
    id: number;
    slug: string;
    tytul: string;
    opisKrotki: string;
    kategoria: string;
    zdjecia: string;
  }[] = [];

  try {
    realizacje = await prisma.realizacja.findMany({
      where: { featured: true },
      take: 3,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        tytul: true,
        opisKrotki: true,
        kategoria: true,
        zdjecia: true,
      },
    });
  } catch {
    // Baza danych jeszcze nie gotowa
  }

  return (
    <section className="section-padding" style={{ backgroundColor: "white" }}>
      <div className="container-narrow px-6 md:px-8">
        {/* Nagłówek */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
              Portfolio
            </span>
            <div className="divider" />
            <h2 className="heading-lg" style={{ color: "var(--charcoal)" }}>
              Wybrane realizacje
            </h2>
          </div>
          <Link
            href="/realizacje"
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              textDecoration: "none",
            }}
          >
            Wszystkie projekty <ArrowRight size={14} />
          </Link>
        </div>

        {realizacje.length === 0 ? (
          // Placeholder gdy brak realizacji
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4]"
                style={{ backgroundColor: "var(--linen)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realizacje.map((r) => {
              const zdjecia = JSON.parse(r.zdjecia) as string[];
              const pierwsze = zdjecia[0] || "/placeholder.jpg";
              return (
                <Link
                  key={r.id}
                  href={`/realizacje/${r.slug}`}
                  className="group block overflow-hidden"
                  style={{ textDecoration: "none" }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-linen">
                    <Image
                      src={pierwsze}
                      alt={r.tytul}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-5">
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--sand-dark)",
                      }}
                    >
                      {r.kategoria}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 300,
                        color: "var(--charcoal)",
                        marginTop: "0.25rem",
                      }}
                    >
                      {r.tytul}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.8rem",
                        color: "var(--warm-gray)",
                        marginTop: "0.5rem",
                        lineHeight: "1.7",
                      }}
                    >
                      {r.opisKrotki}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
