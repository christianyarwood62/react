import { useState } from "react";

function App() {
  return <WorkoutList />;
}

export default App;

function WorkoutList() {
  return (
    <div className="container">
      <Exercise>Exercise 1</Exercise>
      <Exercise>Exercise 2</Exercise>
      <Exercise>Exercise 3</Exercise>
    </div>
  );
}

function Exercise({ children }) {
  return (
    <div className="exercise">
      <p>{children}</p>
      <button>Show details</button>
      <button>Add to Workout</button>
    </div>
  );
}
