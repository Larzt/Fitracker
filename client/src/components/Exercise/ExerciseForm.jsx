import React from 'react';
import Switch from 'react-switch';

const ExerciseForm = ({
  isVisible,
  currentExer,
  handleInputChange,
  handleSaveExer,
  resetForm,
  isEditing,
}) => {
  if (!isVisible) return null;
  const isPublic = currentExer.isPublic;

  return (
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

      {/* Toggle usando react-switch */}
      <div className="display-visibility-toggle">
        <label htmlFor="isPublic" className="display-switch-label">
          <p
            className={`display-visibility-text-${isPublic ? 'public' : 'private'
              }`}
          >
            {isPublic ? 'Public' : 'Private'}
          </p>
          <Switch
            onChange={(checked) =>
              handleInputChange({
                target: { name: 'isPublic', value: checked },
              })
            }
            checked={isPublic || false}
            onColor="#3b82f6"
            offColor="#ccc"
            className="display-custom-switch"
          />
        </label>
      </div>

      <div className="form-buttons">
        <button onClick={handleSaveExer} className="save-btn">
          <p>{isEditing ? 'Update' : 'Save'}</p>
        </button>
        <button onClick={resetForm} className="cancel-btn">
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
};

export default ExerciseForm;
