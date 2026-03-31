"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  id: number;
  type: "realizacja" | "opinia";
}

export default function DeleteButton({ id, type }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const potwierdz = confirm(
      type === "realizacja"
        ? "Czy na pewno chcesz usunąć tę realizację? Operacja jest nieodwracalna."
        : "Czy na pewno chcesz usunąć tę opinię?"
    );
    if (!potwierdz) return;

    const endpoint =
      type === "realizacja" ? `/api/realizacje/${id}` : `/api/opinie/${id}`;

    const res = await fetch(endpoint, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      title="Usuń"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--warm-gray)",
        padding: 0,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#e74c3c")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-gray)")}
    >
      <Trash2 size={15} />
    </button>
  );
}
