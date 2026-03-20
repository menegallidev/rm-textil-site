"use server"

import {
  prisma,
  slugify,
  verifyPassword,
} from "@workspace/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import {
  removeProductUploadDirectory,
  saveProductMediaFiles,
} from "@/lib/admin/media-storage"
import {
  clearAdminSession,
  createAdminSession,
  requireCurrentAdmin,
} from "@/lib/admin/session"

function redirectWithStatus(
  kind: "message" | "error",
  value: string,
  pathname = "/admin"
): never {
  const params = new URLSearchParams({ [kind]: value })
  redirect(`${pathname}?${params.toString()}`)
}

function assertValidUrl(url: string, label: string) {
  try {
    new URL(url)
  } catch {
    redirectWithStatus("error", `${label} invalido.`)
  }
}

function getUploadedFiles(formData: FormData, fieldName: string) {
  return formData
    .getAll(fieldName)
    .filter((value): value is File => value instanceof File && value.size > 0)
}

async function buildUniqueSlug(title: string) {
  const baseSlug = slugify(title) || `produto-${Date.now()}`
  const existingSlugs = await prisma.product.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: { slug: true },
  })

  const taken = new Set(
    existingSlugs.map((item: { slug: string }) => item.slug)
  )

  if (!taken.has(baseSlug)) {
    return baseSlug
  }

  let counter = 2

  while (taken.has(`${baseSlug}-${counter}`)) {
    counter += 1
  }

  return `${baseSlug}-${counter}`
}

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    redirectWithStatus("error", "Preencha email e senha.")
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  })

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    redirectWithStatus("error", "Credenciais invalidas.")
  }

  await createAdminSession(admin)
  redirectWithStatus("message", "Login realizado com sucesso.")
}

export async function logoutAdminAction() {
  await clearAdminSession()
  redirectWithStatus("message", "Sessao encerrada com sucesso.")
}

export async function createProductAction(formData: FormData) {
  await requireCurrentAdmin()

  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const category = String(formData.get("category") ?? "").trim()
  const mercadoLivreUrl = String(formData.get("mercadoLivreUrl") ?? "").trim()
  const priceValue = Number(
    String(formData.get("price") ?? "")
      .replace(/\s/g, "")
      .replace(",", ".")
  )
  const isActive = formData.get("isActive") === "on"

  if (!title || !description || !category || !mercadoLivreUrl) {
    redirectWithStatus("error", "Preencha todos os campos obrigatorios.")
  }

  if (!Number.isFinite(priceValue) || priceValue <= 0) {
    redirectWithStatus("error", "Informe um preco valido.")
  }

  assertValidUrl(mercadoLivreUrl, "Link do Mercado Livre")

  const imageFiles = getUploadedFiles(formData, "images")
  const videoFiles = getUploadedFiles(formData, "videos")

  const slug = await buildUniqueSlug(title)
  let media: Awaited<ReturnType<typeof saveProductMediaFiles>>

  try {
    media = await saveProductMediaFiles({
      productSlug: slug,
      imageFiles,
      videoFiles,
    })
  } catch (error) {
    redirectWithStatus(
      "error",
      error instanceof Error
        ? error.message
        : "Nao foi possivel salvar os arquivos enviados."
    )
  }

  try {
    await prisma.product.create({
      data: {
        slug,
        title,
        description,
        category,
        mercadoLivreUrl,
        priceInCents: Math.round(priceValue * 100),
        isActive,
        media: {
          create: media.map((item) => ({
            url: item.url,
            type: item.type,
            position: item.position,
          })),
        },
      },
    })
  } catch {
    await removeProductUploadDirectory(slug)
    redirectWithStatus("error", "Nao foi possivel cadastrar o produto.")
  }

  revalidatePath("/")
  revalidatePath("/admin")
  redirectWithStatus("message", "Produto cadastrado com sucesso.")
}

export async function toggleProductStatusAction(formData: FormData) {
  await requireCurrentAdmin()

  const productId = String(formData.get("productId") ?? "")
  const nextStatus = String(formData.get("nextStatus") ?? "") === "true"

  if (!productId) {
    redirectWithStatus("error", "Produto nao encontrado.")
  }

  await prisma.product.update({
    where: { id: productId },
    data: { isActive: nextStatus },
  })

  revalidatePath("/")
  revalidatePath("/admin")
  redirectWithStatus(
    "message",
    nextStatus
      ? "Produto ativado com sucesso."
      : "Produto desativado com sucesso."
  )
}
