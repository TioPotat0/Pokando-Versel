"use client"

import { useState } from "react"
import { InteractiveMap } from "./interactive-map"
import type { Event } from "@/lib/events-data"

interface EventMapProps {
  events: Event[]
  height?: string
  selectedCategory?: string
}

export function EventMap({ events, height = "400px", selectedCategory }: EventMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <div className="relative" style={{ height: height }}>
      <InteractiveMap
        height={height}
        showControls={true}
        selectedCategory={selectedCategory}
        onEventSelect={(event) => {
          console.log("Evento selecionado:", event.title)
          setSelectedEvent(event)
        }}
      />
    </div>
  )
}
