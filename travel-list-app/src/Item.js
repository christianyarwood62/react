// React component, with some props for the functions above
export default function Item({item, onDeleteItem, onToggleItem}) {
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