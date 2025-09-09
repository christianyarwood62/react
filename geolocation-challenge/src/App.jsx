import { useState } from "react";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      // This is the successCallback function, it runs if the browser successfully gets user's position
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      // This is the second argument, it is the errorCallback function, so it only runs if the browser gets something wrong
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, getPosition, isLoading, error };
}

export default function App() {
  const { position, getPosition, isLoading, error } = useGeolocation(); // This destructures the object into individual variables
  const [countClicks, setCountClicks] = useState(0);

  const { lat, lng } = position;

  /* Can also destructure the above like this:

  const { position: {lat, lng}, getPosition, isLoading, error } = useGeolocation();
  const [countClicks, setCountClicks] = useState(0);

  */

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
