import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackagingList />
      <Stats />
    </div>
  );
}

export default App;

// logo component
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

// form component
function Form() {
  const [count, setCount] = useState(1);
  const [item, setItem] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      id: initialItems.length,
      description: item,
      quantity: count,
      packed: false,
    };
    initialItems.push(newItem);
    setCount(1);
    setItem("");
  }
  console.log(initialItems);
  return (
    <form className="add-form" onSubmit={e => handleSubmit(e)}>
      <h3>What do ypu need for your 😍 trip?</h3>
      <select
        value={count}
        onChange={e => {
          setCount(e.target.value);
        }}
      >
        {new Array(20).fill(null).map((_, i) => (
          <option key={i + 1}>{i + 1}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={item}
        onChange={e => {
          setItem(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

// packaging-list component
function PackagingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  const [isChecked, setIsChecked] = useState(item.packed);
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked(prev => !prev);
        }}
      />
      <span style={isChecked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

// stats component
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
