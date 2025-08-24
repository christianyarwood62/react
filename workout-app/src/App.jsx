import { useState } from "react";

const initialExercises = [
  {
    name: "Bench Press",
    instructions: [
      "Lie flat on the bench holding the barbell shoulder width",
      "Retract scapula and have elbows at 45 degree angle",
      "Breath in and lower bar to middle of chest",
      "Repeat for reps",
    ],
    id: "bench press",
  },
  {
    name: "Chest fly",
    instructions: [
      "Sit with pad against back and grip the handles",
      "Slightly elbows with and squeeze chest to bring handles in front of chest",
      "Return to starting position while inhaling",
      "Repeat for reps",
    ],
    id: "chest fly",
  },
  {
    name: "Chest Dip",
    instructions: [
      "Hold body from arms extended above dip bars",
      "Slowly lower body with torso leaning forward  and elbows slightly flared",
      "From this position, squeeze chest and bring body back to starting position",
      "Repeat for reps",
    ],
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
            onSelection={handleSelection}
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
      <button
        onClick={() =>
          onSelection(exercise) & console.log({ selectedExercise })
        }
      >
        {isSelected ? "Hide details" : "Show details"}
      </button>
      <button>Add to Workout</button>
    </div>
  );
}

function ExerciseDetails({ selectedExercise, onSelection }) {
  return (
    <div>
      <div className="container">
        Exercise {selectedExercise.name}
        <button onClick={() => onSelection(selectedExercise)}>Close</button>
        {selectedExercise.instructions.map((instruction, step) => (
          <div>
            Step {step + 1}: {instruction}
          </div>
        ))}
      </div>
    </div>
  );
}
function RoutineList() {
  return <div className="container">This is the exercise routine planned</div>;
}
