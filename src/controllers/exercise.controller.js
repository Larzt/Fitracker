import Exer from '../models/exercise.model.js';
import exerciseData from '../../data/exerciseData.js';

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
    const newExerData = req.data;
    const originalExer = await Exer.findById(req.params.id);
    if (!originalExer) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Si la comida ya tiene un usuario asociado, actualizar de forma normal
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
    const { name, description, equipment } = newExerData;
    const newExer = new Exer({
      name,
      description,
      equipment,
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
