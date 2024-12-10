import React from 'react';

export const DishTable = ({
  filteredDishes,
  editRow,
  editedCategory,
  handleCategoryChange,
  toggleEditMode,
  saveCategory,
  handleDeleteSubmit,
}) => {
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
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => {
              const { food } = dish || {};
              if (!food) {
                console.warn(
                  `Dish with ID ${dish._id} has no associated food data.`
                );
                return null;
              }
              return (
                <tr key={dish._id}>
                  <td className="text-left">{food.name || 'No food added'}</td>
                  <td className="text-left">
                    {editRow === dish._id ? (
                      <select
                        className="display-content-form-select"
                        value={editedCategory}
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
                      dish.category || 'N/A'
                    )}
                  </td>
                  <td className="text-left">{food.ingredients || 'N/A'}</td>
                  <td className="text-left">{food.calories || 'N/A'}</td>
                  <td className="text-center">
                    {editRow === dish._id ? (
                      <button
                        className="save-btn"
                        onClick={() => saveCategory(dish._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-btn"
                        onClick={() => toggleEditMode(dish._id, dish.category)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSubmit(dish._id)}
                    >
                      <i className="fas fa-trash"></i>{' '}
                    </button>
                  </td>
                </tr>
              );
            })
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
