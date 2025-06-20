"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Users,
  MapPin,
  Star,
  Heart,
  UserPlus,
  Settings,
  LogOut,
  FileText,
  Shield,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const recommendedEvents = [
    {
      id: 1,
      title: "Workshop de Fotografia Digital",
      description: "Aprenda técnicas avançadas de fotografia com profissionais",
      date: "2024-02-20",
      time: "14:00",
      location: "Centro Cultural",
      category: "Educação",
      participants: 25,
      rating: 4.8,
      image: "/placeholder.svg?height=150&width=200",
      price: "R$ 80,00",
    },
    {
      id: 2,
      title: "Festival de Música Indie",
      description: "Uma noite com os melhores artistas independentes",
      date: "2024-02-22",
      time: "19:00",
      location: "Parque da Cidade",
      category: "Música",
      participants: 150,
      rating: 4.9,
      image: "/placeholder.svg?height=150&width=200",
      price: "R$ 45,00",
    },
  ]

  const myEvents = [
    {
      id: 3,
      title: "Feira Gastronômica",
      date: "2024-02-18",
      status: "Confirmado",
      type: "Inscrito",
    },
    {
      id: 4,
      title: "Palestra sobre Sustentabilidade",
      date: "2024-02-25",
      status: "Pendente",
      type: "Interessado",
    },
  ]

  const friends = [
    { id: 1, name: "Ana Silva", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    { id: 2, name: "Carlos Santos", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
    { id: 3, name: "Maria Oliveira", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-slate-800">Pokando</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Olá, {user.nomeCompleto}!</span>
            <Badge variant="secondary">Cliente</Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user.foto || "/placeholder.svg?height=80&width=80"} />
                  <AvatarFallback className="text-lg">{user.nomeCompleto?.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{user.nomeCompleto}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Cliente
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Meu Perfil
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Todos os Eventos
                  </Button>
                </Link>
                <Link href="/friends">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Meus Amigos
                  </Button>
                </Link>

                {/* Upgrade Options */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-3">Quer fazer mais?</p>

                  {user.acesso === "CLIENTE" && (
                    <>
                      <Link href="/upgrade/organizer">
                        <Button
                          variant="outline"
                          className="w-full justify-start mb-2 text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Ser Organizador
                        </Button>
                      </Link>
                      <Link href="/upgrade/owner">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Ser Proprietário
                        </Button>
                      </Link>
                    </>
                  )}

                  {(user.acesso === "ORGANIZADOR" || user.acesso === "PROPRIETARIO") && (
                    <div className="space-y-2">
                      {user.acesso === "ORGANIZADOR" && (
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-purple-700 font-medium">Organizador Verificado</span>
                        </div>
                      )}
                      {user.acesso === "PROPRIETARIO" && (
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700 font-medium">Proprietário Verificado</span>
                        </div>
                      )}
                      {user.acesso !== "PROPRIETARIO" && (
                        <Link href="/upgrade/owner">
                          <Button
                            variant="outline"
                            className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Ser Proprietário
                          </Button>
                        </Link>
                      )}
                      {user.acesso !== "ORGANIZADOR" && (
                        <Link href="/upgrade/organizer">
                          <Button
                            variant="outline"
                            className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Ser Organizador
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Friends List */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Amigos Online
                  <Badge variant="secondary">{friends.filter((f) => f.status === "online").length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          friend.status === "online" ? "bg-green-500" : "bg-slate-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm text-slate-700">{friend.name}</span>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Amigos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta, {user.nomeCompleto?.split(" ")[0]}! 👋</h2>
                <p className="opacity-90 mb-4">
                  Descubra novos eventos e conecte-se com pessoas que compartilham seus interesses.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/events">
                    <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                      Explorar Eventos
                    </Button>
                  </Link>
                  <Link href="/upgrade/organizer">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      Tornar-se Organizador
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* My Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Meus Eventos
                  <Link href="/my-events">
                    <Button variant="ghost" size="sm">
                      Ver todos
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-slate-800">{event.title}</h4>
                        <p className="text-sm text-slate-600">{new Date(event.date).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.status === "Confirmado" ? "default" : "secondary"}>{event.status}</Badge>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Events */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos Recomendados para Você</CardTitle>
                <CardDescription>Baseado nos seus interesses e atividades anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendedEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-32 object-cover"
                        />
                        <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">
                          {event.category}
                        </Badge>

                        <h4 className="font-semibold text-slate-800 mb-2">{event.title}</h4>

                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{event.description}</p>

                        <div className="space-y-2 text-sm text-slate-600">
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
                              <span>{event.participants} participantes</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{event.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                          <span className="font-semibold text-slate-800">{event.price}</span>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Participar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Quer fazer mais no Pokando?</h3>
                <p className="text-slate-600 mb-4">
                  Torne-se um Organizador para criar seus próprios eventos ou um Proprietário para disponibilizar seus
                  locais.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/upgrade/organizer">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <FileText className="w-4 h-4 mr-2" />
                      Ser Organizador
                    </Button>
                  </Link>
                  <Link href="/upgrade/owner">
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      <Shield className="w-4 h-4 mr-2" />
                      Ser Proprietário
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
