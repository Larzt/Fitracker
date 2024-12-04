import React, { useEffect } from 'react';
import { useRoutine } from '../../context/RoutineContext';
import AddButton from '../../components/AddButton';
import { Navbar } from '../../components/Navbar';
import '../../css/Exercise/routine.css';
import { Link } from 'react-router-dom';

function RoutinePage() {
  const { routines, getRoutinesByDate, deleteRoutine } = useRoutine();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    getRoutinesByDate(today);
  }, []);

  const handleDeleteSubmit = (id) => {
    deleteRoutine(id);
    window.location.reload();
  };

  if (!Array.isArray(routines) || routines.length === 0) {
    return (
      <div className="routine-container-empty">
        <h1>Routines for Today</h1>
        <p>No routines available for today. Try adding some!</p>
        <div className="add-button-empty">
          <Link to={'/exer/list'}>
            <AddButton />
          </Link>
        </div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="routine-container">
      <h1>Routines for Today</h1>
      <div className="routine-list">
        {routines.map((routine) => {
          // Validación adicional para evitar errores
          const { exer } = routine || {};
          if (!exer) {
            console.warn(
              `Routine with ID ${routine._id} has no associated exer data.`
            );
            return null;
          }
          return (
            <div key={routine._id} className="routine-card">
              <div className="routine-header">
                <h2>{exer.name}</h2>
                <button
                  id="delete-button"
                  onClick={() => handleDeleteSubmit(routine._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              <div className="routine-info">
                <p>
                  <strong>Description:</strong> {exer.description}
                </p>
              </div>
            </div>
          );
        })}
        <Link to={'/exer/list'}>
          <AddButton />
        </Link>
      </div>
      <Navbar />
    </div>
  );
}

export default RoutinePage;
