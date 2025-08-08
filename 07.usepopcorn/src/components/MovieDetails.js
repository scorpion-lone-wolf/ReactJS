import { useEffect, useState } from "react";
import { apiKey } from "../App";
import { useKey } from "../custom-hook/useKey";
import { Loader } from "./Loader";
import StarRating from "./StarRating";

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [selectedMovieDetails, setSelectedMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useKey("Escape", onCloseMovie);

  // check if the particluar imdbID is already in watchedmovie or not
  const isWatched = watched.filter(movie => movie.imdbID === selectedId).length > 0;
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovieDetails;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
        const data = await res.json();
        setSelectedMovieDetails(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie | ${title ?? "..."}`;
    //cleanuo
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          ⬅️
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️ {imdbRating} IMDB rating</span>
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {isWatched ? (
            <p>You have already rated this Movie with ⭐️ {watchedUserRating} </p>
          ) : (
            <>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add
                </button>
              )}
            </>
          )}
        </div>
        <p>{plot}</p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
