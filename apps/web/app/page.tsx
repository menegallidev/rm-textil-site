import { getActiveProducts } from "@workspace/db"

import { FloatingContact } from "@/components/layout/floating-contact"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { EditorialSection } from "@/components/home/editorial-section"
import { HeroSection } from "@/components/home/hero-section"
import { ProductsSection } from "@/components/home/products-section"

export const dynamic = "force-dynamic"

export default async function Page() {
  const activeProducts = await getActiveProducts()

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(126,151,205,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[36rem] -z-10 h-[42rem] bg-[radial-gradient(circle_at_center,rgba(184,198,221,0.12),transparent_48%)]" />

      <SiteHeader />

      <main className="pb-8">
        <HeroSection />
        <ProductsSection products={activeProducts} />
        <EditorialSection />
      </main>

      <SiteFooter />
      <FloatingContact />
    </div>
  )
}
