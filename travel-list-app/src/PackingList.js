import { useState } from "react";
import Item from "./Item";

// React component for the packing list displayed under the form, using props for the functions declared at the top
export default function PackingList({items, onDeleteItem, onToggleItem, onDeleteList}) {

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
  
        {/* sorting by input, sets the state to whatever you want */}
        <div className="actions">
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value='input'>Sort by Input order</option>
            <option value='description'>Sort by description</option>
            <option value='packed'>Sort by packed status</option>
          </select>
  
          {/* Button runs the handleDeletList function */}
          <button onClick={onDeleteList}>Clear List</button>
        </div>
      </div>
    )
  }