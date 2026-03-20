"use client"

import { ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface ProductMediaCarouselItem {
  id: string
  type: "IMAGE" | "VIDEO"
  url: string
}

function getMediaLabel(item: ProductMediaCarouselItem, index: number) {
  return `${item.type === "VIDEO" ? "Video" : "Imagem"} ${index + 1}`
}

export function ProductMediaCarousel({
  productTitle,
  items,
}: {
  productTitle: string
  items: ProductMediaCarouselItem[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]

  if (!activeItem) {
    return null
  }

  function showPreviousItem() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? items.length - 1 : currentIndex - 1
    )
  }

  function showNextItem() {
    setActiveIndex((currentIndex) =>
      currentIndex === items.length - 1 ? 0 : currentIndex + 1
    )
  }

  return (
    <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border border-white/60 bg-[#eef2f7] shadow-[0_25px_80px_-45px_rgba(36,54,77,0.52)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(36,54,77,0.1))]" />

      <div className="relative h-full w-full">
        {activeItem.type === "VIDEO" ? (
          <video
            key={activeItem.id}
            src={activeItem.url}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            Seu navegador nao suporta video HTML5.
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={activeItem.id}
            src={activeItem.url}
            alt={`${productTitle} - ${getMediaLabel(activeItem, activeIndex)}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm backdrop-blur">
          {activeItem.type === "VIDEO" ? (
            <Play className="size-3.5 fill-current" />
          ) : (
            <ImageIcon className="size-3.5" />
          )}
          {getMediaLabel(activeItem, activeIndex)}
        </div>

        <div className="rounded-full border border-white/75 bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm backdrop-blur">
          {activeIndex + 1}/{items.length}
        </div>
      </div>

      {items.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={showPreviousItem}
              className="pointer-events-auto size-10 rounded-full border-white/75 bg-white/92 text-primary shadow-lg backdrop-blur hover:bg-white"
              aria-label="Ver midia anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={showNextItem}
              className="pointer-events-auto size-10 rounded-full border-white/75 bg-white/92 text-primary shadow-lg backdrop-blur hover:bg-white"
              aria-label="Ver proxima midia"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
            {items.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition",
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-white/70 bg-white/72 text-black/75 hover:bg-white/88"
                  )}
                  aria-label={`Ver ${getMediaLabel(item, index)}`}
                  aria-pressed={isActive}
                >
                  {item.type === "VIDEO" ? (
                    <Play className="size-3 fill-current" />
                  ) : (
                    <ImageIcon className="size-3.5" />
                  )}
                  {index + 1}
                </button>
              )
            })}
          </div>
        </>
      ) : null}
    </div>
  )
}
