"use client";

export default function About() {
  return (
    <section className="section-padding" style={{ backgroundColor: "white" }}>
      <div className="container-narrow px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Tekst */}
          <div>
            <span className="heading-sm" style={{ color: "var(--sand-dark)" }}>
              O nas
            </span>
            <div className="divider" />
            <h2 className="heading-lg mb-6" style={{ color: "var(--charcoal)" }}>
              Pasja do
              <br />
              <em style={{ fontStyle: "italic" }}>pięknych przestrzeni</em>
            </h2>
            <p
              className="mb-5"
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.95rem",
                lineHeight: "1.9",
                color: "var(--warm-gray)",
              }}
            >
              OLTOM Wnętrza to studio projektowania wnętrz z pasją do
              tworzenia przestrzeni, które łączą estetykę z funkcjonalnością.
              Wierzymy, że każde wnętrze powinno opowiadać historię swojego
              właściciela.
            </p>
            <p
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.95rem",
                lineHeight: "1.9",
                color: "var(--warm-gray)",
              }}
            >
              Nasze podejście opiera się na głębokiej rozmowie z klientem,
              zrozumieniu jego stylu życia i marzeń, a następnie przekuciu
              tego w spójną, ponadczasową koncepcję.
            </p>
          </div>

          {/* Statystyki */}
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {[
              { value: "150+", label: "Zrealizowanych projektów" },
              { value: "8", label: "Lat doświadczenia" },
              { value: "100%", label: "Zadowolonych klientów" },
              { value: "12", label: "Współprac branżowych" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 sm:p-6 md:p-8"
                style={{ backgroundColor: "var(--linen)" }}
              >
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                    fontWeight: 300,
                    color: "var(--charcoal)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "var(--warm-gray)",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
