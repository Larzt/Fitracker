import Goal from '../models/goals.model.js';

// Obtener todos los logros de un usuario
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).populate('user');
    res.json(goals);
  } catch (error) {
    res.status(404).json({ message: 'Goals not found' });
  }
};

// Obtener un logro específico por su ID
export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    res.status(404).json({ message: 'Goal not found' });
  }
};

// Crear un nuevo logro
export const createGoal = async (req, res) => {
  try {
    const { name, description, id } = req.body;

    const newGoal = new Goal({
      name,
      description,
      id,
      user: req.user.id,
    });

    const savedGoal = await newGoal.save();
    res.json(savedGoal);
  } catch (error) {
    res.status(404).json({ message: 'Goal not created' });
  }
};

// Eliminar un logro por su ID
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Goal not found' });
  }
};

// Actualizar un logro por su ID
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    res.status(404).json({ message: 'Goal not found' });
  }
};