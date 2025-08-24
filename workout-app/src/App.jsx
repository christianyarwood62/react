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

const initialExerciseRoutine = [];

function App() {
  const [exercises, setExercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseRoutine, setExerciseRoutine] = useState(
    initialExerciseRoutine
  );
  const [chosenExerciseForRoutine, setChosenExerciseForRoutine] =
    useState(null);

  function handleSelection(exercise) {
    //
    setSelectedExercise((cur) => (cur?.id === exercise.id ? null : exercise));
  }

  function handleAddExerciseToRoutine(exercise) {
    setChosenExerciseForRoutine(exercise);
    setExerciseRoutine((exerciseRoutine) => [...exerciseRoutine, exercise]);
  }

  return (
    <div className="app">
      <div className="exercise-details">
        <WorkoutList
          exercises={exercises}
          className="workout-list"
          onSelection={handleSelection}
          selectedExercise={selectedExercise}
          onAddToWorkout={handleAddExerciseToRoutine}
        />
        {selectedExercise && (
          <ExerciseDetails
            className="exercise-details"
            selectedExercise={selectedExercise}
            onSelection={handleSelection}
          />
        )}
      </div>
      <RoutineList
        className="routine-list"
        exerciseRoutine={exerciseRoutine}
        chosenExerciseForRoutine={chosenExerciseForRoutine}
      />
    </div>
  );
}

export default App;

function WorkoutList({
  exercises,
  onSelection,
  selectedExercise,
  onAddToWorkout,
}) {
  return (
    <div className="container">
      <h1>Exercise list</h1>
      {exercises.map((exercise) => (
        <Exercise
          exercise={exercise}
          key={exercise.id}
          onSelection={onSelection}
          selectedExercise={selectedExercise}
          onAddToWorkout={onAddToWorkout}
        >
          {exercise.name}
        </Exercise>
      ))}
    </div>
  );
}

function Exercise({
  exercise,
  children,
  onSelection,
  selectedExercise,
  onAddToWorkout,
}) {
  const isSelected = selectedExercise?.id === exercise.id;

  return (
    <div className="exercise">
      <p>{children}</p>
      <button onClick={() => onSelection(exercise)}>
        {isSelected ? "Hide details" : "Show details"}
      </button>
      <button onClick={() => onAddToWorkout(exercise)}>Add to Workout</button>
    </div>
  );
}

function ExerciseDetails({ selectedExercise, onSelection }) {
  return (
    <div>
      <div className="container">
        <h2>{selectedExercise.name}</h2>
        <button onClick={() => onSelection(selectedExercise)}>Close</button>
        {selectedExercise.instructions.map((instruction, step) => (
          <div key={step + 1}>
            Step {step + 1}: {instruction}
          </div>
        ))}
      </div>
    </div>
  );
}
function RoutineList({ exerciseRoutine, chosenExerciseForRoutine }) {
  return (
    <div>
      <div className="container">
        {chosenExerciseForRoutine ? (
          <h2>This is your planned routine:</h2>
        ) : (
          <h2>Add your first exercise!</h2>
        )}
        {chosenExerciseForRoutine &&
          exerciseRoutine.map((exercise) => <div>{exercise.name}</div>)}

        {/* {chosenExerciseForRoutine
          ? `This is the exercise routine planned:` + <div>hi</div>
          : "Add your first exercise to the routine!"} */}
        {/* {exerciseRoutine.map((exercise) => (
          <div>{exercise.name}</div>
        ))} */}
      </div>
    </div>
  );
}
