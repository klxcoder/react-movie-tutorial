import { FormEvent, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css'
import { getPopularMovies } from '../services/api'

type Movie = {
  id: number,
  title: string,
  url: string,
  release_date: string,
}

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
          const movies: Movie[] = [
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
          setMovies(movies);
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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    alert(searchQuery);
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
          {movies.map(movie => (
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
