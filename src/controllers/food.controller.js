import Food from '../models/food.model.js';

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      user: req.user.id,
    }).populate('user');
    res.json(foods);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Foods not found' });
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

export const createFood = async (req, res) => {
  try {
    const { name, calories, ingredients } = req.body;

    const newFood = new Food({
      name,
      calories,
      ingredients,
      user: req.user.id,
    });

    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Food not created' });
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
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Food not found' });
  }
};
