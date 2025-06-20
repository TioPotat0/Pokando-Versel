import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Star, Heart, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  const features = [
    {
      icon: Calendar,
      title: "Eventos Organizados",
      description: "Encontre eventos por data, categoria e localização de forma simples e intuitiva.",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com pessoas que compartilham seus interesses e faça novos amigos.",
    },
    {
      icon: Star,
      title: "Experiências Únicas",
      description: "Participe de eventos exclusivos e avalie suas experiências para ajudar outros usuários.",
    },
    {
      icon: Shield,
      title: "Segurança e Confiança",
      description: "Todos os eventos são verificados e organizadores passam por processo de validação.",
    },
    {
      icon: Heart,
      title: "Impacto Social",
      description: "Promovemos eventos que fortalecem a comunidade e a cultura local.",
    },
    {
      icon: Zap,
      title: "Tecnologia Inovadora",
      description: "Plataforma moderna com recursos avançados para melhor experiência do usuário.",
    },
  ]

  const stats = [
    { number: "1.200+", label: "Usuários Ativos" },
    { number: "89", label: "Eventos Realizados" },
    { number: "45", label: "Organizadores" },
    { number: "4.7", label: "Avaliação Média" },
  ]

  const team = [
    {
      name: "Felipe de Almeida Farias",
      role: "Fundador",
      description: "Estudante IFMS",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Raphael do Nascimento Borgato",
      role: "Fundador",
      description: "Estudante IFMS",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      name: "Orientador",
      role: "Orientador",
      description: "Profesor IFMS",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sobre o Pokando</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Conectamos pessoas através de eventos culturais, sociais e comunitários, fortalecendo laços e criando
              experiências memoráveis.
            </p>
            <Badge className="bg-white/20 text-white text-lg px-4 py-2">Desde 2024 transformando comunidades</Badge>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Nossa Missão</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  O Pokando nasceu da necessidade de conectar pessoas que compartilham interesses comuns e fortalecer o
                  tecido social das comunidades através de eventos significativos.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Acreditamos que eventos bem organizados têm o poder de transformar vidas, criar oportunidades e
                  construir relacionamentos duradouros.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Conectar Pessoas</h4>
                      <p className="text-slate-600">Facilitar encontros entre pessoas com interesses similares</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-purple-600 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Fortalecer Comunidades</h4>
                      <p className="text-slate-600">Promover eventos que beneficiem toda a comunidade local</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-600 rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Democratizar Acesso</h4>
                      <p className="text-slate-600">Tornar eventos culturais acessíveis para todos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Pessoas em evento comunitário"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">1.200+</p>
                      <p className="text-sm text-slate-600">Vidas impactadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-slate-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Nossos Números</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-slate-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Por que escolher o Pokando?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Nossa Equipe</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{member.name}</h3>
                    <Badge variant="secondary" className="mb-4">
                      {member.role}
                    </Badge>
                    <p className="text-slate-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Faça Parte da Nossa Comunidade</h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de pessoas que já descobriram eventos incríveis através do Pokando.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Criar Conta Gratuita
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
                >
                  Explorar Eventos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
