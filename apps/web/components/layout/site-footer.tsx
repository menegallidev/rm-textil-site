import { Mail, MessageCircleMore } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"
import { whatsappContact } from "@/lib/home-data"

export function SiteFooter() {
  return (
    <footer
      id="contato"
      className="mt-12 border-t border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7f8fb_100%)]"
    >
      <Container className="flex flex-col gap-8 py-10 sm:py-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <BrandMark />
          <p className="max-w-lg text-sm leading-7 text-black/70">
            Vitrine simples e direta para destacar os produtos da RM Textil.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary/12 bg-white"
          >
            <a href="mailto:contato@rmtextil.com.br">
              <Mail className="size-4" />
              contato@rmtextil.com.br
            </a>
          </Button>

          <Button asChild size="lg" className="rounded-full">
            <a href={whatsappContact.href} target="_blank" rel="noreferrer">
              <MessageCircleMore className="size-4" />
              {whatsappContact.displayNumber}
            </a>
          </Button>
        </div>
      </Container>
    </footer>
  )
}
