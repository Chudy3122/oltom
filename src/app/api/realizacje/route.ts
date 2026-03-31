import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const schema = z.object({
  tytul: z.string().min(1).max(200),
  opis: z.string().min(1),
  opisKrotki: z.string().min(1).max(300),
  powierzchnia: z.number().int().positive().optional().nullable(),
  lokalizacja: z.string().max(100).optional().nullable(),
  rok: z.number().int().min(1900).max(2100).optional().nullable(),
  kategoria: z.string().max(50),
  zdjecia: z.array(z.string()),
  featured: z.boolean().optional(),
});

export async function GET() {
  const realizacje = await prisma.realizacja.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(realizacje);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    console.error("❌ Walidacja realizacji:", parsed.error.issues);
    return NextResponse.json(
      { error: "Błąd walidacji", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    let slug = slugify(data.tytul);
    const existing = await prisma.realizacja.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const realizacja = await prisma.realizacja.create({
      data: {
        slug,
        tytul: data.tytul,
        opis: data.opis,
        opisKrotki: data.opisKrotki,
        powierzchnia: data.powierzchnia ?? null,
        lokalizacja: data.lokalizacja ?? null,
        rok: data.rok ?? null,
        kategoria: data.kategoria,
        zdjecia: JSON.stringify(data.zdjecia),
        featured: data.featured ?? false,
      },
    });

    return NextResponse.json(realizacja, { status: 201 });
  } catch (err) {
    console.error("❌ Błąd bazy danych:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
