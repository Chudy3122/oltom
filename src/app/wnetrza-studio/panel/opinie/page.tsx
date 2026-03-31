import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import OpinaActions from "@/components/admin/OpinaActions";

export default async function AdminOpiniePage() {
  let opinie: {
    id: number;
    autor: string;
    tresc: string;
    ocena: number;
    zatwierdzona: boolean;
    createdAt: Date;
    realizacja: { tytul: string; slug: string };
  }[] = [];

  try {
    opinie = await prisma.opinia.findMany({
      orderBy: { createdAt: "desc" },
      include: { realizacja: { select: { tytul: true, slug: true } } },
    });
  } catch {
    // baza nie gotowa
  }

  const oczekujace = opinie.filter((o) => !o.zatwierdzona);
  const zatwierdzone = opinie.filter((o) => o.zatwierdzona);

  return (
    <div>
      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.8rem",
          fontWeight: 300,
          color: "var(--charcoal)",
          marginBottom: "2.5rem",
        }}
      >
        Opinie klientów
      </h1>

      {/* Oczekujące */}
      {oczekujace.length > 0 && (
        <div className="mb-10">
          <p className="heading-sm mb-5" style={{ color: "var(--sand-dark)" }}>
            Oczekujące na zatwierdzenie ({oczekujace.length})
          </p>
          <div className="flex flex-col gap-4">
            {oczekujace.map((o) => (
              <OpinaCard key={o.id} opinia={o} />
            ))}
          </div>
        </div>
      )}

      {/* Zatwierdzone */}
      <div>
        <p className="heading-sm mb-5" style={{ color: "var(--warm-gray)" }}>
          Zatwierdzone ({zatwierdzone.length})
        </p>
        {zatwierdzone.length === 0 ? (
          <p
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.85rem",
              color: "var(--warm-gray)",
            }}
          >
            Brak zatwierdzonych opinii.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {zatwierdzone.map((o) => (
              <OpinaCard key={o.id} opinia={o} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OpinaCard({
  opinia,
}: {
  opinia: {
    id: number;
    autor: string;
    tresc: string;
    ocena: number;
    zatwierdzona: boolean;
    createdAt: Date;
    realizacja: { tytul: string; slug: string };
  };
}) {
  return (
    <div
      className="p-6"
      style={{
        backgroundColor: "white",
        border: `1px solid ${opinia.zatwierdzona ? "var(--border)" : "var(--sand)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--charcoal)",
              }}
            >
              {opinia.autor}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: opinia.ocena }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill="var(--sand)"
                  style={{ color: "var(--sand)" }}
                />
              ))}
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.85rem",
              color: "var(--warm-gray)",
              lineHeight: "1.7",
              marginBottom: "0.5rem",
            }}
          >
            {opinia.tresc}
          </p>
          <p
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.7rem",
              color: "var(--sand-dark)",
            }}
          >
            → {opinia.realizacja.tytul} ·{" "}
            {new Date(opinia.createdAt).toLocaleDateString("pl-PL")}
          </p>
        </div>
        <OpinaActions
          id={opinia.id}
          zatwierdzona={opinia.zatwierdzona}
        />
      </div>
    </div>
  );
}
