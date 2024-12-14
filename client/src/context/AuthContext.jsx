import { createContext, useState, useContext, useEffect } from 'react';
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  loadAvatarRequest,
  uploadAvatarRequest,
  deleteAvatarRequest,
} from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth ust be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState('../images/default.png');

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]); // Limpia errores anteriores
    } catch (error) {
      // Comprueba si hay una respuesta y si data contiene errores
      if (error.response && error.response.data) {
        if (Array.isArray(error.response.data)) {
          setErrors(error.response.data); // Establece los errores si es un array
        } else if (error.response.data.message) {
          setErrors([error.response.data.message]); // Si es un objeto con un mensaje, lo convierte en un array
        } else {
          setErrors(['Ocurrió un error desconocido']); // Caso de error inesperado
        }
      } else {
        setErrors(['No se pudo conectar con el servidor']); // Error de red o sin respuesta
      }
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getAvatar = async () => {
    try {
      const res = await loadAvatarRequest();
      const avatarFileName = res.data.avatar;
      const pathFile = `/uploads/${avatarFileName}.png`;
      setAvatar(pathFile);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAvatar = async () => {
    try {
      deleteAvatarRequest();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      // Crea un FormData y agrega el archivo al formulario
      const formData = new FormData();
      formData.append('avatarImage', file);

      // Llama a la función `uploadAvatarRequest` para subir el avatar
      const res = await uploadAvatarRequest(formData);
      // Si la carga es exitosa, actualizamos el avatar en el estado
      if (res.status === 200) {
        setAvatar(file);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error.message);
      setErrors(['Error al subir el avatar']);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        avatar,
        getAvatar,
        uploadAvatar,
        deleteAvatar,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
