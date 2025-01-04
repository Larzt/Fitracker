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
    getExers(); // Carga inicial de ejercicios
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

  const handleSaveExer = async () => {
    if (!currentExer.name) {
      alert('Please fill out the name field!');
      return;
    }

    try {
      if (isEditing) {
        await updateExer(currentExer._id, currentExer);
      } else {
        await createExer(currentExer);
      }
      resetForm();
      await getExers(); // Refresca la lista de ejercicios
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  const handleEditExer = (exer) => {
    setCurrentExer(exer);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDeleteExer = async (id) => {
    try {
      await deleteExer(id);
      await getExers(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setCurrentExer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetFavourite = async (exer) => {
    try {
      const updatedExer = { ...exer, favourite: !exer.favourite };
      await updateExer(exer._id, updatedExer);
      await getExers(); // Actualiza la lista después de modificar
    } catch (error) {
      console.error('Error updating favourite:', error);
    }
  };

  const handleSetPublic = async (exer) => {
    try {
      const updatedExer = { ...exer, isPublic: !exer.isPublic };
      await updateExer(exer._id, updatedExer);
      await getExers(); // Actualiza la lista después de modificar
    } catch (error) {
      console.error('Error updating isPublic:', error);
    }
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
              exers={exers} // Pasamos los ejercicios del contexto directamente
              handleEditExer={handleEditExer}
              handleDeleteExer={handleDeleteExer}
              handleSetFavourite={handleSetFavourite}
              handleSetPublic={handleSetPublic}
            />
          </div>
        }
      />
    </div>
  );
}

export default ExercisePage;
