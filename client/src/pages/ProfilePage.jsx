import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que el contexto está correctamente importado
import { BaseDashboardPage } from './BaseDashboardPage';
import '../css/profile.css';

function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { avatar, getAvatar, uploadAvatar } = useAuth(); // Traemos la función desde el contexto

  // Maneja la selección de un archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      // Llamamos a la función para subir el avatar
      uploadAvatar(file).finally(() => setLoading(false)); // Esperamos a que se complete la carga
    }
  };

  // Carga el avatar cuando el componente se monta
  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  // Formulario para mostrar el avatar y permitir la carga de un nuevo archivo
  const AvatarForm = () => {
    return (
      <div className="avatar-form-container">
        <form encType="multipart/form-data">
          <label htmlFor="profileAvatar">
            <img
              src={avatar}
              alt="User Avatar"
              title="Haz clic para cambiar el avatar"
            />
          </label>
          <input
            type="file"
            id="profileAvatar"
            accept="image/*"
            onChange={handleFileChange}
          />
          {loading && <p className="avatar-loading">Cargando imagen...</p>}
        </form>
      </div>
    );
  };

  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <div className="display-content-progress">
            <AvatarForm /> {/* Formulario para cargar el avatar */}
          </div>
        </div>
      }
    />
  );
}

export default ProfilePage;
