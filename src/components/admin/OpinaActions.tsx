"use client";

import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import DeleteButton from "./DeleteButton";

interface Props {
  id: number;
  zatwierdzona: boolean;
}

export default function OpinaActions({ id, zatwierdzona }: Props) {
  const router = useRouter();

  async function toggle() {
    await fetch(`/api/opinie/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zatwierdzona: !zatwierdzona }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <button
        onClick={toggle}
        title={zatwierdzona ? "Cofnij zatwierdzenie" : "Zatwierdź"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          color: zatwierdzona ? "var(--warm-gray)" : "var(--sand-dark)",
          transition: "color 0.2s",
        }}
      >
        {zatwierdzona ? <X size={16} /> : <Check size={16} />}
      </button>
      <DeleteButton id={id} type="opinia" />
    </div>
  );
}
