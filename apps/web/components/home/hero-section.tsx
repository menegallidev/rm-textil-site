import { ArrowRight, Layers3, Palette, SwatchBook } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"

import { Container } from "@/components/layout/container"
import { ProductScene } from "@/components/home/product-scene"
import {
  categoryFilters,
  collectionHighlights,
  heroHighlights,
} from "@/lib/home-data"

const iconMap = {
  palette: Palette,
  layers: Layers3,
  swatchbook: SwatchBook,
}

export function HeroSection() {
  return (
    <section id="top" className="relative pt-8 pb-12 sm:pt-10 sm:pb-14">
      <Container className="space-y-7">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <Card className="relative min-h-[30rem] rounded-[2rem] border-primary/10 bg-[linear-gradient(145deg,#24364D_0%,#2E4662_58%,#3D5A7D_100%)] px-0 py-0 text-primary-foreground shadow-[0_40px_110px_-55px_rgba(36,54,77,0.85)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,151,205,0.28),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_55%)]" />
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[repeating-linear-gradient(140deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_2px,transparent_2px,transparent_13px)] lg:block" />

            <CardContent className="relative flex h-full flex-col px-7 py-7 sm:px-10 sm:py-10">
              <Badge className="h-8 rounded-full bg-white/14 px-3 text-[0.72rem] tracking-[0.2em] text-white uppercase">
                Colecao assinatura RM Têxtil
              </Badge>

              <div className="mt-8 max-w-2xl space-y-5">
                <h1 className="font-heading text-5xl leading-[0.95] text-white sm:text-6xl xl:text-7xl">
                  Mesa posta com
                  <span className="block text-[#B8C6DD]">
                    elegancia leve e atual.
                  </span>
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/82 sm:text-base">
                  Uma releitura da referencia visual enviada, agora totalmente
                  rebrandada para a RM Têxtil com identidade navy, UI limpa e
                  estrutura pronta para crescer junto com o restante do
                  monorepo.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-primary hover:bg-white/90"
                >
                  <a href="#produtos">
                    Comprar colecao
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/14"
                >
                  <a href="#guia">Explorar guia da mesa posta</a>
                </Button>
              </div>

              <div className="mt-auto grid gap-4 pt-10 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.6rem] border border-white/12 bg-white/[0.08] p-5 backdrop-blur-sm"
                  >
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/76">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="overflow-hidden rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_30px_80px_-55px_rgba(36,54,77,0.5)]">
              <div className="grid gap-6 p-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div className="space-y-4">
                  <Badge
                    variant="outline"
                    className="h-8 rounded-full border-black/8 bg-[#eef3f8] px-3 text-[0.72rem] tracking-[0.18em] text-black uppercase"
                  >
                    Destaque da semana
                  </Badge>
                  <div className="space-y-3">
                    <h2 className="font-heading text-4xl leading-none font-semibold text-black">
                      Duna Azul
                    </h2>
                    <p className="text-sm leading-7 text-black/80">
                      Uma composicao elegante que traduz a paleta do logo e cria
                      um ponto focal refinado na vitrine principal.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="h-7 rounded-full bg-primary px-3 text-white">
                      10% OFF primeira compra
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="h-7 rounded-full bg-primary/[0.08] px-3 text-black"
                    >
                      UI otimizada para conversao
                    </Badge>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-primary/12 bg-[#f8fafc]"
                  >
                    <a href="#produtos">
                      Ver produtos
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>

                <ProductScene
                  featured
                  variant="round"
                  palette={{
                    surface: "#EEF2F7",
                    textile: "#24364D",
                    accent: "#7E97CD",
                    plate: "#FBF7EF",
                    plateInner: "#CDAA82",
                    metal: "#E8EEF8",
                    foliage: "#7C9172",
                  }}
                  className="min-h-[20rem]"
                />
              </div>
            </Card>

            <div id="colecoes" className="grid gap-4 sm:grid-cols-3">
              {collectionHighlights.map((collection) => {
                const Icon = iconMap[collection.icon]

                return (
                  <Card
                    key={collection.title}
                    className="rounded-[1.75rem] border-primary/10 bg-white px-0 py-0 transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-46px_rgba(36,54,77,0.45)]"
                  >
                    <CardContent className="space-y-4 px-5 py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/[0.05] text-primary">
                          <Icon className="size-5" />
                        </div>
                        <ArrowRight className="size-4 text-black/45" />
                      </div>
                      <div>
                        <h3 className="font-heading text-3xl leading-none font-semibold text-black">
                          {collection.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-black/80">
                          {collection.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {collection.colors.map((color) => (
                          <span
                            key={color}
                            className="size-4 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categoryFilters.map((filter, index) => (
            <Button
              key={filter}
              variant={index === 0 ? "default" : "outline"}
              size="lg"
              className={
                index === 0
                  ? "rounded-full"
                  : "rounded-full border-primary/12 bg-white text-black hover:bg-primary/[0.05]"
              }
            >
              {filter}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  )
}
