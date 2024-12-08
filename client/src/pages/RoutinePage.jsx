import React, { useEffect, useState } from 'react';
import { BaseDashboardPage } from './BaseDashboardPage';
// import { useExer } from '../src/context/ExerciseContext.jsx';
import { useRoutine } from '../context/RoutineContext';

function DRoutinePage() {
  const { routines, getRoutinesByDate, deleteRoutine } = useRoutine();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    getRoutinesByDate(today);
  }, []);

  const handleDeleteSubmit = (id) => {
    deleteRoutine(id);
    window.location.reload();
  };

  const ExerTable = () => (
    <div className="display-content-table">
      <table>
        <thead>
          <tr className="display-content-table-header text-left">
            <th>Name</th>
            <th>Ingredients</th>
            <th>Calories</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {routines.length > 0 ? (
            // Filtra los platos que tienen datos de 'food'
            routines.filter((exer) => exer.food).length > 0 ? (
              routines.map((exer) => {
                const { food } = exer || {};
                if (!food) {
                  console.warn(
                    `Exer with ID ${exer._id} has no associated food data.`
                  );

                  return null;
                }
                return (
                  <tr key={exer._id}>
                    <td className="text-left">
                      {food?.name || 'No food added'}
                    </td>
                    <td className="text-left">{food?.ingredients || 'N/A'}</td>
                    <td className="text-left">{food?.calories || 'N/A'}</td>
                    <td className="text-center">
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteSubmit(exer._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No routines available for today</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="5">No routines available for today</td>
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
              <h1>Today Routines</h1>
              <div className="display-content-header-button">
                <button>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New exer</p>
                </button>
              </div>
            </div>
            <div className="display-content-search">
              <input type="text" placeholder="Filter by name" />
            </div>
            <ExerTable />
          </div>
        }
      />
    </div>
  );
}

export default DRoutinePage;
