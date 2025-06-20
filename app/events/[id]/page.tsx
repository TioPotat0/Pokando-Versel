"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Share2,
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  Info,
  Ticket,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getEventById } from "@/lib/events-data"
import { AnimatedHeart } from "@/components/animated-heart"

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = Number.parseInt(params.id as string)

  const [selectedTicket, setSelectedTicket] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)

  // Buscar evento por ID
  const event = getEventById(eventId)

  // Se evento não encontrado, mostrar 404
  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Evento não encontrado</h1>
          <p className="text-slate-600 mb-6">O evento que você está procurando não existe ou foi removido.</p>
          <Link href="/events">
            <Button>Voltar aos eventos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const selectedTicketData = event.tickets.find((t) => t.id === Number.parseInt(selectedTicket))
  const totalPrice = selectedTicketData ? selectedTicketData.price * quantity : 0

  const handleBuyTicket = () => {
    if (!selectedTicket) return
    setShowCheckout(true)
  }

  const handleTagClick = (tag: string) => {
    router.push(`/events?tag=${encodeURIComponent(tag)}`)
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setShowCheckout(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao evento
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Finalizar Compra
                  </CardTitle>
                  <CardDescription>Preencha seus dados para concluir a compra</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Dados Pessoais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" placeholder="Seu nome completo" />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(11) 99999-9999" />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" placeholder="000.000.000-00" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Dados de Pagamento</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="expiry">Validade</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input id="cardName" placeholder="Nome como está no cartão" />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    onClick={() => {
                      alert("Compra realizada com sucesso! Você receberá o ingresso por email.")
                      router.push("/events")
                    }}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Finalizar Compra - R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800">{event.title}</h4>
                    <p className="text-sm text-slate-600">
                      {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                    </p>
                    <p className="text-sm text-slate-600">{event.location}</p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{selectedTicketData?.name}</span>
                      <span>R$ {selectedTicketData?.price.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <span>Quantidade: {quantity}</span>
                      <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Compra 100% segura</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/events">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos eventos
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <Card>
              <div className="relative">
                <img
                  src={event.images[0] || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <AnimatedHeart
                    eventId={event.id}
                    eventTitle={event.title}
                    eventDate={event.date}
                    eventLocation={event.location}
                    eventImage={event.images[0] || "/placeholder.svg"}
                    size="md"
                  />
                  <Button variant="secondary" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {event.category}
                    </Badge>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">{event.title}</h1>
                    <p className="text-slate-600">{event.description}</p>
                  </div>
                  <Badge className="bg-green-500 text-white">{event.status}</Badge>
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium">
                          {new Date(event.date).toLocaleDateString("pt-BR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-slate-600">
                          {event.time} - {event.endTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-sm text-slate-600">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium">{event.participants} confirmados</p>
                        <p className="text-sm text-slate-600">de {event.maxParticipants} vagas</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{event.rating} estrelas</p>
                        <p className="text-sm text-slate-600">{event.totalReviews} avaliações</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags clicáveis */}
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag)}
                      className="bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  {event.longDescription.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organizador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800">{event.organizer.name}</h3>
                      {event.organizer.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{event.organizer.rating}</span>
                      </div>
                      <span>{event.organizer.totalEvents} eventos realizados</span>
                    </div>
                  </div>
                  <Button variant="outline">Ver Perfil</Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue Info */}
            <Card>
              <CardHeader>
                <CardTitle>Local do Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">{event.venue.name}</h3>
                    <p className="text-slate-600 mb-2">{event.venue.address}</p>
                    <p className="text-sm text-slate-600">Capacidade: {event.venue.capacity} pessoas</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Comodidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.venue.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600">Mapa do local</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Purchase Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Ingressos
                </CardTitle>
                <CardDescription>Escolha seu ingresso e garanta sua vaga</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ticket Options */}
                <div className="space-y-3">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTicket === ticket.id.toString()
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedTicket(ticket.id.toString())}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-slate-800">{ticket.name}</h4>
                          <p className="text-sm text-slate-600">{ticket.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">
                            {ticket.price === 0 ? "Gratuito" : `R$ ${ticket.price.toFixed(2).replace(".", ",")}`}
                          </p>
                          <p className="text-xs text-slate-500">{ticket.available} disponíveis</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-1">
                        {ticket.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {ticket.requirements && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-amber-600">
                          <Info className="w-3 h-3" />
                          <span>{ticket.requirements}</span>
                        </div>
                      )}

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${((ticket.total - ticket.available) / ticket.total) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {ticket.total - ticket.available} de {ticket.total} vendidos
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedTicket && (
                  <>
                    <Separator />

                    {/* Quantity Selector */}
                    <div>
                      <Label htmlFor="quantity">Quantidade</Label>
                      <Select
                        value={quantity.toString()}
                        onValueChange={(value) => setQuantity(Number.parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} ingresso{num > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Total */}
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="text-xl font-bold text-slate-800">
                          {totalPrice === 0 ? "Gratuito" : `R$ ${totalPrice.toFixed(2).replace(".", ",")}`}
                        </span>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={handleBuyTicket}>
                      {totalPrice === 0 ? "Reservar Vaga" : "Comprar Ingresso"}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Shield className="w-3 h-3" />
                      <span>Compra 100% segura e garantida</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
