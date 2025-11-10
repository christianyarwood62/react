import { useState } from "react";

// React component for the form, onAddItems passed as props
export default function Form({ onAddItems }) {
  // State management: sets the form initilisation no text and a quantity
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Function to handle the form submission
  function handleSubmit(e) {
    // Prevents the form from triggering a rerender when it is submitted
    e.preventDefault();

    // If there is no text in the form input, dont do anything
    if (!description) return;

    // Create a new item using the state above
    const newItem = { description, quantity, packed: false, id: Date.now() };

    // use the props declared above to run the function on the new item
    onAddItems(newItem);

    // Reset the form state inputs
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😁</h3>
      {/* This allows user to update state when selecting the quantity in the form */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* This updates the description state when you type something in */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
