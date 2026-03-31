import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import KontaktForm from "@/components/kontakt/KontaktForm";
import { Mail, Phone, MapPin } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export const metadata = {
  title: "Kontakt | OLTOM Wnętrza",
  description: "Skontaktuj się z nami — bezpłatna konsultacja, formularz kontaktowy i media społecznościowe.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: "var(--linen)" }}>
          <div className="container-narrow">
            <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
              Kontakt
            </span>
            <div className="divider" />
            <h1 className="heading-lg" style={{ color: "var(--charcoal)" }}>
              Porozmawiajmy
              <br />
              <em style={{ fontStyle: "italic" }}>o Twoim wnętrzu</em>
            </h1>
          </div>
        </div>

        <section className="section-padding" style={{ backgroundColor: "white" }}>
          <div className="container-narrow px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
              {/* Formularz */}
              <div className="lg:col-span-3">
                <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                  Napisz do nas
                </p>
                <KontaktForm />
              </div>

              {/* Dane kontaktowe */}
              <div className="lg:col-span-2">
                <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
                  Znajdź nas
                </p>
                <div className="flex flex-col gap-8">
                  {/* Dane */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <Mail size={16} style={{ color: "var(--sand)", marginTop: "2px", flexShrink: 0 }} />
                      <div>
                        <p className="heading-sm mb-1" style={{ color: "var(--warm-gray)" }}>
                          Email
                        </p>
                        <a
                          href="mailto:oltom.wnetrza@gmail.com"
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.9rem",
                            color: "var(--charcoal)",
                            textDecoration: "none",
                          }}
                        >
                          oltom.wnetrza@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone size={16} style={{ color: "var(--sand)", marginTop: "2px", flexShrink: 0 }} />
                      <div>
                        <p className="heading-sm mb-1" style={{ color: "var(--warm-gray)" }}>
                          Telefon
                        </p>
                        <a
                          href="tel:+48512487267"
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.9rem",
                            color: "var(--charcoal)",
                            textDecoration: "none",
                          }}
                        >
                          +48 512 487 267
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin size={16} style={{ color: "var(--sand)", marginTop: "2px", flexShrink: 0 }} />
                      <div>
                        <p className="heading-sm mb-1" style={{ color: "var(--warm-gray)" }}>
                          Studio
                        </p>
                        <p
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.9rem",
                            color: "var(--charcoal)",
                            lineHeight: "1.7",
                          }}
                        >
                          ul. Jemiołuszki 23<br />
                          20-752 Lublin
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                  {/* Social media */}
                  <div>
                    <p className="heading-sm mb-5" style={{ color: "var(--warm-gray)" }}>
                      Media społecznościowe
                    </p>
                    <div className="flex flex-col gap-4">
                      <a
                        href="https://www.instagram.com/oltom_wnetrza/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                        style={{ textDecoration: "none" }}
                      >
                        <InstagramIcon size={18} />
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.85rem",
                            color: "var(--charcoal)",
                          }}
                        >
                          @oltom_wnetrza
                        </span>
                      </a>
                      <a
                        href="https://www.facebook.com/p/OLTOM-Wn%C4%99trza-61555691252825/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                        style={{ textDecoration: "none" }}
                      >
                        <FacebookIcon size={18} />
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.85rem",
                            color: "var(--charcoal)",
                          }}
                        >
                          OLTOM Wnętrza
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Godziny */}
                  <div
                    className="p-6"
                    style={{ backgroundColor: "var(--linen)" }}
                  >
                    <p className="heading-sm mb-4" style={{ color: "var(--sand-dark)" }}>
                      Godziny pracy
                    </p>
                    {[
                      { dni: "Pn – Pt", godz: "9:00 – 18:00" },
                      { dni: "Sobota", godz: "10:00 – 14:00" },
                      { dni: "Niedziela", godz: "Zamknięte" },
                    ].map((item) => (
                      <div
                        key={item.dni}
                        className="flex justify-between mb-2"
                      >
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.8rem",
                            color: "var(--warm-gray)",
                          }}
                        >
                          {item.dni}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', sans-serif",
                            fontSize: "0.8rem",
                            color: "var(--charcoal)",
                          }}
                        >
                          {item.godz}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
