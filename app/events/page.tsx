"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, MapPin, Star, Search, Filter, Share2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { AnimatedHeart } from "@/components/animated-heart"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getEventsData } from "@/lib/events-data"

export default function EventsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams?.get("search") || ""
  const initialTag = searchParams?.get("tag") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedTag, setSelectedTag] = useState(initialTag)
  const [events, setEvents] = useState(getEventsData())

  // Atualizar eventos quando a página carregar
  useEffect(() => {
    setEvents(getEventsData())
  }, [])

  // Atualizar busca quando os parâmetros da URL mudarem
  useEffect(() => {
    if (searchParams) {
      const searchQuery = searchParams.get("search")
      const tagQuery = searchParams.get("tag")

      if (searchQuery) {
        setSearchTerm(searchQuery)
      }

      if (tagQuery) {
        setSelectedTag(tagQuery)
        setSearchTerm("") // Limpar busca por texto quando filtrar por tag
      }
    }
  }, [searchParams])

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

  // Filtrar eventos
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory

    const matchesTag =
      selectedTag === "" || event.tags.some((tag) => tag.toLowerCase().includes(selectedTag.toLowerCase()))

    return matchesSearch && matchesCategory && matchesTag
  })

  // Função para filtrar por tag
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSearchTerm("")
    // Atualizar URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("tag", tag)
      url.searchParams.delete("search")
      window.history.pushState({}, "", url.toString())
    }
  }

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTag("")
    setSelectedCategory("all")
    setSelectedDate("all")
    setSelectedLocation("all")
    // Limpar URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.delete("search")
      url.searchParams.delete("tag")
      window.history.pushState({}, "", url.toString())
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Descubra Eventos Incríveis</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Encontre eventos culturais, educacionais e sociais na sua região
            </p>

            {/* Filtros ativos */}
            {(searchTerm || selectedTag) && (
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm text-slate-600">Filtros ativos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Busca: "{searchTerm}"
                    <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-red-500">
                      ×
                    </button>
                  </Badge>
                )}
                {selectedTag && (
                  <Badge variant="secondary" className="gap-1">
                    Tag: {selectedTag}
                    <button onClick={() => setSelectedTag("")} className="ml-1 hover:text-red-500">
                      ×
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar todos
                </Button>
              </div>
            )}
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setSelectedTag("") // Limpar filtro de tag ao buscar
                    }}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
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

                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as datas</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="tomorrow">Amanhã</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mês</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os locais</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="zona-norte">Zona Norte</SelectItem>
                    <SelectItem value="zona-sul">Zona Sul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">{filteredEvents.length} eventos encontrados</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-200 ${
                  event.isHighlighted ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={event.images[0] || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Status Badge */}
                  <Badge
                    className={`absolute top-3 left-3 ${
                      event.status === "Quase lotado"
                        ? "bg-red-500"
                        : event.status === "Vagas limitadas"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    } text-white`}
                  >
                    {event.status}
                  </Badge>

                  {/* Highlight Badge */}
                  {event.isHighlighted && (
                    <Badge className="absolute top-3 right-3 bg-blue-500 text-white">Destaque</Badge>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <AnimatedHeart
                      eventId={event.id}
                      eventTitle={event.title}
                      eventDate={event.date}
                      eventLocation={event.location}
                      eventImage={event.images[0] || "/placeholder.svg"}
                    />
                    <Button variant="secondary" size="sm" className="bg-white/80 hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{event.title}</h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {event.participants}/{event.maxParticipants} participantes
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{event.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags clicáveis */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        className="text-xs bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 px-2 py-1 rounded-full transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                    {event.tags.length > 3 && (
                      <span className="text-xs text-slate-400 px-2 py-1">+{event.tags.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-slate-800">{event.price}</span>
                    <span className="text-sm text-slate-600">por {event.organizer.name}</span>
                  </div>

                  <Link href={`/events/${event.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum evento encontrado</h3>
              <p className="text-slate-600 mb-4">Tente ajustar os filtros ou buscar por outros termos</p>
              <Button onClick={clearFilters} variant="outline">
                Limpar Filtros
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Carregar Mais Eventos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
