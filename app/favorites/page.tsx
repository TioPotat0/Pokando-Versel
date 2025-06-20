"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Heart, Trash2, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

interface FavoriteEvent {
  id: number
  title: string
  date: string
  location: string
  image: string
  addedAt: string
}

export default function FavoritesPage() {
  const [favoriteEvents, setFavoriteEvents] = useState<FavoriteEvent[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favoriteEvents")
      if (favorites) {
        setFavoriteEvents(JSON.parse(favorites))
      }
    }
  }, [])

  const handleRemoveFavorite = (eventId: number) => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favoriteEvents")
      if (favorites) {
        const favoritesList: FavoriteEvent[] = JSON.parse(favorites)
        const newFavorites = favoritesList.filter((fav) => fav.id !== eventId)
        localStorage.setItem("favoriteEvents", JSON.stringify(newFavorites))
        setFavoriteEvents(newFavorites)
      }
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Meus Favoritos</h1>
            <p className="text-xl text-slate-600">Eventos, locais e organizadores que você marcou como favoritos</p>
          </div>

          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="events">Eventos ({favoriteEvents.length})</TabsTrigger>
              <TabsTrigger value="venues">Locais</TabsTrigger>
              <TabsTrigger value="organizers">Organizadores</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-6">
              {favoriteEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum evento favorito</h3>
                  <p className="text-slate-600 mb-4">
                    Você ainda não favoritou nenhum evento. Explore nossa lista de eventos e marque seus favoritos!
                  </p>
                  <Link href="/events">
                    <Button>Explorar Eventos</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRemoveFavorite(event.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">{event.title}</h3>

                        <div className="space-y-2 text-sm text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-xs">
                            Favoritado em {new Date(event.addedAt).toLocaleDateString("pt-BR")}
                          </Badge>
                        </div>

                        <Link href={`/events/${event.id}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Ver Detalhes</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="venues" className="mt-6">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum local favorito</h3>
                <p className="text-slate-600 mb-4">
                  Você ainda não favoritou nenhum local. Explore nossa lista de locais e marque seus favoritos!
                </p>
                <Link href="/venues">
                  <Button>Explorar Locais</Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="organizers" className="mt-6">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum organizador favorito</h3>
                <p className="text-slate-600 mb-4">
                  Você ainda não favoritou nenhum organizador. Explore eventos e marque organizadores como favoritos!
                </p>
                <Link href="/events">
                  <Button>Explorar Eventos</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
