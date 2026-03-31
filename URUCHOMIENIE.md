# OLTOM Wnętrza — Instrukcja uruchomienia

## Pierwsze uruchomienie

```bash
cd oltom-app

# 1. Zainstaluj zależności (już zrobione)
npm install

# 2. Zbuduj bazę danych i utwórz konto admina
npm run setup

# 3. Uruchom serwer deweloperski
npm run dev
```

Strona dostępna pod: http://localhost:3000

---

## Panel admina

**URL:** http://localhost:3000/wnetrza-studio
*(link NIGDZIE na stronie nie jest widoczny)*

**Trigger:** Kliknij logo OLTOM w stopce **5 razy z rzędu** — przeniesie Cię do logowania.

**Dane logowania (domyślne):**
- Email: `admin@oltom.pl`
- Hasło: `Oltom2024!`

> Zmień hasło w `.env.local` i uruchom ponownie `npm run db:seed`

---

## Zmiana danych kontaktowych

Edytuj pliki:
- `src/app/kontakt/page.tsx` — telefon, adres, linki social media
- `src/components/layout/Footer.tsx` — linki social media w stopce

---

## Dodawanie realizacji

1. Zaloguj się do panelu admina
2. Kliknij **"Nowa realizacja"**
3. Uzupełnij dane, dodaj zdjęcia
4. Zaznacz **"Wyróżnij na stronie głównej"** żeby pokazało się w sekcji portfolio na głównej

---

## Produkcja

```bash
npm run build
npm start
```

Pamiętaj o zmianie w `.env.local`:
- `NEXTAUTH_SECRET` → losowy, silny ciąg znaków
- `NEXTAUTH_URL` → docelowy URL strony
