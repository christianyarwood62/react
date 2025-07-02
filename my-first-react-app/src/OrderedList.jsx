function List() {

    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    
    return <div>
    <h1>Test title</h1>
    <svg>
      <circle cx="25" cy="75" r="20" stroke="green" stroke-width="2" />
    </svg>
    <form>
      <input type="text" />
    </form>

    <h1>Animals: </h1>
      <ul>
        {animals.map((animal) => {
          return <li key={animal}>{animal}</li>;
        })}
      </ul>
  </div>
}

export {List}