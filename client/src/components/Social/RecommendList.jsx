import { useState } from 'react';

export const RecommendedFriends = ({ users, addFriend }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Número inicial de usuarios visibles
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si la lista está expandida

  const handleAddFriend = (id) => {
    addFriend(id);
    window.location.reload();
  };

  const handleToggleVisibility = () => {
    if (isExpanded) {
      setVisibleCount(5); // Vuelve al número inicial de usuarios visibles
    } else {
      setVisibleCount(users.length); // Muestra todos los usuarios
    }
    setIsExpanded(!isExpanded); // Alterna el estado
  };

  return (
    <div className="recommended-friends">
      <h2>Recommended</h2>
      {users?.length > 0 ? (
        <>
          <ul>
            {users.slice(0, visibleCount).map((user, index) => {
              if (!user) return null;
              return (
                <li key={user.id || index} className="friend-recommended-item">
                  <img src={user.avatar} alt="Avatar" />
                  <p>{user.name}</p>
                  <button
                    className="add-friend-btn"
                    onClick={() => handleAddFriend(user.id)}
                  >
                    <i className="fa-solid fa-user-plus"></i>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Botón para alternar entre mostrar más o mostrar menos */}
          <button className="show-more-btn" onClick={handleToggleVisibility}>
            {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
          </button>
        </>
      ) : (
        <p>No hay amigos recomendados actualmente.</p>
      )}
    </div>
  );
};
