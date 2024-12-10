import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from './BaseDashboardPage';
import { useDish } from '../context/DishContext';
import { useFood } from '../context/FoodContext';

function DishPage() {
  const {
    dishes,
    createDish,
    getDishesByDate,
    deleteDish,
    updateDishCategory,
  } = useDish();
  const { foods, getFoods } = useFood();
  const [editRow, setEditRow] = useState(null); // Estado para rastrear la fila en edición
  const [editedCategory, setEditedCategory] = useState(''); // Para guardar la categoría editada temporalmente
  // Add dish
  const [addDish, setAddDish] = useState(false); // Estado para add dish

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    getDishesByDate(today);
    getFoods();
  }, []);

  const handleDeleteSubmit = (id) => {
    deleteDish(id);
    window.location.reload();
  };

  const handleCategoryChange = (id, newCategory) => {
    setEditedCategory(newCategory); // Guarda temporalmente la categoría editada
  };

  const toggleEditMode = (id, category) => {
    if (editRow === id) {
      setEditRow(null); // Salir del modo edición si ya está en edición
    } else {
      setEditRow(id); // Entrar en modo edición
      setEditedCategory(category); // Restaura la categoría original cuando se activa la edición
    }
  };

  const toggleAddMode = () => {
    setAddDish(!addDish);
  };

  const saveCategory = (id) => {
    updateDishCategory(id, editedCategory); // Guarda la categoría editada
    setEditRow(null); // Sale del modo de edición
    window.location.reload();
  };

  const handleFoodSelect = (food) => {
    createDish(food._id);
    window.location.reload();
  };

  const filterByCategory = (category) => {
    getDishesByCategory(category);
  };

  const DishTable = () => {
    const categoryOptions = [
      'desayuno',
      'almuerzo',
      'merienda',
      'cena',
      'aperitivo',
    ];

    return (
      <div className="display-content-table">
        <table>
          <thead>
            <tr className="display-content-table-header text-left">
              <th>Name</th>
              <th>Category</th>
              <th>Ingredients</th>
              <th>Calories</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {dishes.length > 0 ? (
              dishes.filter((dish) => dish.food).length > 0 ? (
                dishes.map((dish) => {
                  const { food } = dish || {};
                  if (!food) {
                    console.warn(
                      `Dish with ID ${dish._id} has no associated food data.`
                    );
                    return null;
                  }

                  return (
                    <tr key={dish._id}>
                      <td className="text-left">
                        {food?.name || 'No food added'}
                      </td>
                      <td className="text-left">
                        {editRow === dish._id ? (
                          <select
                            className="display-content-form-select"
                            value={editedCategory} // Usamos el estado de la categoría editada
                            onChange={(e) =>
                              handleCategoryChange(dish._id, e.target.value)
                            }
                          >
                            {categoryOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          dish?.category || 'N/A'
                        )}
                      </td>
                      <td className="text-left">
                        {food?.ingredients || 'N/A'}
                      </td>
                      <td className="text-left">{food?.calories || 'N/A'}</td>
                      <td className="text-center">
                        {editRow === dish._id ? (
                          <button
                            className="save-btn"
                            onClick={() => saveCategory(dish._id)} // Guarda los cambios
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="edit-btn"
                            onClick={() =>
                              toggleEditMode(dish._id, dish?.category)
                            } // Activa la edición
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        )}
                      </td>
                      <td className="text-center">
                        {editRow === dish._id ? (
                          <button
                            className="cancel-btn"
                            onClick={() => toggleEditMode(dish._id)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteSubmit(dish._id)}
                          >
                            <i className="fas fa-trash"></i>{' '}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No dishes available for today</td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="6">No dishes available for today</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  const AddDish = () => {
    {
      if (addDish) {
        // console.log('foods: ', foods);
        return (
          <div className="display-content-add">
            <table>
              <thead>
                <tr className="display-content-add-head text-left">
                  <th>Name</th>
                  <th>Ingredients</th>
                  <th>Calories</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {foods.length > 0 ? (
                  foods.map((food, index) => (
                    <tr key={index}>
                      <td className="text-left">{food?.name || 'N/A'}</td>
                      <td className="text-left">
                        {food?.ingredients || 'N/A'}
                      </td>
                      <td className="text-left">{food?.calories || 'N/A'}</td>
                      <td className="text-center">
                        <button
                          className="display-content-add-btn"
                          onClick={() => handleFoodSelect(food)}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No food available to add</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      }
    }
  };
  return (
    <div>
      <BaseDashboardPage
        content={
          <div className="display-content">
            <div className="display-content-header">
              <h1>Today Dishes</h1>
              <div className="display-content-header-button">
                <button onClick={toggleAddMode}>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New dish</p>
                </button>
              </div>
            </div>
            <div className="display-content-search">
              <input type="text" placeholder="Filter by category" />
            </div>
            <DishTable />
            <AddDish />
          </div>
        }
      />
    </div>
  );
}

export default DishPage;
