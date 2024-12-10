import React from 'react';

const FoodTable = ({ foods, handleEditFood, handleDeleteFood }) => (
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
        {foods.length > 0 ? (
          foods.map((food) => (
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
          ))
        ) : (
          <tr>
            <td colSpan="5">No food has been added</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default FoodTable;
