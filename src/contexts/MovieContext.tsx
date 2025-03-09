import { createContext, useState, useContext, useEffect, ReactNode } from "react"
import { Movie } from "../components/MovieCard"

type Value = {
  favorites: Movie[],
  addToFavorites: (movie: Movie) => void,
  removeFromFavorites: (movieId: number) => void,
  isFavorite: (movieId: number) => void,
}

const MovieContext = createContext<Value>({
  favorites: [],
  addToFavorites: () => { },
  removeFromFavorites: () => { },
  isFavorite: () => { },
})

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }: {
  children: ReactNode
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites")

    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (movie: Movie) => {
    setFavorites(prev => [...prev, movie])
  }

  const removeFromFavorites = (movieId: number) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
  }

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }

  return <MovieContext.Provider value={value}>
    {children}
  </MovieContext.Provider>
}