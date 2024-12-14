import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import nfs from 'node:fs';
import path from 'path';

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

export const avatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const userFound = await User.findById(userId);
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    // Ruta del archivo del avatar
    const avatarPath = `./client/uploads/${userId}.png`;

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

const saveAvatarImage = (file, userId) => {
  const newPath = `./client/uploads/${userId}.png`;
  nfs.renameSync(file.path, newPath);
  return newPath;
};

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

export const deleteAvatar = async (req, res) => {
  const userId = req.user.id;
  const userFound = await User.findById(userId);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  const avatarPath = `./client/uploads/${userId}.png`;

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

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized ' });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized ' });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: 'Unauthorized ' });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      weight: userFound.weight,
    });
  });
};
