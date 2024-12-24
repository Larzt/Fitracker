import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/social.css';
import { RecommendedFriends } from './RecommendList';
import { FriendList } from './FriendList';

export const SocialList = ({ isFriendOpen }) => {
  const {
    users: authUsers,
    userFriends: authFriends,
    removeFriend,
    addFriend,
  } = useAuth();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  // Actualiza el estado de usuarios recomendados
  useEffect(() => {
    if (authUsers) setUsers(authUsers);
  }, [authUsers]);

  // Actualiza el estado de amigos
  useEffect(() => {
    if (authFriends) setFriends(authFriends);
  }, [authFriends]);

  // Filtra los usuarios según el texto de búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`friend-list ${isFriendOpen ? 'open' : 'closed'}`}>
      {/* Campo de búsqueda */}
      <div className="users-search">
        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado
        />
      </div>
      <FriendList friends={friends} removeFriend={removeFriend} />
      <RecommendedFriends users={filteredUsers} addFriend={addFriend} />
    </div>
  );
};
