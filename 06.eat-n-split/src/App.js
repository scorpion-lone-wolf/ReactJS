import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriendButton, setShowAddFriendButton] = useState(true);
  const handleShowAddFriendButton = () => {
    setShowAddFriendButton(!showAddFriendButton);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {!showAddFriendButton && <FormAddFriend />}
        <Button onClick={handleShowAddFriendButton}>
          {showAddFriendButton ? "Add Friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="name">👯‍♂️Friend Name</label>
      <input type="text" name="name" />
      <label htmlFor="image-url">🌄Image URL</label>
      <input type="text" name="image-url" placeholder="https://i.pravatar.cc/48" />
      <Button>Add</Button>
    </form>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map(friend => {
        return <Friend friend={friend} key={friend.id} />;
      })}
    </ul>
  );
}

function Friend({ friend }) {
  const messgaeElement =
    friend.balance === 0 ? (
      <p>{`You and ${friend.name} are even`}</p>
    ) : friend.balance < 0 ? (
      <p className="red">{`You owe ${friend.name} ${Math.abs(friend.balance)}€`}</p>
    ) : (
      <p className="green">{`${friend.name} owes you ${Math.abs(friend.balance)}€`}</p>
    );

  return (
    <li>
      <img src={friend.image} alt={`${friend.name}'s avatar`} />
      <div>
        <h3>{friend.name}</h3>
        {messgaeElement}
      </div>
      <button className="button">Select</button>
    </li>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with</h2>
      <label htmlFor="bill">💰Bill Value</label>
      <input type="text" name="bill" />
      <label htmlFor="your-expenses">🧍‍♂️Your Expenses</label>
      <input type="text" name="your-expenses" />
      <label htmlFor="friend-expenses">👯‍♂️Friend Expenses</label>
      <input type="text" name="friend-expenses" disabled />
      <label htmlFor="paying-bill">💵Who is paying the bill</label>
      <select name="paying-bill">
        <option value="you">You</option>
        <option value="friend">Friend</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
