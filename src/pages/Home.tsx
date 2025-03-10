import { FormEvent, useEffect, useState } from 'react'
import MovieCard, { Movie } from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api'

function useMoviesData() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadMovies = async (fetchFunction: () => Promise<Movie[]>) => {
    setLoading(true)
    try {
      const movies: Movie[] = await fetchFunction()
      if (!movies) {
        throw Error('FetchMoviesError: Can not fetch Movies')
      }
      setMovies(movies)
      setError('')
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...")
    } finally {
      setLoading(false);
    }
  }

  return {
    movies, setMovies,
    error, setError,
    loading, setLoading,
    loadMovies,
  }
}

function Home() {

  const [searchQuery, setSearchQuery] = useState("")
  const {
    movies,
    error,
    loading,
    loadMovies,
  } = useMoviesData()

  useEffect(() => {
    loadMovies(getPopularMovies)
  }, [loadMovies])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return
    loadMovies(() => searchMovies(searchQuery))
  }

  return (
    <div className="home">
      <form
        onSubmit={handleSearch}
        className="search-form"
      >
        <input
          type="text"
          placeholder="Search for movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">
          Loading...
        </div>
      ) : (
        <div className="movies-grid">
          {movies?.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
