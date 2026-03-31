import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Kalkulator from "@/components/kalkulator/Kalkulator";

export const metadata = {
  title: "Kalkulator wyceny | OLTOM Wnętrza",
  description: "Oblicz wstępną wycenę projektu wnętrz. Wybierz pakiet, typ pomieszczenia i podaj metraż.",
};

export default function KalkulatorPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-24 px-6 md:px-8" style={{ backgroundColor: "var(--linen)" }}>
          <div className="container-narrow">
            <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
              Wycena
            </span>
            <div className="divider" />
            <h1 className="heading-lg" style={{ color: "var(--charcoal)" }}>
              Kalkulator wstępnej wyceny
            </h1>
            <p
              className="mt-4 max-w-lg"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.9rem",
                lineHeight: "1.8",
                color: "var(--warm-gray)",
              }}
            >
              Kalkulator daje orientacyjną wycenę. Dokładną ofertę przygotujemy
              po bezpłatnej konsultacji — skontaktuj się z nami.
            </p>
          </div>
        </div>
        <Kalkulator />
      </main>
      <Footer />
    </>
  );
}
