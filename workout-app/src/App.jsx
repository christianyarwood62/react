import { useState } from "react";

const initialExercises = [
  {
    name: "Bench Press",
    instructions: {
      1: "Lie flat on the bench holding the barbell shoulder width",
      2: "Retract scapula and have elbows at 45 degree angle",
      3: "Breath in and lower bar to middle of chest",
      4: "Repeat for reps",
    },
    id: "bench press",
  },
  {
    name: "Chest fly",
    instructions: {
      1: "Sit with pad against back and grip the handles",
      2: "Slightly elbows with and squeeze chest to bring handles in front of chest",
      3: "Return to starting position while inhaling",
      4: "Repeat for reps",
    },
    id: "chest fly",
  },
  {
    name: "Chest Dip",
    instructions: {
      1: "Hold body from arms extended above dip bars",
      2: "Slowly lower body with torso leaning forward  and elbows slightly flared",
      3: "From this position, squeeze chest and bring body back to starting position",
      4: "Repeat for reps",
    },
    id: "chest dip",
  },
];

function App() {
  const [exercises, setExercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);

  function handleSelection(exercise) {
    //
    setSelectedExercise((cur) => (cur?.id === exercise.id ? null : exercise));
  }

  return (
    <div className="app">
      <div className="exercise-details">
        <WorkoutList
          exercises={exercises}
          className="workout-list"
          onSelection={handleSelection}
          selectedExercise={selectedExercise}
        />
        {selectedExercise && (
          <ExerciseDetails
            className="exercise-details"
            selectedExercise={selectedExercise}
          />
        )}
      </div>
      <RoutineList className="routine-list" />
    </div>
  );
}

export default App;

function WorkoutList({ exercises, onSelection, selectedExercise }) {
  return (
    <div className="container">
      {exercises.map((exercise) => (
        <Exercise
          exercise={exercise}
          key={exercise.id}
          onSelection={onSelection}
          selectedExercise={selectedExercise}
        >
          {exercise.name}
        </Exercise>
      ))}
    </div>
  );
}

function Exercise({ exercise, children, onSelection, selectedExercise }) {
  const isSelected = selectedExercise?.id === exercise.id;

  return (
    <div className="exercise">
      <p>{children}</p>
      <button onClick={() => onSelection(exercise)}>
        {isSelected ? "Hide details" : "Show details"}
      </button>
      <button>Add to Workout</button>
    </div>
  );
}

function ExerciseDetails({ selectedExercise }) {
  return (
    <div>
      <div className="container">
        Exercise {selectedExercise.name} <button>Close</button>
      </div>
    </div>
  );
}
function RoutineList() {
  return <div className="container">This is the exercise routine planned</div>;
}
