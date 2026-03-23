import { Menu, MessageCircleMore } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { navigationLinks, whatsappContact } from "@/lib/home-data"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/92 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center gap-4">
        <a href="#top" aria-label="Ir para o topo" className="shrink-0">
          <BrandMark compact className="sm:hidden" />
          <BrandMark className="hidden sm:flex" />
        </a>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-black/72 transition hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ModeToggle
            showLabel
            className="rounded-full border-primary/12 bg-background px-4"
          />
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-5 text-white hover:bg-primary/92"
          >
            <a href={whatsappContact.href} target="_blank" rel="noreferrer">
              <MessageCircleMore className="size-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ModeToggle className="rounded-full border-primary/12 bg-background" />
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
              className="w-full border-l-primary/10 bg-white p-0 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-primary/10 px-6 py-5">
                <BrandMark />
                <SheetTitle className="sr-only">Navegacao principal</SheetTitle>
                <SheetDescription>
                  Conheca a vitrine da RM Textil e fale direto pelo WhatsApp.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 px-6 py-6">
                <nav className="flex flex-col gap-2">
                  {navigationLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-black transition hover:border-primary/10 hover:bg-primary/[0.03]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary text-white hover:bg-primary/92"
                >
                  <a
                    href={whatsappContact.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircleMore className="size-4" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
