import type { ReactNode } from "react"

import { ExternalLink, Eye, EyeOff, LogOut, PackagePlus } from "lucide-react"

import type { ProductWithMedia } from "@workspace/db"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"

import { StatusBanner } from "@/components/admin/status-banner"
import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"
import { formatCurrencyFromCents } from "@/lib/catalog"

const adminInputClassName =
  "h-12 rounded-2xl border-primary/18 bg-[#fcfcfd] text-black placeholder:text-black/45 shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)]"

const adminTextareaClassName =
  "min-h-32 w-full rounded-2xl border border-primary/18 bg-[#fcfcfd] px-4 py-3 text-sm text-black placeholder:text-black/45 shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)] transition outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

const adminFileInputClassName =
  "min-h-16 w-full rounded-2xl border border-primary/18 bg-[#fcfcfd] px-4 py-3 text-sm text-black shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)] transition outline-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

export function AdminDashboard({
  adminEmail,
  products,
  createProductAction,
  toggleProductStatusAction,
  logoutAction,
  message,
  error,
}: {
  adminEmail: string
  products: ProductWithMedia[]
  createProductAction: (formData: FormData) => Promise<void>
  toggleProductStatusAction: (formData: FormData) => Promise<void>
  logoutAction: () => Promise<void>
  message?: string
  error?: string
}) {
  const activeProducts = products.filter((product) => product.isActive).length

  return (
    <section className="py-10 sm:py-12">
      <Container className="space-y-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-primary/10 bg-white px-6 py-6 shadow-[0_22px_60px_-42px_rgba(36,54,77,0.35)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <BrandMark />
              <div className="space-y-2">
                <p className="text-xs tracking-[0.18em] text-black/70 uppercase">
                  Painel administrativo
                </p>
                <h1 className="font-heading text-5xl leading-[0.94] font-semibold text-black">
                  Gerencie o catálogo da vitrine
                </h1>
                <p className="max-w-3xl text-base leading-7 text-black/85">
                  Cadastre produtos, controle mídia, Mercado Livre e status de
                  publicação. Apenas itens ativos aparecem no site público.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-2xl border border-primary/12 bg-[#f5f8fc] px-4 py-3 text-sm text-black/85 shadow-[0_12px_30px_-24px_rgba(36,54,77,0.28)]">
                Logado como{" "}
                <span className="font-semibold text-black">{adminEmail}</span>
              </div>
              <form action={logoutAction}>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-primary/15 bg-white text-black hover:text-black sm:w-auto"
                >
                  <LogOut className="size-4" />
                  Sair
                </Button>
              </form>
            </div>
          </div>

          <StatusBanner message={message} error={error} />

          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Produtos cadastrados"
              value={String(products.length)}
              description="Base total do catálogo"
            />
            <SummaryCard
              label="Produtos ativos"
              value={String(activeProducts)}
              description="Itens visíveis no site"
            />
            <SummaryCard
              label="Produtos inativos"
              value={String(products.length - activeProducts)}
              description="Rascunhos ou pausados"
            />
          </div>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_70px_-44px_rgba(36,54,77,0.32)]">
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#eef3f8]">
                  <PackagePlus className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    Cadastrar produto
                  </h2>
                  <p className="text-sm text-black/80">
                    Informe os dados do item que deve aparecer na vitrine.
                  </p>
                </div>
              </div>

              <form
                action={createProductAction}
                encType="multipart/form-data"
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Titulo do produto">
                    <Input
                      name="title"
                      placeholder="Ex.: Jogo Americano Duna Azul"
                      className={adminInputClassName}
                      required
                    />
                  </Field>
                  <Field label="Categoria">
                    <Input
                      name="category"
                      placeholder="Ex.: Jogo Americano"
                      className={adminInputClassName}
                      required
                    />
                  </Field>
                </div>

                <Field label="Descricao do produto">
                  <textarea
                    name="description"
                    rows={5}
                    placeholder="Descreva o produto, acabamentos, estilo e diferenciais."
                    className={adminTextareaClassName}
                    required
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preco (R$)">
                    <Input
                      name="price"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      placeholder="89.90"
                      className={adminInputClassName}
                      required
                    />
                  </Field>
                  <Field label="Link do Mercado Livre">
                    <Input
                      name="mercadoLivreUrl"
                      type="url"
                      placeholder="https://..."
                      className={adminInputClassName}
                      required
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Arquivos de imagem"
                    hint="Selecione uma ou mais imagens do produto."
                  >
                    <input
                      name="images"
                      type="file"
                      accept="image/*"
                      multiple
                      className={adminFileInputClassName}
                    />
                  </Field>
                  <Field
                    label="Arquivos de video"
                    hint="Envie videos do produto em formatos como MP4, MOV ou WEBM."
                  >
                    <input
                      name="videos"
                      type="file"
                      accept="video/*"
                      multiple
                      className={adminFileInputClassName}
                    />
                  </Field>
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-primary/12 bg-[#f5f8fc] px-4 py-4 text-sm font-medium text-black shadow-[0_12px_30px_-24px_rgba(36,54,77,0.28)]">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked
                    className="size-4 rounded border-primary/25 accent-primary"
                  />
                  Cadastrar produto como ativo
                </label>

                <Button type="submit" size="lg" className="rounded-full">
                  Salvar produto
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_70px_-44px_rgba(36,54,77,0.32)]">
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    Produtos cadastrados
                  </h2>
                  <p className="text-sm text-black/80">
                    Cada produto aparece em uma linha simples com o botao de
                    ativar ou desativar ao lado.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {products.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-primary/20 bg-[#f9fbfd] px-5 py-6 text-sm text-black/80 shadow-[0_14px_32px_-28px_rgba(36,54,77,0.3)]">
                    <p className="font-medium text-black">
                      Nenhum produto cadastrado ainda.
                    </p>
                    <p className="mt-1 text-black/70">
                      Assim que voce salvar um item, ele aparecera aqui com o
                      botao para ativar ou desativar.
                    </p>
                  </div>
                ) : (
                  products.map((product, index) => {
                    return (
                      <div key={product.id}>
                        {index > 0 && (
                          <Separator className="mb-4 bg-primary/10" />
                        )}

                        <div className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-[#fbfcfd] p-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[#eef3f8] px-3 py-1 text-xs tracking-[0.16em] text-black/85 uppercase">
                                {product.category}
                              </span>
                              <span
                                className={
                                  product.isActive
                                    ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                                    : "rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                                }
                              >
                                {product.isActive ? "Ativo" : "Inativo"}
                              </span>
                            </div>

                            <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-4">
                              <h3 className="truncate text-lg font-semibold text-black">
                                {product.title}
                              </h3>
                              <span className="text-sm font-medium text-black/75">
                                {formatCurrencyFromCents(product.priceInCents)}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-black/75">
                              <a
                                href={product.mercadoLivreUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
                              >
                                <ExternalLink className="size-4" />
                                Abrir anuncio
                              </a>
                              <span className="text-black/65">
                                Slug: {product.slug}
                              </span>
                            </div>
                          </div>

                          <form
                            action={toggleProductStatusAction}
                            className="shrink-0"
                          >
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                            <input
                              type="hidden"
                              name="nextStatus"
                              value={String(!product.isActive)}
                            />
                            <Button
                              type="submit"
                              variant="outline"
                              size="lg"
                              className="w-full rounded-full border-primary/15 bg-white text-black hover:text-black lg:w-auto"
                            >
                              {product.isActive ? (
                                <>
                                  <EyeOff className="size-4" />
                                  Desativar
                                </>
                              ) : (
                                <>
                                  <Eye className="size-4" />
                                  Ativar
                                </>
                              )}
                            </Button>
                          </form>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-primary/12 bg-[#f5f8fc] px-4 py-4 shadow-[0_12px_30px_-24px_rgba(36,54,77,0.28)]">
      <p className="text-xs tracking-[0.18em] text-black/70 uppercase">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-black">{value}</p>
      <p className="mt-1 text-sm text-black/80">{description}</p>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-black">{label}</label>
        {hint ? <p className="text-xs text-black/65">{hint}</p> : null}
      </div>
      {children}
    </div>
  )
}
