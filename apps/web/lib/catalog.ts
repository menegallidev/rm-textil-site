import { ProductMediaType } from "@workspace/db"
import type { ProductWithMedia } from "@workspace/db"

import type { ProductSceneVariant, ScenePalette } from "@/lib/home-data"

const fallbackScenes: Array<{
  palette: ScenePalette
  variant: ProductSceneVariant
}> = [
  {
    variant: "round",
    palette: {
      surface: "#EEF2F7",
      textile: "#35506E",
      accent: "#6E87A3",
      plate: "#FBF7EF",
      plateInner: "#CDAA82",
      metal: "#1F3148",
      foliage: "#7C9172",
    },
  },
  {
    variant: "rectangle",
    palette: {
      surface: "#F6F1E8",
      textile: "#DCC7A8",
      accent: "#EFE2D0",
      plate: "#FCF8F0",
      plateInner: "#CBAA84",
      metal: "#7A6651",
      foliage: "#9AA88E",
    },
  },
  {
    variant: "oval",
    palette: {
      surface: "#F3F6EF",
      textile: "#AAB79B",
      accent: "#DDE6D8",
      plate: "#FBF8F1",
      plateInner: "#CAA985",
      metal: "#617056",
      foliage: "#86A07E",
    },
  },
  {
    variant: "layered",
    palette: {
      surface: "#FCF5F2",
      textile: "#EACFCB",
      accent: "#F5E5DF",
      plate: "#FEFBF8",
      plateInner: "#D9B2A1",
      metal: "#866A67",
      foliage: "#B5C4A5",
    },
  },
  {
    variant: "runner",
    palette: {
      surface: "#EFF5F8",
      textile: "#B7C8D8",
      accent: "#DAE5EE",
      plate: "#FAF7F0",
      plateInner: "#CDB196",
      metal: "#536879",
      foliage: "#8A9C81",
    },
  },
]

export function formatCurrencyFromCents(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function getProductImageUrls(product: ProductWithMedia) {
  return product.media
    .filter(
      (item: ProductWithMedia["media"][number]) =>
        item.type === ProductMediaType.IMAGE
    )
    .map((item: ProductWithMedia["media"][number]) => item.url)
}

export function getProductVideoUrls(product: ProductWithMedia) {
  return product.media
    .filter(
      (item: ProductWithMedia["media"][number]) =>
        item.type === ProductMediaType.VIDEO
    )
    .map((item: ProductWithMedia["media"][number]) => item.url)
}

export function getProductPrimaryImage(product: ProductWithMedia) {
  return getProductImageUrls(product)[0] ?? null
}

export function getFallbackScene(index: number) {
  const fallbackScene =
    fallbackScenes[index % fallbackScenes.length] ?? fallbackScenes[0]!

  return fallbackScene
}
