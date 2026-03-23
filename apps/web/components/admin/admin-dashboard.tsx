import type { ReactNode } from "react"

import {
  ExternalLink,
  Eye,
  EyeOff,
  Layers3,
  LogOut,
  PackagePlus,
} from "lucide-react"

import type { AdminCategory, ProductWithMedia } from "@workspace/db"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Textarea } from "@workspace/ui/components/textarea"

import { StatusBanner } from "@/components/admin/status-banner"
import { BrandMark } from "@/components/layout/brand-mark"
import { Container } from "@/components/layout/container"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { formatCurrencyFromCents } from "@/lib/catalog"

const adminControlClassName =
  "h-12 rounded-2xl border-primary/18 bg-[#fcfcfd] text-black placeholder:text-black/45 shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)]"

const adminTextareaClassName =
  "min-h-32 rounded-2xl border-primary/18 bg-[#fcfcfd] text-black placeholder:text-black/45 shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)]"

const adminFileInputClassName =
  "min-h-16 rounded-2xl border-primary/18 bg-[#fcfcfd] px-4 py-3 text-black shadow-[0_1px_0_rgba(255,255,255,0.95),0_14px_32px_-24px_rgba(36,54,77,0.3)] file:mr-4 file:h-9 file:rounded-full file:border-0 file:bg-primary file:px-4 file:text-sm file:font-medium file:text-primary-foreground"

const adminFormPanelClassName =
  "rounded-[1.6rem] border border-primary/10 bg-[#fbfcfd] p-5 shadow-[0_18px_50px_-40px_rgba(36,54,77,0.32)] sm:p-6"

const adminTableShellClassName =
  "overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[#fbfcfd]"

