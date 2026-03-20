import { prisma } from "../packages/db/src/client"
import { hashPassword } from "../packages/db/src/security/password"

const ADMIN_EMAIL = "rafaelmenegalli@gmail.com"
const ADMIN_PASSWORD = "RA_fa2005#"

async function main() {
  await prisma.adminUser.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      passwordHash: hashPassword(ADMIN_PASSWORD),
    },
    create: {
      email: ADMIN_EMAIL,
      passwordHash: hashPassword(ADMIN_PASSWORD),
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
