export default function Item({ item, onItemDelete, onItemToggle }) {
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
