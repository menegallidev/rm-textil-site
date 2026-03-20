import { randomUUID } from "node:crypto"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, extname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { ProductMediaType, slugify } from "@workspace/db"

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
])
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v", ".ogg"])

const IMAGE_MAX_FILE_SIZE = 10 * 1024 * 1024
const VIDEO_MAX_FILE_SIZE = 50 * 1024 * 1024

const currentModuleDirectory = dirname(fileURLToPath(import.meta.url))
const uploadsRootDirectory = resolve(
  currentModuleDirectory,
  "../../public/uploads/products"
)

export interface StoredProductMedia {
  type: ProductMediaType
  position: number
  url: string
}

function getMediaDirectory(productSlug: string) {
  return resolve(uploadsRootDirectory, productSlug)
}

function getFileExtension(file: File) {
  return extname(file.name).toLowerCase()
}

function isAcceptedFileType(file: File, mediaType: ProductMediaType) {
  const extension = getFileExtension(file)
  const mimeType = file.type.toLowerCase()

  if (mediaType === ProductMediaType.IMAGE) {
    return mimeType.startsWith("image/") || IMAGE_EXTENSIONS.has(extension)
  }

  return mimeType.startsWith("video/") || VIDEO_EXTENSIONS.has(extension)
}

function assertAcceptedFile(file: File, mediaType: ProductMediaType) {
  if (!isAcceptedFileType(file, mediaType)) {
    throw new Error(
      mediaType === ProductMediaType.IMAGE
        ? "Envie apenas arquivos de imagem validos."
        : "Envie apenas arquivos de video validos."
    )
  }

  const maxFileSize =
    mediaType === ProductMediaType.IMAGE
      ? IMAGE_MAX_FILE_SIZE
      : VIDEO_MAX_FILE_SIZE

  if (file.size > maxFileSize) {
    throw new Error(
      mediaType === ProductMediaType.IMAGE
        ? "Cada imagem pode ter no maximo 10 MB."
        : "Cada video pode ter no maximo 50 MB."
    )
  }
}

function getSafeFileName(file: File, mediaType: ProductMediaType, index: number) {
  const fileExtension = getFileExtension(file)
  const fallbackExtension =
    mediaType === ProductMediaType.IMAGE ? ".jpg" : ".mp4"
  const finalExtension = fileExtension || fallbackExtension
  const originalName = file.name.replace(/\.[^.]+$/, "")
  const baseName =
    slugify(originalName) ||
    (mediaType === ProductMediaType.IMAGE ? "imagem" : "video")

  return `${String(index + 1).padStart(2, "0")}-${baseName}-${randomUUID().slice(0, 8)}${finalExtension}`
}

async function storeFile(
  productSlug: string,
  file: File,
  mediaType: ProductMediaType,
  index: number,
  position: number
) {
  const categoryDirectory =
    mediaType === ProductMediaType.IMAGE ? "images" : "videos"
  const targetDirectory = resolve(
    getMediaDirectory(productSlug),
    categoryDirectory
  )

  await mkdir(targetDirectory, { recursive: true })

  const fileName = getSafeFileName(file, mediaType, index)
  const fileBuffer = Buffer.from(await file.arrayBuffer())
  const targetPath = resolve(targetDirectory, fileName)

  await writeFile(targetPath, fileBuffer)

  return {
    type: mediaType,
    position,
    url: `/uploads/products/${productSlug}/${categoryDirectory}/${fileName}`,
  }
}

export async function saveProductMediaFiles({
  productSlug,
  imageFiles,
  videoFiles,
}: {
  productSlug: string
  imageFiles: File[]
  videoFiles: File[]
}): Promise<StoredProductMedia[]> {
  imageFiles.forEach((file) => assertAcceptedFile(file, ProductMediaType.IMAGE))
  videoFiles.forEach((file) => assertAcceptedFile(file, ProductMediaType.VIDEO))

  if (imageFiles.length === 0 && videoFiles.length === 0) {
    return []
  }

  try {
    const storedImages = await Promise.all(
      imageFiles.map((file, index) =>
        storeFile(productSlug, file, ProductMediaType.IMAGE, index, index)
      )
    )

    const storedVideos = await Promise.all(
      videoFiles.map((file, index) =>
        storeFile(
          productSlug,
          file,
          ProductMediaType.VIDEO,
          index,
          storedImages.length + index
        )
      )
    )

    return [...storedImages, ...storedVideos]
  } catch (error) {
    await removeProductUploadDirectory(productSlug)
    throw error
  }
}

export async function removeProductUploadDirectory(productSlug: string) {
  await rm(getMediaDirectory(productSlug), {
    recursive: true,
    force: true,
  })
}
