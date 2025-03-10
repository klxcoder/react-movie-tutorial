import { FormEvent, useEffect, useState } from 'react'
import MovieCard, { Movie } from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api'

function Home() {

  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies: Movie[] = await getPopularMovies();
        if (!popularMovies) {
          throw Error('FetchMoviesError: Can not fetch Movies')
        }
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...")
      } finally {
        setLoading(false);
      }
    }
    loadPopularMovies()
  }, [])

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return
    setLoading(true)
    try {
      const searchResults: Movie[] = await searchMovies(searchQuery)
      if (!searchResults) {
        throw Error('FetchMoviesError: Can not search Movies')
      }
      setMovies(searchResults)
      setError('')
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...")
    } finally {
      setLoading(false);
    }
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
