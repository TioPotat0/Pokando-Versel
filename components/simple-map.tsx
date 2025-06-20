"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/lib/events-data"

interface SimpleMapProps {
  events: Event[]
  height?: string
}

export function SimpleMap({ events, height = "400px" }: SimpleMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <div
      className="relative bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 rounded-lg overflow-hidden border"
      style={{ height }}
    >
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Center Info */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
          <p className="text-slate-700 font-medium">Mapa Interativo de Eventos</p>
          <p className="text-sm text-slate-600">São Paulo e Região</p>
          <Link href="/map">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Abrir Mapa Completo</Button>
          </Link>
        </div>
      </div>

      {/* Event Markers */}
      {events.slice(0, 6).map((event, index) => {
        const positions = [
          { left: "20%", top: "25%" },
          { left: "70%", top: "30%" },
          { left: "45%", top: "60%" },
          { left: "25%", top: "70%" },
          { left: "75%", top: "65%" },
          { left: "60%", top: "20%" },
        ]

        const colors = {
          Música: "bg-blue-500",
          Arte: "bg-purple-500",
          Educação: "bg-green-500",
          Tecnologia: "bg-orange-500",
          Gastronomia: "bg-red-500",
          Cultura: "bg-indigo-500",
        }

        return (
          <button
            key={event.id}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 z-10 ${
              colors[event.category as keyof typeof colors] || "bg-gray-500"
            }`}
            style={positions[index]}
            onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
            title={event.title}
          >
            <span className="sr-only">{event.title}</span>
          </button>
        )
      })}

      {/* Event Details Popup */}
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-sm mx-auto shadow-lg z-20">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {selectedEvent.category}
              </Badge>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            <h3 className="font-semibold text-slate-800 mb-2">{selectedEvent.title}</h3>

            <div className="space-y-1 text-sm text-slate-600 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(selectedEvent.date).toLocaleDateString("pt-BR")} às {selectedEvent.time}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{selectedEvent.location}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span>{selectedEvent.participants} participantes</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{selectedEvent.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">{selectedEvent.price}</span>
              <Link href={`/events/${selectedEvent.id}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
