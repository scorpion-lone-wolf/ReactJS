import { useState } from "react";
import { Button } from "./Button";
import { FormAddFriend } from "./FormAddFriend";
import { FormSplitBill } from "./FormSplitBill";
import { FriendList } from "./FriendList";

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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showAddFriendButton, setShowAddFriendButton] = useState(true);

  const handleShowAddFriendButton = () => {
    setShowAddFriendButton(!showAddFriendButton);
  };

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    handleShowAddFriendButton();
  }

  function handleSelectFriendId(id) {
    setSelectedFriendId(id === selectedFriendId ? null : id); // Toggle on second click
  }

  function handleUpdateBalanceOfFriend(id, balance) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === id ? { ...friend, balance: +friend.balance + +balance } : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={handleSelectFriendId}
          selectedFriendId={selectedFriendId}
        />
        {!showAddFriendButton && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriendButton}>
          {showAddFriendButton ? "Add Friend" : "Close"}
        </Button>
      </div>

      {selectedFriendId && (
        <FormSplitBill
          key={selectedFriendId}
          friends={friends}
          selectedFriendId={selectedFriendId}
          onSelectFriendId={handleSelectFriendId}
          onUpdateBalance={handleUpdateBalanceOfFriend}
        />
      )}
    </div>
  );
}
