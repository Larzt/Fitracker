import Objetive from '../models/objetive.model.js';

export const getObjetive = async (req, res) => {
  try {
    const objetive = await Objetive.findById(req.params.id);
    if (!objetive)
      return res.status(404).json({ message: 'Objetive not found' });
    res.json(objetive);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Objetive not found' });
  }
};

export const createObjetive = async (req, res) => {
  try {
    const { weight, calories } = req.body;

    const newObjetive = new Objetive({
      weight,
      calories,
      user: req.user.id,
    });

    const savedObjetive = await newObjetive.save();
    res.json(savedObjetive);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Objetive not created' });
  }
};

export const updateObjetive = async (req, res) => {
  try {
    const objetive = await Objetive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!objetive)
      return res.status(404).json({ message: 'Objetive not found' });
    res.json(objetive);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Objetive not found' });
  }
};
