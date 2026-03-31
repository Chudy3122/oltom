import RealizacjaForm from "@/components/admin/RealizacjaForm";

export default function NowaRealizacjaPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.8rem",
          fontWeight: 300,
          color: "var(--charcoal)",
          marginBottom: "2.5rem",
        }}
      >
        Nowa realizacja
      </h1>
      <RealizacjaForm />
    </div>
  );
}
