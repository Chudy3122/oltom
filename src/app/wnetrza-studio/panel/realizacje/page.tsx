import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminRealizacjePage() {
  let realizacje: {
    id: number;
    slug: string;
    tytul: string;
    kategoria: string;
    powierzchnia: number | null;
    featured: boolean;
    createdAt: Date;
  }[] = [];

  try {
    realizacje = await prisma.realizacja.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        tytul: true,
        kategoria: true,
        powierzchnia: true,
        featured: true,
        createdAt: true,
      },
    });
  } catch {
    // baza nie gotowa
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "var(--charcoal)",
          }}
        >
          Realizacje
        </h1>
        <Link
          href="/wnetrza-studio/panel/realizacje/nowa"
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Nowa realizacja
        </Link>
      </div>

      {realizacje.length === 0 ? (
        <div
          className="py-20 text-center"
          style={{
            backgroundColor: "white",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.9rem",
              color: "var(--warm-gray)",
            }}
          >
            Brak realizacji. Dodaj pierwszą!
          </p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid var(--border)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Tytuł", "Kategoria", "Pow.", "Featured", "Data", ""].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--warm-gray)",
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {realizacje.map((r) => (
                <tr
                  key={r.id}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <Link
                      href={`/realizacje/${r.slug}`}
                      target="_blank"
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "0.95rem",
                        color: "var(--charcoal)",
                        textDecoration: "none",
                      }}
                    >
                      {r.tytul}
                    </Link>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.75rem",
                        color: "var(--warm-gray)",
                      }}
                    >
                      {r.kategoria}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.75rem",
                        color: "var(--warm-gray)",
                      }}
                    >
                      {r.powierzchnia ? `${r.powierzchnia} m²` : "—"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    {r.featured && (
                      <Star
                        size={14}
                        fill="var(--sand)"
                        style={{ color: "var(--sand)" }}
                      />
                    )}
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.75rem",
                        color: "var(--warm-gray)",
                      }}
                    >
                      {new Date(r.createdAt).toLocaleDateString("pl-PL")}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/wnetrza-studio/panel/realizacje/${r.id}`}
                        title="Edytuj"
                        style={{ color: "var(--warm-gray)" }}
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton id={r.id} type="realizacja" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
