import React, { useEffect, useState } from 'react';
import { DashboardPage } from './DashboardPage';
import { useFood } from '../../context/FoodContext';

function DDishPage() {
  const { foods, getFoods, createFood, updateFood, deleteFood } = useFood();
  const [isFormVisible, setIsFormVisible] = useState(false); // Controla la visibilidad del formulario
  const [isEditing, setIsEditing] = useState(false); // Controla si estamos editando
  const [currentFood, setCurrentFood] = useState({}); // Datos del formulario (nuevo o a editar)

  useEffect(() => {
    getFoods();
  }, []);

  useEffect(() => {
    if (!isFormVisible) {
      setCurrentFood({});
      setIsEditing(false);
    }
  }, [isFormVisible]);

  const handleDeleteFood = (id) => {
    deleteFood(id);
    window.location.reload();
  };

  const handleSaveFood = () => {
    if (!currentFood.name || !currentFood.ingredients) {
      alert('Please fill out the name and ingredients fields!');
      return;
    }

    if (isEditing) {
      updateFood(currentFood._id, currentFood);
    } else {
      createFood(currentFood);
    }

    setIsFormVisible(false); // Oculta el formulario
    window.location.reload();
  };

  const handleEditFood = (food) => {
    setCurrentFood(food);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <DashboardPage
        content={
          <div className="display-content">
            <div className="display-content-header">
              <h1>Foods</h1>
              <div className="display-content-header-button">
                <button onClick={() => setIsFormVisible(!isFormVisible)}>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New food</p>
                </button>
              </div>
            </div>

            <div className="display-content-search">
              <input type="text" placeholder="Filter by name" />
            </div>
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
                      <td className="text-left">{food.ingredients}</td>
                      <td className="text-left">
                        {food.calories ? food.calories : 'None'}
                      </td>
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
            {/* Formulario para crear o editar alimento */}
            {isFormVisible && (
              <div className="display-content-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Food name"
                  value={currentFood.name || ''}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="ingredients"
                  placeholder="Ingredients"
                  value={currentFood.ingredients || ''}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="calories"
                  placeholder="Calories"
                  value={currentFood.calories || ''}
                  onChange={handleInputChange}
                />
                <div className="form-buttons">
                  <button onClick={handleSaveFood} className="save-btn">
                    <p>{isEditing ? 'Update' : 'Save'}</p>
                  </button>
                  <button
                    onClick={() => setIsFormVisible(false)}
                    className="cancel-btn"
                  >
                    <p>Cancel</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

export default DDishPage;
