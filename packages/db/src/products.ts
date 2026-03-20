import type { Prisma } from "./generated/client"

import { prisma } from "./client"

export const productWithMedia = {
  include: {
    media: {
      orderBy: [{ position: "asc" }],
    },
  },
} satisfies Prisma.ProductDefaultArgs

export type ProductWithMedia = Prisma.ProductGetPayload<typeof productWithMedia>

export async function getActiveProducts() {
  return prisma.product.findMany({
    ...productWithMedia,
    where: {
      isActive: true,
    },
    orderBy: [{ createdAt: "desc" }],
  })
}

export async function getAdminProducts() {
  return prisma.product.findMany({
    ...productWithMedia,
    orderBy: [{ createdAt: "desc" }],
  })
}
