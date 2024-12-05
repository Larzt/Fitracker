import React, { useEffect, useState } from 'react';
import { DashboardPage } from './DashboardPage';
import { useExers } from '../context/ExerciseContext';

function DExercisePage() {
  const { exers, getExers, createExer, updateExer, deleteExer } = useExers();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExer, setCurrentExer] = useState({});

  useEffect(() => {
    getExers();
  }, []);

  const resetForm = () => {
    setCurrentExer({});
    setIsEditing(false);
  };

  const toggleFormVisibility = () => {
    if (isFormVisible && isEditing) resetForm();
    else setIsFormVisible(!isFormVisible);
  };

  const handleSaveExer = () => {
    if (!currentExer.name || !currentExer.category) {
      alert('Please fill out the name and category fields!');
      return;
    }

    if (isEditing) {
      updateExer(currentExer._id, currentExer);
    } else {
      createExer(currentExer);
    }
    resetForm();
    setIsFormVisible(false);
    window.location.reload();
  };

  const handleEditExer = (exer) => {
    setCurrentExer(exer);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDeleteExer = (id) => {
    deleteExer(id);
    window.location.reload();
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setCurrentExer((prev) => ({ ...prev, [name]: value }));
  };

  const ExerciseTable = () => (
    <div className="display-content-table">
      <table>
        <thead>
          <tr className="display-content-table-header text-left">
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {exers.map((exer) => (
            <tr key={exer._id}>
              <td className="text-left">{exer.name}</td>
              <td className="text-left">{exer.description || 'None'}</td>
              <td className="text-left">{exer.category || 'None'}</td>
              <td className="text-center">
                <button
                  onClick={() => handleEditExer(exer)}
                  className="edit-btn"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td className="text-center">
                <button
                  onClick={() => handleDeleteExer(exer._id)}
                  className="delete-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ExerciseForm = () =>
    isFormVisible && (
      <div className="display-content-form">
        <input
          type="text"
          name="name"
          placeholder="Exercise name"
          value={currentExer.name || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={currentExer.description || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={currentExer.category || ''}
          onChange={handleInputChange}
        />
        <div className="form-buttons">
          <button onClick={handleSaveExer} className="save-btn">
            <p>{isEditing ? 'Update' : 'Save'}</p>
          </button>
          <button
            onClick={() => setIsFormVisible(false)}
            className="cancel-btn"
          >
            <p>Cancel</p>
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <DashboardPage
        content={
          <div className="display-content">
            <div className="display-content-header">
              <h1>Exercises</h1>
              <div className="display-content-header-button">
                <button onClick={toggleFormVisibility}>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New exercise</p>
                </button>
              </div>
            </div>
            <div className="display-content-search">
              <input type="text" placeholder="Filter by category" />
            </div>
            <ExerciseTable />
            <ExerciseForm />
          </div>
        }
      />
    </div>
  );
}

export default DExercisePage;
