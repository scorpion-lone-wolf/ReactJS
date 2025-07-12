export function Friend({ friend, onSelectFriend, isSelected }) {
  const messageElement =
    friend.balance === 0 ? (
      <p>{`You and ${friend.name} are even`}</p>
    ) : friend.balance < 0 ? (
      <p className="red">{`You owe ${friend.name} ${Math.abs(friend.balance)}€`}</p>
    ) : (
      <p className="green">{`${friend.name} owes you ${Math.abs(friend.balance)}€`}</p>
    );

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={`${friend.name}'s avatar`} />
      <div>
        <h3>{friend.name}</h3>
        {messageElement}
      </div>
      <button className="button" onClick={() => onSelectFriend(friend.id)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
