import { getActiveCategories, getActiveProducts } from "@workspace/db"

import { HeroSection } from "@/components/home/hero-section"
import { ProductsSection } from "@/components/home/products-section"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export const dynamic = "force-dynamic"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    categoria?: string
  }>
}) {
  const { categoria } = await searchParams
  const activeCategories = await getActiveCategories()
  const selectedCategory =
    activeCategories.find((category) => category.slug === categoria) ?? null
  const activeProducts = await getActiveProducts({
    categorySlug: selectedCategory?.slug,
  })

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(126,151,205,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[36rem] -z-10 h-[42rem] bg-[radial-gradient(circle_at_center,rgba(184,198,221,0.12),transparent_48%)]" />

      <SiteHeader />

      <main className="pb-4">
        <HeroSection categories={activeCategories} />
        <ProductsSection
          products={activeProducts}
          categories={activeCategories}
          selectedCategorySlug={selectedCategory?.slug}
          selectedCategoryName={selectedCategory?.name}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
