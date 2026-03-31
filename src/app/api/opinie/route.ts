import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  realizacjaId: z.number().int().positive(),
  autor: z.string().min(2).max(60),
  tresc: z.string().min(10).max(800),
  ocena: z.number().int().min(1).max(5),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.opinia.create({
      data: {
        realizacjaId: data.realizacjaId,
        autor: data.autor,
        tresc: data.tresc,
        ocena: data.ocena,
        zatwierdzona: false,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Błąd walidacji" }, { status: 400 });
  }
}
