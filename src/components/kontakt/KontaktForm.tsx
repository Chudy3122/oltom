"use client";

import { useState } from "react";

export default function KontaktForm() {
  const [form, setForm] = useState({
    imie: "",
    email: "",
    telefon: "",
    temat: "projekt",
    wiadomosc: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className="p-10"
        style={{ backgroundColor: "var(--linen)", border: "1px solid var(--border)" }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.4rem",
            fontWeight: 300,
            color: "var(--charcoal)",
            marginBottom: "0.75rem",
          }}
        >
          Dziękujemy za wiadomość!
        </p>
        <p
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.9rem",
            color: "var(--warm-gray)",
            lineHeight: "1.8",
          }}
        >
          Odpowiemy w ciągu 24 godzin roboczych.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="imie"
            className="heading-sm block mb-2"
            style={{ color: "var(--warm-gray)" }}
          >
            Imię i nazwisko *
          </label>
          <input
            id="imie"
            name="imie"
            type="text"
            required
            className="input-base"
            placeholder="Jan Kowalski"
            value={form.imie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="heading-sm block mb-2"
            style={{ color: "var(--warm-gray)" }}
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-base"
            placeholder="jan@przykład.pl"
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="telefon"
            className="heading-sm block mb-2"
            style={{ color: "var(--warm-gray)" }}
          >
            Telefon
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            className="input-base"
            placeholder="+48 000 000 000"
            value={form.telefon}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="temat"
            className="heading-sm block mb-2"
            style={{ color: "var(--warm-gray)" }}
          >
            Temat zapytania
          </label>
          <select
            id="temat"
            name="temat"
            className="input-base"
            value={form.temat}
            onChange={handleChange}
          >
            <option value="projekt">Nowy projekt</option>
            <option value="konsultacja">Konsultacja</option>
            <option value="wycena">Wycena</option>
            <option value="wspolpraca">Współpraca</option>
            <option value="inne">Inne</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="wiadomosc"
          className="heading-sm block mb-2"
          style={{ color: "var(--warm-gray)" }}
        >
          Wiadomość *
        </label>
        <textarea
          id="wiadomosc"
          name="wiadomosc"
          required
          rows={6}
          className="input-base"
          placeholder="Opowiedz nam o swoim projekcie — metraż, styl, oczekiwania..."
          value={form.wiadomosc}
          onChange={handleChange}
          style={{ resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.8rem",
            color: "#c0392b",
          }}
        >
          Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na kontakt@oltom.pl.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary self-start"
        style={{
          opacity: status === "loading" ? 0.7 : 1,
          cursor: status === "loading" ? "wait" : "pointer",
        }}
      >
        {status === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
