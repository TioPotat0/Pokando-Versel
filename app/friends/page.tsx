"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, MessageCircle, Calendar, Users, UserCheck, UserX } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function FriendsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const friends = [
    {
      id: 1,
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
      mutualFriends: 12,
      eventsAttended: 8,
      lastSeen: "Agora",
      bio: "Apaixonada por música e eventos culturais",
      interests: ["Jazz", "Arte", "Fotografia"],
    },
    {
      id: 2,
      name: "Carlos Santos",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "offline",
      mutualFriends: 5,
      eventsAttended: 15,
      lastSeen: "2 horas atrás",
      bio: "Desenvolvedor e organizador de meetups tech",
      interests: ["Tecnologia", "Programação", "Inovação"],
    },
    {
      id: 3,
      name: "Maria Oliveira",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
      mutualFriends: 8,
      eventsAttended: 12,
      lastSeen: "Agora",
      bio: "Designer e entusiasta de workshops criativos",
      interests: ["Design", "Arte", "Workshops"],
    },
    {
      id: 4,
      name: "João Costa",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "away",
      mutualFriends: 3,
      eventsAttended: 6,
      lastSeen: "30 min atrás",
      bio: "Fotógrafo profissional e amante da cultura",
      interests: ["Fotografia", "Cultura", "Viagem"],
    },
  ]

  const suggestions = [
    {
      id: 5,
      name: "Pedro Almeida",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 15,
      eventsAttended: 20,
      bio: "Músico e produtor de eventos",
      interests: ["Música", "Produção", "Jazz"],
      reason: "Vocês têm 15 amigos em comum",
    },
    {
      id: 6,
      name: "Lucia Ferreira",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 7,
      eventsAttended: 9,
      bio: "Artista visual e curadora",
      interests: ["Arte", "Curadoria", "Exposições"],
      reason: "Participou dos mesmos eventos que você",
    },
    {
      id: 7,
      name: "Roberto Lima",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 4,
      eventsAttended: 11,
      bio: "Empreendedor e palestrante",
      interests: ["Negócios", "Palestras", "Networking"],
      reason: "Interesses similares aos seus",
    },
  ]

  const requests = [
    {
      id: 8,
      name: "Fernanda Souza",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 6,
      eventsAttended: 4,
      bio: "Estudante de artes e cultura",
      interests: ["Arte", "Cultura", "Estudos"],
      sentAt: "2 dias atrás",
    },
    {
      id: 9,
      name: "Gabriel Torres",
      avatar: "/placeholder.svg?height=60&width=60",
      mutualFriends: 2,
      eventsAttended: 7,
      bio: "Desenvolvedor e organizador de hackathons",
      interests: ["Tecnologia", "Hackathon", "Inovação"],
      sentAt: "1 semana atrás",
    },
  ]

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Meus Amigos</h1>
            <p className="text-slate-600">Conecte-se com pessoas que compartilham seus interesses</p>
          </div>

          <Tabs defaultValue="friends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Amigos ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Sugestões ({suggestions.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Solicitações ({requests.length})
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Buscar
              </TabsTrigger>
            </TabsList>

            {/* Friends Tab */}
            <TabsContent value="friends" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar amigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">
                    {friends.filter((f) => f.status === "online").length} online
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              friend.status === "online"
                                ? "bg-green-500"
                                : friend.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-slate-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{friend.name}</h3>
                          <p className="text-sm text-slate-600">{friend.lastSeen}</p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 mb-3">{friend.bio}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {friend.interests.slice(0, 3).map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-slate-800">{friend.mutualFriends}</p>
                          <p className="text-slate-600">Amigos em comum</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-slate-800">{friend.eventsAttended}</p>
                          <p className="text-slate-600">Eventos juntos</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Conversar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Suggestions Tab */}
            <TabsContent value="suggestions" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Pessoas que você pode conhecer</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestions.map((person) => (
                    <Card key={person.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800">{person.name}</h3>
                            <p className="text-sm text-slate-600">{person.reason}</p>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-3">{person.bio}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {person.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="text-center">
                            <p className="font-semibold text-slate-800">{person.mutualFriends}</p>
                            <p className="text-slate-600">Amigos em comum</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-slate-800">{person.eventsAttended}</p>
                            <p className="text-slate-600">Eventos</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Adicionar
                          </Button>
                          <Button variant="outline" size="sm">
                            Ver Perfil
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Solicitações de Amizade</h2>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={request.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-800">{request.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {request.sentAt}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{request.bio}</p>

                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                              <span>{request.mutualFriends} amigos em comum</span>
                              <span>{request.eventsAttended} eventos</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {request.interests.map((interest, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <UserCheck className="w-4 h-4 mr-2" />
                              Aceitar
                            </Button>
                            <Button variant="outline" size="sm">
                              <UserX className="w-4 h-4 mr-2" />
                              Recusar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Search Tab */}
            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Encontrar Pessoas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input placeholder="Buscar por nome, email ou interesses..." className="pl-10" />
                  </div>
                  <Button className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Buscar Pessoas
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center py-12">
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Encontre novos amigos</h3>
                <p className="text-slate-500">Use a busca acima para encontrar pessoas com interesses similares</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
