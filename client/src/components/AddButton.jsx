import React from 'react';
import '../css/addButton.css'; // Asegúrate de incluir el archivo CSS si estás usando uno.

export const AddButton = () => {
  return (
    <button className="add-button">
      <i className="fa-solid fa-circle-plus add-button-icon"></i>
    </button>
  );
};

export default AddButton;
