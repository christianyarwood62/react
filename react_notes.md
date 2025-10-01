# Background

- React is a library for web and native interfaces, not a framework
- a library is like going to ikea with a home built already, do you need furniture
- a framework is like building a model home, with sets of blueprints and few limited choices
- difference in technical: inversion of control. in librarires, i am in charge of the flow of the app. In frameworks,the framework is in charge of the flow

# To create an app

1. make a repo on github
2. in CLI: 'npx create-react-app <name of app>'
   2.5) in CLI: 'npm create vite@latest'
3. press y to install create vite packages

# Vite

- a built tool that aims to provide faster development experience for web projects
- consists of 2 parts
  1. a dev server
  2. a build command that bundles the code

# Components

- components are reusable sections of an app, e.g. navbar, main section, form sign up, etc.
- components use JSX, not html
- to create a component:
  1. make a javascript function with CAPITAL, e.g.
  ```
  function Greeting() {
      return <h1>Test</h1>;
  }
  ```

# JSX

- JSX is a suntax extension for javascript that lets you write HTML inside a javascript file
- basically a React createElement function
- allows rendering logic and markup to live together instead of sepaarte HTML and Javascript files

## Rules of JSX

1. return a single root element
   - if you want to wrap multiple things, you can use <> </>, and put what you want in the middle
2. Close all tags
   - e.g. use <input />, not just <input>
3. camelCase Most things
   - attributes of elements usually use something like `stroke-width`. in JSX, use strokeWidth, e.g.
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
  1. as text inside a JSX tag: <h1>{name}'s To Do List</h1> works, but <{tag}>Gregorio Y. Zara's To Do List</{tag}> will not.
  2. As attributes immediately following the = sign: src={avatar} will read the avatar variable, but src="{avatar}" will pass the string "{avatar}".
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
  1. if statement
  2. ternary operator
  3. && operator
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

- \*\*Common pitfall- dont use number for left side, make sure it returns a bollean value, because React will make the whole expression zero for example if the left side is 0, and will render 0 rather than nothing (null)

- **Props are arguments passed into components**

# Keys in React

- keys are special props for components
- to change a list, react would either:
  1. completely re render the list
  2. hunt down specific changed items and re render those (useskeys for this)
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
  1. items in list dont have unique id
  2. list is static and wont change
  3. list wont be reordered or filtered

# Passing Data between components

- put props in the child function and use {props.xxx} to put data. Example:

```
function Menu() {
  return (
    <main className='menu'>
      <h2>Our menu</h1>
      <Pizza
        name='hawaiian'
        ingredients='cheeze, tomato, etc.'
        photoName='pizzas/hawaiian.jpg'
        price={10} // dont use '10' because that would make it a string, use javascript mode {} to make it a number
      />
    </main>
  )
}

function Pizza(props) {
  return (
    <div>
      <img src={props.photoName}/>
      <h3>{props.name}</h3>
      <p>{props.ingredients}p>
      <span>{props.price}</span>
    </div>
  )
}
```

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

1. use props as an argument to the function and reference the properties in the component via props.propertyName
2. prop value are given to each component

## Children prop

- each react component automatically receives a children prop, and it is between opening and closing tags
- simply put 'children' as a prop in the component, e.g.

```
function Button({children}) {
  return (
    <button
      style={{backgroundColor:'red', color:'white'}}
    >
      {children}
    <button/>
  )
}
```

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
`<Button handleClick={() => handleButtonClick('https://www.theodinproject.com')} />`

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

1. To pass props, add them to the JSX, just like you would with HTML attributes.
2. To read props, use the function Avatar({ person, size }) destructuring syntax.
3. You can specify a default value like size = 100, which is used for missing and undefined props.
4. You can forward all props with <Avatar {...props} /> JSX spread syntax, but don’t overuse it!
5. Nested JSX like <Card><Avatar /></Card> will appear as Card component’s children prop.
6. Props are read-only snapshots in time: every render receives a new version of props.
7. You can’t change props. When you need interactivity, you’ll need to set state.

# Introduction to State

## State

- combination of all the data which is manipulated and affected
- **state is a components memory**

### The useState hook

- a built in hook in React that allows you to define state in a functional component. It takes an initial value as a parameter and returns an array with 2 elements that we destructure to get:
  1. current state value
  2. function to update function value
- e.g.

