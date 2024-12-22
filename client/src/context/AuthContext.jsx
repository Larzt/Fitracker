import { createContext, useState, useContext, useEffect } from 'react';
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  loadAvatarRequest,
  uploadAvatarRequest,
  deleteAvatarRequest,
  getWeightRequest,
  getCaloriesRequest,
  updateCaloriesRequest,
  updateWeightRequest,
  usersListRequest,
  searchAvatarRequest,
  friendsListRequest,
  addFriendsRequest,
  removeFriendsRequest,
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
  const [users, setUsersList] = useState([]);
  const [userFriends, setUsersFriendList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState('../images/default.png');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');

  useEffect(() => {
    async function getMetrics() {
      const responseWeight = await getWeightRequest();
      const responseCalories = await getCaloriesRequest();

      const newWeight = responseWeight.data.weight;
      const newCalories = responseCalories.data.calories;

      // Actualizar estados
      setWeight(newWeight);
      setCalories(newCalories);
    }
    getMetrics();
  }, []);

  useEffect(() => {
    async function initializeData() {
      try {
        await friendList(); // Espera a que la lista de amigos esté completamente cargada
        await usersList(); // Ahora ejecuta la lógica de usuarios
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    }
    initializeData();
  }, [userFriends]);

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
      const pathFile = `/public/uploads/${avatarFileName}.png`;
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

  const updateCalories = async (value) => {
    console.log('Updating calories with:', value); // Verifica el valor enviado
    const res = await updateCaloriesRequest(value);
    console.log(res.data.calories);
  };

  const updateWeight = async (value) => {
    console.log('Updating weight with:', value); // Verifica el valor enviado
    const res = await updateWeightRequest(value);
    console.log(res.data.weight);
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

  const usersList = async () => {
    try {
      const res = await usersListRequest();
      const resUsers = res.data.users;
      const allUsers = [];

      for (const group of resUsers) {
        for (const user of group) {
          if (user) {
            try {
              const resAvatar = await searchAvatarRequest(user.id);
              let avatar = '../images/default.png';
              if (resAvatar.status === 200) {
                avatar = `/public/uploads/${resAvatar.data.avatar}.png`;
              }

              const resUser = {
                id: user.id,
                name: user.name,
                avatar: avatar,
              };

              allUsers.push(resUser);
            } catch (error) {
              console.error('Error fetching avatar:', error);
            }
          }
        }
      }

      // Filtra usuarios para excluir a los amigos
      const filteredUsers = allUsers.filter(
        (user) =>
          !userFriends.some((friend) => String(friend.id) === String(user.id))
      );

      console.log('filteredUsers: ', filteredUsers);

      setUsersList(filteredUsers); // Actualiza la lista final
    } catch (error) {
      console.error('Error fetching users list:', error);
    }
  };

  const friendList = async () => {
    try {
      const res = await friendsListRequest();
      const resFriends = res.data.friends; // Asegúrate de que el endpoint devuelva esta estructura.

      resFriends.map(async (friend) => {
        if (friend) {
          try {
            let res = await searchAvatarRequest(friend.id);
            let avatar = '../images/default.png';
            if (res.status === 200) {
              avatar = `/public/uploads/${res.data.avatar}.png`;
            }
            const friendUser = {
              id: friend.id,
              name: friend.name,
              avatar: avatar,
            };

            // Evita duplicados comprobando si el ID ya existe
            setUsersFriendList((prevFriends) => {
              if (
                prevFriends.find(
                  (existingFriend) => existingFriend.id === friendUser.id
                )
              ) {
                return prevFriends; // Si el amigo ya existe, no lo agregues
              }
              return [...prevFriends, friendUser];
            });
          } catch (error) {
            console.error('Error fetching avatar for friend:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error fetching friends list:', error);
      setErrors(['Error al cargar la lista de amigos']);
    }
  };

  const addFriend = async (id) => {
    console.log('addFriend');

    const res = await addFriendsRequest(id);
    console.log(res);
  };

  const removeFriend = async (id) => {
    console.log('removeFriend');

    const res = await removeFriendsRequest(id);
    console.log(res);
  };

  return (
    <AuthContext.Provider
      value={{
        usersList,
        userFriends,
        addFriend,
        removeFriend,
        users,
        signup,
        signin,
        logout,
        loading,
        calories,
        updateCalories,
        weight,
        updateWeight,
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
