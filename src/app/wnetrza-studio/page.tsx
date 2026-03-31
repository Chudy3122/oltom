"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Nieprawidłowy email lub hasło.");
    } else {
      router.push("/wnetrza-studio/panel");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--linen)" }}
    >
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.6rem",
              letterSpacing: "0.22em",
              fontWeight: 300,
              color: "var(--charcoal)",
            }}
          >
            OLTOM
          </span>
          <br />
          <span
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.4em",
              color: "var(--warm-gray)",
            }}
          >
            STUDIO PANEL
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label
              className="heading-sm block mb-2"
              style={{ color: "var(--warm-gray)" }}
            >
              Email
            </label>
            <input
              type="email"
              required
              className="input-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              className="heading-sm block mb-2"
              style={{ color: "var(--warm-gray)" }}
            >
              Hasło
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                className="input-base"
                style={{ paddingRight: "3rem" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--warm-gray)",
                  padding: 0,
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.8rem",
                color: "#c0392b",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2"
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}
