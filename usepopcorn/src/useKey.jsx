import { useEffect } from "react";

export function useKey(key, action) {
  // If you put this useEffect in the App component then it would always listen for Escape even when no MovieDetails are showing on the right
  useEffect(
    function () {
      function callback(e) {
        // This function is placed here and referenced below to ensure the event listener gets removed
        if (e.code.toLowerCase() === key.toLowerCase()) {
          // Normal way to compare strings, Put in toLowerCase so user can type in a capital for example
          action();
        }
      }

      // This is how to handle key events in react, you use useEffect and some plain js
      document.addEventListener("keydown", callback); // Can use this addEventListener (A DOM function) because this steps out of react and can use plain js

      return function () {
        document.removeEventListener("keydown", callback); // Have to add this remove line because everytime the page renders, it would add an additional event listener, causing memory issues
      };
    },
    [key, action] // Have to use this function in the dependency array
  );
}
