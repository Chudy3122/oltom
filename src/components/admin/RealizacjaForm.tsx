"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, GripVertical, Star } from "lucide-react";
import Image from "next/image";

interface RealizacjaData {
  id?: number;
  tytul: string;
  opisKrotki: string;
  opis: string;
  kategoria: string;
  powierzchnia: string;
  lokalizacja: string;
  rok: string;
  featured: boolean;
  zdjecia: string[];
}

interface Props {
  poczatkowe?: Partial<RealizacjaData> & { id?: number };
}

const kategorie = [
  "mieszkanie",
  "dom",
  "apartament",
  "biuro",
  "lokal",
  "inne",
];

export default function RealizacjaForm({ poczatkowe }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<RealizacjaData>({
    tytul: poczatkowe?.tytul || "",
    opisKrotki: poczatkowe?.opisKrotki || "",
    opis: poczatkowe?.opis || "",
    kategoria: poczatkowe?.kategoria || "mieszkanie",
    powierzchnia: poczatkowe?.powierzchnia?.toString() || "",
    lokalizacja: poczatkowe?.lokalizacja || "",
    rok: poczatkowe?.rok?.toString() || "",
    featured: poczatkowe?.featured || false,
    zdjecia: poczatkowe?.zdjecia || [],
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState<string[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function movePhoto(from: number, to: number) {
    setForm((prev) => {
      const arr = [...prev.zdjecia];
      const [removed] = arr.splice(from, 1);
      arr.splice(to, 0, removed);
      return { ...prev, zdjecia: arr };
    });
  }

  function setMainPhoto(index: number) {
    if (index === 0) return;
    setForm((prev) => {
      const arr = [...prev.zdjecia];
      const [removed] = arr.splice(index, 1);
      arr.unshift(removed);
      return { ...prev, zdjecia: arr };
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);

    const urls: string[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        urls.push(url);
      }
    }

    setForm((prev) => ({ ...prev, zdjecia: [...prev.zdjecia, ...urls] }));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeZdjecie(url: string) {
    setForm((prev) => ({
      ...prev,
      zdjecia: prev.zdjecia.filter((z) => z !== url),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      tytul: form.tytul,
      opisKrotki: form.opisKrotki,
      opis: form.opis,
      kategoria: form.kategoria,
      powierzchnia: form.powierzchnia ? parseInt(form.powierzchnia) : null,
      lokalizacja: form.lokalizacja || null,
      rok: form.rok ? parseInt(form.rok) : null,
      featured: form.featured,
      zdjecia: form.zdjecia,
    };

    const isEdit = !!poczatkowe?.id;
    const url = isEdit
      ? `/api/realizacje/${poczatkowe!.id}`
      : "/api/realizacje";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/wnetrza-studio/panel/realizacje");
      router.refresh();
    } else {
      const json = await res.json().catch(() => ({}));
      console.error("Błąd API:", res.status, json);
      if (res.status === 401) {
        setError("Sesja wygasła — zaloguj się ponownie.");
      } else if (json.details) {
        // Zod validation errors
        const msgs = (json.details as { message: string; path: (string | number)[] }[]).map(
          (d) => `${d.path.join(".")}: ${d.message}`
        );
        setError("Błąd walidacji:");
        setErrorDetails(msgs);
      } else {
        setError(json.error || "Błąd zapisu. Sprawdź dane i spróbuj ponownie.");
        setErrorDetails([]);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl">
      {/* Podstawowe dane */}
      <div
        className="p-8 flex flex-col gap-6"
        style={{ backgroundColor: "white", border: "1px solid var(--border)" }}
      >
        <p className="heading-sm" style={{ color: "var(--sand-dark)" }}>
          Informacje podstawowe
        </p>

        <div>
          <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
            Tytuł projektu *
          </label>
          <input
            name="tytul"
            required
            className="input-base"
            value={form.tytul}
            onChange={handleChange}
            placeholder="np. Nowoczesne mieszkanie Mokotów"
          />
        </div>

        <div>
          <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
            Krótki opis (lista projektów) *
          </label>
          <input
            name="opisKrotki"
            required
            maxLength={300}
            className="input-base"
            value={form.opisKrotki}
            onChange={handleChange}
            placeholder="Jedno zdanie opisujące projekt"
          />
        </div>

        <div>
          <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
            Pełny opis *
          </label>
          <textarea
            name="opis"
            required
            rows={8}
            className="input-base"
            value={form.opis}
            onChange={handleChange}
            placeholder="Szczegółowy opis projektu..."
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
              Kategoria
            </label>
            <select
              name="kategoria"
              className="input-base"
              value={form.kategoria}
              onChange={handleChange}
            >
              {kategorie.map((k) => (
                <option key={k} value={k}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
              Powierzchnia (m²)
            </label>
            <input
              name="powierzchnia"
              type="number"
              min={1}
              className="input-base"
              value={form.powierzchnia}
              onChange={handleChange}
              placeholder="np. 85"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
              Lokalizacja
            </label>
            <input
              name="lokalizacja"
              className="input-base"
              value={form.lokalizacja}
              onChange={handleChange}
              placeholder="np. Warszawa"
            />
          </div>
          <div>
            <label className="heading-sm block mb-2" style={{ color: "var(--warm-gray)" }}>
              Rok realizacji
            </label>
            <input
              name="rok"
              type="number"
              min={1990}
              max={2100}
              className="input-base"
              value={form.rok}
              onChange={handleChange}
              placeholder="np. 2024"
            />
          </div>
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleChange}
            style={{ width: "16px", height: "16px", accentColor: "var(--charcoal)" }}
          />
          <span
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.85rem",
              color: "var(--charcoal)",
            }}
          >
            Wyróżnij na stronie głównej
          </span>
        </label>
      </div>

      {/* Zdjęcia */}
      <div
        className="p-8 flex flex-col gap-6"
        style={{ backgroundColor: "white", border: "1px solid var(--border)" }}
      >
        <p className="heading-sm" style={{ color: "var(--sand-dark)" }}>
          Zdjęcia
        </p>

        {/* Podgląd */}
        {form.zdjecia.length > 0 && (
          <>
            <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.72rem", color: "var(--warm-gray)" }}>
              Przeciągnij zdjęcia żeby zmienić kolejność. Pierwsze zdjęcie jest okładką.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {form.zdjecia.map((url, i) => (
                <div
                  key={url}
                  draggable
                  onDragStart={() => setDragging(i)}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
                  onDrop={() => {
                    if (dragging !== null && dragging !== i) movePhoto(dragging, i);
                    setDragging(null);
                    setDragOver(null);
                  }}
                  onDragEnd={() => { setDragging(null); setDragOver(null); }}
                  className="relative group aspect-[4/3] select-none"
                  style={{
                    opacity: dragging === i ? 0.4 : 1,
                    outline: dragOver === i && dragging !== i ? "2px solid var(--sand)" : "none",
                    cursor: "grab",
                    transition: "opacity 0.15s",
                  }}
                >
                  <Image
                    src={url}
                    alt={`Zdjęcie ${i + 1}`}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                  {/* Overlay z akcjami */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {i !== 0 && (
                      <button
                        type="button"
                        onClick={() => setMainPhoto(i)}
                        className="p-2 bg-white rounded-full"
                        title="Ustaw jako główne"
                        style={{ color: "var(--sand-dark)" }}
                      >
                        <Star size={13} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeZdjecie(url)}
                      className="p-2 bg-white rounded-full"
                      title="Usuń"
                      style={{ color: "#e74c3c" }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                  {/* Uchwyt do przeciągania */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical size={16} style={{ color: "white", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }} />
                  </div>
                  {/* Badge główne */}
                  {i === 0 && (
                    <span
                      className="absolute top-2 left-2 px-2 py-1 flex items-center gap-1"
                      style={{
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        backgroundColor: "var(--charcoal)",
                        color: "white",
                      }}
                    >
                      <Star size={9} fill="var(--sand)" style={{ color: "var(--sand)" }} />
                      GŁÓWNE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Upload */}
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="upload-input"
          />
          <label
            htmlFor="upload-input"
            className="flex flex-col items-center justify-center gap-3 p-10 cursor-pointer transition-colors"
            style={{
              border: "2px dashed var(--border)",
              backgroundColor: uploading ? "var(--linen)" : "var(--cream)",
            }}
          >
            <Upload size={24} style={{ color: "var(--sand)" }} />
            <span
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.8rem",
                color: "var(--warm-gray)",
              }}
            >
              {uploading
                ? "Przesyłanie..."
                : "Kliknij lub przeciągnij zdjęcia (JPG, PNG, WebP, max 10MB)"}
            </span>
          </label>
        </div>
      </div>

      {error && (
        <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.85rem", color: "#e74c3c" }}>
          <p>{error}</p>
          {errorDetails.length > 0 && (
            <ul style={{ marginTop: "0.4rem", paddingLeft: "1.2rem" }}>
              {errorDetails.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-primary"
          style={{ opacity: saving || uploading ? 0.7 : 1 }}
        >
          {saving
            ? "Zapisywanie..."
            : poczatkowe?.id
            ? "Zapisz zmiany"
            : "Opublikuj realizację"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
