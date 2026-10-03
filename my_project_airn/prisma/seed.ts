import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Prueba1234!", 10);

  const datos = [
    {
      tenantName: "Tech Solutions",
      name: "Administrador",
      email: "admin@tech.test",
      role: Role.ADMIN,
    },
    {
      tenantName: "Marketing Pro",
      name: "Usuario Marketing",
      email: "usuario@marketing.test",
      role: Role.USER,
    },
    {
      tenantName: "Consulting Experts",
      name: "Usuario Consulting",
      email: "usuario@consulting.test",
      role: Role.USER,
    },
  ];

  for (const dato of datos) {
    let tenant = await prisma.tenant.findFirst({
      where: { name: dato.tenantName },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: { name: dato.tenantName },
      });
    }

    await prisma.user.upsert({
      where: { email: dato.email },
      update: {},
      create: {
        name: dato.name,
        email: dato.email,
        role: dato.role,
        password,
        tenantId: tenant.id,
      },
    });

    console.log(`${dato.email} asociado a ${tenant.name}`);
  }

  console.log("Seed completado.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });