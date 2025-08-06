import { useEffect, useState } from "react";
import { Box } from "./components/Box";
import { ErrorMessage } from "./components/ErrorMessage";
import { Loader } from "./components/Loader";
import { Main } from "./components/Main";
import { MovieDetails } from "./components/MovieDetails";
import { MovieList } from "./components/MovieList";
import { NavBar } from "./components/NavBar";
import { NumResults } from "./components/NumResults";
import { WatchedMovieList } from "./components/WatchedMovieList";
import { WatchedSummary } from "./components/WatchedSummary";

export const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const apiKey = "5db7449e";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");

  function handleDeleteWatchedMovie(movie) {
    setWatched(watched.filter(watchedMovie => watchedMovie.imdbID !== movie.imdbID));
  }

  function handleSelectedMovie(id) {
    if (selectedId === id) return setSelectedId(null);
    setSelectedId(id);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  useEffect(() => {
    // create a controller instance
    const controller = new AbortController();
    // create a signal from that controller
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, { signal });
        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar query={query} setQuery={setQuery}>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box movies={movies}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onDeleteWatchedMovie={handleDeleteWatchedMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
