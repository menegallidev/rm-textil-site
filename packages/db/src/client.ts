import { createRequire } from "node:module"

import { loadMonorepoEnv } from "./env"
import type { PrismaClient as PrismaClientType } from "./generated/client"

loadMonorepoEnv()

const require = createRequire(import.meta.url)
const { PrismaClient } = require("./generated/client") as {
  PrismaClient: typeof PrismaClientType
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClientType
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
