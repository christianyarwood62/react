// React component for the stats at the bottom of the page, notice items is passed as props for the state declared at the top
export default function Stats({items}) {

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