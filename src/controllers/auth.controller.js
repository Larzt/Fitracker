import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import nfs from 'node:fs';
const defaultImage = `./client/images/default.png`;
import usersData from '../../data/usersData.js';

export const loadUser = async (req, res) => {
  try {
    const creatRandomUsers = await User.insertMany(usersData);
    res.status(201).json({
      message: 'User loaded successfully',
      users: creatRandomUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error loading users from file',
      error: error.message,
    });
  }
};

// TODO: Move to user.controller.js
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);
    return res.status(200).json({ user: userFound });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Could not resolve the request: ${error}` });
  }
};

// TODO: Move to user.controller.js
export const getUsers = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    const usersFounded = await User.find();
    return res.status(200).json({
      users: [
        usersFounded.map((user) => {
          if (userFound.id != user._id) {
            return { id: user._id, name: user.username, email: user.email };
          }
        }),
      ],
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Could not resolve the request: ${error}` });
  }
};

export const register = async (req, res) => {
  const { email, password, username, age, weight, gender } = req.body;
  try {
    const userFound = await User.findOne({ username });
    if (userFound)
      return res.status(400).json(['This username already exists']);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      age,
      weight,
      gender,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updateAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updateAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// TODO: Move to user.controller.js
export const getWeight = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.json({
      weight: userFound.weight,
      weightDate: userFound.weightDate, // Incluimos el campo weightDate
    });
  } catch (error) {
    console.error('Error fetching user weight:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TODO: Move to user.controller.js
export const updateWeight = async (req, res) => {
  const { weight } = req.params; // Accede al valor de 'weight' en el body
  console.log('Received weight:', weight); // Log del valor recibido
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (weight) {
      userFound.weight = weight; // Actualiza el peso

      // Generar la fecha actual en formato 'día/mes' (por ejemplo, '25/12')
      const currentDate = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
      });

      // Concatenar el peso con la fecha
      userFound.weightDate = `${weight}-${currentDate}`; // Ejemplo: '65-25/12'
    }

    const updatedUser = await userFound.save();
    console.log('Updated user:', updatedUser); // Log del usuario actualizado
    return res.status(200).json(updatedUser); // Responde con el usuario actualizado
  } catch (error) {
    console.error('Error updating weight:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TODO: Move to user.controller.js
export const getCalories = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });
  return res.json({
    calories: userFound.calories,
  });
};

// TODO: Move to user.controller.js
export const updateCalories = async (req, res) => {
  const { calories } = req.params; // Accede al valor de 'calories' en el body
  console.log('Received calories:', calories); // Log del valor recibido
  // Aquí, puedes agregar más lógica de negocio, como buscar al usuario y actualizar sus datos
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (calories) {
      userFound.calories = calories; // Actualizar los datos de 'calories'
    }
    const updatedUser = await userFound.save();
    console.log('Updated user:', updatedUser); // Log del usuario actualizado
    return res.status(200).json(updatedUser); // Responde con el usuario actualizado
  } catch (error) {
    console.error('Error updating calories:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TODO: Move to user.controller.js
export const getHeight = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });
  return res.json({
    height: userFound.height,
  });
};

// TODO: Move to user.controller.js
export const updateHeight = async (req, res) => {
  const { height } = req.params; // Accede al valor de 'height' en el body
  console.log(req.body);

  console.log(height);

  console.log('Received height:', height); // Log del valor recibido
  // Aquí, puedes agregar más lógica de negocio, como buscar al usuario y actualizar sus datos
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (height) {
      userFound.height = height; // Actualizar los datos de 'height'
    }
    const updatedUser = await userFound.save();
    console.log('Updated user:', updatedUser); // Log del usuario actualizado
    return res.status(200).json(updatedUser); // Responde con el usuario actualizado
  } catch (error) {
    console.error('Error updating height:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TODO: Move to user.controller.js
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  });
};

