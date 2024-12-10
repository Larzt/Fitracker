import React from 'react';

export const AddDish = ({ addDish, foods, handleFoodSelect }) => {
  if (!addDish) return null;

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
                <td className="text-left">{food.name || 'N/A'}</td>
                <td className="text-left">{food.ingredients || 'N/A'}</td>
                <td className="text-left">{food.calories || 'N/A'}</td>
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
};
