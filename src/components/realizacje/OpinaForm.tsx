"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Props {
  realizacjaId: number;
}

export default function OpinaForm({ realizacjaId }: Props) {
  const [autor, setAutor] = useState("");
  const [tresc, setTresc] = useState("");
  const [ocena, setOcena] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/opinie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ realizacjaId, autor, tresc, ocena }),
      });
      if (res.ok) {
        setStatus("ok");
        setAutor("");
        setTresc("");
        setOcena(5);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className="p-6"
        style={{ backgroundColor: "var(--linen)", border: "1px solid var(--border)" }}
      >
        <p
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: "0.85rem",
            color: "var(--warm-gray)",
            lineHeight: "1.7",
          }}
        >
          Dziękujemy za opinię! Zostanie opublikowana po weryfikacji.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="heading-sm mb-6" style={{ color: "var(--sand-dark)" }}>
        Dodaj opinię
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input-base"
          type="text"
          placeholder="Twoje imię"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
          maxLength={60}
        />

        {/* Gwiazdki */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setOcena(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <Star
                size={20}
                fill={(hover || ocena) >= n ? "var(--sand)" : "transparent"}
                style={{
                  color: (hover || ocena) >= n ? "var(--sand)" : "var(--border)",
                  transition: "color 0.1s",
                }}
              />
            </button>
          ))}
        </div>

        <textarea
          className="input-base"
          placeholder="Twoja opinia..."
          rows={4}
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
          required
          maxLength={800}
          style={{ resize: "vertical" }}
        />

        {status === "error" && (
          <p
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.8rem",
              color: "#c0392b",
            }}
          >
            Wystąpił błąd. Spróbuj ponownie.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
          style={{ opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "wait" : "pointer" }}
        >
          {status === "loading" ? "Wysyłanie..." : "Wyślij opinię"}
        </button>
      </form>
    </div>
  );
}
