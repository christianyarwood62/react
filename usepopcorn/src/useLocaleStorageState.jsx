import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    // when initial state depends on some sort of computation, always pass in a pure function to run
    // DONT DO THIS: useState(localStorage.getItem('watched')) because this would get called on every render
    const storedValue = localStorage.getItem(key);
    return storedValue
      ? JSON.parse(storedValue) // need the JSON.parse because we used stringify below to
      : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
