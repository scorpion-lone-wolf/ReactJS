// stats component
export default function Stats({ items }) {
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
