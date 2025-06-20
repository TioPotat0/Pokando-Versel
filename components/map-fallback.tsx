"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import type { Event } from "@/lib/events-data"

interface MapFallbackProps {
  events: Event[]
  height?: string
}

export function MapFallback({ events, height = "400px" }: MapFallbackProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return (
    <div
      className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden"
      style={{ height }}
    >
      {/* Map Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600 font-medium">Mapa Interativo</p>
          <p className="text-sm text-slate-500">Carregando localização dos eventos...</p>
        </div>
      </div>

      {/* Event Markers Simulation */}
      {events.slice(0, 4).map((event, index) => (
        <button
          key={event.id}
          className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 ${
            event.category === "Música"
              ? "bg-blue-500"
              : event.category === "Educação"
                ? "bg-purple-500"
                : event.category === "Gastronomia"
                  ? "bg-green-500"
                  : "bg-orange-500"
          }`}
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + (index % 2) * 20}%`,
          }}
          onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
        >
          <span className="sr-only">{event.title}</span>
        </button>
      ))}

      {/* Event Details Popup */}
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-sm mx-auto shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {selectedEvent.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {selectedEvent.status}
              </Badge>
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
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  // Implementação simples para o fallback
  return [initialValue, () => {}]
}
