import React from 'react';

const ExerciseTable = ({ exers, handleEditExer, handleDeleteExer, handleSetFavourite, handleSetPublic }) => {
  // Ordenar los alimentos: los que tienen un usuario primero
  const sortedExers = exers.sort((a, b) => {
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
            <th>Description</th>
            <th>Equipment</th>
            <th className="text-center">Favourite</th>
            <th className="text-center">Public</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedExers.length > 0 ? (
            sortedExers.map((exer) => (
              <tr key={exer._id}>
                <td className="text-left">{exer.name}</td>
                <td className="text-left">{exer?.description || 'N/A'}</td>
                <td className="text-left">
                  {exer.equipment != '' ? exer.equipment : 'N/A'}
                </td>
                <td className="text-center">
                  {exer.user ? (
                    <button
                      onClick={() => handleSetFavourite(exer)}
                      className="edit-btn"
                    >
                      {exer.favourite ? (
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
                  {exer.user ? (
                    <button
                      onClick={() => handleSetPublic(exer)}
                      className="edit-btn"
                    >
                      {exer.isPublic ? (
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
                    onClick={() => handleEditExer(exer)}
                    className="edit-btn"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
                <td className="text-center">
                  {exer.user ? (
                    <button
                      onClick={() => handleDeleteExer(exer._id)}
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
              <td colSpan="5">No exercises has been added</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ExerciseTable;
