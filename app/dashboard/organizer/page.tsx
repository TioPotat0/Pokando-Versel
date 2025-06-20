"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, Plus, Edit, Trash2, Eye, Settings, LogOut, BarChart3, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OrganizerDashboard() {
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

  const myEvents = [
    {
      id: 1,
      title: "Workshop de Design Thinking",
      date: "2024-02-20",
      time: "14:00",
      location: "Coworking Central",
      venue: "Sala de Reuniões A",
      status: "Ativo",
      participants: 15,
      maxParticipants: 20,
      visibility: "Público",
      revenue: "R$ 1.200,00",
    },
    {
      id: 2,
      title: "Meetup de Desenvolvedores",
      date: "2024-02-25",
      time: "19:00",
      location: "Tech Hub",
      venue: "Auditório Principal",
      status: "Rascunho",
      participants: 0,
      maxParticipants: 50,
      visibility: "Público",
      revenue: "R$ 0,00",
    },
    {
      id: 3,
      title: "Palestra sobre Inovação",
      date: "2024-01-15",
      time: "16:00",
      location: "Auditório Principal",
      venue: "Sala de Conferências",
      status: "Finalizado",
      participants: 45,
      maxParticipants: 50,
      visibility: "Público",
      revenue: "R$ 2.250,00",
    },
  ]

  const availableVenues = [
    {
      id: 1,
      name: "Coworking Central",
      location: "Centro",
      capacity: 30,
      pricePerHour: "R$ 80,00",
      owner: "João Silva",
      available: true,
    },
    {
      id: 2,
      name: "Tech Hub",
      location: "Vila Madalena",
      capacity: 100,
      pricePerHour: "R$ 150,00",
      owner: "Maria Santos",
      available: true,
    },
    {
      id: 3,
      name: "Auditório Principal",
      location: "Bela Vista",
      capacity: 200,
      pricePerHour: "R$ 300,00",
      owner: "Carlos Oliveira",
      available: false,
    },
  ]

  const stats = {
    totalEvents: 12,
    activeEvents: 3,
    totalParticipants: 245,
    totalRevenue: "R$ 8.450,00",
    avgRating: 4.7,
  }

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
            <Badge className="bg-purple-100 text-purple-700">Organizador</Badge>
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
                <Badge className="bg-purple-100 text-purple-700 mt-2">Organizador</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/create-event">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Evento
                  </Button>
                </Link>
                <Link href="/venues">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Buscar Locais
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatórios
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Available Venues */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Locais Disponíveis</CardTitle>
                <CardDescription>Locais verificados para seus eventos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableVenues.slice(0, 3).map((venue) => (
                  <div key={venue.id} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800 text-sm">{venue.name}</h4>
                      <Badge variant={venue.available ? "default" : "secondary"} className="text-xs">
                        {venue.available ? "Disponível" : "Ocupado"}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{venue.location}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{venue.capacity} pessoas</span>
                      <span>{venue.pricePerHour}/h</span>
                    </div>
                  </div>
                ))}
                <Link href="/venues">
                  <Button variant="ghost" size="sm" className="w-full">
                    Ver Todos os Locais
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Dashboard do Organizador 🎯</h2>
                <p className="opacity-90 mb-4">
                  Gerencie seus eventos, reserve locais e crie experiências incríveis para sua comunidade.
                </p>
                <Link href="/create-event">
                  <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Novo Evento
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Total de Eventos</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.totalEvents}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Eventos Ativos</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.activeEvents}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Total Participantes</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.totalParticipants}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Receita Total</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.totalRevenue}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">R$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meus Eventos</CardTitle>
                    <CardDescription>Gerencie todos os seus eventos em um só lugar</CardDescription>
                  </div>
                  <Link href="/create-event">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Evento
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Participantes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-800">{event.title}</p>
                            <p className="text-sm text-slate-600">{event.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-slate-800">{event.location}</p>
                            <p className="text-sm text-slate-600">{event.venue}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-800">
                              {event.participants}/{event.maxParticipants}
                            </span>
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(event.participants / event.maxParticipants) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              event.status === "Ativo"
                                ? "default"
                                : event.status === "Rascunho"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{event.revenue}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
