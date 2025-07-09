import { useState } from "react";

export default function Form({ onAddItem }) {
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
