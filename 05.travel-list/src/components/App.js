import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackagingList from "./PackagingList";
import Stats from "./Stats";

// app component
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
  function handleDeleteAllList() {
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackagingList
        items={items}
        onItemDelete={handleDeleteItem}
        onItemToggle={handleToggleItem}
        onDeleteAllList={handleDeleteAllList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
