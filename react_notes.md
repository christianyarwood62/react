# Background
- React is a library for web and native interfaces, not a framework
- a library is like going to ikea with a home built already, do you need furniture
- a framework is like building a model home, with sets of blueprints and few limited choices
- difference in technical: inversion of control. in librarires, i am in charge of the flow of the app. In frameworks,the framework is in charge of the flow

# To create an app
1) make a repo on github
2) in CLI: 'npx create-react-app <name of app>'
3) press y to install create vite packages

# Vite
- a built tool that aims to provide faster development experience for web projects
- consists of 2 parts
    1) a dev server
    2) a build command that bundles the code

# Components
- components are reusable sections of an app, e.g. navbar, main section, form sign up, etc.
- components use JSX, not html
- to create a component:
    1) make a javascript function with CAPITAL, e.g. 
    ```
    function Greeting() {
        return <h1>Test</h1>;
    }

# JSX
- JSX is a suntax extension for javascript that lets you write HTML inside a javascript file
- basically a React createElement function
- allows rendering logic and markup to live together instead of sepaarte HTML and Javascript files

## Rules of JSX
1) return a single root element
    - if you want to wrap multiple things, you can use <> </>, and put what you want in the middle
2) Close all tags
    - e.g. use <input />, not just <input>
3) camelCase Most things
    - attributes of elements usually use something like ```stroke-width```. in JSX, use strokeWidth, e.g.
    ```
    function App() {
        return (
            <div className="container">
                <svg>
                <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
                </svg>
            </div>
        );
    }
    ```

## Javascript in JSX
- use "" or '' to pass strings in the return
- if you want to dynamically put text, use {}, e.g.
```
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

- any javascript function will work between curly braces
```
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```
- can only use curly braces:
    1) as text inside a JSX tag: <h1>{name}'s To Do List</h1> works, but <{tag}>Gregorio Y. Zara's To Do List</{tag}> will not.
    2) As attributes immediately following the = sign: src={avatar} will read the avatar variable, but src="{avatar}" will pass the string "{avatar}".
- to pass an objext in JSX, you must wrap the object in another pair of curly braces: person={{ name: "Hedy Lamarr", inventions: 5 }}., e.g.
```
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

## Rendering a list of elements in JSX
- JSX has ability to automatically render arrays
e.g.
```
function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];
  const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>)

  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        {animalsList}
      </ul>
    </div>
  );
}
```

## Rendering a list of components in JSX
- e.g.
```
function ListItem(props) {
  return <li>{props.animal}</li>
}

function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return <ListItem key={animal} animal={animal} />;
      })}
    </ul>
  );
}

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}
```

## Conditional rendering
- 3 ways:
    1) if statement
    2) ternary operator
    3) && operator
- e.g.
```
function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return animal.startsWith("L") ? <li key={animal}>{animal}</li> : null;
      })}
    </ul>
  );
}

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}
```
- or the && operator, this exampls runs if result of startsWith is true, otherwise if condition is false, it ignores the second part
```
function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return animal.startsWith("L") && <li key={animal}>{animal}</li>;
      })}
    </ul>
  );
}

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}
```
- **Common pitfall- dont use number for left side, make sure it returns a bollean value, because React will make the whole expression zero for example if the left side is 0, and will render 0 rather than nothing (null)

- **Props are arguments passed into components**


# Keys in React
- keys are special props for components
- to change a list, react would either:
    1) completely re render the list
    2) hunt down specific changed items and re render those (useskeys for this)
- key syntax:
```
<Component key={keyValue} />
//or
<div key={keyValue} />
```
- use crypto.randomUUID() to generate a unique ID
- keys should never be generated on the fly, i.e. while rendering the list, as a new key will get created for every render of the list, **Put the ID in the data itself, not the component**
- **JSX elements directly inside a map() call always need keys!**

- can use an index as a key value as calling it as a second parameter in map method, e.g. 
```
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function MonthList() {
  return (
    <ul>
      {/* here we are using the index as key */}
      {months.map((month, index) => (<li key={index}>{month}</li>))}
    </ul>
  );
}
```
- **when to use index as a key:**
    1) items in list dont have unique id
    2) list is static and wont change
    3) list wont be reordered or filtered

# Passing Data between components
- in react, data is transferred between parent components to child components via props, in a unidirectional way
- to duplicate components with variations, e.g.:
```
function Button(props) {
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize + 'px'
  };

  return (
    <button style={buttonStyle}>{props.text}</button>
  );
}

