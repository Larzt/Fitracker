import React from 'react';

const ExerciseTable = ({ exers, handleEditExer, handleDeleteExer }) => (
  <div className="display-content-table">
    <table>
      <thead>
        <tr className="display-content-table-header text-left">
          <th>Name</th>
          <th>Description</th>
          <th>Equipment</th>
          <th className="text-center">Edit</th>
          <th className="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {exers.length > 0 ? (
          exers.map((exer) => (
            <tr key={exer._id}>
              <td className="text-left">{exer.name}</td>
              <td className="text-left">{exer?.description || 'N/A'}</td>
              <td className="text-left">
                {exer.equipment != '' ? exer.equipment : 'N/A'}
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
export default ExerciseTable;
