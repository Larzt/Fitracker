import React from 'react';

const FoodForm = ({
  isVisible,
  currentFood,
  handleInputChange,
  handleSaveFood,
  resetForm,
  isEditing,
}) => {
  if (!isVisible) return null;

  return (
    <div className="display-content-form">
      <input
        type="text"
        name="name"
        placeholder="Food name"
        value={currentFood.name || ''}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients"
        value={currentFood.ingredients || ''}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="calories"
        placeholder="Calories"
        value={currentFood.calories || ''}
        onChange={handleInputChange}
      />
      <div className="form-buttons">
        <button onClick={handleSaveFood} className="save-btn">
          <p>{isEditing ? 'Update' : 'Save'}</p>
        </button>
        <button onClick={resetForm} className="cancel-btn">
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
};

export default FoodForm;
