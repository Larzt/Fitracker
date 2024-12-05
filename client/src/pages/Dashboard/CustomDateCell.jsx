import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomDateCell = ({ children }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/dashboard/exercise');
  };

  return (
    <div className="custom-date-cell">
      {children}
      <button onClick={handleImageClick}>
      <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default CustomDateCell;