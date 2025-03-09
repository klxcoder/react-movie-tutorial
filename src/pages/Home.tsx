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

  return (
    <div className="home">
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
