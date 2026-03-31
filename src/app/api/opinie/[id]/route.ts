import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

  const { id } = await params;
  const numId = parseInt(id);
  const body = await req.json();

  const updated = await prisma.opinia.update({
    where: { id: numId },
    data: { zatwierdzona: body.zatwierdzona },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

  const { id } = await params;
  const numId = parseInt(id);
  await prisma.opinia.delete({ where: { id: numId } });
  return NextResponse.json({ ok: true });
}