```
const [backgroundColor, setBackgroundColor] = useState(initialColor);
```

- when you call useState, you are telling React to remember something

#### Adding a state variable

- you can give a component as many state variables as you like
  Steps:
  1. `import { useState } from 'react;`
  2. `let index = 0;`
  3. `const [index, setIndex] = useState(0);`
- states are isolated ancd private, i.e. if you render the same component twice, each copy with have an isolated state! Changing one of them wont change the other

- **_The useState(iniitalColor) is only used for the components first render then ignored and React will provide the latest state to the component_**

### How does state work in React?

- components are destroyed and rerendered from scratch in react but then with the latest state value will be returned from useState
- **_React reconciliation algorithm: process of rerendering generates a new virtual DOM (a lightweight representation of the actual DOM, where React compares the new virtual DOM to the previous one and calcs the changes needed to update the actual DOM)_**

## Hooks

- hooks are functions that let you use React featres
- all hooks use `use` prefix, e.g. `useState`
- hooks have 2 rules
  1. hooks can only be called from top level of a functional component
  2. hooks cant be called from inside loops or conditions

## Recap of states

1. Use a state variable when a component needs to “remember” some information between renders.
2. State variables are declared by calling the useState Hook.
3. Hooks are special functions that start with use. They let you “hook into” React features like state.
4. Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including useState, is only valid at the top level of a component or another Hook.
5. The useState Hook returns a pair of values: the current state and the function to update it.
6. You can have more than one state variable. Internally, React matches them up by their order.
7. State is private to the component. If you render it in two places, each copy gets its own state.

## Render and commit

### steps

1. trigger a render
2. render the component
3. commit to the DOM

#### Step 1 - trigger a render

- 2 reasons for a component to render

  1. its the components initial render
  2. the component state has been updated

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
  - after initial render React will use `appendChild` DOM API to put all DOM nodes it created on screen
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
- you can use `useState` to control these elements yourself

## Recap

1. Setting state requests a new render.
2. React stores state outside of your component, as if on a shelf.
3. When you call useState, React gives you a snapshot of the state for that render.
4. Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
5. Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.
6. You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
7. Event handlers created in the past have the state values from the render in which they were created.

## Choosing the state Structure

### Principles for structuring state

1. Group related state. If you always update two or more state variables at the same time, consider merging them into a single state variable.
2. Avoid contradictions in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3. Avoid redundant state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4. Avoid duplication in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
5. Avoid deeply nested state. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.

# Sharing state between components

- to change 2 components together, remove state from both of them, move to closest common parent and pass them down as props, AKA **_lifting state up_**

## Lifting state by example

steps:

1. Remove state from child components
2. Pass hardcoded data from common parent
3. Add state to the common parent and pass it down together with the event handlers

# Emojis

- to add emoji in code, press cmd + ctrl + spacebar

# Component Composition

- use {children} to de link components that used each other, i.e. a modal component with a success component in it:

```
function Modal({children}) {
  return (
    <div> className="modal"
      {children}
    </div>
  )
}

function Error() {
  return <p> this went wrong </p>
}
```

- Can now call an error message in one instance calling the modal component and a reuse modal component with a different child component, example a success component

```
<Modal>
  <Error />
</Modal>
```

# PropTypes

- use PropTypes to make a specific prop a certain type, e.g. a prop has to be text, or a number, etc.
- usually people now use typescript instead to do this

# How react works behind scenes:

- a render is triggered when state is updated
- a render makes a new virtual DOM, where that component and all immediate children are re rendered,
- state is updated, render is triggered (a component tree is made), which makes a new react element tree (all immediate children are re rendered too), then a fiber tree is made during reconciliation + Diffing, which then updates the fiber tree

## Render phase:

1. component instance triggered re render
2. makes react elements
3. make a new virtual DOM
4. reconciliation + diffing
5. updated fiber tree
6. list of DOM updates

### reconciliation - updates only a small part of the DOM (Because doing everything would be slow)

- reconciler: fiber
  - builds a fiber tree based on initial render
  - an internal tree that has a fiber for each component instance and DOM element
  - fibers are not re created on every render
  - fiber tree have a different lay out to the react element tree, not parent and child relationship
  - work can be done asynchronously

## Commit phase

