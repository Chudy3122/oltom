import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  imie: z.string().min(1).max(100),
  email: z.string().email().max(200),
  telefon: z.string().max(30).optional(),
  temat: z.string().max(50),
  wiadomosc: z.string().min(1).max(2000),
});

const tematy: Record<string, string> = {
  projekt: "Nowy projekt",
  konsultacja: "Konsultacja",
  wycena: "Wycena",
  wspolpraca: "Współpraca",
  inne: "Inne",
};

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Błąd walidacji" }, { status: 400 });
  }

  const d = parsed.data;

  // Konfiguracja SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const tematLabel = tematy[d.temat] ?? d.temat;

  const html = `
    <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; color: #2a2a2a;">
      <div style="background: #2a2a2a; padding: 24px 32px;">
        <p style="color: white; font-size: 11px; letter-spacing: 4px; margin: 0;">OLTOM WNĘTRZA</p>
        <p style="color: #c4ad96; font-size: 11px; letter-spacing: 2px; margin: 4px 0 0;">NOWA WIADOMOŚĆ Z FORMULARZA</p>
      </div>
      <div style="background: #f2ede8; padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #6b6560; width: 130px;">Od</td>
            <td style="padding: 10px 0; font-size: 15px; color: #2a2a2a;">${d.imie}</td>
          </tr>
          <tr style="border-top: 1px solid #e0d8d0;">
            <td style="padding: 10px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #6b6560;">Email</td>
            <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${d.email}" style="color: #c4ad96;">${d.email}</a></td>
          </tr>
          ${d.telefon ? `
          <tr style="border-top: 1px solid #e0d8d0;">
            <td style="padding: 10px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #6b6560;">Telefon</td>
            <td style="padding: 10px 0; font-size: 15px;">${d.telefon}</td>
          </tr>` : ""}
          <tr style="border-top: 1px solid #e0d8d0;">
            <td style="padding: 10px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #6b6560;">Temat</td>
            <td style="padding: 10px 0; font-size: 15px;">${tematLabel}</td>
          </tr>
        </table>
      </div>
      <div style="background: white; padding: 32px; border-left: 3px solid #c4ad96;">
        <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #6b6560; margin: 0 0 12px;">Wiadomość</p>
        <p style="font-size: 15px; line-height: 1.8; color: #2a2a2a; margin: 0; white-space: pre-wrap;">${d.wiadomosc}</p>
      </div>
      <div style="background: #fafaf8; padding: 20px 32px; border-top: 1px solid #e0d8d0;">
        <p style="font-size: 11px; color: #6b6560; margin: 0;">
          Odpowiedz bezpośrednio na tego maila lub kliknij:
          <a href="mailto:${d.email}" style="color: #c4ad96;">${d.email}</a>
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OLTOM Wnętrza" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: `"${d.imie}" <${d.email}>`,
      subject: `[OLTOM] ${tematLabel} — ${d.imie}`,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Błąd wysyłania maila:", err);
    // Nie blokujemy użytkownika gdy mail nie dojdzie — logujemy i zwracamy sukces
    // Zmień na status 500 jeśli chcesz informować o błędzie
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
