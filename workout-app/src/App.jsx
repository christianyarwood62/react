import { useState } from "react";

const exercises = [
  {
    name: "Bench Press",
    instructions: {
      1: "Lie flat on the bench holding the barbell shoulder width",
      2: "Retract scapula and have elbows at 45 degree angle",
      3: "Breath in and lower bar to middle of chest",
      4: "Repeat for reps",
    },
  },
  {
    name: "Chest fly",
    instructions: {
      1: "Sit with pad against back and grip the handles",
      2: "Slightly elbows with and squeeze chest to bring handles in front of chest",
      3: "Return to starting position while inhaling",
      4: "Repeat for reps",
    },
  },
  {
    name: "Chest Dip",
    instructions: {
      1: "Hold body from arms extended above dip bars",
      2: "Slowly lower body with torso leaning forward  and elbows slightly flared",
      3: "From this position, squeeze chest and bring body back to starting position",
      4: "Repeat for reps",
    },
  },
];

function App() {
  const [isExerciseDetailsOpen, setIsExerciseDetailsOpen] = useState(false);

  function handleShowExerciseDetails() {
    setIsExerciseDetailsOpen(!isExerciseDetailsOpen);
    console.log("hi");
  }

  return (
    <div className="app">
      <div className="exercise-details">
        <WorkoutList
          className="workout-list"
          handleShowExerciseDetails={handleShowExerciseDetails}
        />
        <ExerciseDetails
          className="exercise-details"
          isExerciseDetailsOpen={isExerciseDetailsOpen}
        />
      </div>
      <RoutineList className="routine-list" />
    </div>
  );
}

export default App;

function WorkoutList({ handleShowExerciseDetails }) {
  return (
    <div className="container">
      {exercises.map((exercise) => (
        <Exercise handleShowExerciseDetails={handleShowExerciseDetails}>
          {exercise.name}
        </Exercise>
      ))}
    </div>
  );
}

function Exercise({ children, handleShowExerciseDetails }) {
  return (
    <div className="exercise">
      <p>{children}</p>
      <button onClick={() => handleShowExerciseDetails()}>Show details</button>
      <button>Add to Workout</button>
    </div>
  );
}

function ExerciseDetails({ isExerciseDetailsOpen }) {
  return (
    <div>
      {isExerciseDetailsOpen && (
        <div className="container">
          Exercise xx <button>Open</button>
        </div>
      )}
    </div>
  );
}
function RoutineList() {
  return <div className="container">This is the exercise routine planned</div>;
}
