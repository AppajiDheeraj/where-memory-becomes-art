"use client"

import { useState, useEffect } from "react"
import { MicIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer"

// Your existing chat page component imported here
import VoiceChatView from "@/modules/ai-agent/ui/views/voice-chat-view"


export function VoiceAgentWidget() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Floating button
  const FloatingButton = (
    <Button
      size="icon"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-lg bg-primary text-white"
    >
      <MicIcon className="h-6 w-6" />
    </Button>
  )

  if (isMobile) {
    // Mobile → Drawer
    return (
  <Drawer>
    <DrawerTrigger asChild>{FloatingButton}</DrawerTrigger>

    <DrawerContent className="border-0 p-0">

      {/* Container */}
      <div className="mt-3 px-3 pb-6">
        <div className="h-full overflow-hidden rounded-2xl bg-background shadow-xl border">
          <VoiceChatView />
        </div>
      </div>

    </DrawerContent>
  </Drawer>
)

  }

  // Desktop → Popover
  return (
    <Popover>
      <PopoverTrigger asChild>{FloatingButton}</PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className="w-[380px] p-0 rounded-xl shadow-2xl border bg-background"
      >
        <VoiceChatView />
      </PopoverContent>
    </Popover>
  )
}
