import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import { useRoutine } from '../../context/Exercise/RoutineContext';
import { useExers } from '../../context/Exercise/ExerciseContext';

function DRoutinePage() {
  const {
    routines,
    getRoutinesByDate,
    deleteRoutine,
    updateRoutine,
    createRoutine,
  } = useRoutine();

  const { exers, getExers } = useExers();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedMuscle, setEditedMuscle] = useState('');
  const [addRoutine, setAddRoutine] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getRoutinesByDate(today);
    getExers();
  }, []);

  useEffect(() => {
    const filtered = routines.filter((routine) => {
      const matchesCategory = filterCategory
        ? routine.category?.toLowerCase() === filterCategory.toLowerCase()
        : true;
      const matchesMuscle = filterMuscle
        ? routine.musclesTargeted?.toLowerCase() === filterMuscle.toLowerCase()
        : true;
      return matchesCategory && matchesMuscle;
    });
    setFilteredRoutines(filtered);
  }, [routines, filterCategory, filterMuscle]);

  const toggleAddMode = () => {
    setAddRoutine(!addRoutine);
  };

  const handleDeleteSubmit = (id) => {
    deleteRoutine(id)
      .then(() => {
        setFilteredRoutines((prev) =>
          prev.filter((routine) => routine._id !== id)
        );
      })
      .catch((err) => console.error('Error deleting routine:', err));
  };

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
        const updatedRoutines = routines.map((routine) =>
          routine._id === id ? { ...routine, ...updatedRoutine } : routine
        );
        setFilteredRoutines(updatedRoutines);
        setEditRow(null);
      })
      .catch((err) => console.error('Error updating routine:', err));
  };

  const handleExerSelect = (exer) => {
    createRoutine(exer._id, exer)
      .then(() => {
        getRoutinesByDate(today);
      })
      .catch((err) => console.error('Error adding routine:', err));
  };

  const RoutineTable = () => {
    const [expandedRow, setExpandedRow] = useState(null);

    const categoryOptions = ['other', 'strength', 'cardio', 'flexibility'];
    const muscleOptions = ['other', 'chest', 'back', 'legs', 'arms', 'abs'];

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
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="legs">Legs</option>
                <option value="arms">Arms</option>
                <option value="abs">Abs</option>
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
