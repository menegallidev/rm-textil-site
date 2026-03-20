import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Cormorant_Garamond, Manrope } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "RM Têxtil | Mesa posta simples, moderna e elegante",
    template: "%s | RM Têxtil",
  },
  description:
    "Frontend da RM Têxtil com vitrine premium para jogos americanos, sousplats, guardanapos e trilhos, criado para alta legibilidade, SEO e excelente UI/UX.",
  keywords: [
    "RM Têxtil",
    "mesa posta",
    "jogo americano",
    "sousplat",
    "guardanapo",
    "trilho de mesa",
  ],
  openGraph: {
    title: "RM Têxtil | Mesa posta simples, moderna e elegante",
    description:
      "Catalogo frontend premium para uma marca de mesa posta com identidade navy, elegante e preparada para evoluir dentro de um monorepo.",
    type: "website",
    locale: "pt_BR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontSans.variable,
        fontHeading.variable,
        "font-sans"
      )}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
