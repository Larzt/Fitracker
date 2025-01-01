import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
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
  getHeightRequest,
  updateHeightRequest,
  usersListRequest,
  searchAvatarRequest,
  friendsListRequest,
  addFriendsRequest,
  removeFriendsRequest,
  getUserRequest,
  getNotificationsRequest,
} from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
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
  const [height, setHeight] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Cuando recibes las notificaciones del backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotificationsRequest();

        const notifications = await response.data.notifications;

        notifications.map((noti) => {
          setNotifications(noti);
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const updateNotificationStatus = (index) => {
    setNotifications((prevNotifications) => {
      // Actualiza el estado asegurando que notifications sea un array
      if (Array.isArray(prevNotifications)) {
        const updatedNotifications = [...prevNotifications];
        updatedNotifications.splice(index, 1); // Elimina la notificación en el índice dado
        return updatedNotifications;
      }
      return prevNotifications;
    });
  };

  console.log(notifications);

  // Obtener métricas del usuario
  useEffect(() => {
    async function getMetrics() {
      const responseHeight = await getHeightRequest();
      const responseWeightAndDate = await getWeightRequest();
      const responseCalories = await getCaloriesRequest();

      const newHeight = responseHeight.data.height;
      const newWeightAndDate = responseWeightAndDate.data;
      const newCalories = responseCalories.data.calories;

      setHeight(newHeight);
      setWeight(newWeightAndDate);
      setCalories(newCalories);
    }
    getMetrics();
  }, []);

  // Inicialización de datos de amigos y usuarios
  useEffect(() => {
    let isMounted = true;

    async function initializeData() {
      try {
        await Promise.all([friendList(), usersList()]);
        if (isMounted) {
          console.log('Data initialized');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    }

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [userFriends]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data ? [error.response.data] : []);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      setErrors([error.response.data.message || 'Error desconocido']);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getAvatar = useCallback(async () => {
    try {
      const res = await loadAvatarRequest();
      const avatarFileName = res.data.avatar;
      const pathFile = `/public/uploads/${avatarFileName}.png`;
      setAvatar(pathFile);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const deleteAvatar = async () => {
    try {
      await deleteAvatarRequest();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatarImage', file);

      const res = await uploadAvatarRequest(formData);
      if (res.status === 200) {
        setAvatar(file);
      }
      window.location.reload();
    } catch (error) {
      setErrors(['Error al subir el avatar']);
    }
  };

  const updateCalories = async (value) => {
    try {
      const res = await updateCaloriesRequest(value);
      console.log(res.data.calories);
    } catch (error) {
      console.error('Failed to update calories:', error);
    }
  };

  const updateHeight = async (value) => {
    try {
      const res = await updateHeightRequest(value);
      setHeight(res.data.height);
    } catch (error) {
      console.error('Failed to update height:', error);
    }
  };

  const updateWeight = async (value) => {
    try {
      const res = await updateWeightRequest(value);
      setWeight(res.data.weight);
    } catch (error) {
      console.error('Failed to update weight:', error);
    }
  };

  // Check if user is authenticated using cookies
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

  // Obtener la lista de usuarios
  const usersList = async () => {
    try {
      const res = await usersListRequest();
      const resUsers = res.data.users;

      const allUsers = await Promise.all(
        resUsers.flat().map(async (user) => {
          if (user) {
            try {
              const resAvatar = await searchAvatarRequest(user.id);
              const avatar =
                resAvatar.status === 200
                  ? `/public/uploads/${resAvatar.data.avatar}.png`
                  : '../images/default.png';

              return {
                id: user.id,
                name: user.name,
                avatar,
              };
            } catch {
              return null;
            }
          }
          return null;
        })
      );

      // Filtra usuarios para excluir a los amigos
      const filteredUsers = allUsers.filter(
        (user) =>
          user &&
          !userFriends.some((friend) => String(friend.id) === String(user.id))
      );

      setUsersList(filteredUsers);
    } catch (error) {
      console.error('Error fetching users list:', error);
    }
  };

  // Obtener la lista de amigos
  const friendList = async () => {
    try {
      const res = await friendsListRequest();
      const resFriends = res.data.friends;

      resFriends.forEach(async (friend) => {
        if (friend) {
          try {
            const resAvatar = await searchAvatarRequest(friend.id);
            const avatar =
              resAvatar.status === 200
                ? `/public/uploads/${resAvatar.data.avatar}.png`
                : '../images/default.png';

            const friendUser = {
              id: friend.id,
              name: friend.name,
              avatar,
            };

            setUsersFriendList((prevFriends) => {
              if (
                !prevFriends.some(
                  (existingFriend) => existingFriend.id === friendUser.id
                )
              ) {
                return [...prevFriends, friendUser];
              }
              return prevFriends;
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

  // Funciones para agregar y quitar amigos
  const addFriend = async (id) => {
    try {
      await addFriendsRequest(id);
      await friendList(); // Recarga la lista de amigos después de agregar
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const removeFriend = async (id) => {
    try {
      await removeFriendsRequest(id);
      await friendList(); // Recarga la lista de amigos después de quitar
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const getUser = async (id) => {
    const res = await getUserRequest(id);
    return res.data.user;
  };

  return (
    <AuthContext.Provider
      value={{
        updateNotificationStatus,
        getUser,
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
        height,
        updateHeight,
        user,
        avatar,
        getAvatar,
        uploadAvatar,
        deleteAvatar,
        isAuthenticated,
        errors,
        notifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