- where react writes to DOM, inserts, deletions, and updates
- committing is synchronous, so cant show partial results in UI
- performed by ReactDOM, react never actually touches the DOM, react only does render phase, not commit phase
- can use different "renderers" for different apps, e.g. React Native for IOS, remotion for youtube, ReactDom for browsers, many more. Terrible name because they actually commit the result of the render phase

1. updated DOM

## Browser Paint phase

1. updated UI on the screen

## How Diffing works

- use 2 assumptions

1. 2 elements of different types will produce different trees
2. elements with stable key prop stay same across renders

2 situations we're interested in:

1. Same position, different element, i.e. a div to a header

- react assumes entire sub tree is no longer valid
- state is reset (tree might be rebuilt if children stayed the same)

2. Same position, same element, i.e. className changes, or a prop changes

- element will be kept, including the state
- new props are passed if they changed between renders

## What is Key prop?

- specialprop that tells diffing algorithm that an element is **unique**
- allows react to **distinguish** between different instances of same component type
- when a key stays **same across renders**, element will be kept in DOM (even if position in tree changes)
  - e.g. using keys in lists
- when a key **changes between renders**, element will be destroyed and new one created
  - e.g. using keys to reset state

### Using keys in lists [stable key]

- if there are no keys in each list item, when you add a new one, react thinks all are new and re removes and recreates all of them, **Bad performance**. Using a key would make react know that old list items arent different
- always use a key for multiple component instances!

### Key prop to reset state [changing key]

- give element a key if you want state to update, remember to change key with the different element

## Render logic vs event handler logic

- render logic is the use state lines, and the return scopes
- event handlers are the onchange events for example

## Functional programming principles

1. side effects

- dependency or modification on data outside function scope, e.g. HTTP requests, writing to DOM, mutating external variables, setting timers
- side effects arent bad!

2. pure functions

- functions with no side effects, given same input, output returns the same always

### rules for render logic

- components must be pure when it comes to render logic
- render logic must produce no side effects: e.g.:
  - do not network requests (APIs)
  - do not start timers
  - do not directly use DOM API
  - do not mutate objects or variables outside function scope
  - do not update state (or refs), this create infinite loop
    **- side effects are encouraged in event handler functions, with useEffects hook**

## State update batching

- if multiple states are updated in an event handler, react only re renders once, not for each state update
- updating state in react is asynchronous
- if you want to update state **based on previous update**, we use seState with callback (setState(answer => ...)). this is the curr example in the eat n split project

## How events work in react

- react doesnt place event handlers in the target element, it will actually handle the event at the root of the app, i.e. react registers all event handlers on root DOM container

### Synthetic events

- the e is different in react, e.g. function (e) => ...
- synthetic events are a thin wrapper around the DOMs native event (native event being PointerEvent, MouseEvent, KeyboardEvent, etc.), i.e. similar to vanilla js events, but add some functionality
- synthetic events have same interface as native event objects, like stopPropagation() and preventDefault()
- they fix browser inconsistencies
- most synthetic events bubble (including focus, blur, change), which dont usually bubble in vanilla
- use camelCase for attributes for events handlers in react, e.g. onClick (react) vs click (vanilla)

## Libraries vs frameworks & react ecosystem

1. framework:

- an all-in-one kit
- frameworks include everything, e.g. HTTP requests, styling, routing, form management
- everything you ened to build an app is included
- youre stuck with framework tools anf conventions

2. react:

- a view library
- doesnt include libraries, have to use external libraries for HTTP requests, styling, etc.
- can choose different 3rd party libraries to build the app
- need to be able to stay up to date with new external libraries (not as bad as you think!)

### React 3rd party library ecosystem

- has so many!!

#### frameworks built on top of react

- e.g. Next.js, Remix, Gatsby
- these would be similar to Angular or others where libraries are included (HTPP requests, etc.). These are full stack frameworks.

## Practical takeaways:

- component is a piece of UI blueprint, react creates a component instance from this blueprint. when rendered a react element is created
- rendering only means calling component functions to render and render. nothing to do with writing to DOM
- only initial app render and state updates cause renders
- all children will get re rendered when instance is re rendered.
- diffing is how react decides which DOM elements are modified, good for performance. if position is changes or element type is changes, DOM element and state will be destroyed
- giving element key props allow react to distinguish between multiple components. use this trick to reset state
- never declare a new component inside another component
- logic that produces JSX output for a component instance is not allowed to produce side effects, no API calls, no timers, etc.
- ReactDOM updates DOM in the commit phase, thats why we need to include this library
- multiple state updates inside an event handler are batched, happening all at once, causing 1 re render. State updates are asynchronous
- when using events in event handlers, we get access to synthetic event object so events work similar across browsers
- react is a library, not a framework, so can use your own 3rd party libraries

