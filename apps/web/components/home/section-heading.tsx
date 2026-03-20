import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <Badge
        variant="outline"
        className="h-8 rounded-full border-black/8 bg-[#eef3f8] px-3 text-[0.7rem] tracking-[0.2em] text-black uppercase"
      >
        {eyebrow}
      </Badge>
      <div className="space-y-3">
        <h2 className="font-heading text-4xl leading-[0.96] font-semibold text-black sm:text-[3.3rem]">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-black/85 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
