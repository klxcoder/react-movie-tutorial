import { MouseEvent } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/MovieCard.css'

export type Movie = {
  id: number,
  url: string,
  title: string,
  release_date: string,
}

function MovieCard({
  movie,
}: {
  movie: Movie
}) {

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
  const favorite = isFavorite(movie.id)

  function onFavoriteClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (<div className="movie-card">
    <div className="movie-poster">
      <img src={movie.url} alt={movie.title} />
      <div className="movie-overlay">
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
        >♥</button>
      </div>
    </div>
    <div className="movie-info">
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
    </div>
  </div>)
}

export default MovieCard
