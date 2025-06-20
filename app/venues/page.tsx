"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Users, Star, Search, Filter, Wifi, Car, Coffee, Shield, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCapacity, setSelectedCapacity] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")

  const venues = [
    {
      id: 1,
      name: "Coworking Central",
      description: "Espaço moderno e versátil no coração da cidade, ideal para workshops e eventos corporativos.",
      endereco: "Rua das Flores, 123 - Centro",
      regiao: "Centro",
      capacidade: 30,
      precoHora: 80,
      rating: 4.8,
      totalAvaliacoes: 24,
      proprietario: "João Silva",
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      amenidades: ["Wifi", "Ar Condicionado", "Projetor", "Som", "Café"],
      horarioFuncionamento: "08:00 - 22:00",
      disponivel: true,
      verificado: true,
      destaque: true,
    },
    {
      id: 2,
      name: "Sala de Eventos Premium",
      description: "Ambiente sofisticado com vista panorâmica, perfeito para eventos especiais e lançamentos.",
      endereco: "Av. Paulista, 456 - Bela Vista",
      regiao: "Centro",
      capacidade: 100,
      precoHora: 150,
      rating: 4.9,
      totalAvaliacoes: 18,
      proprietario: "Maria Santos",
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      amenidades: ["Wifi", "Ar Condicionado", "Projetor", "Som", "Catering", "Estacionamento"],
      horarioFuncionamento: "09:00 - 23:00",
      disponivel: true,
      verificado: true,
      destaque: false,
    },
    {
      id: 3,
      name: "Auditório Tech Hub",
      description: "Auditório moderno com tecnologia de ponta, ideal para palestras e apresentações técnicas.",
      endereco: "Rua da Inovação, 789 - Vila Madalena",
      regiao: "Zona Oeste",
      capacidade: 200,
      precoHora: 300,
      rating: 4.7,
      totalAvaliacoes: 31,
      proprietario: "Carlos Oliveira",
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      amenidades: ["Wifi", "Ar Condicionado", "Projetor 4K", "Som Profissional", "Transmissão Online"],
      horarioFuncionamento: "08:00 - 22:00",
      disponivel: false,
      verificado: true,
      destaque: false,
    },
    {
      id: 4,
      name: "Espaço Cultural Criativo",
      description: "Local inspirador para eventos artísticos e culturais, com ambiente descontraído e criativo.",
      endereco: "Rua dos Artistas, 321 - Vila Madalena",
      regiao: "Zona Oeste",
      capacidade: 50,
      precoHora: 120,
      rating: 4.6,
      totalAvaliacoes: 15,
      proprietario: "Ana Costa",
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      amenidades: ["Wifi", "Som", "Iluminação Cênica", "Café", "Jardim"],
      horarioFuncionamento: "10:00 - 22:00",
      disponivel: true,
      verificado: true,
      destaque: false,
    },
  ]

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || venue.regiao === selectedRegion
    const matchesCapacity =
      selectedCapacity === "all" ||
      (selectedCapacity === "small" && venue.capacidade <= 50) ||
      (selectedCapacity === "medium" && venue.capacidade > 50 && venue.capacidade <= 100) ||
      (selectedCapacity === "large" && venue.capacidade > 100)
    const matchesPrice =
      selectedPrice === "all" ||
      (selectedPrice === "budget" && venue.precoHora <= 100) ||
      (selectedPrice === "mid" && venue.precoHora > 100 && venue.precoHora <= 200) ||
      (selectedPrice === "premium" && venue.precoHora > 200)

    return matchesSearch && matchesRegion && matchesCapacity && matchesPrice
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Locais Verificados</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Encontre o espaço perfeito para seu evento. Todos os locais são verificados e aprovados.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar locais..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as regiões</SelectItem>
                    <SelectItem value="Centro">Centro</SelectItem>
                    <SelectItem value="Zona Norte">Zona Norte</SelectItem>
                    <SelectItem value="Zona Sul">Zona Sul</SelectItem>
                    <SelectItem value="Zona Oeste">Zona Oeste</SelectItem>
                    <SelectItem value="Zona Leste">Zona Leste</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Capacidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer capacidade</SelectItem>
                    <SelectItem value="small">Até 50 pessoas</SelectItem>
                    <SelectItem value="medium">51 - 100 pessoas</SelectItem>
                    <SelectItem value="large">Mais de 100 pessoas</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Preço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer preço</SelectItem>
                    <SelectItem value="budget">Até R$ 100/h</SelectItem>
                    <SelectItem value="mid">R$ 101 - R$ 200/h</SelectItem>
                    <SelectItem value="premium">Acima de R$ 200/h</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Mais Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">{filteredVenues.length} locais encontrados</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Ordenar por:</span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevância</SelectItem>
                  <SelectItem value="price-low">Menor preço</SelectItem>
                  <SelectItem value="price-high">Maior preço</SelectItem>
                  <SelectItem value="rating">Melhor avaliado</SelectItem>
                  <SelectItem value="capacity">Capacidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Venues Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredVenues.map((venue) => (
              <Card
                key={venue.id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-200 ${venue.destaque ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="relative">
                  <img
                    src={venue.images[0] || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {venue.verificado && (
                      <Badge className="bg-green-500 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                    {venue.destaque && <Badge className="bg-blue-500 text-white">Destaque</Badge>}
                  </div>

                  {/* Availability */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={venue.disponivel ? "default" : "secondary"}>
                      {venue.disponivel ? "Disponível" : "Ocupado"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-1">{venue.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span>{venue.endereco}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{venue.rating}</span>
                        <span className="text-sm text-slate-500">({venue.totalAvaliacoes})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{venue.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.amenidades.slice(0, 4).map((amenidade, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenidade === "Wifi" && <Wifi className="w-3 h-3 mr-1" />}
                        {amenidade === "Estacionamento" && <Car className="w-3 h-3 mr-1" />}
                        {amenidade === "Café" && <Coffee className="w-3 h-3 mr-1" />}
                        {amenidade}
                      </Badge>
                    ))}
                    {venue.amenidades.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{venue.amenidades.length - 4} mais
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span>Até {venue.capacidade} pessoas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{venue.horarioFuncionamento}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">R$ {venue.precoHora}</span>
                      <span className="text-slate-600">/hora</span>
                      <p className="text-xs text-slate-500">por {venue.proprietario}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" disabled={!venue.disponivel}>
                        {venue.disponivel ? "Reservar" : "Indisponível"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar Mais Locais
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
