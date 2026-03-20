import { LockKeyhole, ShieldCheck } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"

const adminInputClassName =
  "h-12 rounded-2xl border-primary/18 bg-[#fcfcfd] text-black placeholder:text-black/45 shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)]"

export function AdminLoginCard({
  action,
}: {
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <Card className="overflow-hidden rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_30px_90px_-52px_rgba(36,54,77,0.36)]">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="bg-[linear-gradient(145deg,#24364D_0%,#304760_100%)] px-8 py-10 text-white">
              <BrandMark light />
              <div className="mt-8 space-y-4">
                <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs tracking-[0.18em] text-white/80 uppercase">
                  Painel administrativo
                </div>
                <h1 className="font-heading text-5xl leading-[0.94]">
                  Acesso do admin da RM Têxtil
                </h1>
                <p className="text-sm leading-7 text-white/80">
                  Entre para cadastrar produtos, controlar o status ativo e
                  manter a vitrine pública sincronizada com o catálogo real.
                </p>
              </div>
            </div>

            <CardContent className="bg-[#fffdfa] px-8 py-10">
              <div className="mb-8 flex items-center gap-3 text-black">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#eef3f8]">
                  <ShieldCheck className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Entrar no painel</h2>
                  <p className="text-sm text-black/80">
                    Use o usuário administrador configurado no banco.
                  </p>
                </div>
              </div>

              <form action={action} className="space-y-5">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-black"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="rafaelmenegalli@gmail.com"
                    className={adminInputClassName}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-black"
                    htmlFor="password"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-black/55" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Sua senha"
                      className={`${adminInputClassName} pl-11`}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full">
                  Entrar no painel
                </Button>
              </form>
            </CardContent>
          </div>
        </Card>
      </Container>
    </section>
  )
}
