import { FormEvent, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api'

type Movie = {
  id: number,
  title: string,
  url: string,
  release_date: string,
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "John Wick",
    url: '',
    release_date: "2020",
  },
  {
    id: 2,
    title: "Terminator",
    url: '',

    release_date: "1999",
  },
  {
    id: 3,
    title: "The Matrix",
    url: '',
    release_date: "1998",
  },
]

function Home() {

  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (!popularMovies) {
          setMovies(mockMovies);
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
      const searchResults = await searchMovies(searchQuery)
      if (!searchResults) {
        const movies = mockMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))
        setMovies(movies)
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
