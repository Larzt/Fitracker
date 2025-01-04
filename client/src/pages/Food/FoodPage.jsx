import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import { useFood } from '../../context/Food/FoodContext';
import FoodForm from '../../components/Food/FoodForm';
import FoodTable from '../../components/Food/FoodTable';

function FoodPage() {
  const { foods, getFoods, createFood, updateFood, deleteFood } = useFood();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFood, setCurrentFood] = useState({});

  useEffect(() => {
    getFoods();
  }, []);

  const resetForm = () => {
    setCurrentFood({});
    setIsEditing(false);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) setIsEditing(false);
  };

  const handleSaveFood = () => {
    if (!currentFood.name || !currentFood.calories) {
      alert('Please fill out the name and calories fields!');
      return;
    }

    if (isEditing) {
      updateFood(currentFood._id, currentFood);
    } else {
      createFood(currentFood);
    }
    resetForm();
    getFoods();
  };

  const handleEditFood = (food) => {
    setCurrentFood(food);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDeleteFood = (id) => {
    deleteFood(id);
    getFoods();
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setCurrentFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetFavourite = async (food) => {
    try {
      const updatedFood = { ...food, favourite: !food.favourite };
      await updateFood(food._id, updatedFood);
      await getFoods(); // Actualiza la lista después de modificar
    } catch (error) {
      console.error('Error updating favourite:', error);
    }
  };

  const handleSetPublic = async (food) => {
    try {
      const updatedFood = { ...food, isPublic: !food.isPublic };
      await updateFood(food._id, updatedFood);
      await getFoods(); // Actualiza la lista después de modificar
    } catch (error) {
      console.error('Error updating isPublic:', error);
    }
  };

  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <div className="display-content-header">
            <h1>Foods</h1>
            <div className="display-content-header-button">
              <button onClick={toggleFormVisibility}>
                <i className="fa-solid fa-circle-plus"></i>
                <p>New food</p>
              </button>
            </div>
          </div>
          <FoodForm
            isVisible={isFormVisible}
            currentFood={currentFood}
            handleInputChange={handleInputChange}
            handleSaveFood={handleSaveFood}
            resetForm={resetForm}
            isEditing={isEditing}
          />
          <FoodTable
            foods={foods}
            handleEditFood={handleEditFood}
            handleDeleteFood={handleDeleteFood}
            handleSetFavourite={handleSetFavourite}
            handleSetPublic={handleSetPublic}
          />
        </div>
      }
    />
  );
}

export default FoodPage;
