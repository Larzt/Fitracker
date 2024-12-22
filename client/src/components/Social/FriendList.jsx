import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/social.css';

export const FriendList = ({ isFriendOpen }) => {
  const { users: authUsers } = useAuth();
  const { userFriends } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (authUsers) setUsers(authUsers);
  }, [authUsers]);
  console.log(users);

  return (
    <div className={`friend-list ${isFriendOpen ? 'open' : 'closed'}`}>
      <div className="add-friends">
        <h2>Amigos</h2>
        {userFriends?.length > 0 ? (
          <ul>
            {userFriends.map((user, index) => {
              if (!user) return null;
              return (
                <li key={user.id || index} className="friend-item">
                  <p>@{user.name}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No tienes amigos actualmente.</p>
        )}
      </div>
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
                  <button>
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
