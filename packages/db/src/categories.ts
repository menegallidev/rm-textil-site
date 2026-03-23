import type { Prisma } from "./generated/client"

import { prisma } from "./client"
import { slugify } from "./security/slug"

const adminCategoryWithCount = {
  include: {
    _count: {
      select: {
        products: true,
      },
    },
  },
} satisfies Prisma.CategoryDefaultArgs

export type AdminCategory = Prisma.CategoryGetPayload<
  typeof adminCategoryWithCount
>

let syncPromise: Promise<void> | null = null

async function syncProductCategoriesInternal() {
  const uncategorizedProducts = await prisma.product.findMany({
    where: {
      categoryId: null,
    },
    select: {
      id: true,
      category: true,
    },
  })

  const productsWithCategory = uncategorizedProducts.filter((product) =>
    product.category.trim()
  )

  if (productsWithCategory.length === 0) {
    return
  }

  const categoryNamesBySlug = new Map<string, string>()

  for (const product of productsWithCategory) {
    const normalizedName = product.category.trim()
    const slug = slugify(normalizedName)

    if (!slug || categoryNamesBySlug.has(slug)) {
      continue
    }

    categoryNamesBySlug.set(slug, normalizedName)
  }

  if (categoryNamesBySlug.size === 0) {
    return
  }

  const slugs = Array.from(categoryNamesBySlug.keys())
  const existingCategories = await prisma.category.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  })

  const existingBySlug = new Map(
    existingCategories.map((category) => [category.slug, category])
  )

  const categoriesToCreate = slugs
    .filter((slug) => !existingBySlug.has(slug))
    .map((slug) => ({
      slug,
      name: categoryNamesBySlug.get(slug) ?? slug,
      isActive: true,
    }))

  if (categoriesToCreate.length > 0) {
    await prisma.category.createMany({
      data: categoriesToCreate,
    })
  }

  const syncedCategories = await prisma.category.findMany({
    where: {
      slug: {
        in: slugs,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  })

  const syncedBySlug = new Map(
    syncedCategories.map((category) => [category.slug, category])
  )

  const updates = productsWithCategory.flatMap((product) => {
    const slug = slugify(product.category.trim())
    const category = slug ? syncedBySlug.get(slug) : null

    if (!category) {
      return []
    }

    return [
      prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          category: category.name,
          categoryId: category.id,
        },
      }),
    ]
  })

  if (updates.length === 0) {
    return
  }

  await prisma.$transaction(updates)
}

export async function ensureProductCategoriesSynced() {
  if (!syncPromise) {
    syncPromise = syncProductCategoriesInternal().finally(() => {
      syncPromise = null
    })
  }

  await syncPromise
}

export async function getActiveCategories() {
  await ensureProductCategoriesSynced()

  return prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: [{ name: "asc" }],
  })
}

export async function getAdminCategories() {
  await ensureProductCategoriesSynced()

  return prisma.category.findMany({
    ...adminCategoryWithCount,
    orderBy: [{ name: "asc" }],
  })
}
