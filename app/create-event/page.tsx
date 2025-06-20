"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Upload, Eye, EyeOff, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addEvent } from "@/lib/events-data"

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    date: "",
    time: "",
    endTime: "",
    location: "",
    address: "",
    category: "",
    maxParticipants: "",
    isPublic: true,
    targetAudience: "",
    requirements: "",
    image: null as File | null,
    tags: [] as string[],
    ticketName: "",
    ticketPrice: "",
    ticketDescription: "",
  })
  const [currentTag, setCurrentTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

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
    "Outros",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de criação de evento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Criar novo evento
      const newEvent = {
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription || formData.description,
        date: formData.date,
        time: formData.time,
        endTime: formData.endTime || "23:00",
        location: formData.location,
        address: formData.address || formData.location,
        category: formData.category,
        participants: 0,
        maxParticipants: Number.parseInt(formData.maxParticipants) || 100,
        rating: 0,
        totalReviews: 0,
        price: formData.ticketPrice ? `R$ ${formData.ticketPrice}` : "Gratuito",
        organizer: {
          name: "Você",
          avatar: "/placeholder.svg?height=60&width=60",
          verified: false,
          rating: 0,
          totalEvents: 1,
        },
        venue: {
          name: formData.location,
          capacity: Number.parseInt(formData.maxParticipants) || 100,
          address: formData.address || formData.location,
          amenities: ["Ar Condicionado", "Acessibilidade"],
        },
        images: ["/placeholder.svg?height=400&width=600"],
        tickets: [
          {
            id: 1,
            name: formData.ticketName || "Entrada Geral",
            description: formData.ticketDescription || "Acesso ao evento",
            price: Number.parseFloat(formData.ticketPrice) || 0,
            available: Number.parseInt(formData.maxParticipants) || 100,
            total: Number.parseInt(formData.maxParticipants) || 100,
            benefits: ["Acesso ao evento"],
          },
        ],
        status: "Confirmado",
        tags: formData.tags,
      }

      // Adicionar evento à lista
      addEvent(newEvent)

      setSuccess(true)

      setTimeout(() => {
        router.push("/events")
      }, 2000)
    } catch (error) {
      console.error("Erro ao criar evento:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Evento Criado com Sucesso!</h2>
            <p className="text-slate-600 mb-6">
              Seu evento foi criado e já está disponível na lista de eventos. Você será redirecionado em breve.
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/organizer">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Criar Novo Evento</h1>
          </div>
          <Badge className="bg-purple-100 text-purple-700">Organizador</Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Defina as informações principais do seu evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Nome do Evento *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Workshop de Fotografia Digital"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Curta *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descrição resumida do evento (aparece nos cards)"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Descrição Completa</Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  placeholder="Descrição detalhada do evento, programação, o que está incluído, etc."
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Público-Alvo</Label>
                  <Input
                    id="targetAudience"
                    name="targetAudience"
                    placeholder="Ex: Iniciantes, Profissionais, Todas as idades"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags do Evento</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Date, Time and Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Data, Horário e Local
              </CardTitle>
              <CardDescription>Defina quando e onde seu evento acontecerá</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data do Evento *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Horário de Início *</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">Horário de Término</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Nome do Local *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Ex: Centro Cultural, Teatro Municipal"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Ex: Rua das Flores, 123 - Centro, São Paulo - SP"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Participants and Visibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participantes e Visibilidade
              </CardTitle>
              <CardDescription>Configure quantas pessoas podem participar e quem pode ver o evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Número Máximo de Participantes</Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  placeholder="Ex: 50"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  min="1"
                />
                <p className="text-sm text-slate-600">Deixe em branco para eventos sem limite de participantes</p>
              </div>

              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {formData.isPublic ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-600" />
                    )}
                    <Label htmlFor="isPublic" className="font-medium">
                      {formData.isPublic ? "Evento Público" : "Evento Privado"}
                    </Label>
                  </div>
                  <p className="text-sm text-slate-600">
                    {formData.isPublic
                      ? "Qualquer pessoa pode ver e se inscrever no evento"
                      : "Apenas pessoas com convite podem ver e participar"}
                  </p>
                </div>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ticket Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Ingresso</CardTitle>
              <CardDescription>Configure o ingresso principal do evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ticketName">Nome do Ingresso</Label>
                  <Input
                    id="ticketName"
                    name="ticketName"
                    placeholder="Ex: Entrada Geral, VIP, Meia Entrada"
                    value={formData.ticketName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Preço (R$)</Label>
                  <Input
                    id="ticketPrice"
                    name="ticketPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00 para eventos gratuitos"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketDescription">Descrição do Ingresso</Label>
                <Input
                  id="ticketDescription"
                  name="ticketDescription"
                  placeholder="Ex: Acesso completo ao evento, Welcome drink incluso"
                  value={formData.ticketDescription}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>Adicione detalhes extras e uma imagem para o evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="requirements">Requisitos ou Materiais Necessários</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Ex: Trazer notebook, conhecimento básico em design, etc."
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagem do Evento</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">Clique para fazer upload ou arraste uma imagem</p>
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("image")?.click()}>
                    Escolher Arquivo
                  </Button>
                  {formData.image && <p className="text-sm text-green-600 mt-2">✓ {formData.image.name}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/dashboard/organizer">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Criando Evento..." : "Criar Evento"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
