import Food from '../models/food.model.js';
import foodData from '../../data/foodData.js';

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      $or: [
        { user: req.user.id }, // Comidas asociadas al usuario actual
        { user: null }, // Comidas sin usuario asociado
      ],
    }).populate('user');

    res.json(foods);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching foods', error: error.message });
  }
};

export const getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Food not found' });
  }
};

export const getFoodsFromUser = async (req, res) => {
  try {
    // Buscar las comidas asociadas al usuario (por userId) y con propiedad 'public: true'
    const foods = await Food.find({
      user: req.params.id, // Suponiendo que el modelo de comida tiene una referencia a 'userId'
      isPublic: true, // Filtrar comidas donde 'public' es true
    });
    console.log(foods);
    console.log(req.params.id);

    if (foods.length === 0) {
      return res.status(204).json({ message: 'No foods found for this user' });
    }

    res.json(foods); // Devuelve todas las comidas encontradas
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error retrieving foods: ' + error.message });
  }
};

export const loadFood = async (req, res) => {
  try {
    // Insertar los datos directamente desde la importación
    const createdFoods = await Food.insertMany(foodData);

    res.status(201).json({
      message: 'Foods loaded successfully',
      foods: createdFoods,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error loading foods from file',
      error: error.message,
    });
  }
};

export const createFood = async (req, res) => {
  try {
    const { name, calories, ingredients, favourite } = req.body;

    const newFood = new Food({
      name,
      calories,
      ingredients,
      user: req.user.id,
    });

    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (error) {
    if (error)
      return res
        .status(404)
        .json({ message: 'Food not created', error: error });
  }
};

export const copyFood = async (req, res) => {
  try {
    const { name, calories, ingredients } = req.body;

    // Validación básica
    if (!name || !calories || !req.params.id) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const newFood = new Food({
      name,
      calories,
      ingredients,
      user: req.params.id,
    });

    const savedFood = await newFood.save();
    console.log('Comida guardada exitosamente:', savedFood);
    res.json(savedFood);
  } catch (error) {
    console.error('Error al guardar la comida:', error);
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    return res.status(204);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Food not found' });
  }
};

export const updateFood = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const newFoodData = req.body;
    const originalFood = await Food.findById(req.params.id);
    if (!originalFood) {
      console.log('Food not found');
      return res.status(404).json({ message: 'Food not found' });
    }

    if (originalFood.user) {
      console.log('Updating existing food:', req.body);
      const updatedFood = await Food.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.status(200).json({
        message: 'Food updated successfully',
        food: updatedFood,
      });
    }

    console.log('Creating new food...');
    const { name, calories, ingredients, isPublic } = newFoodData;

    const newFood = new Food({
      name,
      calories,
      ingredients,
      isPublic,
      user: req.user.id,
    });
    console.log('New food to be saved:', newFood);

    const createdFood = await newFood.save();
    return res.status(201).json({
      message: 'New food created and associated with user',
      createdFood,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      message: 'Error processing food update',
      error: error.message,
    });
  }
};

export const setVisible = async (req, res) => {
  try {
    const { id } = req.params;
    const { visibility } = req.body; // "public" o "private"

    // Validar el valor de visibility
    if (!['public', 'private'].includes(visibility)) {
      return res.status(400).json({
        message: 'Invalid visibility value. Use "public" or "private".',
      });
    }

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Actualizar el campo `public`
    food.public = visibility === 'public';
    const updatedFood = await food.save();

    res.status(200).json({
      message: `Food visibility updated to ${visibility}`,
      food: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating food visibility',
      error: error.message,
    });
  }
};

export const toggleFavourite = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Alternar el valor de `favourite`
    food.favourite = !food.favourite;
    const updatedFood = await food.save();

    res.status(200).json({
      message: `Food favourite status toggled to ${food.favourite}`,
      food: updatedFood,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error toggling favourite', error: error.message });
  }
};
