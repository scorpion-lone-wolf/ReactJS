import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ friends, selectedFriendId, onUpdateBalance, onSelectFriendId }) {
  const [totalBill, setTotalBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [whoPays, setWhoPays] = useState("friend");

  const selectedFriend = friends.find(friend => friend.id === selectedFriendId);
  const selectedFriendName = selectedFriend.name;

  function handleSubmit(e) {
    e.preventDefault();
    if (!totalBill || !yourExpense || !friendExpense) return;

    if (whoPays === "you") {
      onUpdateBalance(selectedFriendId, +friendExpense);
    } else {
      onUpdateBalance(selectedFriendId, -yourExpense);
    }

    setTotalBill("");
    setYourExpense("");
    setFriendExpense("");
    onSelectFriendId(null);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>{`Split the bill with ${selectedFriendName}`}</h2>

      <label htmlFor="bill">💰 Bill Value</label>
      <input
        type="text"
        name="bill"
        value={totalBill}
        onChange={e => setTotalBill(e.target.value)}
      />

      <label htmlFor="your-expenses">🧍‍♂️ Your Expenses</label>
      <input
        type="text"
        name="your-expenses"
        value={yourExpense}
        onChange={e => {
          const yourVal = +e.target.value;
          if (yourVal <= +totalBill) {
            setYourExpense(e.target.value);
            setFriendExpense(String(+totalBill - yourVal));
          }
        }}
      />

      <label htmlFor="friend-expenses">👯‍♂️ Friend Expenses</label>
      <input type="text" name="friend-expenses" disabled value={friendExpense} />

      <label htmlFor="paying-bill">💵 Who is paying the bill</label>
      <select name="paying-bill" value={whoPays} onChange={e => setWhoPays(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriendName}</option>
      </select>

      <Button type="submit">Split Bill</Button>
    </form>
  );
}
