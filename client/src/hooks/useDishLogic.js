import { useEffect, useState } from 'react';
import { useDish } from '../context/Food/DishContext';
import { useFood } from '../context/Food/FoodContext';

export const useDishLogic = () => {
  const {
    dishes,
    createDish,
    getDishesByDate,
    deleteDish,
    updateDishCategory,
  } = useDish();
  const { foods, getFoods } = useFood();
  const [editRow, setEditRow] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [addDish, setAddDish] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getDishesByDate(today);
    getFoods();
  }, []);

  useEffect(() => {
    const filtered = dishes.filter((dish) =>
      filterCategory
        ? dish.category?.toLowerCase() === filterCategory.toLowerCase()
        : true
    );
    setFilteredDishes(filtered);
  }, []); // dishes, filterCategory

  const toggleAddMode = () => setAddDish(!addDish);

  const handleDeleteSubmit = (id) => {
    deleteDish(id);
    window.location.reload();
  };

  const handleCategoryChange = (id, newCategory) =>
    setEditedCategory(newCategory);

  const toggleEditMode = (id, category) => {
    setEditRow(editRow === id ? null : id);
    setEditedCategory(category);
  };

  const saveCategory = (id) => {
    updateDishCategory(id, editedCategory);
    setEditRow(null);
    window.location.reload();
  };

  const handleFoodSelect = (food) => {
    createDish(food._id);
    window.location.reload();
  };

  return {
    dishes,
    foods,
    filteredDishes,
    filterCategory,
    setFilterCategory,
    editRow,
    editedCategory,
    addDish,
    toggleAddMode,
    handleDeleteSubmit,
    handleCategoryChange,
    toggleEditMode,
    saveCategory,
    handleFoodSelect,
  };
};
