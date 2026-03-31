import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Image as ImageIcon, MessageSquare, Plus } from "lucide-react";

export default async function DashboardPage() {
  let liczbaRealizacji = 0;
  let oczekujaceOpinie = 0;
  let wszystkieOpinie = 0;

  try {
    [liczbaRealizacji, oczekujaceOpinie, wszystkieOpinie] = await Promise.all([
      prisma.realizacja.count(),
      prisma.opinia.count({ where: { zatwierdzona: false } }),
      prisma.opinia.count(),
    ]);
  } catch {
    // baza danych nie gotowa
  }

  const stats = [
    {
      label: "Realizacje",
      value: liczbaRealizacji,
      icon: ImageIcon,
      href: "/wnetrza-studio/panel/realizacje",
    },
    {
      label: "Oczekujące opinie",
      value: oczekujaceOpinie,
      icon: MessageSquare,
      href: "/wnetrza-studio/panel/opinie",
    },
    {
      label: "Wszystkie opinie",
      value: wszystkieOpinie,
      icon: MessageSquare,
      href: "/wnetrza-studio/panel/opinie",
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "var(--charcoal)",
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.85rem",
            color: "var(--warm-gray)",
            marginTop: "0.5rem",
          }}
        >
          Witaj w panelu administracyjnym OLTOM Wnętrza.
        </p>
      </div>

      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="p-6 flex items-center gap-5 group"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--border)",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <s.icon size={24} style={{ color: "var(--sand)" }} />
            <div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "var(--charcoal)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--warm-gray)",
                  marginTop: "0.25rem",
                }}
              >
                {s.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Szybki dostęp */}
      <div className="flex gap-4">
        <Link
          href="/wnetrza-studio/panel/realizacje/nowa"
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Dodaj realizację
        </Link>
        <Link href="/" className="btn-outline" target="_blank">
          Zobacz stronę →
        </Link>
      </div>
    </div>
  );
}
