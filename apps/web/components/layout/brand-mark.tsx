import { cn } from "@workspace/ui/lib/utils"

interface BrandMarkProps {
  className?: string
  light?: boolean
  compact?: boolean
}

export function BrandMark({
  className,
  light = false,
  compact = false,
}: BrandMarkProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-heading text-3xl leading-none font-semibold tracking-[0.08em]",
          light ? "text-white" : "text-black"
        )}
      >
        RM Têxtil
      </span>
      {!compact && (
        <span
          className={cn(
            "mt-1 text-[0.68rem] tracking-[0.34em] uppercase",
            light ? "text-white/70" : "text-black/60"
          )}
        >
          mesa posta contemporanea
        </span>
      )}
    </div>
  )
}
