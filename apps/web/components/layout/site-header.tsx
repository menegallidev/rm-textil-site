import type { ReactNode } from "react"

import {
  Heart,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"

import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"
import { navigationLinks, topBarHighlights } from "@/lib/home-data"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/95 shadow-[0_14px_34px_-26px_rgba(36,54,77,0.4)] backdrop-blur-xl">
      <div className="border-b border-white/10 bg-primary text-primary-foreground">
        <Container className="flex min-h-10 flex-wrap items-center justify-between gap-3 py-2 text-[0.72rem] tracking-[0.08em] text-white/80 uppercase">
          <div className="flex items-center gap-2">
            <Truck className="size-3.5" />
            <span>{topBarHighlights[0]}</span>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-3.5" />
              <span>{topBarHighlights[1]}</span>
            </div>
            <span>{topBarHighlights[2]}</span>
          </div>
        </Container>
      </div>

      <Container className="flex items-center gap-4 py-4">
        <a href="#top" aria-label="Ir para o topo" className="shrink-0">
          <BrandMark compact className="sm:hidden" />
          <BrandMark className="hidden sm:flex" />
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-black/80 transition hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 items-center gap-3 lg:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/55" />
            <Input
              type="search"
              placeholder="Buscar composicoes, tecidos e colecoes"
              className="h-11 rounded-full border-primary/12 bg-[#f5f7fa] pl-10 text-sm shadow-none"
            />
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <HeaderIconButton
            icon={<Heart className="size-4" />}
            label="Favoritos"
          />
          <HeaderIconButton
            icon={<ShoppingBag className="size-4" />}
            label="Sacola"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full border-primary/12 bg-[#f5f7fa]"
          >
            <ShoppingBag className="size-4" />
            <span className="sr-only">Abrir sacola</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-full border-primary/12 bg-[#f5f7fa]"
              >
                <Menu className="size-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l-primary/10 bg-white/95 p-0 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-primary/10 px-6 py-5">
                <BrandMark />
                <SheetTitle className="sr-only">Navegacao principal</SheetTitle>
                <SheetDescription>
                  Explore as colecoes da RM Têxtil e encontre combinacoes
                  elegantes para a sua mesa posta.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 px-6 py-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/45" />
                  <Input
                    type="search"
                    placeholder="Buscar produtos"
                    className="h-11 rounded-full border-primary/10 bg-white pl-10"
                  />
                </div>

                <nav className="flex flex-col gap-2">
                  {navigationLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm text-black transition hover:border-primary/10 hover:bg-primary/[0.03]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(145deg,#24364D_0%,#304760_100%)] px-5 py-5 text-primary-foreground">
                  <p className="text-xs tracking-[0.18em] text-white/70 uppercase">
                    Primeira compra
                  </p>
                  <p className="mt-2 font-heading text-3xl leading-none">
                    10% OFF
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Cadastre seu e-mail e receba um cupom para conhecer a nova
                    colecao.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="mt-4 rounded-full bg-white text-primary hover:bg-white/90"
                  >
                    <a href="#faq">Quero meu cupom</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}

function HeaderIconButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button
      variant="outline"
      size="icon-lg"
      className={cn("rounded-full border-primary/12 bg-[#f5f7fa]")}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  )
}
