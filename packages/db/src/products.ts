import type { Prisma } from "./generated/client"

import { ensureProductCategoriesSynced } from "./categories"
import { prisma } from "./client"

export const productWithMedia = {
  include: {
    categoryRecord: true,
    media: {
      orderBy: [{ position: "asc" }],
    },
  },
} satisfies Prisma.ProductDefaultArgs

export type ProductWithMedia = Prisma.ProductGetPayload<typeof productWithMedia>

export async function getActiveProducts({
  categorySlug,
}: {
  categorySlug?: string
} = {}) {
  await ensureProductCategoriesSynced()

  return prisma.product.findMany({
    ...productWithMedia,
    where: {
      isActive: true,
      categoryRecord: {
        is: {
          isActive: true,
          ...(categorySlug ? { slug: categorySlug } : {}),
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
  })
}

export async function getAdminProducts() {
  await ensureProductCategoriesSynced()

  return prisma.product.findMany({
    ...productWithMedia,
    orderBy: [{ createdAt: "desc" }],
  })
}
