import React, { useState } from 'react';
import { addExtraDataRequest } from '../../api/routine';
import { useRoutine } from '../../context/Exercise/RoutineContext';

function RoutineTable({ filteredRoutines, deleteRoutine, updateRoutine }) {
  const [editRow, setEditRow] = useState(null);
  const { addExtraData } = useRoutine();
  const [editedCategory, setEditedCategory] = useState('');
  const [editedMuscle, setEditedMuscle] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddAdditionalData = async (e, routineId) => {
    e.preventDefault();

    const additionalDataItem = {
      label: newLabel,
      value: newValue,
    };

    try {
      await addExtraData(routineId, [
        ...filteredRoutines.find((r) => r._id === routineId).additionalData,
        additionalDataItem,
      ]);
      setNewLabel(''); // Restablecer el formulario
      setNewValue('');
    } catch (error) {
      console.error(error);
    }
  };
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
    window.location.reload();
  };

  const resetForm = (id) => {
    if (editRow === id) {
      setEditRow(null); // Salir del modo de edición
      setEditedCategory(''); // Restablecer la categoría editada
      setEditedMuscle(''); // Restablecer los músculos editados
    }
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleDeleteRoutine = (id) => {
    deleteRoutine(id);
    window.location.reload();
  };

  const handleDeleteAdditionalData = async (routineId, label) => {
    try {
      await addExtraData(routineId, 
        filteredRoutines.find((r) => r._id === routineId).additionalData.filter(data => data.label !== label)
      );
      console.log('Deleted additional data successfully');
    } catch (error) {
      console.error('Error deleting additional data:', error);
    }
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
                      {editRow === routine._id ? (
                        <button
                          className="cancel-btn"
                          onClick={() => resetForm(routine._id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteRoutine(routine._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
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
                  {expandedRow === routine._id && (
                    <tr>
                      <td colSpan="6" className="exercise-details">
                        {/* Additional Data Section */}
                        {routine.additionalData &&
                          routine.additionalData.length > 0 && (
                            <div className="additional-data">
                            <>
                              <h3>Additional Data</h3>
                              <table className="nested-table">
                                <thead>
                                  <tr>
                                    <th>Label</th>
                                    <th>Value</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {routine.additionalData.map((data, index) => (
                                    <tr key={index}>
                                      <td>{data.label}</td>
                                      <td>{data.value}</td>
                                      <td>
                                        <button
                                          className="delete-btn"
                                          onClick={() => handleDeleteAdditionalData(routine._id, data.label)}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </>
                            </div>
                          )}

                        {/* Formulario para añadir datos adicionales */}
                        <div className="additional-data-form">
                          <h3>Add Additional Data</h3>
                          <form
                            onSubmit={(e) =>
                              handleAddAdditionalData(e, routine._id)
                            }
                            className="nested-form"
                          >
                            <input
                              type="text"
                              placeholder="Name"
                              value={newLabel}
                              onChange={(e) => setNewLabel(e.target.value)}
                              required
                            />
                            <input
                              type="text"
                              placeholder="Value"
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                              required
                            />
                            <button type="submit">Add</button>
                          </form>
                        </div>
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
