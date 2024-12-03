import Exer from '../models/exercise.model.js';

export const getExers = async (req, res) => {
  try {
    const exers = await Exer.find({
      user: req.user.id,
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

export const createExer = async (req, res) => {
  const { name, description } = req.body;

  const newExer = new Exer({
    name,
    description,
    user: req.user.id,
  });

  const savedExer = await newExer.save();
  res.json(savedExer);
};

export const deleteExer = async (req, res) => {
  const exer = await Exer.findByIdAndDelete(req.params.id);
  if (!exer) return res.status(404).json({ message: 'Exer not found' });
  return res.status(204);
};

export const updateExer = async (req, res) => {
  const exer = await Exer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!exer) return res.status(404).json({ message: 'Exer not found' });
  res.json(exer);
};
