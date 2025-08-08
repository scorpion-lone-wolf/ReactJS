import { useEffect, useState } from "react";
import { apiKey } from "../App";

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
    // callback?.();
    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return [movies, isLoading, error];
}
