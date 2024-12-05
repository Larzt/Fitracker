import React, { useEffect } from 'react';
import { DashboardPage } from './DashboardPage';
import { useExers } from '../../context/ExerciseContext';

function DExercisePage() {
  const { exers, getExers, updateExer, deleteExer } = useExers();

  useEffect(() => {
    getExers();
  }, []);

  const handleDeleteExer = (id) => {
    deleteExer(id);
    window.location.reload();
  };

  return (
    <div>
      <DashboardPage
        content={
          <div className="display-content">
            <div className="display-content-header">
              <h1>Exercise</h1>
              <div className="display-content-header-button">
                <button>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New exercise</p>
                </button>
              </div>
            </div>
            <div className="display-content-search">
              <input type="text" placeholder="Filter by category" />
            </div>
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
                      <td className="text-left">{exer.description}</td>
                      <td className="text-left">
                        {exer.category ? exer.category : 'None'}
                      </td>
                      <td className="text-center">
                        <button className="edit-btn">
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
          </div>
        }
      />
    </div>
  );
}

export default DExercisePage;
