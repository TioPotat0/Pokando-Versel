"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Users, Star, Search, Filter, Navigation, ArrowLeft, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { InteractiveMap } from "@/components/interactive-map"
import { MapFallback } from "@/components/map-fallback"
import { getEventsData } from "@/lib/events-data"
import Link from "next/link"

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [mapError, setMapError] = useState(false)
  const [mounted, setMounted] = useState(false)

  const categories = [
    "Música",
    "Arte",
    "Educação",
    "Tecnologia",
    "Gastronomia",
    "Esportes",
    "Cultura",
    "Negócios",
    "Saúde",
  ]

  useEffect(() => {
    setMounted(true)
    try {
      const eventsData = getEventsData()
      setEvents(eventsData)
    } catch (error) {
      console.error("Erro ao carregar eventos:", error)
    }
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-600">Carregando mapa...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/events">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar aos Eventos
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Mapa de Eventos</h1>
                <p className="text-slate-600">Explore eventos próximos a você no mapa interativo</p>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar eventos no mapa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Filter className="w-4 h-4 mr-2" />
                    Mais Filtros
                  </Button>
                  <Button variant="outline">
                    <Navigation className="w-4 h-4 mr-2" />
                    Minha Localização
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas Rápidas */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Eventos Ativos</p>
                    <p className="text-xl font-bold text-slate-800">{filteredEvents.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Locais Únicos</p>
                    <p className="text-xl font-bold text-slate-800">
                      {new Set(filteredEvents.map((e) => e.location)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Participantes</p>
                    <p className="text-xl font-bold text-slate-800">
                      {filteredEvents.reduce((sum, event) => sum + event.participants, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Avaliação Média</p>
                    <p className="text-xl font-bold text-slate-800">
                      {filteredEvents.length > 0
                        ? (
                            filteredEvents.reduce((sum, event) => sum + event.rating, 0) / filteredEvents.length
                          ).toFixed(1)
                        : "0"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mapa Principal */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Mapa Interativo de Eventos
                    {mapError && (
                      <Badge variant="secondary" className="ml-2">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Modo Fallback
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {!mapError ? (
                    <InteractiveMap
                      height="600px"
                      showControls={true}
                      selectedCategory={selectedCategory}
                      onEventSelect={setSelectedEvent}
                    />
                  ) : (
                    <MapFallback events={filteredEvents} height="600px" />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar com Informações */}
            <div className="lg:col-span-1 space-y-6">
              {/* Evento Selecionado */}
              {selectedEvent && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Evento Selecionado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {selectedEvent.category}
                      </Badge>
                      <h3 className="font-semibold text-slate-800 mb-2">{selectedEvent.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-3">{selectedEvent.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(selectedEvent.date).toLocaleDateString("pt-BR")} às {selectedEvent.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>{selectedEvent.participants} participantes</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
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

              {/* Instruções de Uso */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como usar o mapa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0 mt-0.5"></div>
                    <p>Clique nos marcadores para ver detalhes dos eventos</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-white text-xs font-bold">
                      5
                    </div>
                    <p>Clusters mostram múltiplos eventos próximos</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0 mt-0.5"></div>
                    <p>Heatmap mostra densidade de eventos por região</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Navigation className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <p>Use os controles para navegar e centralizar o mapa</p>
                  </div>
                </CardContent>
              </Card>

              {/* Categorias Populares */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categorias no Mapa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories
                    .map((category) => ({
                      name: category,
                      count: filteredEvents.filter((e) => e.category === category).length,
                      color:
                        {
                          Música: "bg-blue-500",
                          Arte: "bg-purple-500",
                          Educação: "bg-green-500",
                          Tecnologia: "bg-orange-500",
                          Gastronomia: "bg-red-500",
                          Esportes: "bg-cyan-500",
                          Cultura: "bg-lime-500",
                          Negócios: "bg-indigo-500",
                          Saúde: "bg-pink-500",
                        }[category] || "bg-gray-500",
                    }))
                    .filter((category) => category.count > 0)
                    .sort((a, b) => b.count - a.count)
                    .map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="text-sm text-slate-700">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
