import Food from '../models/food.model.js';

export const getFoods = async (req, res) => {
  const foods = await Food.find({
    user: req.user.id,
  }).populate('user');
  res.json(foods);
};

export const getFood = async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).json({ message: 'Food not found' });
  res.json(food);
};

export const createFood = async (req, res) => {
  const { name, calories, ingredients } = req.body;

  const newFood = new Food({
    name,
    calories,
    ingredients,
    user: req.user.id,
  });

  const savedFood = await newFood.save();
  res.json(savedFood);
};

export const deleteFood = async (req, res) => {
  const food = await Food.findByIdAndDelete(req.params.id);
  if (!food) return res.status(404).json({ message: 'Food not found' });
  return res.status(204);
};

export const updateFood = async (req, res) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!food) return res.status(404).json({ message: 'Food not found' });
  res.json(food);
};