export default function App() {
  return (
    <div>
      <Button text="Click Me!" color="blue" fontSize={12} />
      <Button text="Don't Click Me!" color="red" fontSize={12} />
      <Button text="Click Me!" color="blue" fontSize={20} />
    </div>
  );
}
```
1) use props as an argument to the function and reference the properties in the component via props.propertyName
2) prop value are given to each component

## Prop destructuring
- can unpack props in the component arguments to produce more readable code:
```
function Button({ text, color, fontSize }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

export default function App() {
  return (
    <div>
      <Button text="Click Me!" color="blue" fontSize={12} />
      <Button text="Don't Click Me!" color="red" fontSize={12} />
      <Button text="Click Me!" color="blue" fontSize={20} />
    </div>
  );
}
```
- use default values to avoid repetition:
```
function Button({ text = "Click Me!", color = "blue", fontSize = 12 }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

export default function App() {
  return (
    <div>
      <Button />
      <Button text="Don't Click Me!" color="red" />
      <Button fontSize={20} />
    </div>
  );
}
```

## Functions as props
- you have to make references to the function passed through because if you put () after the function call then it would call it when it renders which you dont want
- e.g.
```
function Button({ text = "Click Me!", color = "blue", fontSize = 12, handleClick }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

export default function App() {
  const handleButtonClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <Button handleClick={() => handleButtonClick('https://www.theodinproject.com')} />
    </div>
  );
}
```
this part is a reference to an anonymous function to avoid calling it when it renders 
``` <Button handleClick={() => handleButtonClick('https://www.theodinproject.com')} /> ```

### detstructing:
- these are equivalent!
```
function Avatar({ person, size }) {
  // ...
}
```
```
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

### spread syntax:
"..."
- tjos forwards all Profile's props to the Avatar without listing each of their names, like the second block below
```
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```
```
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

### Passing JSX as children
- common to nest built in browser tags
  - when you nest content inside a JSX tag, the parent component receives that content in a prop called children

### props change over time
- props arent static! e.g. a displaying time adjusts the prop accordingly
- **props are immutable however! meaning unchangeable** i.e. when a component changes its props, it asks the parent component to pass a different props, a new object. 
- **Dont try to change props** - when you respond to a user input, you will need to set the state

## Recap 
1) To pass props, add them to the JSX, just like you would with HTML attributes.
2) To read props, use the function Avatar({ person, size }) destructuring syntax.
3) You can specify a default value like size = 100, which is used for missing and undefined props.
4) You can forward all props with <Avatar {...props} /> JSX spread syntax, but don’t overuse it!
5) Nested JSX like <Card><Avatar /></Card> will appear as Card component’s children prop.
6) Props are read-only snapshots in time: every render receives a new version of props.
7) You can’t change props. When you need interactivity, you’ll need to set state.

# Introduction to State

## State
- combination of all the data which is manipulated and affected
- **state is a components memory**

### The useState hook
- a built in hook in React that allows you to define state in a functional component. It takes an initial value as a parameter and returns an array with 2 elements that we destructure to get:
  1) current state value
  2) function to update function value
- e.g.
```
const [backgroundColor, setBackgroundColor] = useState(initialColor);
```
- when you call useState, you are telling React to remember something

#### Adding a state variable
- you can give a component as many state variables as you like
Steps:
  1) ``` import { useState } from 'react; ```
  2) ``` let index = 0; ```
  3) ``` const [index, setIndex] = useState(0); ```
- states are isolated ancd private, i.e. if you render the same component twice, each copy with have an isolated state! Changing one of them wont change the other

- ***The useState(iniitalColor) is only used for the components first render then ignored and React will provide the latest state to the component***

### How does state work in React?
- components are destroyed and rerendered from scratch in react but then with the latest state value will be returned from useState
- ***React reconciliation algorithm: process of rerendering generates a new virtual DOM (a lightweight representation of the actual DOM, where React compares the new virtual DOM to the previous one and calcs the changes needed to update the actual DOM)***

