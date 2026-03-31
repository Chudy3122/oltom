import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@oltom.pl";
  const password = process.env.ADMIN_PASSWORD || "Oltom2024!";
  const haslo = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { haslo },
    create: { email, haslo },
  });

  console.log(`✅ Admin stworzony: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
