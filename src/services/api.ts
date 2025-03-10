import { Movie } from "../components/MovieCard"
import { mockMovies } from "../mockMovies"

export const getPopularMovies = async () => {
  // Call api here
  return mockMovies
}

export const searchMovies = async (searchQuery: string): Promise<Movie[]> => {
  const movies: Movie[] = mockMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))
  // Call api here
  return movies
}