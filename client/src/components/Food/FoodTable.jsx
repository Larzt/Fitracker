import React from 'react';

const FoodTable = ({ foods, handleEditFood, handleDeleteFood, handleSetFavourite, handleSetPublic }) => {
  // Ordenar los alimentos: los que tienen un usuario primero
  const sortedFoods = foods.sort((a, b) => {
    if (a.user && !b.user) return -1; // a tiene usuario, b no, a va primero
    if (!a.user && b.user) return 1;  // b tiene usuario, a no, b va primero
    return 0; // Si ambos tienen o no tienen usuario, no se cambia el orden
  });

  return (
    <div className="display-content-table">
      <table>
        <thead>
          <tr className="display-content-table-header text-left">
            <th>Name</th>
            <th>Ingredients</th>
            <th>Calories</th>
            <th className="text-center">Favourite</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedFoods.length > 0 ? (
            sortedFoods.map((food, index) => (
              <tr key={index}>
                <td className="text-left">{food.name}</td>
                <td className="text-left">{food.ingredients || 'None'}</td>
                <td className="text-left">{food.calories || 'None'}</td>
                <td className="text-center">
                  {food.user ? (
                    <button
                      onClick={() => handleSetFavourite(food)}
                      className="edit-btn"
                    >
                      {food.favourite ? (
                        <i className="fa-solid fa-star"></i> // Solid star for favourite
                      ) : (
                        <i className="fa-regular fa-star"></i> // Regular star for not favourite
                      )}
                    </button>
                  ) : (
                    <></>
                  )}
                </td>

                <td className="text-center">
                  {food.user ? (
                    <button
                      onClick={() => handleSetPublic(food)}
                      className="edit-btn"
                    >
                      {food.isPublic ? (
                        <i className="fa-solid fa-eye"></i> // Solid eye for favourite
                      ) : (
                        <i className="fa-regular fa-eye"></i> // Regular eye for not favourite
                      )}
                    </button>
                  ) : (
                    <></>
                  )}
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
                  {food.user ? (
                    <button
                      onClick={() => handleDeleteFood(food._id)}
                      className="delete-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  ) : (
                    <></>
                  )}
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
};

export default FoodTable;