## Hooks
- hooks are functions that let you use React featres
- all hooks use ```use``` prefix, e.g. ```useState```
- hooks have 2 rules
  1) hooks can only be called from top level of a functional component
  2) hooks cant be called from inside loops or conditions

## Recap of states
1) Use a state variable when a component needs to “remember” some information between renders.
2) State variables are declared by calling the useState Hook.
3) Hooks are special functions that start with use. They let you “hook into” React features like state.
4) Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including useState, is only valid at the top level of a component or another Hook.
5) The useState Hook returns a pair of values: the current state and the function to update it.
6) You can have more than one state variable. Internally, React matches them up by their order.
7) State is private to the component. If you render it in two places, each copy gets its own state.

## Render and commit

### steps
1) trigger a render
2) render the component
3) commit to the DOM

#### Step 1 - trigger a render
- 2 reasons for a component to render
  1) its the components initial render
  2) the component state has been updated

- you call the createRoot with the target DOM node then call render method on it, e.g.
```
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

#### Step 2 - React renders your components
- **rendering is React calling your components**
- on initial render - React will call root component
- for subsequent renders - React will call function component whose state update triggered the render
- React will recursively update components until all nested components are displayed

#### Step 3 - React commits changes to the DOM
- after rendering the components, React will modify the DOM:
  - after initial render React will use ```appendChild``` DOM API to put all DOM nodes it created on screen
  - for re render, React will apply the minimum necessary operations to make the DOM match the rendering output

# More on State

## How to structure state
- **Dont put values in state that can be calculated using existing values, state, or props**
- state should not be mutated, so dont mutate arrays or objects
- always use a setState function to change state! and create a new object for this setState to trigger a re render
- state updates are asynchronous
- during re render, the state stays the same until it is done and then the state is updated to the new value. see here:
```
function Person() {
  const [person, setPerson] = useState({ name: "John", age: 100 });

  const handleIncreaseAge = () => {
    // shows {name: "john", age:100}
    console.log("in handleIncreaseAge (before setPerson call): ", person);
    setPerson({ ...person, age: person.age + 1 });
    // we've called setPerson but the second console log will still show {name: "john", age:100}
    console.log("in handleIncreaseAge (after setPerson call): ", person);
  };

  // this console.log runs every time the component renders
  // this logs {name: "john", age:100} on initial render, then {name: "john", age:101} when the component re renders after clicking the button
  console.log("during render: ", person);

  return (
    <>
      <h1>{person.name}</h1>
      <h2>{person.age}</h2>
      <button onClick={handleIncreaseAge}>Increase age</button>
    </>
  );
}
```

## State updater functions
- state variables are taken as a snapshot when re rendering and wont change throughout the render
- in the following, you would expect age to up by 2 but it doesnt! because it basically sats to take the current state and add 1, then take that original state again and still only add 1...
```
const handleIncreaseAge = () => {
  setPerson({ ...person, age: person.age + 1 });
  setPerson({ ...person, age: person.age + 1 });
};
```
- if you want to update state multiple times using the latest state, use a callback function:
```
const handleIncreaseAge = () => {
  setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1 }));
  setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1 }));
};
```
- usually setState would trigger a component re render, so in the code above, youd think it would re render twice but React is smart and would only render it once because it bactehs state updates

## Controlled components
- there are native HTML elements that maintain their own internal state, e.g. inputs elements!
- you can use ```useState``` to control these elements yourself

## Recap
1) Setting state requests a new render.
2) React stores state outside of your component, as if on a shelf.
3) When you call useState, React gives you a snapshot of the state for that render.
4) Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
5) Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.
6) You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
7) Event handlers created in the past have the state values from the render in which they were created.

## Choosing the state Structure
### Principles for structuring state
1) Group related state. If you always update two or more state variables at the same time, consider merging them into a single state variable.
2) Avoid contradictions in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3) Avoid redundant state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4) Avoid duplication in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
5) Avoid deeply nested state. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.


# Sharing state between components
- to change 2 components together, remove state from both of them, move to closest common parent and pass them down as props, AKA ***lifting state up***

## Lifting state by example
steps:
1) Remove state from child components
2) Pass hardcoded data from common parent
3) Add state to the common parent and pass it down together with the event handlers


# Emojis
- to add emoji in code, press cmd + ctrl + spacebar