import { useState } from 'react';

export const RecommendedFriends = ({ users, addFriend }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Número inicial de usuarios visibles

  const handleAddFriend = (id) => {
    addFriend(id);
    window.location.reload();
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Incrementa el número de usuarios visibles en 5
  };

  return (
    <div className="recommended-friends">
      <h2>Users</h2>
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
          {/* Botón "Más" si hay más usuarios por mostrar */}
          {visibleCount < users.length && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Mostrar más
            </button>
          )}
        </>
      ) : (
        <p>No hay amigos recomendados actualmente.</p>
      )}
    </div>
  );
};
