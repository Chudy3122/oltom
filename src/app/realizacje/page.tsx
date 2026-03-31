import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Realizacje | OLTOM Wnętrza",
  description: "Nasze projekty i realizacje wnętrz — mieszkania, domy, biura.",
};

export default async function RealizacjePage() {
  let realizacje: {
    id: number;
    slug: string;
    tytul: string;
    opisKrotki: string;
    kategoria: string;
    zdjecia: string;
    rok: number | null;
    lokalizacja: string | null;
  }[] = [];

  try {
    realizacje = await prisma.realizacja.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        tytul: true,
        opisKrotki: true,
        kategoria: true,
        zdjecia: true,
        rok: true,
        lokalizacja: true,
      },
    });
  } catch {
    // Baza danych jeszcze nie gotowa
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        {/* Baner */}
        <div
          className="py-16 md:py-24 px-6 md:px-8"
          style={{ backgroundColor: "var(--linen)" }}
        >
          <div className="container-narrow">
            <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
              Portfolio
            </span>
            <div className="divider" />
            <h1 className="heading-lg" style={{ color: "var(--charcoal)" }}>
              Nasze realizacje
            </h1>
          </div>
        </div>

        {/* Siatka realizacji */}
        <section className="section-padding" style={{ backgroundColor: "white" }}>
          <div className="container-narrow px-6 md:px-8">
            {realizacje.length === 0 ? (
              <div className="text-center py-20">
                <p
                  style={{
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "1rem",
                    color: "var(--warm-gray)",
                  }}
                >
                  Realizacje pojawią się wkrótce.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {realizacje.map((r) => {
                  const zdjecia = JSON.parse(r.zdjecia) as string[];
                  const pierwsze = zdjecia[0] || "/placeholder.jpg";
                  return (
                    <Link
                      key={r.id}
                      href={`/realizacje/${r.slug}`}
                      className="group block"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden mb-4" style={{ backgroundColor: "var(--linen)" }}>
                        <Image
                          src={pierwsze}
                          alt={r.tytul}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                          style={{ background: "linear-gradient(to top, rgba(42,42,42,0.7) 0%, transparent 60%)" }}
                        >
                          <span
                            style={{
                              fontFamily: "'Helvetica Neue', sans-serif",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "white",
                            }}
                          >
                            Zobacz projekt →
                          </span>
                        </div>
                      </div>
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
                        {r.lokalizacja && ` · ${r.lokalizacja}`}
                        {r.rok && ` · ${r.rok}`}
                      </span>
                      <h2
                        style={{
                          fontFamily: "Georgia, serif",
                          fontSize: "1.15rem",
                          fontWeight: 300,
                          color: "var(--charcoal)",
                          marginTop: "0.3rem",
                        }}
                      >
                        {r.tytul}
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Helvetica Neue', sans-serif",
                          fontSize: "0.8rem",
                          color: "var(--warm-gray)",
                          marginTop: "0.4rem",
                          lineHeight: "1.7",
                        }}
                      >
                        {r.opisKrotki}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
