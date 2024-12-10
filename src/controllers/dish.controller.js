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
    const dish = await Dish.findById(req.params.id)
      .populate('food')
      .populate('user');

    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Dish not found' });
  }
};

export const createDish = async (req, res) => {
  let { category } = req.body;
  if (category == null) {
    category = 'none';
  }
  try {
    const newDish = new Dish({
      category,
      food: req.params.id,
      user: req.user.id,
    });

    const savedDish = await newDish.save();
    res.json(savedDish);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Dish not created' });
  }
};

export const updateDish = async (req, res) => {
  const { category } = req.body; // Extraemos la categoría de la solicitud

  try {
    // Buscamos el plato a actualizar por su ID
    const dish = await Dish.findById(req.params.id)
      .populate('food')
      .populate('user');
    if (!dish) return res.status(404).json({ message: 'Dish not found' });

    // Actualizamos solo la categoría del plato
    dish.category = category;

    // Guardamos los cambios en el plato
    const updatedDish = await dish.save(); // Usamos `save` para actualizar el objeto

    // Verificamos si la actualización fue exitosa
    if (!updatedDish) {
      return res.status(400).json({ message: 'Dish not updated' });
    }

    // Respondemos con el plato actualizado
    return res.status(200).json(updatedDish);
  } catch (error) {
    // En caso de error, respondemos con un mensaje adecuado
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export const updateDishByParams = async (req, res) => {
  const { id, category } = req.params; // Extraemos la categoría de la solicitud

  try {
    // Buscamos el plato a actualizar por su ID
    const dish = await Dish.findById(id).populate('food').populate('user');
    if (!dish) return res.status(404).json({ message: 'Dish not found' });

    // Actualizamos solo la categoría del plato
    dish.category = category;

    // Guardamos los cambios en el plato
    const updatedDish = await dish.save(); // Usamos `save` para actualizar el objeto

    // Verificamos si la actualización fue exitosa
    if (!updatedDish) {
      return res.status(400).json({ message: 'Dish not updated' });
    }

    // Respondemos con el plato actualizado
    return res.status(200).json(updatedDish);
  } catch (error) {
    // En caso de error, respondemos con un mensaje adecuado
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
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

// Controlador para obtener platos por categoria
export const getDishesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    // Buscar platos en ese rango
    const dishes = await Dish.find({
      category: category,
    }).populate('food user');

    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
