import type { CSSProperties } from "react"

import { cn } from "@workspace/ui/lib/utils"

import type { ProductSceneVariant, ScenePalette } from "@/lib/home-data"

interface ProductSceneProps {
  palette: ScenePalette
  variant: ProductSceneVariant
  className?: string
  featured?: boolean
}

const textileShapeClasses: Record<ProductSceneVariant, string> = {
  round:
    "left-1/2 top-[54%] h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full",
  rectangle:
    "left-1/2 top-[54%] h-[58%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem]",
  runner:
    "left-1/2 top-[56%] h-[44%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] rotate-[-8deg]",
  layered:
    "left-1/2 top-[52%] h-[60%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem]",
  oval: "left-1/2 top-[54%] h-[56%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[100%]",
}

const accentShapeClasses: Record<ProductSceneVariant, string> = {
  round:
    "left-[14%] bottom-[16%] h-[24%] w-[24%] rounded-[1.5rem] rotate-[-8deg]",
  rectangle:
    "right-[10%] top-[18%] h-[18%] w-[26%] rounded-[1.5rem] rotate-[8deg]",
  runner:
    "left-[12%] top-[18%] h-[20%] w-[24%] rounded-[1.3rem] rotate-[-12deg]",
  layered:
    "right-[11%] bottom-[14%] h-[24%] w-[28%] rounded-[1.6rem] rotate-[10deg]",
  oval: "left-[18%] bottom-[14%] h-[18%] w-[28%] rounded-[999px] rotate-[-6deg]",
}

const plateClasses: Record<ProductSceneVariant, string> = {
  round:
    "left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full",
  rectangle:
    "left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full",
  runner:
    "left-[56%] top-[49%] h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full",
  layered:
    "left-[47%] top-[48%] h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full",
  oval: "left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full",
}

const innerPlateClasses: Record<ProductSceneVariant, string> = {
  round: "h-[62%] w-[62%]",
  rectangle: "h-[60%] w-[60%]",
  runner: "h-[60%] w-[60%]",
  layered: "h-[60%] w-[60%]",
  oval: "h-[58%] w-[58%]",
}

const napkinClasses: Record<ProductSceneVariant, string> = {
  round:
    "right-[17%] top-[20%] h-[18%] w-[18%] rounded-[1.25rem] rotate-[18deg]",
  rectangle:
    "left-[15%] bottom-[18%] h-[18%] w-[18%] rounded-[1.2rem] rotate-[-10deg]",
  runner:
    "right-[13%] bottom-[18%] h-[20%] w-[20%] rounded-[1.1rem] rotate-[14deg]",
  layered:
    "left-[12%] top-[18%] h-[18%] w-[18%] rounded-[1.2rem] rotate-[-12deg]",
  oval: "right-[14%] top-[22%] h-[16%] w-[20%] rounded-[999px] rotate-[8deg]",
}

export function ProductScene({
  palette,
  variant,
  className,
  featured = false,
}: ProductSceneProps) {
  const rootStyle = {
    backgroundColor: palette.surface,
  } satisfies CSSProperties

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_25px_80px_-45px_rgba(36,54,77,0.65)]",
        featured ? "aspect-[16/11]" : "aspect-[4/4.5]",
        className
      )}
      style={rootStyle}
    >
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.1)_52%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(36,54,77,0.03)_0px,rgba(36,54,77,0.03)_2px,transparent_2px,transparent_12px)]" />
      <div
        className={cn(
          "absolute shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_28px_60px_-34px_rgba(36,54,77,0.9)]",
          textileShapeClasses[variant]
        )}
        style={{ backgroundColor: palette.textile }}
      />
      <div
        className={cn(
          "absolute shadow-[0_20px_40px_-28px_rgba(36,54,77,0.6)]",
          accentShapeClasses[variant]
        )}
        style={{ backgroundColor: palette.accent }}
      />
      <div
        className={cn(
          "absolute shadow-[inset_0_0_0_1px_rgba(36,54,77,0.08),0_14px_32px_-24px_rgba(36,54,77,0.5)]",
          napkinClasses[variant]
        )}
        style={{ backgroundColor: palette.accent }}
      />
      <div
        className={cn(
          "absolute flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(36,54,77,0.08),0_18px_38px_-26px_rgba(36,54,77,0.5)]",
          plateClasses[variant]
        )}
        style={{ backgroundColor: palette.plate }}
      >
        <div
          className={cn("rounded-full border-2", innerPlateClasses[variant])}
          style={{ borderColor: palette.plateInner }}
        />
      </div>
      <div
        className="absolute top-[26%] right-[16%] h-[34%] w-[0.35rem] rounded-full"
        style={{ backgroundColor: palette.metal }}
      />
      <div
        className="absolute top-[29%] right-[13%] h-[28%] w-[0.15rem] rounded-full"
        style={{ backgroundColor: palette.metal }}
      />
      <div className="absolute top-[18%] left-[12%] h-[26%] w-[10%] rounded-full bg-white/50 blur-2xl" />
      <div
        className="absolute -right-3 -bottom-7 h-24 w-24 rounded-full blur-3xl"
        style={{ backgroundColor: palette.foliage, opacity: 0.28 }}
      />
      <div
        className="absolute -top-6 left-[14%] h-16 w-16 rounded-full blur-3xl"
        style={{ backgroundColor: palette.plateInner, opacity: 0.18 }}
      />
    </div>
  )
}
