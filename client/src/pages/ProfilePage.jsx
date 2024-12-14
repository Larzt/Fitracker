import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BaseDashboardPage } from './BaseDashboardPage';
import '../css/profile.css';

function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { avatar, getAvatar, uploadAvatar, deleteAvatar } = useAuth();

  // Maneja la selección de un archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      uploadAvatar(file).finally(() => setLoading(false)); // Subimos la nueva imagen
      setShowMenu(false); // Ocultamos el menú tras subir una nueva imagen
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      deleteAvatar();
      setShowMenu(false);
      console.log('Avatar eliminado');
    } catch (error) {
      console.error('Error al eliminar el avatar:', error.message);
    }
  };

  // Muestra u oculta el menú al hacer clic en la imagen
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Carga el avatar al montar el componente
  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  // Formulario para gestionar el avatar
  const AvatarSection = () => {
    return (
      <div className="profile-avatar-container">
        <div className="profile-avatar-wrapper">
          <img
            src={avatar}
            onClick={toggleMenu} // Mostramos el menú al hacer clic
          />
          {showMenu && (
            <div className="profile-avatar-menu">
              {avatar !== '../images/default.png' ? ( // Si hay una imagen actual
                <>
                  <button
                    onClick={() =>
                      document.getElementById('profileAvatarInput').click()
                    }
                  >
                    Cambiar
                  </button>
                  <button onClick={handleDeleteAvatar}>Eliminar</button>
                </>
              ) : (
                <button
                  onClick={() =>
                    document.getElementById('profileAvatarInput').click()
                  }
                >
                  Subir foto
                </button>
              )}
            </div>
          )}
        </div>
        <input
          type="file"
          id="profileAvatarInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {loading && (
          <p className="profile-avatar-loading">Cargando imagen...</p>
        )}
      </div>
    );
  };

  return (
    <BaseDashboardPage
      content={
        <div className="dashboard-content">
          <AvatarSection /> {/* Contenedor del avatar */}
          <div className="dashboard-main-content">
            <div className="dashboard-main-content-goals">Logros</div>
          </div>
        </div>
      }
    />
  );
}

export default ProfilePage;
