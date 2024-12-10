import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import { useExers } from '../../context/Exercise/ExerciseContext';
import ExerciseForm from '../../components/Exercise/ExerciseForm';

function ExercisePage() {
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
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) setIsEditing(false);
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
    getExers(); // Refresca la lista sin recargar la página
  };

  const handleEditExer = (exer) => {
    setCurrentExer(exer);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDeleteExer = (id) => {
    deleteExer(id);
    getExers(); // Actualiza la lista sin recargar la página
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setCurrentExer((prev) => {
      if (prev[name] === value) return prev; // Evita renders innecesarios
      return { ...prev, [name]: value };
    });
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
          {exers.length > 0 ? (
            exers.map((exer) => (
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

  return (
    <div>
      <BaseDashboardPage
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
            <ExerciseForm
              isVisible={isFormVisible}
              currentExer={currentExer}
              handleInputChange={handleInputChange}
              handleSaveExer={handleSaveExer}
              resetForm={resetForm}
              isEditing={isEditing}
            />
          </div>
        }
      />
    </div>
  );
}

export default ExercisePage;
