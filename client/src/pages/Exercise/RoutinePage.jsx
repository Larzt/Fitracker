import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import { useRoutine } from '../../context/Exercise/RoutineContext';
import { useExers } from '../../context/Exercise/ExerciseContext';

function DRoutinePage() {
  const {
    routines,
    getRoutinesByDate,
    deleteRoutine,
    updateRoutineCategory,
    createRoutine,
  } = useRoutine();

  const { exers, getExers } = useExers();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [addRoutine, setAddRoutine] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getRoutinesByDate(today);
    getExers();
  }, []);
  console.log(filteredRoutines);

  useEffect(() => {
    const filtered = routines.filter((routine) => {
      const matchesCategory = filterCategory
        ? routine.category?.toLowerCase() === filterCategory.toLowerCase()
        : true;
      const matchesMuscle = filterMuscle
        ? routine.muscle?.toLowerCase() === filterMuscle.toLowerCase()
        : true;
      return matchesCategory && matchesMuscle;
    });
    setFilteredRoutines(filtered);
  }, [routines, filterCategory, filterMuscle]);

  const toggleAddMode = () => {
    setAddRoutine(!addRoutine);
    console.log(addRoutine);
  };

  const handleDeleteSubmit = (id) => {
    deleteRoutine(id);
    window.location.reload();
  };

  const toggleEditMode = (id, category) => {
    setEditRow(editRow === id ? null : id);
    setEditedCategory(category);
  };

  const handleCategoryChange = (newCategory) => setEditedCategory(newCategory);

  const saveCategory = (id) => {
    updateRoutineCategory(id, editedCategory);
    setEditRow(null);
    window.location.reload();
  };

  const handleExerSelect = (exer) => {
    createRoutine(exer._id, exer);
    window.location.reload();
  };

  const RoutineTable = () => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [editedMuscle, setEditedMuscle] = useState('');

    const categoryOptions = ['strength', 'cardio', 'flexibility', 'other'];
    const muscleOptions = ['chest', 'back', 'legs', 'arms', 'abs', 'other'];

    const toggleRowExpansion = (id) => {
      setExpandedRow(expandedRow === id ? null : id);
    };

    const handleMuscleChange = (newMuscle) => setEditedMuscle(newMuscle);

    const saveRoutine = (id) => {
      updateRoutineCategory(id, editedCategory, editedMuscle);
      setEditRow(null);
      window.location.reload();
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
                            onChange={(e) =>
                              handleCategoryChange(e.target.value)
                            }
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
                            onChange={(e) => handleMuscleChange(e.target.value)}
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
                              toggleEditMode(routine._id, routine.category)
                            }
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteSubmit(routine._id)}
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
  };

  const AddRoutine = () => (
    <div className="display-content-add">
      <table>
        <thead>
          <tr className="display-content-add-head text-left">
            <th>Name</th>
            <th>Description</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {exers.length > 0 ? (
            exers.map((exer, index) => (
              <tr key={index}>
                <td className="text-left">{exer.name || 'N/A'}</td>
                <td className="text-left">{exer.description || 'N/A'}</td>
                <td className="text-center">
                  <button
                    className="display-content-add-btn"
                    onClick={() => handleExerSelect(exer)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No routines available to add</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <BaseDashboardPage
        content={
          <div className="display-content">
            <div className="display-content-header">
              <h1>Today's Routines</h1>
              <div className="display-content-header-button">
                <button onClick={toggleAddMode}>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New Routine</p>
                </button>
              </div>
            </div>
            <form className="display-content-search">
              <select
                name="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="display-content-form-select"
              >
                <option value="">All Categories</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="flexibility">Flexibility</option>
              </select>
              <select
                name="filterMuscle"
                value={filterMuscle}
                onChange={(e) => setFilterMuscle(e.target.value)}
                className="display-content-form-select"
              >
                <option value="">All Muscles</option>
                <option value="biceps">Biceps</option>
                <option value="triceps">Triceps</option>
                <option value="quadriceps">Quadriceps</option>
              </select>
            </form>
            <RoutineTable />
            {addRoutine && <AddRoutine />}
          </div>
        }
      />
    </div>
  );
}

export default DRoutinePage;
