"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FavoriteEvent {
  id: number
  title: string
  date: string
  location: string
  image: string
  addedAt: string
}

interface AnimatedHeartProps {
  eventId: number
  eventTitle: string
  eventDate: string
  eventLocation: string
  eventImage: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedHeart({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  eventImage,
  size = "sm",
  className = "",
}: AnimatedHeartProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Verificar se está nos favoritos
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favoriteEvents")
      if (favorites) {
        const favoritesList: FavoriteEvent[] = JSON.parse(favorites)
        setIsLiked(favoritesList.some((fav) => fav.id === eventId))
      }
    }
  }, [eventId])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!mounted) return

    setIsAnimating(true)

    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favoriteEvents")
      const favoritesList: FavoriteEvent[] = favorites ? JSON.parse(favorites) : []

      if (isLiked) {
        // Remover dos favoritos
        const newFavorites = favoritesList.filter((fav) => fav.id !== eventId)
        localStorage.setItem("favoriteEvents", JSON.stringify(newFavorites))
        setIsLiked(false)
      } else {
        // Adicionar aos favoritos
        const newFavorite: FavoriteEvent = {
          id: eventId,
          title: eventTitle,
          date: eventDate,
          location: eventLocation,
          image: eventImage,
          addedAt: new Date().toISOString(),
        }
        const newFavorites = [...favoritesList, newFavorite]
        localStorage.setItem("favoriteEvents", JSON.stringify(newFavorites))
        setIsLiked(true)
      }
    }

    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 300)
  }

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  if (!mounted) {
    return (
      <Button variant="secondary" size={size} className={`bg-white/80 hover:bg-white ${className}`}>
        <Heart className={`${sizeClasses[size]} text-slate-600`} />
      </Button>
    )
  }

  return (
    <Button
      variant="secondary"
      size={size}
      onClick={handleClick}
      className={`
        relative overflow-hidden transition-all duration-200
        ${isLiked ? "bg-red-50 hover:bg-red-100" : "bg-white/80 hover:bg-white"}
        ${className}
      `}
    >
      <Heart
        className={`
          ${sizeClasses[size]} transition-all duration-300 ease-out
          ${isLiked ? "fill-red-500 text-red-500" : "text-slate-600"}
          ${isAnimating ? "scale-125" : "scale-100"}
        `}
      />

      {/* Animação de "explosão" quando curtir */}
      {isAnimating && isLiked && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping" />
          <div className="absolute inset-0 bg-red-300 rounded-full opacity-40 animate-pulse" />
        </div>
      )}
    </Button>
  )
}