# Effects and Data Fetching

## Component (instance) lifecycle

1. mount / initial render:

- fresh state and props created

2. re render (optional), happens when:

- state changes
- props change
- parent re renders
- context changes

3. Unmount

- component instance is destroyed and removed
- state and props are destroyed

# UseEffect

- used to keep a component synchronized with some xternal system (e.g. API data)
- executed after component mounts, and after subsequenct re-renders according to dependency array
  - the dependency array is the second argument to useEffect:

```
useEffect(function() {
  fetch('...')
    .then((response) = response.json())
    .then((data) => doSomething(data));

    return () => console.log('Cleanup) // this is the cleanup function
}, []) // This [] is the dependency array, this example particularly means to execute effect after initial mount
```

- Event handlerss on the other hand:
  - executed when an event happens
  - used to react to an event
  - **The preferred way of creating side effects! Dont overuse useEffect**

## Dependency array

- by default, effects run after every render. we can prevent this by passing a dependency array
- without dependency array, react doesnt know when to run the effect
- each time one of the dependencies changes, the effect will be executed again
- every state variable and prop used inside the effect MUST be included in the dependency array

- useEffect is like an event listener that is listening for one dependency to change. Whenever a dependency changes, it will execute the effect again
- effects react to updates to state and props used inside the effect (the dependencies). So effects are 'reactive' (like state updates re rendering the UI)
- we can use dependency array to run effects when component renders or re-renders
- the 3 dependency arrays (examples below) we can use:
  1. useEffect(fn, [x, y, z]);
  - effect synchronizes with x, y, z
  - runs on mount and re renders triggers by updating x, y, or z
  2. useEffect(fn, {});
  - effect synchronizes with no state/props
  - runs only on mount (initial render)
  3. useEffect(fn);
  - effect synchronizes with everything
  - runs on every render (usually bad!)

## Cleanup function

- function that we can return from an effect (optional)
- runs on 2 different ocassions:
  1. before effect is executed again
  2. after a component has unmounted
- necessary whenever the side effect keeps happening after the component has been re rendered or unmounted
  - e.g. (the effect on the left, the potential cleanup on the right)
    - HTTP request => cancel request
    - API subscription => cancel subscription
    - Start timer => stop timer
    - Add event listener => remove listener
- each effect should only do one thing

# Hooks:

Most used:

- useEffect
- useState
- useReducer
- useContext

## Rules of hooks

1. only called at top level, not inside loops, conditionals, or early return, etc.

- this is to ensure hooks are called in same order, this is important because react makes a linked list of all used hooks, and deleted hooks would mean the linked list gets completely reordered (BAD)

2. only call hooks from react functions, e.g. the function component

# Summary overview of useState

1. create state

- either simple, e.g. const [xyz, setxyz] = useState(23)
- or based on function, e.g. const [count, setCount] = useState(() => localStorage.getItem('count'));
  - functions must be **pure** and accept **no arguments**. Called only on initial render

2. updating the state:

- either simple way, e.g. setCount(1000);
- or based on current state, e.g. setCount((c) => c + 1)
  - functions must be **pure** and return next state
- **make sure to never mutate objects or arrays, but \***replace**\* them instead**

# useRef

- **you use useRef if you want to store data that doesnt render anything**
- e.g. const myRef = useRef(23)
  - can then do something like this: myRef.current = 1000; // see how you can mutate this directly?
- a box (object) with a mutable .current property that is **persisted across renders**
- 2 big use cases:
  1. Creating a variable that stays same between renders (e.g. previous state, setTimeout id, etc.)
  2. (MORE IMPORTANT) selecting and storing DOM elements
- refs are for **data that is NOT rendered**: usually only appear in event handlers or effects, not in JSX (otherwise use state)
- do NOT read write or read .current in render logic (like state)

## State vs Refs

- both persist across renders
- refs updating dont cause re renders, state updating does
- refs are mutable, state is immutable
- refs arent asynchronously updated, state is

# Custom hooks

- e.g.

```
function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false)

  useEffect(function() {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setDate(res))
  }, [])
}

return [data, isLoading]
```

