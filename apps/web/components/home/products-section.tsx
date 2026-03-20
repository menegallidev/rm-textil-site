import type { ComponentType, ReactNode } from "react"

import type { ProductWithMedia } from "@workspace/db"
import {
  ExternalLink,
  Images,
  Layers3,
  Leaf,
  Palette,
  ShieldCheck,
  Sparkles,
  SwatchBook,
  Truck,
  Video,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"

import { Container } from "@/components/layout/container"
import {
  ProductMediaCarousel,
  type ProductMediaCarouselItem,
} from "@/components/home/product-media-carousel"
import { ProductScene } from "@/components/home/product-scene"
import { SectionHeading } from "@/components/home/section-heading"
import {
  formatCurrencyFromCents,
  getFallbackScene,
  getProductImageUrls,
  getProductVideoUrls,
} from "@/lib/catalog"
import { serviceHighlights, type IconKey } from "@/lib/home-data"

const iconMap: Record<IconKey, ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  truck: Truck,
  leaf: Leaf,
  palette: Palette,
  layers: Layers3,
  swatchbook: SwatchBook,
  message: Sparkles,
}

export function ProductsSection({
  products,
}: {
  products: ProductWithMedia[]
}) {
  return (
    <section id="produtos" className="py-10 sm:py-14">
      <Container className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_0.22fr] lg:items-end">
          <SectionHeading
            eyebrow="Catalogo em destaque"
            title="Vitrine inspirada na referencia, agora alimentada pelo banco"
            description="Os produtos abaixo ja saem do Prisma e respeitam a regra de exibicao: apenas itens ativos aparecem no site. Quando houver imagens e videos cadastrados pelo admin, eles entram automaticamente nos cards."
          />

          <div className="rounded-[1.75rem] border border-primary/10 bg-white p-5 text-sm leading-7 text-black/80 shadow-[0_20px_60px_-42px_rgba(36,54,77,0.35)]">
            O painel administrativo na rota <strong>/admin</strong> controla
            cadastro, mídia, link externo e status de exibicao sem precisar
            editar o código da vitrine.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((item) => {
            const Icon = iconMap[item.icon]

            return (
              <Card
                key={item.title}
                className="rounded-[1.75rem] border-primary/10 bg-white px-0 py-0 shadow-[0_18px_55px_-40px_rgba(36,54,77,0.28)]"
              >
                <CardContent className="space-y-4 px-5 py-5">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/[0.05] text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-black/80">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {products.length === 0 ? (
          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_30px_80px_-55px_rgba(36,54,77,0.32)]">
            <CardContent className="px-6 py-10 text-center sm:px-10">
              <h3 className="font-heading text-4xl leading-none font-semibold text-black">
                Nenhum produto ativo no momento
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/75">
                Entre no painel <strong>/admin</strong>, cadastre um produto e
                marque-o como ativo para ele aparecer automaticamente aqui.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="rounded-[1.85rem] border-primary/10 bg-white px-0 py-0 transition duration-200 hover:-translate-y-1 hover:shadow-[0_36px_90px_-58px_rgba(36,54,77,0.56)]"
              >
                <div className="relative p-3">
                  <ProductVisual product={product} index={index} />
                  <div className="pointer-events-none absolute inset-x-6 top-6 flex items-start justify-between gap-3">
                    <Badge className="h-7 rounded-full bg-white px-3 text-black shadow-sm">
                      {product.category}
                    </Badge>
                    <div className="flex size-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-sm">
                      <Sparkles className="size-4" />
                    </div>
                  </div>
                </div>

                <CardContent className="space-y-4 px-5 pb-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <MetaPill
                      icon={<Images className="size-3.5" />}
                      label={`${getProductImageUrls(product).length} imagens`}
                    />
                    <MetaPill
                      icon={<Video className="size-3.5" />}
                      label={`${getProductVideoUrls(product).length} videos`}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading text-3xl leading-none font-semibold text-black">
                      {product.title}
                    </h3>
                    <p className="text-sm leading-6 text-black/80">
                      {product.description}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="mt-5 justify-between gap-3 border-t border-primary/8 bg-[#fbfcfd]">
                  <div>
                    <p className="text-xl font-semibold text-black">
                      {formatCurrencyFromCents(product.priceInCents)}
                    </p>
                    <p className="text-xs text-black/70">{product.category}</p>
                  </div>
                  <Button asChild size="lg" className="rounded-full">
                    <a
                      href={product.mercadoLivreUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      Mercado Livre
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

  return <ProductMediaCarousel productTitle={product.title} items={mediaItems} />
}

function MetaPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#eef3f8] px-3 py-1 text-xs text-black/75">
      {icon}
      {label}
    </span>
  )
}
