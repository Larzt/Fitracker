import Exer from '../models/exercise.model.js';
import exerciseData from '../../data/exerciseData.js';

export const copyExer = async (req, res) => {
  try {
    const { name, description, equipment } = req.body;

    // Validación básica
    if (!name || !description || !req.params.id) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const newExer = new Exer({
      name,
      description,
      equipment,
      user: req.params.id,
    });

    const savedExer = await newExer.save();
    console.log('Comida guardada exitosamente:', savedExer);
    res.json(savedExer);
  } catch (error) {
    console.error('Error al guardar el ejercicio:', error);
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

export const getExers = async (req, res) => {
  try {
    const exers = await Exer.find({
      $or: [
        { user: req.user.id }, // Comidas asociadas al usuario actual
        { user: null }, // Comidas sin usuario asociado
      ],
    }).populate('user');
    res.json(exers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExer = async (req, res) => {
  const exer = await Exer.findById(req.params.id);
  if (!exer) return res.status(404).json({ message: 'Exer not found' });
  res.json(exer);
};

export const getExercisesFromUser = async (req, res) => {
  try {
    // Buscar las comidas asociadas al usuario (por userId) y con propiedad 'public: true'
    const exercises = await Exer.find({
      user: req.params.id, // Suponiendo que el modelo de comida tiene una referencia a 'userId'
      isPublic: true, // Filtrar comidas donde 'public' es true
    });

    if (exercises.length === 0) {
      return res
        .status(204)
        .json({ message: 'No exercises found for this user' });
    }

    res.json(exercises); // Devuelve todas las comidas encontradas
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving exercises: ' + error.message });
  }
};

export const loadExers = async (req, res) => {
  try {
    // Insertar los datos directamente desde la importación
    const createdExers = await Exer.insertMany(exerciseData);

    res.status(201).json({
      message: 'Exers loaded successfully',
      exers: createdExers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error loading exers from file',
      error: error.message,
    });
  }
};

export const createExer = async (req, res) => {
  try {
    const { name, description, equipment } = req.body;
    const newExer = new Exer({
      name,
      description,
      equipment,
      user: req.user.id,
    });

    const savedExer = await newExer.save();
    res.json(savedExer);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Exercise not created' });
  }
};

export const deleteExer = async (req, res) => {
  try {
    const exer = await Exer.findById(req.params.id);
    if (!exer) return res.status(404).json({ message: 'Exer not found' });
    await Exer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exer deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateExer = async (req, res) => {
  try {
    const newExerData = req.body;
    const originalExer = await Exer.findById(req.params.id);
    if (!originalExer) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    if (originalExer.user) {
      const updatedExer = await Exer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json({
        message: 'Exer updated successfully',
        food: updatedExer,
      });
    }

    // Si la comida no tiene usuario asociado, crear una nueva comida
    console.log(newExerData);

    const { name, description, equipment, isPublic } = newExerData;
    const newExer = new Exer({
      name,
      description,
      equipment,
      isPublic,
      user: req.user.id,
    });

    const createdExer = await newExer.save();
    res.status(201).json({
      message: 'New exer created and associated with user',
      createdExer,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error processing exercise update',
      error: error.message,
    });
  }
};

export const setVisible = async (req, res) => {
  try {
    const { id } = req.params;
    const { visibility } = req.body;

    // Validar el valor de visibility
    if (!['public', 'private'].includes(visibility)) {
      return res.status(400).json({
        message: 'Invalid visibility value. Use "public" or "private".',
      });
    }

    const exer = await Exer.findById(id);
    if (!exer) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    exer.public = visibility === 'public';
    const updatedExer = await exer.save();

    res.status(200).json({
      message: `Exercise visibility updated to ${visibility}`,
      exer: updatedExer,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating exercise visibility',
      error: error.message,
    });
  }
};

export const toggleFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    const exer = await Exer.findById(id);
    if (!exer) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    exer.favourite = !exer.favourite;
    const updatedExer = await exer.save();

    res.status(200).json({
      message: `Exercise favourite status toggled to ${exer.favourite}`,
      exer: updatedExer,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error toggling exercise favourite status',
      error: error.message,
    });
  }
};
