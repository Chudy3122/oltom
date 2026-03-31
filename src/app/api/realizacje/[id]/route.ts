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

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId))
    return NextResponse.json({ error: "Nieprawidłowe ID" }, { status: 400 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    console.error("❌ Walidacja PUT realizacji:", parsed.error.issues);
    return NextResponse.json(
      { error: "Błąd walidacji", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const current = await prisma.realizacja.findUnique({ where: { id: numId } });
    if (!current)
      return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

    let slug = current.slug;
    if (slugify(data.tytul) !== slug) {
      slug = slugify(data.tytul);
      const existing = await prisma.realizacja.findFirst({
        where: { slug, NOT: { id: numId } },
      });
      if (existing) slug = `${slug}-${Date.now()}`;
    }

    const updated = await prisma.realizacja.update({
      where: { id: numId },
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

    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ Błąd bazy PUT:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId))
    return NextResponse.json({ error: "Nieprawidłowe ID" }, { status: 400 });

  await prisma.realizacja.delete({ where: { id: numId } });
  return NextResponse.json({ ok: true });
}
