import { useState } from "react";

const initialExercises = [
  {
    name: "Bench Press",
    category: "chest",
    instructions: [
      "Lie flat on the bench holding the barbell shoulder width",
      "Retract scapula and have elbows at 45 degree angle",
      "Breath in and lower bar to middle of chest",
      "Repeat for reps",
    ],
    id: "bench-press",
    history: [
      {
        date: "01-01-2025",
        sets: 10,
        reps: 12,
      },
    ],
  },
  {
    name: "Chest fly",
    category: "chest",
    instructions: [
      "Sit with pad against back and grip the handles",
      "Slightly elbows with and squeeze chest to bring handles in front of chest",
      "Return to starting position while inhaling",
      "Repeat for reps",
    ],
    id: "chest-fly",
    history: [],
  },
  {
    name: "Bicep Curl",
    category: "arms",
    instructions: [
      "Stand/sit with dumbells at rest next to sides",
      "Keep dumbell in front with pinkie squeeze to the sky",
      "Pull the dumbell up, keeping momentum at a minimum",
      "Repeat for reps",
    ],
    id: "bicep-curl",
    history: [],
  },
  {
    name: "Chest Dip",
    category: "chest",
    instructions: [
      "Hold body from arms extended above dip bars",
      "Slowly lower body with torso leaning forward  and elbows slightly flared",
      "From this position, squeeze chest and bring body back to starting position",
      "Repeat for reps",
    ],
    id: "chest-dip",
    history: [],
  },
  {
    name: "Squat",
    category: "legs",
    instructions: [
      "Retract shoulder blade and hold barbell on traps as low as is comfortable",
      "With core tight, lower bar while keeping knees over toes",
      "Continue until thighs are parallel to floor, and return to original position",
      "Repeat for reps",
    ],
    id: "squat",
    history: [],
  },
  {
    name: "Shoulder Press",
    category: "shoulders",
    instructions: [
      "Stand/sit with dumbells resting on shoulders",
      "Retract shoulder blades and press dumbells up and out front ",
      "Imagine trying to squeeze a pencil at top of motion, return to original position",
      "Repeat for reps",
    ],
    id: "chest dip",
    history: [],
  },
];

// const workoutHistory = [{ test }];

const initialExerciseRoutine = [];

const tab1 = "Exercises";
const tab2 = "Start a workout";
const tab3 = "Exercise history";

function App() {
  const [tab, setTab] = useState(tab1);
  const [exercises, setExercises] = useState(initialExercises);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseRoutine, setExerciseRoutine] = useState(
    initialExerciseRoutine
  );
  const [chosenExerciseForRoutine, setChosenExerciseForRoutine] =
    useState(null);

  function handleSetTab(tab) {
    setTab(tab);
  }

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
      <nav>
        <button onClick={() => handleSetTab(tab1)}>{tab1}</button>
        <button onClick={() => handleSetTab(tab2)}>{tab2}</button>
        <button onClick={() => handleSetTab(tab3)}>{tab3}</button>
      </nav>
      {tab === tab1 && (
        <div className="exercise-details-tab">
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
      )}
      {tab === tab2 && (
        <WorkoutTab
          exerciseRoutine={exerciseRoutine}
          chosenExerciseForRoutine={chosenExerciseForRoutine}
          onAddToWorkout={handleAddExerciseToRoutine}
        />
      )}
      {tab === tab3 && <ExerciseHistoryTab />}
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
      <h1>{tab1}</h1>
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
    </div>
  );
}

function ExerciseDetails({ selectedExercise, onSelection }) {
  return (
    <div>
      <div className="container">
        <h2>{selectedExercise.name}</h2>
        <button onClick={() => onSelection(selectedExercise)}>X</button>
        <button>History</button>
        <button>Records</button>
        {selectedExercise.instructions.map((instruction, step) => (
          <div key={step + 1}>
            Step {step + 1}: {instruction}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutTab({
  exerciseRoutine,
  chosenExerciseForRoutine,
  onAddToWorkout,
}) {
  return (
    <div>
      <TemplateList onAddToWorkout={onAddToWorkout} />
      <RoutineList
        className="routine-list"
        exerciseRoutine={exerciseRoutine}
        chosenExerciseForRoutine={chosenExerciseForRoutine}
      />
      <AddExerciseForm />
    </div>
  );
}

function TemplateList({ onAddToWorkout }) {
  return (
    <div className="container">
      <h2>Templates</h2>
      <TemplateWorkout onAddToWorkout={onAddToWorkout} />
    </div>
  );
}

function TemplateWorkout({ onAddToWorkout }) {
  return (
    <div className="container">
      <button>Create Template</button>
      <h3>Template xxx</h3>
      <p>Bench Press</p>
      <button onClick={() => onAddToWorkout("bench press")}>
        Add to Workout
      </button>
      <p>Shoulder press</p>
      <button onClick={() => onAddToWorkout("Shoulder press")}>
        Add to Workout
      </button>
    </div>
  );
}
function AddExerciseForm() {
  const [weightForm, setWeightForm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Input metrics:</h2>

      <div>
        <label>Weight:</label>
        <input onChange={(e) => setWeightForm(e.target.value)}></input> kg
      </div>

      <div>
        <label>Sets:</label>
        <input></input>
      </div>

      <div>
        <label>Reps:</label>
        <input></input>
      </div>

      <button>Add to routine</button>
    </form>
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
          exerciseRoutine.map((exercise) => <div>{exercise}</div>)}
      </div>
    </div>
  );
}

function ExerciseHistoryTab() {
  return (
    <div>
      <label>test</label>
      <select defaultValue="-">
        <option>test</option>
        <option>dgsg</option>
      </select>
    </div>
  );
}
