import React, { useState, useEffect } from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import RoutineTable from '../../components/Exercise/RoutineTable';
import AddRoutine from '../../components/Exercise/AddRoutine';
import RoutineFilters from '../../components/Exercise/RoutineFilters';
import useRoutines from '../../hooks/useRoutineLogic';

function RoutinePage() {
  const today = new Date().toISOString().split('T')[0];
  const {
    filteredRoutines,
    filterCategory,
    setFilterCategory,
    filterMuscle,
    setFilterMuscle,
    exers,
    deleteRoutine,
    updateRoutine,
    createRoutine,
  } = useRoutines(today);

  const [addRoutine, setAddRoutine] = useState(false);

  const toggleAddMode = () => {
    setAddRoutine(!addRoutine);
  };

  const handleExerSelect = (exer) => {
    createRoutine(exer._id, exer).catch((err) =>
      console.error('Error adding routine:', err)
    );
    window.location.reload();
  };

  return (
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
          <RoutineFilters
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterMuscle={filterMuscle}
            setFilterMuscle={setFilterMuscle}
          />
          <RoutineTable
            filteredRoutines={filteredRoutines}
            deleteRoutine={deleteRoutine}
            updateRoutine={updateRoutine}
          />
          {addRoutine && (
            <AddRoutine exers={exers} handleExerSelect={handleExerSelect} />
          )}
        </div>
      }
    />
  );
}

export default RoutinePage;
