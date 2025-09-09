import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    // when initial state depends on some sort of computation, always pass in a pure function to run
    // DONT DO THIS: useState(localStorage.getItem('watched')) because this would get called on every render
    const storedValue = localStorage.getItem(key);
    return storedValue
      ? JSON.parse(storedValue) // need the JSON.parse because we used stringify below, so its '[]' below, not just []
      : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value)); // You have to stringify because localStorage can only store strings
    },
    [value, key]
  );

  return [value, setValue];
}
