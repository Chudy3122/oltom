import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OLTOM Wnętrza | Projektowanie Wnętrz",
  description:
    "Tworzymy wyjątkowe przestrzenie, które odzwierciedlają Twój styl. Kompleksowe projektowanie wnętrz — od koncepcji po realizację.",
  keywords: "projektowanie wnętrz, architekt wnętrz, OLTOM, wnętrza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
