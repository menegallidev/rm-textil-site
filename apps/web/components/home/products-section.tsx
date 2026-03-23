import { ExternalLink } from "lucide-react"
import Link from "next/link"

import type { Category, ProductWithMedia } from "@workspace/db"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"

import {
  ProductMediaCarousel,
  type ProductMediaCarouselItem,
} from "@/components/home/product-media-carousel"
import { ProductScene } from "@/components/home/product-scene"
import { Container } from "@/components/layout/container"
import { formatCurrencyFromCents, getFallbackScene } from "@/lib/catalog"

export function ProductsSection({
  products,
  categories,
  selectedCategorySlug,
  selectedCategoryName,
}: {
  products: ProductWithMedia[]
  categories: Category[]
  selectedCategorySlug?: string
  selectedCategoryName?: string
}) {
  return (
    <section id="produtos" className="pt-2 pb-8 sm:pb-12">
      <Container className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/52 uppercase">
              Produtos
            </p>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <h2 className="font-heading text-4xl leading-none text-black sm:text-5xl">
                  {selectedCategoryName
                    ? selectedCategoryName
                    : "Todos os produtos"}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
                  Escolha uma categoria para ver apenas os itens daquela linha
                  ou navegue por toda a vitrine.
                </p>
              </div>
              <p className="text-sm text-black/60">
                {products.length}{" "}
                {products.length === 1 ? "produto" : "produtos"}
              </p>
            </div>
          </div>

          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant={selectedCategorySlug ? "outline" : "default"}
                size="lg"
                className={
                  selectedCategorySlug
                    ? "rounded-full border-primary/12 bg-white text-black hover:bg-primary/[0.05]"
                    : "rounded-full"
                }
              >
                <Link href="/#produtos">Todas</Link>
              </Button>

              {categories.map((category) => {
                const isSelected = selectedCategorySlug === category.slug

                return (
                  <Button
                    key={category.id}
                    asChild
                    variant={isSelected ? "default" : "outline"}
                    size="lg"
                    className={
                      isSelected
                        ? "rounded-full"
                        : "rounded-full border-primary/12 bg-white text-black hover:bg-primary/[0.05]"
                    }
                  >
                    <Link href={`/?categoria=${category.slug}#produtos`}>
                      {category.name}
                    </Link>
                  </Button>
                )
              })}
            </div>
          ) : null}
        </div>

        {products.length === 0 ? (
          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_60px_-48px_rgba(36,54,77,0.28)]">
            <CardContent className="px-6 py-10 text-center sm:px-10">
              <h3 className="font-heading text-4xl leading-none font-semibold text-black">
                {selectedCategoryName
                  ? `Nenhum produto em ${selectedCategoryName}`
                  : "Nenhum produto ativo no momento"}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/70">
                {selectedCategoryName
                  ? "Escolha outra categoria ou ative produtos nessa categoria pelo painel administrativo."
                  : "Assim que novos produtos forem ativados no painel, eles aparecerao aqui automaticamente."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden rounded-[1.9rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_60px_-46px_rgba(36,54,77,0.26)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_36px_80px_-48px_rgba(36,54,77,0.34)]"
              >
                <div className="relative p-3">
                  <ProductVisual product={product} index={index} />
                  <div className="pointer-events-none absolute top-6 left-6">
                    <Badge className="h-7 rounded-full bg-white px-3 text-black shadow-sm">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="space-y-3 px-5 pb-0">
                  <h3 className="font-heading text-3xl leading-none text-black">
                    {product.title}
                  </h3>
                  <p className="text-sm leading-6 text-black/74">
                    {product.description}
                  </p>
                </CardContent>

                <CardFooter className="mt-5 items-end justify-between gap-4 border-t border-primary/8 bg-[#fbfcfd]">
                  <div>
                    <p className="text-xl font-semibold text-black">
                      {formatCurrencyFromCents(product.priceInCents)}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.14em] text-black/48 uppercase">
                      {product.category}
                    </p>
                  </div>

                  <Button asChild size="lg" className="rounded-full">
                    <a
                      href={product.mercadoLivreUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      Ver produto
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

function ProductVisual({
  product,
  index,
}: {
  product: ProductWithMedia
  index: number
}) {
  const mediaItems: ProductMediaCarouselItem[] = product.media.map((item) => ({
    id: item.id,
    type: item.type,
    url: item.url,
  }))

  if (mediaItems.length === 0) {
    const fallbackScene = getFallbackScene(index)

    return (
      <ProductScene
        palette={fallbackScene.palette}
        variant={fallbackScene.variant}
      />
    )
  }

  return (
    <ProductMediaCarousel productTitle={product.title} items={mediaItems} />
  )
}