// TODO: Move to user.controller.js
export const avatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const userFound = await User.findById(userId);
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    // Ruta del archivo del avatar
    const avatarPath = `./client/public/uploads/${userId}.png`;

    // Comprobamos si el archivo existe
    fs.access(avatarPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(400).json({ message: 'User avatar not found' });
      }
      // Si el archivo existe, devolver la respuesta con el avatar
      return res.status(200).json({
        message: 'User avatar found',
        avatar: userId,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    // Ruta del archivo del avatar
    const avatarPath = `./client/public/uploads/${userId}.png`;

    // Comprobamos si el archivo existe
    fs.access(avatarPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res
          .status(204)
          .json({ message: 'User avatar not found', avatar: defaultImage });
      }
      // Si el archivo existe, devolver la respuesta con el avatar
      return res.status(200).json({
        message: 'User avatar found',
        avatar: userId,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: Move to user.controller.js
const saveAvatarImage = (file, userId) => {
  const newPath = `./client/public/uploads/${userId}.png`;
  nfs.renameSync(file.path, newPath);
  return newPath;
};

// TODO: Move to user.controller.js
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const userFound = await User.findById(userId);
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const fileFound = req.file;
    if (!fileFound) return res.status(400).json({ message: 'File not found' });

    saveAvatarImage(fileFound, userId);

    res.status(200).send({ user: userId });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error uploading avatar', error: error.message });
  }
};

// TODO: Move to user.controller.js
export const deleteAvatar = async (req, res) => {
  const userId = req.user.id;
  const userFound = await User.findById(userId);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  const avatarPath = `./client/public/uploads/${userId}.png`;

  if (fs.existsSync(avatarPath)) {
    try {
      fs.unlinkSync(avatarPath);
      return res.status(200).json({ message: 'Avatar deleted successfully' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error deleting avatar', error: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Avatar not found' });
  }
};

// TODO: Move to user.controller.js
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ notifications: user.messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching notifications', error: error.message });
  }
};

// TODO: Move to user.controller.js
export const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { index } = req.params; // Suponiendo que se envía el índice de la notificación

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (index < 0 || index >= user.messages.length) {
      return res.status(400).json({ message: 'Invalid notification index' });
    }

    // Elimina la notificación del array de mensajes
    user.messages.splice(index, 1); // Esto elimina la notificación en la posición `index`
    await user.save();

    return res
      .status(200)
      .json({ message: 'Notification deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting notification', error: error.message });
  }
};

// TODO: Move to user.controller.js
export const getFriends = async (req, res) => {
  try {
    // Obtener el usuario autenticado
    const userFound = await User.findById(req.user.id).populate(
      'friends',
      'username email'
    );

    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construir la lista de amigos desde el array 'friends'
    const friends = userFound.friends.map((friend) => ({
      id: friend._id,
      name: friend.username,
      email: friend.email,
    }));

    return res.status(200).json({
      friends,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Could not resolve the request: ${error.message}` });
  }
};

// TODO: Move to user.controller.js
export const addFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const userFound = await User.findById(userId);
    const friendId = req.params.id;
    const friendFound = await User.findById(friendId);

    if (!friendFound) {
      return res.status(400).json({ message: 'Friend user not found' });
    }

    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Evitar duplicados
    if (userFound.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    // Agregar al amigo
    userFound.friends.push(friendId);
    await userFound.save();

    // Crear notificación para el usuario destinatario
    const notification = {
      message: `${userFound.username} te ha agregado como amigo.`,
      isRead: false,
      createdAt: new Date(),
    };

    friendFound.messages.push(notification);
    await friendFound.save();

    return res.status(200).json({ message: 'Friend has been added' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Friend could not be added', error: error.message });
  }
};

// TODO: Move to user.controller.js
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado
    const friendId = req.params.id; // ID del amigo a eliminar

    // Encontrar al usuario autenticado
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Verificar si el amigo existe en la base de datos
    const friendFound = await User.findById(friendId);
    if (!friendFound) {
      return res.status(400).json({ message: 'Friend user not found' });
    }

    // Remover el amigo del array de 'friends'
    userFound.friends = userFound.friends.filter(
      (friend) => friend.toString() !== friendId // Comparación de IDs como cadenas
    );

    // Guardar los cambios en la base de datos
    await userFound.save();

    return res.status(200).json({ message: 'Friend has been removed' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Friend could not be removed', error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized ' });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized ' });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: 'Unauthorized ' });
    let weightData = [];
    if (Array.isArray(userFound.weightDate)) {
      // Si es un arreglo, lo usamos tal cual
      weightData = userFound.weightDate;
    } else if (userFound.weightDate) {
      // Si no es un arreglo pero existe 'weightDate', creamos un arreglo con ese único valor
      weightData = [userFound.weightDate];
    }
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      weight: userFound.weight,
      age: userFound.age,
      height: userFound.height,
      weightDate: weightData,
    });
  });
};
