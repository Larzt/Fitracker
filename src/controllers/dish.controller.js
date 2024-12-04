import Dish from '../models/dish.model.js';

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({
      user: req.user.id,
    }).populate('user');
    if (!dishes) return res.status(404).json({ message: 'Dishes not found' });
    res.json(dishes);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Dishes not found' });
  }
};

export const getDish = async (req, res) => {
  try {
    const dish = await Dish.find({ food: req.params.id })
      .populate('food')
      .populate('user');

    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Dish not found' });
  }
};

export const createDish = async (req, res) => {
  try {
    const newDish = new Dish({
      food: req.params.id,
      user: req.user.id,
    });

    const savedDish = await newDish.save();
    res.json(savedDish);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Dish not created' });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    return res.status(204);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Dish not found' });
  }
};

// Controlador para obtener platos por fecha
export const getDishesByDate = async (req, res) => {
  try {
    const { date } = req.params; // Obtener la fecha de los query params
    if (!date) {
      return res.status(404).json({ message: 'Date is required' });
    }

    // Convertir la fecha en rango de inicio y fin del día
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    // Buscar platos en ese rango
    const dishes = await Dish.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).populate('food user'); // Popula las referencias si es necesario

    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
