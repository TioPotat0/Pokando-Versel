"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Upload, Shield, CheckCircle, ArrowLeft, User, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UpgradeOrganizerPage() {
  const [formData, setFormData] = useState({
    cpf: "",
    rg: "",
    telefone: "",
    endereco: "",
    cep: "",
    cidade: "",
    estado: "",
    experiencia: "",
    motivacao: "",
    acceptTerms: false,
  })
  const [files, setFiles] = useState({
    cpfFile: null as File | null,
    rgFile: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.acceptTerms) {
      setError("Você deve aceitar os termos e condições")
      setIsLoading(false)
      return
    }

    if (!files.cpfFile || !files.rgFile) {
      setError("É necessário enviar os documentos CPF e RG")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)

      setTimeout(() => {
        // Atualizar dados do usuário
        const userData = localStorage.getItem("user")
        if (userData) {
          const user = JSON.parse(userData)
          user.tipo = "organizador"
          user.acesso = "ORGANIZADOR"
          user.cpf = formData.cpf
          user.rg = formData.rg
          user.telefone = formData.telefone
          user.verificado = true
          localStorage.setItem("user", JSON.stringify(user))
        }
        router.push("/dashboard/organizer")
      }, 3000)
    } catch (err) {
      setError("Erro ao processar solicitação. Tente novamente.")
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }))
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Solicitação Enviada!</h2>
            <p className="text-slate-600 mb-6">
              Sua solicitação para se tornar Organizador foi enviada com sucesso. Nossa equipe irá analisar seus
              documentos em até 48 horas.
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-slate-500 mt-2">Redirecionando...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/client">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Tornar-se Organizador</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Para se tornar um Organizador no Pokando, precisamos verificar sua identidade e conhecer um pouco sobre
              sua experiência.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Benefícios de ser um Organizador</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-slate-700">Criar eventos ilimitados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-700">Selo de verificação</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-slate-700">Ferramentas avançadas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Dados necessários para verificação de identidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rg">RG *</Label>
                  <Input
                    id="rg"
                    name="rg"
                    placeholder="00.000.000-0"
                    value={formData.rg}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    placeholder="Sua cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="estado"
                    placeholder="SP"
                    value={formData.estado}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  placeholder="Rua, número, bairro"
                  value={formData.endereco}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload de Documentos</CardTitle>
              <CardDescription>Envie fotos ou digitalizações dos seus documentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* CPF Upload */}
              <div>
                <Label htmlFor="cpfFile">Documento CPF *</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">Clique para fazer upload do CPF</p>
                  <Input
                    id="cpfFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, "cpfFile")}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("cpfFile")?.click()}>
                    Escolher Arquivo
                  </Button>
                  {files.cpfFile && <p className="text-sm text-green-600 mt-2">✓ {files.cpfFile.name}</p>}
                </div>
              </div>

              {/* RG Upload */}
              <div>
                <Label htmlFor="rgFile">Documento RG *</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">Clique para fazer upload do RG</p>
                  <Input
                    id="rgFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, "rgFile")}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("rgFile")?.click()}>
                    Escolher Arquivo
                  </Button>
                  {files.rgFile && <p className="text-sm text-green-600 mt-2">✓ {files.rgFile.name}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Experiência e Motivação</CardTitle>
              <CardDescription>Conte-nos sobre sua experiência com eventos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experiencia">Experiência com Eventos</Label>
                <textarea
                  id="experiencia"
                  name="experiencia"
                  rows={4}
                  className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva sua experiência organizando eventos, mesmo que seja iniciante..."
                  value={formData.experiencia}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="motivacao">Por que quer ser Organizador?</Label>
                <textarea
                  id="motivacao"
                  name="motivacao"
                  rows={4}
                  className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conte-nos sua motivação para organizar eventos no Pokando..."
                  value={formData.motivacao}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))}
                />
                <Label htmlFor="acceptTerms" className="text-sm text-slate-600 leading-relaxed">
                  Eu declaro que todas as informações fornecidas são verdadeiras e aceito os{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Termos de Uso para Organizadores
                  </Link>{" "}
                  e a{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </Link>
                  . Entendo que informações falsas podem resultar no cancelamento da conta.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/dashboard/client">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Solicitação"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
