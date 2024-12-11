import React, { useState } from 'react';

function RoutineTable({ filteredRoutines, deleteRoutine, updateRoutine }) {
  const [editRow, setEditRow] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedMuscle, setEditedMuscle] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  const categoryOptions = ['other', 'strength', 'cardio', 'flexibility'];
  const muscleOptions = ['other', 'chest', 'back', 'legs', 'arms', 'abs'];

  const toggleEditMode = (id, category, musclesTargeted) => {
    if (editRow === id) {
      setEditRow(null);
    } else {
      setEditRow(id);
      setEditedCategory(category || '');
      setEditedMuscle(musclesTargeted || '');
    }
  };

  const saveRoutine = (id) => {
    const updatedRoutine = {
      category: editedCategory,
      musclesTargeted: editedMuscle,
    };

    updateRoutine(id, updatedRoutine)
      .then(() => {
        setEditRow(null);
      })
      .catch((err) => console.error('Error updating routine:', err));
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="display-content-table">
      <table>
        <thead>
          <tr className="display-content-table-header text-left">
            <th>Name</th>
            <th>Category</th>
            <th>Muscle</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
            <th className="text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutines.length > 0 ? (
            filteredRoutines.map((routine) => {
              const { exer } = routine || {};
              if (!exer) {
                console.warn(
                  `Routine with ID ${routine._id} has no associated exercise data.`
                );
                return null;
              }
              return (
                <React.Fragment key={routine._id}>
                  <tr>
                    <td className="text-left">{exer.name || 'N/A'}</td>
                    <td className="text-left">
                      {editRow === routine._id ? (
                        <select
                          className="display-content-form-select"
                          value={editedCategory}
                          onChange={(e) => setEditedCategory(e.target.value)}
                        >
                          {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        routine.category || 'N/A'
                      )}
                    </td>
                    <td className="text-left">
                      {editRow === routine._id ? (
                        <select
                          className="display-content-form-select"
                          value={editedMuscle}
                          onChange={(e) => setEditedMuscle(e.target.value)}
                        >
                          {muscleOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        routine.musclesTargeted || 'N/A'
                      )}
                    </td>
                    <td className="text-center">
                      {editRow === routine._id ? (
                        <button
                          className="save-btn"
                          onClick={() => saveRoutine(routine._id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() =>
                            toggleEditMode(
                              routine._id,
                              routine.category,
                              routine.musclesTargeted
                            )
                          }
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="delete-btn"
                        onClick={() => deleteRoutine(routine._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="details-btn"
                        onClick={() => toggleRowExpansion(routine._id)}
                      >
                        <i
                          className={`fas ${
                            expandedRow === routine._id
                              ? 'fa-chevron-up'
                              : 'fa-chevron-down'
                          }`}
                        ></i>
                      </button>
                    </td>
                  </tr>
                  {expandedRow === routine._id && routine.exercises && (
                    <tr>
                      <td colSpan="6" className="exercise-details">
                        <table className="nested-table">
                          <thead>
                            <tr>
                              <th>Exercise Name</th>
                              <th>Reps</th>
                              <th>Sets</th>
                              <th>Weight</th>
                            </tr>
                          </thead>
                          <tbody>
                            {routine.exercises.length > 0 ? (
                              routine.exercises.map((exercise, index) => (
                                <tr key={index}>
                                  <td>{exercise.name || 'N/A'}</td>
                                  <td>{exercise.reps || 'N/A'}</td>
                                  <td>{exercise.sets || 'N/A'}</td>
                                  <td>{exercise.weight || 'N/A'}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4">No exercises added</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No routines available for today</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoutineTable;
