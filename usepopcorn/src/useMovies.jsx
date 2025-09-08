import { useState, useEffect } from "react";

const KEY = "71f8f38f";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // a blank string is falsy

  // This shouldnt really be a useEffect hook (instead should be an event handle function) because on mount, it doesnt fetch any data
  useEffect(
    function () {
      //   callback?.();

      const controller = new AbortController(); // use this in the cleanup function. This is a browser API, just like the fetch function

      async function fetchMovies() {
        try {
          setError(""); // Need to reset error to empty string so it avoids the catch statement when you try and update the search bar
          setIsLoading(true);

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // This is the recipe to use with the controller const above
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          // This if statement is there because the controller abort below sees the abort as an error and will stop the component displaying the (final typed) movie when rendering
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies(); // Have to call the function because useEffect only declares the function

      // This is the cleanup function.
      return function () {
        controller.abort(); // This cancels fetch request everytime theres a new keystroke, to avoid fetching every time a new letter is typed
      };
    },
    [query]
  ); // Empty [] means that this effect will only be executed when it first mounts, i.e. after first render
  // a filled [] means theres a dependency on a variable
  return { movies, isLoading, error };
}