export function AdminDashboard({
  adminEmail,
  categories,
  products,
  createCategoryAction,
  createProductAction,
  toggleCategoryStatusAction,
  toggleProductStatusAction,
  logoutAction,
  message,
  error,
}: {
  adminEmail: string
  categories: AdminCategory[]
  products: ProductWithMedia[]
  createCategoryAction: (formData: FormData) => Promise<void>
  createProductAction: (formData: FormData) => Promise<void>
  toggleCategoryStatusAction: (formData: FormData) => Promise<void>
  toggleProductStatusAction: (formData: FormData) => Promise<void>
  logoutAction: () => Promise<void>
  message?: string
  error?: string
}) {
  const activeProducts = products.filter((product) => product.isActive).length
  const activeCategories = categories.filter((category) => category.isActive)
  const inactiveCategories = categories.length - activeCategories.length
  const defaultRegistrationTab =
    activeCategories.length === 0 ? "category" : "product"

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
                  Gerencie o catalogo da vitrine
                </h1>
                <p className="max-w-3xl text-base leading-7 text-black/85">
                  Cadastre categorias, vincule produtos apenas a categorias
                  ativas e controle a exibicao publica sem editar o frontend.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ModeToggle className="rounded-full border-primary/15 bg-background sm:self-start" />
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

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Produtos cadastrados"
              value={String(products.length)}
              description="Base total do catalogo"
            />
            <SummaryCard
              label="Produtos ativos"
              value={String(activeProducts)}
              description="Itens visiveis no site"
            />
            <SummaryCard
              label="Categorias ativas"
              value={String(activeCategories.length)}
              description="Disponiveis no seletor"
            />
            <SummaryCard
              label="Categorias inativas"
              value={String(inactiveCategories)}
              description="Ocultas do filtro publico"
            />
          </div>
        </div>

        <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_70px_-44px_rgba(36,54,77,0.32)]">
          <CardHeader className="px-6 pt-6 pb-0 sm:px-8 sm:pt-8">
            <CardTitle className="text-2xl text-black">Cadastros</CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-6 text-black/75">
              Use o menu abaixo para alternar entre o cadastro de categorias e o
              cadastro de produtos. Os formularios ficam no topo e as listagens
              completas aparecem logo abaixo em formato de tabela.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
            <Tabs defaultValue={defaultRegistrationTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <TabsTrigger value="category">
                  <Layers3 className="size-4" />
                  Cadastro de categoria
                </TabsTrigger>
                <TabsTrigger value="product">
                  <PackagePlus className="size-4" />
                  Cadastro de produto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="category" className="mt-5">
                <div className={adminFormPanelClassName}>
                  <FormPanelHeader
                    icon={<Layers3 className="size-5 text-primary" />}
                    title="Cadastrar categoria"
                    description="Categorias ativas entram automaticamente no seletor do admin e no filtro do site."
                  />

                  <form
                    action={createCategoryAction}
                    className="mt-6 space-y-5"
                  >
                    <Field label="Nome da categoria" htmlFor="category-name">
                      <Input
                        id="category-name"
                        name="name"
                        placeholder="Ex.: Jogo Americano"
                        className={adminControlClassName}
                        required
                      />
                    </Field>

                    <CheckboxField
                      id="category-is-active"
                      name="isActive"
                      label="Cadastrar categoria como ativa"
                      description="Ela ja aparecera como opcao disponivel para os produtos."
                      defaultChecked
                    />

                    <Button type="submit" size="lg" className="rounded-full">
                      Salvar categoria
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="product" className="mt-5">
                <div className={adminFormPanelClassName}>
                  <FormPanelHeader
                    icon={<PackagePlus className="size-5 text-primary" />}
                    title="Cadastrar produto"
                    description="Produtos novos so podem ser vinculados a categorias ativas e saem prontos para entrar na vitrine."
                  />

                  <form action={createProductAction} className="mt-6 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Titulo do produto" htmlFor="product-title">
                        <Input
                          id="product-title"
                          name="title"
                          placeholder="Ex.: Jogo Americano Duna Azul"
                          className={adminControlClassName}
                          required
                        />
                      </Field>

                      <Field label="Categoria" htmlFor="product-category">
                        <Select
                          name="categoryId"
                          disabled={activeCategories.length === 0}
                          required
                        >
                          <SelectTrigger
                            id="product-category"
                            className={adminControlClassName}
                          >
                            <SelectValue
                              placeholder={
                                activeCategories.length > 0
                                  ? "Selecione uma categoria ativa"
                                  : "Cadastre uma categoria ativa primeiro"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {activeCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    {activeCategories.length === 0 ? (
                      <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        Crie e ative pelo menos uma categoria antes de cadastrar
                        produtos.
                      </p>
                    ) : null}

                    <Field
                      label="Descricao do produto"
                      htmlFor="product-description"
                    >
                      <Textarea
                        id="product-description"
                        name="description"
                        rows={5}
                        placeholder="Descreva o produto, acabamentos, estilo e diferenciais."
                        className={adminTextareaClassName}
                        required
                      />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Preco (R$)" htmlFor="product-price">
                        <Input
                          id="product-price"
                          name="price"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                          placeholder="89.90"
                          className={adminControlClassName}
                          required
                        />
                      </Field>

                      <Field
                        label="Link do Mercado Livre"
                        htmlFor="product-mercado-livre"
                      >
                        <Input
                          id="product-mercado-livre"
                          name="mercadoLivreUrl"
                          type="url"
                          placeholder="https://..."
                          className={adminControlClassName}
                          required
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field
                        label="Arquivos de imagem"
                        htmlFor="product-images"
                        hint="Selecione uma ou mais imagens do produto."
                      >
                        <Input
                          id="product-images"
                          name="images"
                          type="file"
                          accept="image/*"
                          multiple
                          className={adminFileInputClassName}
                        />
                      </Field>

                      <Field
                        label="Arquivos de video"
                        htmlFor="product-videos"
                        hint="Envie videos do produto em formatos como MP4, MOV ou WEBM."
                      >
                        <Input
                          id="product-videos"
                          name="videos"
                          type="file"
                          accept="video/*"
                          multiple
                          className={adminFileInputClassName}
                        />
                      </Field>
                    </div>

                    <CheckboxField
                      id="product-is-active"
                      name="isActive"
                      label="Cadastrar produto como ativo"
                      description="Produtos ativos em categorias ativas aparecem automaticamente no site."
                      defaultChecked
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full"
                      disabled={activeCategories.length === 0}
                    >
                      Salvar produto
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_70px_-44px_rgba(36,54,77,0.32)]">
            <CardHeader className="px-6 pt-6 pb-0 sm:px-8 sm:pt-8">
              <CardTitle className="text-xl text-black">
                Categorias cadastradas
              </CardTitle>
              <CardDescription className="text-sm text-black/75">
                Listagem em tabela com status, slug e quantidade de produtos
                vinculados.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              {categories.length === 0 ? (
                <EmptyState
                  title="Nenhuma categoria cadastrada ainda."
                  description="Crie a primeira categoria para liberar o cadastro de produtos."
                />
              ) : (
                <div className={adminTableShellClassName}>
                  <Table className="min-w-[640px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Produtos</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acao</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-black">
                                {category.name}
                              </p>
                              <p className="text-xs text-black/60">
                                ID: {category.id}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-black/75">
                            {category.slug}
                          </TableCell>
                          <TableCell className="text-black/75">
                            {category._count.products}
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              active={category.isActive}
                              activeLabel="Ativa"
                              inactiveLabel="Inativa"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <form action={toggleCategoryStatusAction}>
                              <input
                                type="hidden"
                                name="categoryId"
                                value={category.id}
                              />
                              <input
                                type="hidden"
                                name="nextStatus"
                                value={String(!category.isActive)}
                              />
                              <Button
                                type="submit"
                                variant="outline"
                                size="sm"
                                className="rounded-full border-primary/15 bg-white text-black hover:text-black"
                              >
                                {category.isActive ? (
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-primary/10 bg-white px-0 py-0 shadow-[0_24px_70px_-44px_rgba(36,54,77,0.32)]">
            <CardHeader className="px-6 pt-6 pb-0 sm:px-8 sm:pt-8">
              <CardTitle className="text-xl text-black">
                Produtos cadastrados
              </CardTitle>
              <CardDescription className="text-sm text-black/75">
                Listagem em tabela com categoria, preco, link do anuncio e
                controle de ativacao.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
              {products.length === 0 ? (
                <EmptyState
                  title="Nenhum produto cadastrado ainda."
                  description="Assim que voce salvar um item, ele aparecera aqui com o botao para ativar ou desativar."
                />
              ) : (
                <div className={adminTableShellClassName}>
                  <Table className="min-w-[860px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Preco</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Mercado Livre</TableHead>
                        <TableHead className="text-right">Acao</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="max-w-[24rem]">
                            <div className="space-y-1">
                              <p className="truncate font-medium text-black">
                                {product.title}
                              </p>
                              <p className="line-clamp-2 text-xs leading-5 text-black/65">
                                {product.description}
                              </p>
                              <p className="text-xs text-black/55">
                                Slug: {product.slug}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge
                                variant="outline"
                                className="border-primary/10 bg-[#eef3f8] text-black"
                              >
                                {product.category}
                              </Badge>
                              {product.categoryRecord &&
                              !product.categoryRecord.isActive ? (
                                <p className="text-xs text-amber-700">
                                  Categoria vinculada esta inativa.
                                </p>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-black">
                            {formatCurrencyFromCents(product.priceInCents)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              active={product.isActive}
                              activeLabel="Ativo"
                              inactiveLabel="Inativo"
                            />
                          </TableCell>
                          <TableCell>
                            <a
                              href={product.mercadoLivreUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-black underline-offset-4 hover:underline"
                            >
                              <ExternalLink className="size-4" />
                              Abrir anuncio
                            </a>
                          </TableCell>
                          <TableCell className="text-right">
                            <form action={toggleProductStatusAction}>
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
                                size="sm"
                                className="rounded-full border-primary/15 bg-white text-black hover:text-black"
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
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

function FormPanelHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef3f8]">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <p className="max-w-3xl text-sm leading-6 text-black/75">
          {description}
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={htmlFor} className="text-sm font-semibold text-black">
          {label}
        </Label>
        {hint ? <p className="text-xs text-black/65">{hint}</p> : null}
      </div>
      {children}
    </div>
  )
}

function CheckboxField({
  id,
  name,
  label,
  description,
  defaultChecked = false,
}: {
  id: string
  name: string
  label: string
  description: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-primary/12 bg-[#f5f8fc] px-4 py-4 shadow-[0_12px_30px_-24px_rgba(36,54,77,0.28)]">
      <Checkbox
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 border-primary/25 data-[state=checked]:bg-primary"
      />
      <div className="space-y-1">
        <Label htmlFor={id} className="text-sm font-medium text-black">
          {label}
        </Label>
        <p className="text-xs leading-5 text-black/65">{description}</p>
      </div>
    </div>
  )
}

function StatusBadge({
  active,
  activeLabel,
  inactiveLabel,
}: {
  active: boolean
  activeLabel: string
  inactiveLabel: string
}) {
  return (
    <Badge
      variant="secondary"
      className={
        active
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-100"
      }
    >
      {active ? activeLabel : inactiveLabel}
    </Badge>
  )
}

function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-dashed border-primary/20 bg-[#f9fbfd] px-5 py-6 text-sm text-black/80 shadow-[0_14px_32px_-28px_rgba(36,54,77,0.3)]">
      <p className="font-medium text-black">{title}</p>
      <p className="mt-1 text-black/70">{description}</p>
    </div>
  )
}
