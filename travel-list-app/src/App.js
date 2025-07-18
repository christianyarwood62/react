import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];


export default function App() {

  // Set the state for the item array, initialise with no items
  const [items, setItems] = useState([]);

  // function to handle adding items to the item array
  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  // Function that filters items based on id to handle deleting from item array
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Function to handle toggling packing on the items by setting the packing to opposite (true/false) when it matches the id
  function handleToggleItem(id) {
    setItems((items) => 
      items.map((item) => 
        item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleDeleteList() {
    const confirmed = window.confirm('Are you sure you want to clear the list?');

    if (confirmed === true) {
      setItems([]);
    }
  }

  // The components in the app, functions declared above are passed as props to each component below, prop naming is arbitrary
  return <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems}/>
    <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onDeleteList={handleDeleteList}/>
    <Stats items={items}/>
  </div>
}

// React component to render the title
function Logo() {
  return <h1>Holiday Packing List 🛫</h1>
}

// React component for the form, onAddItems passed as props
function Form({onAddItems}) {

  // State management: sets the form initilisation no text and a quantity
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Function to handle the form submission
  function handleSubmit(e) {
    // Prevents the form from triggering a rerender when it is submitted
    e.preventDefault();

    // If there is no text in the form input, dont do anything
    if (!description) return;

    // Create a new item using the state above
    const newItem = {description, quantity, packed: false, id: Date.now()};

    // use the props declared above to run the function on the new item
    onAddItems(newItem);

    // Reset the form state inputs
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😁</h3>
      {/* This allows user to update state when selecting the quantity in the form */}
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1)
        .map(num => <option value={num} key={num}>
          {num}
        </option>)}
      </select>
      {/* This updates the description state when you type something in */}
      <input type='text' placeholder="Item..." value={description}
      onChange={(e) => setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  )
}

// React component for the packing list displayed under the form, using props for the functions declared at the top
function PackingList({items, onDeleteItem, onToggleItem, onDeleteList}) {

  // State declaration to handle which sort by is applied
  const [sortBy, setSortBy] = useState('input');

  // Initiliase an empty array to have as a copy for the items array, which we can apply a sort function
  let sortedItems;

  // Let the sortedItems array be the items array as it was added
  if (sortBy === 'input') {
    sortedItems = items;
  }
  
  // Use slice function to create a copy of items array
  // localCompare compares the integer difference between the first letters
  if (sortBy === 'description') {
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  }

  // 
  if (sortBy === 'packed') {
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {/* Uses the map function to run through each item in the item array and pass down some props */}
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value='input'>Sort by Input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>

        <button onClick={onDeleteList}>Clear List</button>
      </div>
    </div>
  )
}

// React component, with some props for the functions above
function Item({item, onDeleteItem, onToggleItem}) {
  return (
    <li>
      {/* Remember to use callback function otherwise react does it immediately, not upon rendering */}
      <input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)}></input>
      {/* Conditional rendering based on the packed prop to set a style */}
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      {/* Remember to use the callback function */}
      <button onClick={() => {onDeleteItem(item.id)}}>❌</button>
    </li>
  )
}

// React component for the stats at the bottom of the page, notice items is passed as props for the state declared at the top

function Stats({items}) {

  // Conditional if statement when there are no items
  if (!items.length) {
    return (
      <p className="stats">
        <em>
          Add some items!
        </em>
      </p>
    );
  };

  // Because items was passed as prosp, can derive state here for attributes
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked/numItems) * 100);

  return <footer className="stats">
    <em>
      {percentage === 100 
        ? "You have everything packed, have fun on holiday!" 
        : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%) ❤️`}
    </em>
  </footer>
}