- a custom hook is basically just a javascript function
- you use components to resuse UI
- you use hooks or functions to reuse logic:
  - does logic contain any hooks?
    - yes? use a function
    - no? use a custom hook
- **custom hooks allow us to reuse non visual logic in components**
- one custom hook should have one purpose
- rules of hooks (above) apply to custom hooks too

- custom hooks need to start with 'use'
- custom hooks need to use 1 or more react hooks (e.g. useState or useEffect)
- unlike components, custom hooks can receive and return relevant data ([] or {})

# useReducer

- is basically a more advanced way of managing state than useStats, by taking in a pure function that takes in previous state and action as an argument and show the next state
- you call the dispatch function in your handler and the argument is the action, and the first argument in the [] of the useReducer hook is the current state
- example:

```
const [count, dispatch] = useReducer(reducer, 0);

  const dec = function () {
    dispatch({ type: "dec", payload: -1 });
  };
```

- standard object to use in dispatch function: use type and payload

```
dispatch({ type: "xxx", payload: xxx });
```

## Why useReducer?

- state management with useState isnt enough sometimes, useReducer helps in these situations:
  1. when components have a lot of state variables and state updates, spread across many event handlers all over the component
  2. when multiple state updates need to happen at the same time, e.g. starting a game
  3. when updating one piece of state depends on one or multiple other pieces of state

## Managing state with useReducer

- alternative way of setting state for complex state
- stores related pieces of state in a **state object**
- useReducer needs a reducer function containing all logic to update state, this decouples state logic from component
  - like a setState function with super powers!
- reducer: pure function (no side effects!) that takes current state and action and returns next state
- action: object that describes how to update state
- dispatch: function to trigger state updates, by sending actions from event handlers to the reducer, instead of setState
  e.g.

```
const [state, dispatch] = useReducer(reducer, initialState)

function reducer(state, action) {
  switch(action.type) {
    case 'dec':
      return state - 1;
    case 'inc':
      return state + 1;
    case 'setCount'"
      return action.payload;
    default:
      throw new Error('Unknown')
  }
}
```

## **Important - whenever you use setInterval, setTimeout, or event listeners, always return a cleanup function from useEffect!!**

# UseState vs useReducer

- useState:

  - single independent piece of state
  - logic to update state is placed on event handlers, **spread over one or more components**
  - state is updated by calling setState
  - imperative state updates
  - easier

- useReducer:
  - ideal for multiple related pieces of state
  - logic to update state in one central place decoupled from components
  - state is updates by dispatching an action
  - declarative state updates: complex state transitions are mapped to actions
  - more difficult

## When to use useReducer

- one piece of state? yes - useState. no:

  - do states frequently update together? (set score update along with update player along with update timer for example) no - useState
    - willing to implement slightly more complex code? yes - useReducer
    - over 3 or 4 pieces of unrelated state, including objects? yes - useReducer, no:
      - too many event handlers make components large? yes - usereducer, no - useState

- useState should still be **default choice**

# Routing

- we match different URLs to different UI views: routes
- keeps UI in sync with current browser URL
- this is client side routing, there is also server side routing
- used by React Router
- allows you to build single page applications

## Single Page applications (SPA)

- application that is executed entirely on client (browsers)
- routes: different URLs
- Javascript is used to update page DOM
- page is never reloaded
- feels like a native app
- additional data might be loaded from web API

## installation

- run npm create vite@latest as usual
- cd into repo, run npm i react-router-dom

## Route notes

- for nested routes, put index in route element to tell react to use a default child route, e.g.

```
<Route index element={xxx}>
```

## URL for state manegement

- URl is great place to store UI state and an alternative to useState in some situations. examples: open/closed panels, currently selected list item, list sorting order, applied list filters

1. erasy way to store in global place, accessible to all components in App
2. good way to pass data from one page to the next
3. makes it possible to bookmark and share the page with the exact UI state it had at the time
   Example of React Router tools:
   www.example.com/app/cities/lisbon?lat=1&lng=2

- /app/cities is the path
- lisbon is the params
- lat=1&lng=2 is the query string

# Fake API server

- run 'npm install json-server' in repo
- go to package.json file and add to the scripts object:

```
"server": 'json-server --watch <put your path here, e.g. data/cities> --port <Put port number here, e.g. 9000> -delay 500'
```

- enter in terminal 'npm run server'
