import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RealizacjaForm from "@/components/admin/RealizacjaForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EdytujRealizacjePage({ params }: Props) {
  const { id } = await params;
  const numId = parseInt(id);

  let realizacja;
  try {
    realizacja = await prisma.realizacja.findUnique({ where: { id: numId } });
  } catch {
    notFound();
  }

  if (!realizacja) notFound();

  const zdjecia = JSON.parse(realizacja.zdjecia) as string[];

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
        Edytuj: {realizacja.tytul}
      </h1>
      <RealizacjaForm
        poczatkowe={{
          id: realizacja.id,
          tytul: realizacja.tytul,
          opisKrotki: realizacja.opisKrotki,
          opis: realizacja.opis,
          kategoria: realizacja.kategoria,
          powierzchnia: realizacja.powierzchnia?.toString(),
          lokalizacja: realizacja.lokalizacja || "",
          rok: realizacja.rok?.toString(),
          featured: realizacja.featured,
          zdjecia,
        }}
      />
    </div>
  );
}
