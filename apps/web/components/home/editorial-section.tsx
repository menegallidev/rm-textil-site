import { CheckCircle2, Mail, MessageCircleMore } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/home/section-heading"
import { editorialSections, faqItems } from "@/lib/home-data"

export function EditorialSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="space-y-10">
        <div
          id="guia"
          className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start"
        >
          <Card className="self-start rounded-[2rem] border-primary/10 bg-[linear-gradient(145deg,#24364D_0%,#304760_100%)] px-0 py-0 text-primary-foreground shadow-[0_36px_100px_-52px_rgba(36,54,77,0.75)]">
            <CardContent className="space-y-6 px-7 py-7 sm:px-9 sm:py-9">
              <Badge className="h-8 rounded-full bg-white/14 px-3 text-[0.72rem] tracking-[0.2em] text-white uppercase">
                Guia RM Têxtil
              </Badge>

              <div className="space-y-4">
                <h2 className="font-heading text-4xl leading-[0.96] font-semibold text-white sm:text-5xl">
                  Conteudo com foco em SEO e conversao.
                </h2>
                <p className="text-sm leading-7 text-white/82 sm:text-base">
                  A pagina nao fica so na vitrine. Ela tambem ajuda a educar o
                  cliente, melhora a escaneabilidade do catalogo e prepara o
                  terreno para conteudo organico no futuro.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Titulos claros para busca organica",
                  "Blocos editoriais reaproveitaveis",
                  "Tom de marca elegante e acessivel",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-[#B8C6DD]" />
                    <span className="text-sm text-white/84">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.08] p-5">
                <p className="text-xs tracking-[0.18em] text-white/65 uppercase">
                  Proximo passo
                </p>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  Quando o backend entrar, estes blocos podem ser alimentados
                  por CMS, ERP ou painel administrativo sem refatorar o layout.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5">
            {editorialSections.map((section) => (
              <Card
                key={section.title}
                className="rounded-[1.85rem] border-primary/10 bg-white px-0 py-0 shadow-[0_22px_60px_-42px_rgba(36,54,77,0.3)]"
              >
                <CardContent className="space-y-5 px-6 py-6">
                  <div className="space-y-3">
                    <h3 className="font-heading text-3xl leading-none font-semibold text-black">
                      {section.title}
                    </h3>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-black/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {section.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-[1.4rem] border border-primary/10 bg-[#f7fafc] p-4 text-sm leading-6 text-black/80"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div id="faq" className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_70px_-44px_rgba(36,54,77,0.32)]">
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              <SectionHeading
                eyebrow="Perguntas frequentes"
                title="Uma base pronta para crescer"
                description="O site nasce com foco em UI/UX, mas a arquitetura ja antecipa expansao para funcionalidades de ecommerce, gestao de conteudo e integracoes futuras."
              />

              <Accordion type="single" collapsible className="mt-8">
                {faqItems.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger className="py-4 text-base font-medium text-black hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-black/80">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-primary/10 bg-[linear-gradient(180deg,#24364D_0%,#2E4563_100%)] px-0 py-0 text-primary-foreground shadow-[0_30px_90px_-52px_rgba(36,54,77,0.78)]">
            <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
              <Badge className="h-8 rounded-full bg-white/12 px-3 text-[0.72rem] tracking-[0.2em] text-white uppercase">
                Newsletter
              </Badge>

              <div className="mt-5 space-y-4">
                <h3 className="font-heading text-4xl leading-none text-white">
                  Receba novidades da RM Têxtil
                </h3>
                <p className="text-sm leading-7 text-white/82">
                  Um bloco simples para captar leads agora e conectar com CRM,
                  automacao ou checkout no futuro.
                </p>
              </div>

              <form className="mt-6 space-y-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/55" />
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="h-11 rounded-full border-white/14 bg-white/10 pl-10 text-white placeholder:text-white/55"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full bg-white text-primary hover:bg-white/90"
                >
                  Quero meu cupom
                </Button>
              </form>

              <div className="mt-6 rounded-[1.6rem] border border-white/12 bg-white/[0.08] p-4">
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <MessageCircleMore className="size-4 text-[#B8C6DD]" />
                  Atendimento consultivo por WhatsApp e Instagram
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
