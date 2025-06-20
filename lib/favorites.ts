"use client"

export interface FavoriteEvent {
  id: number
  title: string
  date: string
  location: string
  image: string
  addedAt: string
}

// Simulação de localStorage para favoritos
export const getFavoriteEvents = (): FavoriteEvent[] => {
  if (typeof window === "undefined") return []
  const favorites = localStorage.getItem("favoriteEvents")
  return favorites ? JSON.parse(favorites) : []
}

export const addToFavorites = (event: FavoriteEvent) => {
  if (typeof window === "undefined") return
  const favorites = getFavoriteEvents()
  const isAlreadyFavorite = favorites.some((fav) => fav.id === event.id)

  if (!isAlreadyFavorite) {
    const newFavorites = [...favorites, { ...event, addedAt: new Date().toISOString() }]
    localStorage.setItem("favoriteEvents", JSON.stringify(newFavorites))
  }
}

export const removeFromFavorites = (eventId: number) => {
  if (typeof window === "undefined") return
  const favorites = getFavoriteEvents()
  const newFavorites = favorites.filter((fav) => fav.id !== eventId)
  localStorage.setItem("favoriteEvents", JSON.stringify(newFavorites))
}

export const isFavorite = (eventId: number): boolean => {
  if (typeof window === "undefined") return false
  const favorites = getFavoriteEvents()
  return favorites.some((fav) => fav.id === eventId)
}

// Arquivo removido - funcionalidade movida diretamente para os componentes
