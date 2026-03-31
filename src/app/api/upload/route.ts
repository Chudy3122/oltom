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

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ Brak BLOB_READ_WRITE_TOKEN w środowisku");
    return NextResponse.json({ error: "Brak konfiguracji Blob" }, { status: 500 });
  }

  try {
    const blob = await put(`realizacje/${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Błąd uploadu:", msg);
    return NextResponse.json({ error: "Błąd uploadu", details: msg }, { status: 500 });
  }
}
