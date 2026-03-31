import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file)
    return NextResponse.json({ error: "Brak pliku" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.type))
    return NextResponse.json({ error: "Niedozwolony typ pliku" }, { status: 400 });

  if (file.size > 10 * 1024 * 1024)
    return NextResponse.json({ error: "Plik za duży (max 10MB)" }, { status: 400 });

  try {
    const blob = await put(`realizacje/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (err) {
    console.error("❌ Błąd uploadu:", err);
    return NextResponse.json({ error: "Błąd uploadu" }, { status: 500 });
  }
}
