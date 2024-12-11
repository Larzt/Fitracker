import React from 'react';

const ExerciseForm = ({
  isVisible,
  currentExer,
  handleInputChange,
  handleSaveExer,
  resetForm,
  isEditing,
}) => {
  return (
    isVisible && (
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
          name="equipment"
          placeholder="Equipment"
          value={currentExer.equipment || ''}
          onChange={handleInputChange}
        />
        <div className="form-buttons">
          <button onClick={handleSaveExer} className="save-btn">
            <p>{isEditing ? 'Update' : 'Save'}</p>
          </button>
          <button onClick={resetForm} className="cancel-btn">
            <p>Cancel</p>
          </button>
        </div>
      </div>
    )
  );
};

export default ExerciseForm;
