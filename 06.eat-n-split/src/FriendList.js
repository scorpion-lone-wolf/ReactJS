import { Friend } from "./Friend";

export function FriendList({ friends, onSelectFriend, selectedFriendId }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          isSelected={selectedFriendId === friend.id}
        />
      ))}
    </ul>
  );
}
