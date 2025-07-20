import { useState } from "react";
import Logo from './Logo';
import Form from './Form';
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  // Function to handle deleting the list 
  function handleDeleteList() {
    // confirmed becomes true if user clicks yes
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