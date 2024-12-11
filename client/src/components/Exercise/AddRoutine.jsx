import React from 'react';

function AddRoutine({ exers, handleExerSelect }) {
  return (
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
              <td colSpan="3">No exercises available to add</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddRoutine;
