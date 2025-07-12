import { useState } from "react";
import { Button } from "./Button";

export function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  return (
    <form
      className="form-add-friend"
      onSubmit={e => {
        e.preventDefault();
        if (!name || !image) return;
        const id = crypto.randomUUID();
        const newFriend = {
          id,
          name,
          balance: 0,
          image: `${image}?u=${id}`,
        };
        onAddFriend(newFriend);
        setImage("https://i.pravatar.cc/48");
        setName("");
      }}
    >
      <label htmlFor="name">👯‍♂️ Friend Name</label>
      <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />

      <label htmlFor="image-url">🌄 Image URL</label>
      <input type="text" name="image" value={image} onChange={e => setImage(e.target.value)} />

      <Button type="submit">Add</Button>
    </form>
  );
}
