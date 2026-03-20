import type { ComponentProps } from "react"

import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircleMore,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"

import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"
import { footerLinkGroups } from "@/lib/home-data"

export function SiteFooter() {
  return (
    <footer
      id="contato"
      className="mt-16 border-t border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f3f6fa_100%)]"
    >
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <BrandMark />
            <p className="max-w-md text-sm leading-7 text-black/80">
              Frontend premium para uma loja de mesa posta com visual simples,
              moderno e elegante, preparado para crescer no mesmo monorepo com
              backend, catalogo e checkout.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-primary/10 bg-white"
              >
                <a href="mailto:contato@rmtextil.com.br">
                  <Mail className="size-4" />
                  contato@rmtextil.com.br
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-primary/10 bg-white"
              >
                <a href="#faq">
                  <MessageCircleMore className="size-4" />
                  Atendimento consultivo
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <SocialButton href="#" label="Instagram">
                <Instagram className="size-4" />
              </SocialButton>
              <SocialButton href="#" label="Facebook">
                <Facebook className="size-4" />
              </SocialButton>
              <SocialButton href="mailto:contato@rmtextil.com.br" label="Email">
                <Mail className="size-4" />
              </SocialButton>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinkGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-sm font-semibold tracking-[0.18em] text-black uppercase">
                  {group.title}
                </h3>
                <ul className="space-y-3 text-sm text-black/80">
                  {group.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-primary/10" />

        <div className="flex flex-col gap-3 text-sm text-black/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            RM Têxtil 2026. Layout frontend desenvolvido para escalar dentro do
            monorepo.
          </p>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary/70" />
            <span>Sao Paulo, Brasil</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function SocialButton({
  href,
  label,
  children,
}: ComponentProps<"a"> & { label: string }) {
  return (
    <Button
      asChild
      variant="outline"
      size="icon-lg"
      className="rounded-full border-primary/10 bg-white"
    >
      <a href={href} aria-label={label}>
        {children}
      </a>
    </Button>
  )
}
