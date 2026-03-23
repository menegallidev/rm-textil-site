"use client"

import { useEffect, useState } from "react"
import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"

export function ModeToggle({
  className,
  showLabel = false,
}: {
  className?: string
  showLabel?: boolean
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="outline"
      size={showLabel ? "lg" : "icon-lg"}
      className={className}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
      {showLabel ? <span>{isDark ? "Modo claro" : "Modo escuro"}</span> : null}
      <span className="sr-only">
        {isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      </span>
    </Button>
  )
}
