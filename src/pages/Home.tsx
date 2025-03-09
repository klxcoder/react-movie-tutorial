import MovieCard from '../components/MovieCard'
import './Home.css'

function Home() {

  const movies: ({
    id: number,
    title: string,
    url: string,
    release_date: string,
  })[] = [
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

  const handleSearch = () => {
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
        />
        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
