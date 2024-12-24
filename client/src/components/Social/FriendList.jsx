import { Link } from 'react-router-dom';

export const FriendList = ({ friends, removeFriend }) => {
  const handleRemoveFriend = (id) => {
    removeFriend(id);
    window.location.reload();
  };

  return (
    <div className="add-friends">
      <h2>Amigos</h2>
      {friends?.length > 0 ? (
        <ul>
          {friends.map((friend, index) => {
            if (!friend) return null;
            return (
              <li key={friend.id || index} className="friend-item">
                <Link to={`/public/${friend.id}`}>
                  <button>
                    <img src={friend.avatar} alt="Avatar" />
                  </button>
                </Link>
                <p>{friend.name}</p>
                <button
                  className="remove-friend-btn"
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  <i className="fa-solid fa-user-minus"></i>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No tienes amigos actualmente.</p>
      )}
    </div>
  );
};
