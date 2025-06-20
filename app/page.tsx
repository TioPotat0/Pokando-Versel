"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Star, ChevronLeft, ChevronRight, Map } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { InteractiveMap } from "@/components/interactive-map"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const featuredEvents = [
    {
      id: 1,
      title: "Festival de Jazz da Cidade",
      description: "Uma noite mágica com os melhores artistas de jazz",
      date: "2024-02-15",
      time: "20:00",
      location: "Teatro Municipal",
      coordinates: { lat: -23.5505, lng: -46.6333 },
      image: "/placeholder.svg?height=200&width=300",
      category: "Música",
      participants: 245,
      rating: 4.8,
      status: "Em breve",
      price: "R$ 45,00",
      organizer: "Produtora Musical XYZ",
    },
    {
      id: 2,
      title: "Workshop de Fotografia",
      description: "Aprenda técnicas avançadas de fotografia urbana",
      date: "2024-02-18",
      time: "14:00",
      location: "Centro Cultural",
      coordinates: { lat: -23.5489, lng: -46.6388 },
      image: "/placeholder.svg?height=200&width=300",
      category: "Educação",
      participants: 32,
      rating: 4.9,
      status: "Vagas limitadas",
      price: "R$ 80,00",
      organizer: "Escola de Artes",
    },
    {
      id: 3,
      title: "Feira Gastronômica",
      description: "Sabores únicos da culinária local",
      date: "2024-02-20",
      time: "10:00",
      location: "Praça Central",
      coordinates: { lat: -23.5475, lng: -46.6361 },
      image: "/placeholder.svg?height=200&width=300",
      category: "Gastronomia",
      participants: 180,
      rating: 4.7,
      status: "Confirmado",
      price: "Gratuito",
      organizer: "Prefeitura Municipal",
    },
    {
      id: 4,
      title: "Hackathon de Inovação",
      description: "48 horas de desenvolvimento tecnológico",
      date: "2024-02-22",
      time: "09:00",
      location: "Tech Hub",
      coordinates: { lat: -23.552, lng: -46.631 },
      image: "/placeholder.svg?height=200&width=300",
      category: "Tecnologia",
      participants: 95,
      rating: 4.6,
      status: "Quase lotado",
      price: "R$ 25,00",
      organizer: "Comunidade Tech",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredEvents.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredEvents.length / 3)) % Math.ceil(featuredEvents.length / 3))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
              Bem-vindo ao <span className="text-blue-600">Pokando</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Conecte-se com eventos culturais, sociais e comunitários. Descubra locais incríveis, organize eventos
              memoráveis e faça parte de uma comunidade vibrante.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-200"
              >
                Fazer Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg shadow-md transition-all duration-200"
              >
                Criar Conta
              </Button>
            </Link>
            <Link href="/map">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg shadow-md transition-all duration-200"
              >
                <Map className="w-4 h-4 mr-2" />
                Ver no Mapa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Como funciona o Pokando?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Para Clientes</h3>
              <p className="text-slate-600">
                Descubra eventos incríveis, conecte-se com amigos e participe de experiências únicas na sua região.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Para Organizadores</h3>
              <p className="text-slate-600">
                Crie eventos memoráveis utilizando locais verificados e conte com ferramentas completas de gestão.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Para Proprietários</h3>
              <p className="text-slate-600">
                Cadastre seus locais, gerencie reservas e conecte-se com organizadores para maximizar o uso do espaço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Map Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Eventos Próximos a Você</h2>
            <p className="text-slate-600 mb-6">Explore eventos em tempo real no mapa interativo</p>
            <Link href="/map">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Map className="w-4 h-4 mr-2" />
                Abrir Mapa Completo
              </Button>
            </Link>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <InteractiveMap events={featuredEvents} height="400px" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Events Carousel */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Eventos em Destaque</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="p-2" onClick={prevSlide}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2" onClick={nextSlide}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(featuredEvents.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {featuredEvents.slice(slideIndex * 3, slideIndex * 3 + 3).map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-3 right-3 bg-white text-slate-700" variant="secondary">
                            {event.status}
                          </Badge>
                        </div>

                        <CardContent className="p-6">
                          <div className="mb-3">
                            <Badge variant="outline" className="text-xs">
                              {event.category}
                            </Badge>
                          </div>

                          <h3 className="text-xl font-semibold text-slate-800 mb-2">{event.title}</h3>

                          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>

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
                              Ver Detalhes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/events">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Ver Todos os Eventos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar sua jornada?</h2>
          <p className="text-xl mb-8 opacity-90">Junte-se à nossa comunidade e descubra o poder dos eventos locais.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg shadow-md"
              >
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg"
              >
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Pokando</h3>
              <p className="text-slate-300 text-sm">Conectando pessoas através de eventos culturais e comunitários.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/events" className="hover:text-white">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/venues" className="hover:text-white">
                    Locais
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-white">
                    Mapa
                  </Link>
                </li>
                <li>
                  <Link href="/organizers" className="hover:text-white">
                    Para Organizadores
                  </Link>
                </li>
                <li>
                  <Link href="/owners" className="hover:text-white">
                    Para Proprietários
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Carreiras
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
            <p>&copy; 2024 Pokando. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
