import { useState } from "react";
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
import { useLocalStorageState } from "./custom-hook/useLocalStorageState";

import { useMovie } from "./custom-hook/useMovie";

export const apiKey = "5db7449e";
export const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");

  const [movies, isLoading, error] = useMovie(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

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
