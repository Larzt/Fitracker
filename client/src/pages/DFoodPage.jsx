import React, { useEffect, useState } from 'react';
import { DashboardPage } from './DashboardPage';
import { useFood } from '../context/FoodContext';
import FoodForm from '../components/FoodForm';

function DFoodPage() {
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
    setCurrentFood((prev) => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
  };

  const FoodTable = () => (
    <div className="display-content-table">
      <table>
        <thead>
          <tr className="display-content-table-header text-left">
            <th>Name</th>
            <th>Ingredients</th>
            <th>Calories</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td className="text-left">{food.name}</td>
              <td className="text-left">{food.ingredients || 'None'}</td>
              <td className="text-left">{food.calories || 'None'}</td>
              <td className="text-center">
                <button
                  onClick={() => handleEditFood(food)}
                  className="edit-btn"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td className="text-center">
                <button
                  onClick={() => handleDeleteFood(food._id)}
                  className="delete-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <DashboardPage
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
            <div className="display-content-search">
              <input type="text" placeholder="Filter by name" />
            </div>
            <FoodTable />
            <FoodForm
              isVisible={isFormVisible}
              currentFood={currentFood}
              handleInputChange={handleInputChange}
              handleSaveFood={handleSaveFood}
              resetForm={resetForm}
              isEditing={isEditing}
            />
          </div>
        }
      />
    </div>
  );
}

export default DFoodPage;
