import { cn } from "@workspace/ui/lib/utils"

interface StatusBannerProps {
  message?: string
  error?: string
}

export function StatusBanner({ message, error }: StatusBannerProps) {
  if (!message && !error) {
    return null
  }

  const isError = Boolean(error)
  const content = error ?? message

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm font-medium",
        isError
          ? "border-red-200 bg-red-50 text-red-950"
          : "border-emerald-200 bg-emerald-50 text-emerald-950"
      )}
    >
      {content}
    </div>
  )
}
