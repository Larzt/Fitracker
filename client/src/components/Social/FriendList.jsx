import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/social.css';

export const FriendList = ({ isFriendOpen }) => {
  const {
    users: authUsers,
    userFriends: authFriends,
    removeFriend,
    addFriend,
  } = useAuth();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  // Actualiza el estado de usuarios recomendados
  useEffect(() => {
    if (authUsers) setUsers(authUsers);
  }, [authUsers]);

  // Actualiza el estado de amigos
  useEffect(() => {
    if (authFriends) setFriends(authFriends);
  }, [authFriends]);

  console.log(friends);

  return (
    <div className={`friend-list ${isFriendOpen ? 'open' : 'closed'}`}>
      {/* Lista de amigos */}
      <div className="add-friends">
        <h2>Amigos</h2>
        {friends?.length > 0 ? (
          <ul>
            {friends.map((friend, index) => {
              if (!friend) return null;
              return (
                <li key={friend.id || index} className="friend-item">
                  <img src={friend.avatar} alt="Avatar" />
                  <p>@{friend.name}</p>
                  <button
                    className="remove-friend-btn"
                    onClick={() => removeFriend(friend.id)}
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

      {/* Lista de usuarios recomendados */}
      <div className="recommended-friends">
        <h2>Recomendados</h2>
        {users?.length > 0 ? (
          <ul>
            {users.map((user, index) => {
              if (!user) return null;
              return (
                <li key={user.id || index} className="friend-item">
                  <img src={user.avatar} alt="Avatar" />
                  <p>@{user.name}</p>
                  <button
                    className="add-friend-btn"
                    onClick={() => addFriend(user.id)}
                  >
                    <i className="fa-solid fa-user-plus"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay amigos recomendados actualmente.</p>
        )}
      </div>
    </div>
  );
};
