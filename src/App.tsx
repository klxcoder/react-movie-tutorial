import './App.css'
import MovieCard from './components/MovieCard'

function App() {

  return (
    <div>
      <MovieCard
        movie={{
          title: "Film",
          url: "",
          release_date: "2024",
        }}
      />
    </div>
  )
}

export default App
