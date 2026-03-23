import { MessageCircleMore } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import { whatsappContact } from "@/lib/home-data"

export function FloatingContact() {
  return (
    <Button
      asChild
      size="lg"
      className="fixed right-4 bottom-4 z-40 h-12 rounded-full bg-[#1f9d62] px-4 text-white shadow-[0_24px_50px_-24px_rgba(31,157,98,0.9)] hover:bg-[#188252] sm:right-6 sm:bottom-6"
    >
      <a
        href={whatsappContact.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Falar com a RM Textil no WhatsApp pelo numero ${whatsappContact.displayNumber}`}
      >
        <MessageCircleMore className="size-4" />
        WhatsApp
      </a>
    </Button>
  )
}
