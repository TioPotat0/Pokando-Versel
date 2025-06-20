"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Navigation, Layers, Filter, Users, Star } from "lucide-react"
import { getEventsData, type Event } from "@/lib/events-data"
import Link from "next/link"

// Tipos para coordenadas
interface EventWithCoordinates extends Event {
  coordinates: {
    lat: number
    lng: number
  }
}

interface InteractiveMapProps {
  height?: string
  showControls?: boolean
  selectedCategory?: string
  onEventSelect?: (event: EventWithCoordinates) => void
}

export function InteractiveMap({
  height = "500px",
  showControls = true,
  selectedCategory,
  onEventSelect,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const markerClusterGroupRef = useRef<any>(null)
  const heatmapLayerRef = useRef<any>(null)

  const [mounted, setMounted] = useState(false)
  const [events, setEvents] = useState<EventWithCoordinates[]>([])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventWithCoordinates | null>(null)
  const [L, setL] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapError, setMapError] = useState(false)
  const [markersLoaded, setMarkersLoaded] = useState(false)

  // Coordenadas padrão para São Paulo
  const defaultCenter: [number, number] = [-23.5505, -46.6333]
  const defaultZoom = 12

  // Gerar coordenadas baseadas no local do evento
  const generateCoordinatesForEvent = (event: Event, index: number): { lat: number; lng: number } => {
    const baseCoords: Record<string, { lat: number; lng: number }> = {
      "Teatro Municipal": { lat: -23.5505, lng: -46.6333 },
      "Centro Cultural": { lat: -23.5489, lng: -46.6388 },
      "Praça Central": { lat: -23.5475, lng: -46.6361 },
      "Tech Hub": { lat: -23.552, lng: -46.631 },
      "Galeria de Arte Moderna": { lat: -23.5465, lng: -46.6407 },
      "Auditório da Universidade": { lat: -23.5558, lng: -46.6396 },
    }

    const baseCoord = baseCoords[event.location]
    if (baseCoord) {
      return {
        lat: baseCoord.lat + (Math.random() - 0.5) * 0.01,
        lng: baseCoord.lng + (Math.random() - 0.5) * 0.01,
      }
    }

    // Coordenadas aleatórias em São Paulo
    return {
      lat: -23.5505 + (Math.random() - 0.5) * 0.05,
      lng: -46.6333 + (Math.random() - 0.5) * 0.05,
    }
  }

  // Inicializar Leaflet e dados
  useEffect(() => {
    let isMounted = true

    const initializeMap = async () => {
      try {
        console.log("Inicializando mapa...")

        // Carregar eventos primeiro
        const eventsData = getEventsData()
        console.log("Eventos carregados:", eventsData.length)

        const eventsWithCoords: EventWithCoordinates[] = eventsData.map((event, index) => ({
          ...event,
          coordinates: generateCoordinatesForEvent(event, index),
        }))

        console.log("Eventos com coordenadas:", eventsWithCoords.length)

        if (isMounted) {
          setEvents(eventsWithCoords)
        }

        // Importar Leaflet
        const leaflet = await import("leaflet")
        const L = leaflet.default

        if (!isMounted) return

        // Importar CSS do Leaflet
        await import("leaflet/dist/leaflet.css")

        // Corrigir ícones do Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        console.log("Leaflet carregado com sucesso")
        setL(L)
        setMounted(true)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao inicializar mapa:", error)
        setMapError(true)
        setIsLoading(false)
      }
    }

    initializeMap()

    return () => {
      isMounted = false
    }
  }, [])

  // Criar mapa quando Leaflet estiver carregado
  useEffect(() => {
    if (!L || !mapRef.current || !mounted || mapInstanceRef.current || mapError) return

    console.log("Criando mapa...")

    try {
      // Criar mapa
      const map = L.map(mapRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true,
        boxZoom: true,
        keyboard: true,
        attributionControl: true,
      })

      // Adicionar tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        tileSize: 256,
        zoomOffset: 0,
      }).addTo(map)

      mapInstanceRef.current = map
      console.log("Mapa criado com sucesso")

      // Aguardar o mapa carregar completamente
      map.whenReady(() => {
        console.log("Mapa pronto")
        setTimeout(() => {
          map.invalidateSize()
          // Carregar marcadores após o mapa estar pronto
          loadMarkersDirectly(L, map)
        }, 100)
      })
    } catch (error) {
      console.error("Erro ao criar mapa:", error)
      setMapError(true)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [L, mounted])

  // Carregar marcadores diretamente (sem cluster inicialmente)
  const loadMarkersDirectly = (L: any, map: any) => {
    console.log("Carregando marcadores diretamente...")

    if (events.length === 0) {
      console.log("Nenhum evento para mostrar")
      return
    }

    // Filtrar eventos
    const filteredEvents =
      selectedCategory && selectedCategory !== "all"
        ? events.filter((event) => event.category === selectedCategory)
        : events

    console.log("Eventos filtrados:", filteredEvents.length)

    // Adicionar marcadores diretamente ao mapa primeiro
    filteredEvents.forEach((event, index) => {
      console.log(`Adicionando marcador ${index + 1}:`, event.title, event.coordinates)

      const icon = createCustomIcon(L, event.category, false)
      const marker = L.marker([event.coordinates.lat, event.coordinates.lng], { icon })

      // Criar popup
      const popupContent = createPopupContent(event)
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
        closeButton: true,
        autoClose: false,
      })

      // Event listeners
      marker.on("click", () => {
        console.log("Marcador clicado:", event.title)
        setSelectedEvent(event)
        onEventSelect?.(event)
      })

      // Adicionar diretamente ao mapa
      marker.addTo(map)
      markersRef.current.push(marker)
    })

    console.log("Marcadores adicionados:", markersRef.current.length)
    setMarkersLoaded(true)

    // Depois carregar o cluster
    setTimeout(() => {
      loadMarkerCluster(L, map)
    }, 1000)
  }

  // Carregar MarkerCluster
  const loadMarkerCluster = async (L: any, map: any) => {
    try {
      console.log("Carregando MarkerCluster...")

      await import("leaflet.markercluster")
      await import("leaflet.markercluster/dist/MarkerCluster.css")
      await import("leaflet.markercluster/dist/MarkerCluster.Default.css")

      const markerClusterGroup = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        disableClusteringAtZoom: 15,
        iconCreateFunction: (cluster: any) => {
          const count = cluster.getChildCount()
          let size = 30
          let className = "marker-cluster-small"

          if (count < 10) {
            size = 30
            className = "marker-cluster-small"
          } else if (count < 100) {
            size = 40
            className = "marker-cluster-medium"
          } else {
            size = 50
            className = "marker-cluster-large"
          }

          return L.divIcon({
            html: `<div style="
              background: linear-gradient(45deg, #3B82F6, #8B5CF6);
              color: white;
              border-radius: 50%;
              width: ${size}px;
              height: ${size}px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: ${size > 35 ? "14px" : "12px"};
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              line-height: 1;
            ">${count}</div>`,
            className: `marker-cluster ${className}`,
            iconSize: [size, size],
          })
        },
      })

      // Remover marcadores individuais e adicionar ao cluster
      markersRef.current.forEach((marker) => {
        map.removeLayer(marker)
        markerClusterGroup.addLayer(marker)
      })

      markerClusterGroupRef.current = markerClusterGroup
      map.addLayer(markerClusterGroup)

      console.log("MarkerCluster carregado com sucesso")
    } catch (error) {
      console.error("Erro ao carregar MarkerCluster:", error)
      // Se falhar, manter marcadores individuais
    }
  }

  // Atualizar marcadores quando eventos mudarem
  useEffect(() => {
    if (!L || !mapInstanceRef.current || !markersLoaded) return

    console.log("Atualizando marcadores...")

    // Limpar marcadores existentes
    markersRef.current.forEach((marker) => {
      if (markerClusterGroupRef.current) {
        markerClusterGroupRef.current.removeLayer(marker)
      } else {
        mapInstanceRef.current.removeLayer(marker)
      }
    })
    markersRef.current = []

    // Filtrar eventos
    const filteredEvents =
      selectedCategory && selectedCategory !== "all"
        ? events.filter((event) => event.category === selectedCategory)
        : events

    console.log("Eventos para atualizar:", filteredEvents.length)

    // Adicionar novos marcadores
    filteredEvents.forEach((event) => {
      const icon = createCustomIcon(L, event.category, selectedEvent?.id === event.id)
      const marker = L.marker([event.coordinates.lat, event.coordinates.lng], { icon })

      // Criar popup
      const popupContent = createPopupContent(event)
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
        closeButton: true,
        autoClose: false,
      })

      // Event listeners
      marker.on("click", () => {
        setSelectedEvent(event)
        onEventSelect?.(event)
      })

      if (markerClusterGroupRef.current) {
        markerClusterGroupRef.current.addLayer(marker)
      } else {
        marker.addTo(mapInstanceRef.current)
      }

      markersRef.current.push(marker)
    })

    console.log("Marcadores atualizados:", markersRef.current.length)
  }, [L, events, selectedCategory, selectedEvent, markersLoaded])

  // Gerenciar heatmap
  useEffect(() => {
    if (!L || !mapInstanceRef.current || events.length === 0) return

    if (showHeatmap && !heatmapLayerRef.current) {
      loadHeatmap(L)
    } else if (!showHeatmap && heatmapLayerRef.current) {
      mapInstanceRef.current.removeLayer(heatmapLayerRef.current)
      heatmapLayerRef.current = null
    }
  }, [L, showHeatmap, events])

  // Carregar heatmap
  const loadHeatmap = async (L: any) => {
    try {
      console.log("Carregando heatmap...")
      await import("leaflet.heat")

      const heatmapData = events.map((event) => [
        event.coordinates.lat,
        event.coordinates.lng,
        Math.max(event.participants / 100, 0.2), // Intensidade baseada em participantes
      ])

      console.log("Dados do heatmap:", heatmapData.length)

      const heatmapLayer = (L as any).heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        max: 1.0,
        gradient: {
          0.0: "blue",
          0.3: "cyan",
          0.5: "lime",
          0.7: "yellow",
          1.0: "red",
        },
      })

      heatmapLayer.addTo(mapInstanceRef.current)
      heatmapLayerRef.current = heatmapLayer
      console.log("Heatmap carregado com sucesso")
    } catch (error) {
      console.error("Erro ao carregar heatmap:", error)
    }
  }

  // Criar ícones personalizados
  const createCustomIcon = (L: any, category: string, isSelected = false) => {
    const iconColors: Record<string, string> = {
      Música: "#3B82F6",
      Arte: "#8B5CF6",
      Educação: "#10B981",
      Tecnologia: "#F59E0B",
      Gastronomia: "#EF4444",
      Esportes: "#06B6D4",
      Cultura: "#84CC16",
      Negócios: "#6366F1",
      Saúde: "#EC4899",
    }

    const color = iconColors[category] || "#6B7280"
    const size = isSelected ? 35 : 25

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size * 0.4}px;
          color: white;
          font-weight: bold;
          line-height: 1;
          ${isSelected ? "transform: scale(1.2); z-index: 1000;" : ""}
        ">
          ${getCategoryIcon(category)}
        </div>
      `,
      className: "custom-marker",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    })
  }

  // Obter ícone da categoria
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Música: "♪",
      Arte: "🎨",
      Educação: "📚",
      Tecnologia: "💻",
      Gastronomia: "🍽️",
      Esportes: "⚽",
      Cultura: "🎭",
      Negócios: "💼",
      Saúde: "🏥",
    }
    return icons[category] || "📍"
  }

  // Criar conteúdo do popup
  const createPopupContent = (event: EventWithCoordinates) => {
    return `
      <div style="padding: 12px; min-width: 250px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <span style="background: #f3f4f6; color: #374151; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">
            ${event.category}
          </span>
          <span style="background: ${
            event.status === "Confirmado"
              ? "#dcfce7; color: #166534"
              : event.status === "Quase lotado"
                ? "#fef2f2; color: #dc2626"
                : "#fef3c7; color: #d97706"
          }; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 500;">
            ${event.status}
          </span>
        </div>

        <h3 style="font-weight: 600; color: #1f2937; margin-bottom: 8px; font-size: 14px; line-height: 1.3;">
          ${event.title}
        </h3>

        <p style="color: #6b7280; font-size: 12px; margin-bottom: 12px; line-height: 1.4;">
          ${event.description.length > 100 ? event.description.substring(0, 100) + "..." : event.description}
        </p>

        <div style="margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-size: 12px; color: #6b7280;">
            <span>📅</span>
            <span>${new Date(event.date).toLocaleDateString("pt-BR")} às ${event.time}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-size: 12px; color: #6b7280;">
            <span>📍</span>
            <span>${event.location}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 4px;">
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6b7280;">
              <span>👥</span>
              <span>${event.participants} participantes</span>
            </div>

            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6b7280;">
              <span>⭐</span>
              <span>${event.rating}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #e5e7eb;">
          <span style="font-weight: 600; color: #1f2937; font-size: 14px;">${event.price}</span>
          <button 
            onclick="window.open('/events/${event.id}', '_blank')"
            style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;"
            onmouseover="this.style.background='#1d4ed8'"
            onmouseout="this.style.background='#2563eb'"
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    `
  }

  // Centralizar mapa
  const centerMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(defaultCenter, defaultZoom)
    }
  }

  // Toggle heatmap
  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap)
  }

  // Toggle marcadores
  const toggleMarkers = () => {
    if (!mapInstanceRef.current || !markersRef.current.length) return

    markersRef.current.forEach((marker) => {
      if (
        mapInstanceRef.current.hasLayer(marker) ||
        (markerClusterGroupRef.current && markerClusterGroupRef.current.hasLayer(marker))
      ) {
        // Ocultar marcadores
        if (markerClusterGroupRef.current) {
          markerClusterGroupRef.current.removeLayer(marker)
        } else {
          mapInstanceRef.current.removeLayer(marker)
        }
      } else {
        // Mostrar marcadores
        if (markerClusterGroupRef.current) {
          markerClusterGroupRef.current.addLayer(marker)
        } else {
          marker.addTo(mapInstanceRef.current)
        }
      }
    })
  }

  if (isLoading) {
    return (
      <div className="bg-slate-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-slate-600">Carregando mapa...</p>
        </div>
      </div>
    )
  }

  if (mapError) {
    return (
      <div className="bg-slate-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Erro ao carregar mapa</p>
          <p className="text-sm text-slate-500">Verifique sua conexão com a internet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Controles do Mapa */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[1000] space-y-2">
          <Button variant="secondary" size="sm" onClick={toggleHeatmap} className="bg-white shadow-lg">
            <Layers className="w-4 h-4 mr-2" />
            {showHeatmap ? "Ocultar Heatmap" : "Mostrar Heatmap"}
          </Button>

          <Button variant="secondary" size="sm" onClick={toggleMarkers} className="bg-white shadow-lg block w-full">
            <MapPin className="w-4 h-4 mr-2" />
            Toggle PINs
          </Button>

          <Button variant="secondary" size="sm" onClick={centerMap} className="bg-white shadow-lg block w-full">
            <Navigation className="w-4 h-4 mr-2" />
            Centralizar
          </Button>
        </div>
      )}

      {/* Status dos Marcadores */}
      {showControls && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
          <Badge variant="secondary" className="bg-white shadow-lg">
            {markersRef.current.length} eventos no mapa
          </Badge>
        </div>
      )}

      {/* Legenda de Categorias */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-3">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Categorias
              </h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries({
                  Música: "♪",
                  Arte: "🎨",
                  Educação: "📚",
                  Tecnologia: "💻",
                  Gastronomia: "🍽️",
                  Cultura: "🎭",
                }).map(([category, icon]) => (
                  <div key={category} className="flex items-center gap-1">
                    <span>{icon}</span>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mapa */}
      <div ref={mapRef} style={{ height }} className="rounded-lg overflow-hidden w-full" />

      {/* Informações do Evento Selecionado */}
      {selectedEvent && showControls && (
        <div className="absolute top-4 left-4 z-[1000] w-80">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {selectedEvent.category}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)} className="h-6 w-6 p-0">
                  ×
                </Button>
              </div>

              <h3 className="font-semibold text-slate-800 mb-2">{selectedEvent.title}</h3>

              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{selectedEvent.description}</p>

              <div className="space-y-2 text-sm text-slate-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(selectedEvent.date).toLocaleDateString("pt-BR")} às {selectedEvent.time}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedEvent.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedEvent.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/events/${selectedEvent.id}`} className="flex-1">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
                    Ver Detalhes
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([selectedEvent.coordinates.lat, selectedEvent.coordinates.lng], 16)
                    }
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
