"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MapPin,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  LogOut,
  BarChart3,
  Shield,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OwnerDashboard() {
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

  const myVenues = [
    {
      id: 1,
      name: "Coworking Central",
      endereco: "Rua das Flores, 123 - Centro",
      capacidade: 30,
      status: "Ativo",
      reservasAtivas: 3,
      totalReservas: 15,
      receitaMensal: "R$ 2.400,00",
      rating: 4.8,
      alvaraDeFuncionamento: "Válido",
      comprovanteCorpoBombeiros: "Válido",
      comprovanteSanitario: "Válido",
    },
    {
      id: 2,
      name: "Sala de Eventos Premium",
      endereco: "Av. Paulista, 456 - Bela Vista",
      capacidade: 100,
      status: "Ativo",
      reservasAtivas: 2,
      totalReservas: 8,
      receitaMensal: "R$ 4.800,00",
      rating: 4.9,
      alvaraDeFuncionamento: "Válido",
      comprovanteCorpoBombeiros: "Válido",
      comprovanteSanitario: "Válido",
    },
    {
      id: 3,
      name: "Auditório Tech Hub",
      endereco: "Rua da Inovação, 789 - Vila Madalena",
      capacidade: 200,
      status: "Pendente",
      reservasAtivas: 0,
      totalReservas: 0,
      receitaMensal: "R$ 0,00",
      rating: 0,
      alvaraDeFuncionamento: "Pendente",
      comprovanteCorpoBombeiros: "Válido",
      comprovanteSanitario: "Pendente",
    },
  ]

  const recentReservations = [
    {
      id: 1,
      evento: "Workshop de Design Thinking",
      organizador: "Ana Silva",
      local: "Coworking Central",
      data: "2024-02-20",
      horario: "14:00 - 18:00",
      status: "Confirmada",
      valor: "R$ 320,00",
    },
    {
      id: 2,
      evento: "Meetup de Desenvolvedores",
      organizador: "Carlos Santos",
      local: "Sala de Eventos Premium",
      data: "2024-02-25",
      horario: "19:00 - 22:00",
      status: "Pendente",
      valor: "R$ 450,00",
    },
    {
      id: 3,
      evento: "Palestra sobre IA",
      organizador: "Maria Oliveira",
      local: "Coworking Central",
      data: "2024-02-28",
      horario: "16:00 - 20:00",
      status: "Confirmada",
      valor: "R$ 320,00",
    },
  ]

  const stats = {
    totalVenues: 3,
    activeVenues: 2,
    totalReservations: 23,
    monthlyRevenue: "R$ 7.200,00",
    occupancyRate: 75,
    avgRating: 4.85,
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
            <Badge className="bg-green-100 text-green-700">
              <Shield className="w-3 h-3 mr-1" />
              Proprietário
            </Badge>
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
                <Badge className="bg-green-100 text-green-700 mt-2">
                  <Shield className="w-3 h-3 mr-1" />
                  Proprietário
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/create-venue">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Local
                  </Button>
                </Link>
                <Link href="/reservations">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Gerenciar Reservas
                  </Button>
                </Link>
                <Link href="/contracts">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Contratos
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Dashboard do Proprietário 🏢</h2>
                <p className="opacity-90 mb-4">
                  Gerencie seus locais, aprove reservas e maximize o potencial dos seus espaços.
                </p>
                <Link href="/create-venue">
                  <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Novo Local
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
                      <p className="text-sm text-slate-600">Total de Locais</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.totalVenues}</p>
                    </div>
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Locais Ativos</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.activeVenues}</p>
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
                      <p className="text-sm text-slate-600">Receita Mensal</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.monthlyRevenue}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Taxa de Ocupação</p>
                      <p className="text-2xl font-bold text-slate-800">{stats.occupancyRate}%</p>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Venues Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meus Locais</CardTitle>
                    <CardDescription>Gerencie todos os seus locais cadastrados</CardDescription>
                  </div>
                  <Link href="/create-venue">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Local
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Local</TableHead>
                      <TableHead>Capacidade</TableHead>
                      <TableHead>Reservas</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Avaliação</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myVenues.map((venue) => (
                      <TableRow key={venue.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-800">{venue.name}</p>
                            <p className="text-sm text-slate-600">{venue.endereco}</p>
                          </div>
                        </TableCell>
                        <TableCell>{venue.capacidade} pessoas</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-800">
                              {venue.reservasAtivas}/{venue.totalReservas}
                            </span>
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width:
                                    venue.totalReservas > 0
                                      ? `${(venue.reservasAtivas / venue.totalReservas) * 100}%`
                                      : "0%",
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{venue.receitaMensal}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              venue.status === "Ativo"
                                ? "default"
                                : venue.status === "Pendente"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {venue.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {venue.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <span>⭐</span>
                              <span>{venue.rating}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </TableCell>
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

            {/* Recent Reservations */}
            <Card>
              <CardHeader>
                <CardTitle>Reservas Recentes</CardTitle>
                <CardDescription>Últimas reservas dos seus locais</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evento</TableHead>
                      <TableHead>Organizador</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Data/Horário</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.evento}</TableCell>
                        <TableCell>{reservation.organizador}</TableCell>
                        <TableCell>{reservation.local}</TableCell>
                        <TableCell>
                          <div>
                            <p>{new Date(reservation.data).toLocaleDateString("pt-BR")}</p>
                            <p className="text-sm text-slate-600">{reservation.horario}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reservation.status === "Confirmada"
                                ? "default"
                                : reservation.status === "Pendente"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {reservation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{reservation.valor}</TableCell>
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
