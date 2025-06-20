"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulação de diferentes tipos de usuário baseado no email
      let userType = "cliente"
      let userAccess = "CLIENTE"

      if (formData.email.includes("org")) {
        userType = "organizador"
        userAccess = "ORGANIZADOR"
      } else if (formData.email.includes("owner") || formData.email.includes("prop")) {
        userType = "proprietario"
        userAccess = "PROPRIETARIO"
      }

      // Armazenar dados do usuário
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          email: formData.email,
          nomeCompleto: "Usuário Teste",
          tipo: userType,
          acesso: userAccess,
          cpf: "123.456.789-00",
          rg: "12.345.678-9",
          telefone: "(11) 99999-9999",
          dataDeNascimento: "1990-01-01",
          foto: "/placeholder.svg?height=80&width=80",
        }),
      )

      // Redirecionamento baseado no tipo de usuário
      switch (userType) {
        case "proprietario":
          router.push("/dashboard/owner")
          break
        case "organizador":
          router.push("/dashboard/organizer")
          break
        default:
          router.push("/dashboard/client")
      }
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Bem-vindo de volta!</CardTitle>
          <CardDescription className="text-slate-600">Faça login para acessar sua conta no Pokando</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Cadastre-se aqui
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600 font-medium mb-2">Credenciais de demonstração:</p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                <strong>Cliente:</strong> cliente@teste.com
              </p>
              <p>
                <strong>Organizador:</strong> org@teste.com
              </p>
              <p>
                <strong>Proprietário:</strong> owner@teste.com
              </p>
              <p>
                <strong>Senha:</strong> qualquer senha
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
