import { useState } from "react";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems(items => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
    });
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackagingList
        items={items}
        onItemDelete={handleDeleteItem}
        onItemToggle={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

// logo component
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

// form component
function Form({ onAddItem }) {
  const [count, setCount] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    //validate that items is not empty
    event.preventDefault();
    if (description === "") return;
    const newItem = {
      id: Date.now(),
      description,
      quantity: count,
      packed: false,
    };
    onAddItem(newItem);
    setCount(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={e => handleSubmit(e)}>
      <h3>What do ypu need for your 😍 trip?</h3>
      <select
        value={count}
        onChange={e => {
          setCount(+e.target.value);
        }}
      >
        {new Array(20).fill(null).map((_, i) => (
          <option key={i + 1}>{i + 1}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

// packaging-list component
function PackagingList({ items, onItemDelete, onItemToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item item={item} key={item.id} onItemDelete={onItemDelete} onItemToggle={onItemToggle} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onItemDelete, onItemToggle }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onItemToggle(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onItemDelete(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}

// stats component
function Stats({ items }) {
  const numItems = items.length;
  const numPackedItems = items.reduce((acc, item) => {
    if (item.packed) acc++;
    return acc;
  }, 0);
  const packedPercentage = numItems > 0 ? Math.round((numPackedItems / numItems) * 100) : 0;
  return (
    <footer className="stats">
      <em>
        {packedPercentage !== 100
          ? `You have ${numItems} items on your list, and you already packed ${numPackedItems} (${packedPercentage}%)`
          : "You got everything! Ready to go ✈️"}
      </em>
    </footer>
  );
}
