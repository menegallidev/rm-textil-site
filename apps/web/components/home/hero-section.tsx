import { ArrowRight, MessageCircleMore } from "lucide-react"

import type { Category } from "@workspace/db"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"

import { ProductScene } from "@/components/home/product-scene"
import { Container } from "@/components/layout/container"
import { whatsappContact } from "@/lib/home-data"

export function HeroSection({ categories }: { categories: Category[] }) {
  return (
    <section id="top" className="relative pt-8 pb-10 sm:pt-10 sm:pb-14">
      <Container>
        <Card className="overflow-hidden rounded-[2.2rem] border-primary/10 bg-[linear-gradient(135deg,#24364D_0%,#304760_58%,#F3EFE8_58%,#FCFAF6_100%)] px-0 py-0 shadow-[0_36px_90px_-54px_rgba(36,54,77,0.48)]">
          <div className="grid gap-8 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-10">
            <CardContent className="space-y-6 px-0 py-0 text-white">
              <Badge className="h-8 rounded-full bg-white/14 px-3 text-[0.72rem] tracking-[0.18em] text-white uppercase">
                RM Textil
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-2xl font-heading text-5xl leading-[0.94] text-white sm:text-6xl">
                  Mesa posta com foco total nos produtos.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/78 sm:text-base">
                  Uma vitrine limpa, elegante e direta para destacar as pecas da
                  colecao e facilitar a escolha por categoria.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white px-5 text-primary hover:bg-white/92"
                >
                  <a href="#produtos">
                    Ver produtos
                    <ArrowRight className="size-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/18 bg-white/8 px-5 text-white hover:bg-white/14"
                >
                  <a
                    href={whatsappContact.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircleMore className="size-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-white/72">
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                  {categories.length} categorias ativas
                </span>
                <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                  Produtos atualizados pelo painel
                </span>
              </div>
            </CardContent>

            <div className="rounded-[1.9rem] border border-black/8 bg-white/78 p-4 shadow-[0_24px_60px_-42px_rgba(36,54,77,0.38)] backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#f8f5ef_0%,#eef3f8_100%)] p-4">
                <ProductScene
                  featured
                  variant="round"
                  palette={{
                    surface: "#F7F4EE",
                    textile: "#24364D",
                    accent: "#8DA4C5",
                    plate: "#FFF8F0",
                    plateInner: "#D8B28A",
                    metal: "#E8EEF8",
                    foliage: "#8CA082",
                  }}
                  className="min-h-[20rem] sm:min-h-[24rem]"
                />
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}
