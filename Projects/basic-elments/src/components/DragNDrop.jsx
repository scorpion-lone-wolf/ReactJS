import { useState } from "react";
import "./DragNDrop.css";
const initailData = {
  left: [],
  right: [
    { id: 4, name: "CSS", key: "right" },
    { id: 5, name: "AWS", key: "right" },
    { id: 6, name: "Tailwind CSS", key: "right" },
    { id: 7, name: "Next.js", key: "right" },
    { id: 8, name: "TypeScript", key: "right" },
    { id: 9, name: "GraphQL", key: "right" },
    { id: 10, name: "Node.js", key: "right" },
    { id: 11, name: "MongoDB", key: "right" },
    { id: 12, name: "PostgreSQL", key: "right" },
    { id: 13, name: "Docker", key: "right" },
    { id: 14, name: "Kubernetes", key: "right" },
    { id: 15, name: "Firebase", key: "right" },
    { id: 16, name: "Vite", key: "right" },
    { id: 17, name: "Redux", key: "right" },
    { id: 18, name: "Jest", key: "right" },
    { id: 19, name: "Cypress", key: "right" },
    { id: 20, name: "Nginx", key: "right" },
    { id: 21, name: "Express", key: "right" },
    { id: 22, name: "ESLint", key: "right" },
    { id: 23, name: "Prettier", key: "right" },
    { id: 24, name: "Supabase", key: "right" },
    { id: 25, name: "Zustand", key: "right" },
    { id: 26, name: "Prisma", key: "right" },
    { id: 27, name: "tRPC", key: "right" },
    { id: 28, name: "Three.js", key: "right" },
  ],
};

const DragNDrop = () => {
  const [data, setData] = useState(initailData);
  const [draggedItem, setDraggedItem] = useState(null);

  function handleDragStart(e, item) {
    setDraggedItem(item);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, targetcontainer) {
    console.log(draggedItem);
    console.log(targetcontainer);

    // move this draggedItem to the targetcontainer

    const newSourceList = [...data[draggedItem.key].filter(item => item.id !== draggedItem.id)];

    const newTargetList = [...data[targetcontainer], { ...draggedItem, key: targetcontainer }];

    setData({
      ...data,
      [draggedItem.key]: newSourceList,
      [targetcontainer]: newTargetList,
    });
    setDraggedItem(null);
  }
  console.log(data);
  return (
    <div className="container">
      {Object.keys(data).map(container => {
        return (
          <div
            className={container}
            onDrop={e => handleDrop(e, container)}
            onDragOver={handleDragOver}
            key={container}
          >
            {data[container].map(item => {
              return (
                <div
                  className="items"
                  draggable
                  key={item.id}
                  onDragStart={e => handleDragStart(e, item)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DragNDrop;

// 📌 Notes on Drag and Drop Implementation

// We have two containers ("left" and "right") that each hold a list of draggable elements.

// 🟢 Draggable Elements:
// - Each item inside the container is draggable.
// - We attach the `onDragStart` event to each item.
// - In `onDragStart`, we store the dragged item in state so we know which item is being moved.

// 📦 Drop Containers:
// - Each container (`left`, `right`) should have both `onDragOver` and `onDrop` handlers.

// 🔁 onDragOver:
// - This event must call `e.preventDefault()`.
// - This is required by HTML5 to allow a drop to occur on that container.
// - Without it, `onDrop` will not fire.

// 🎯 onDrop:
// - This event is triggered when a draggable item is dropped onto the container.
// - Here, we implement the logic to update state: remove the item from its original list and add it to the target container.
