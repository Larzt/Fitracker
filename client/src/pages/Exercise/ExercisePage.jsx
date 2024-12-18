import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import { useExers } from '../../context/Exercise/ExerciseContext';
import ExerciseForm from '../../components/Exercise/ExerciseForm';
import ExerciseTable from '../../components/Exercise/ExerciseTable';

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
    if (!currentExer.name) {
      alert('Please fill out the name field!');
      return;
    }

    if (isEditing) {
      updateExer(currentExer._id, currentExer);
    } else {
      createExer(currentExer);
    }
    resetForm();
    getExers(); // Refresca la lista sin recargar la página
    window.location.reload();
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
            <ExerciseForm
              isVisible={isFormVisible}
              currentExer={currentExer}
              handleInputChange={handleInputChange}
              handleSaveExer={handleSaveExer}
              resetForm={resetForm}
              isEditing={isEditing}
            />
            <ExerciseTable
              exers={exers}
              handleEditExer={handleEditExer}
              handleDeleteExer={handleDeleteExer}
            />
          </div>
        }
      />
    </div>
  );
}

export default ExercisePage;
