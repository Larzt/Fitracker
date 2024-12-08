import React, { useState } from 'react';
import { DashBar } from '../components/Sidebar';
import '../css/display.css';

export const BaseDashboardPage = ({ content }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isLightOpen, setIsLightOpen] = useState(false);

  // Función para alternar la visibilidad de la barra lateral
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Cambiar la clase del ícono del menú según el estado de la barra lateral
  const navState = () => {
    return isNavOpen ? '-staggered' : '';
  };

  // Alternar el estado de la luz
  const toggleLight = () => {
    setIsLightOpen(!isLightOpen);
  };

  // Cambiar el tipo de luz según el estado
  const lightState = () => {
    return isLightOpen ? 'solid' : 'regular';
  };

  return (
    <div className="dashboard">
      {/* DashBar tiene una clase condicional para mostrar/ocultar */}
      <DashBar isOpen={isNavOpen} />
      <div className={`display-container ${isNavOpen ? 'open' : 'closed'}`}>
        {/* HEADER */}
        <div className="display-header">
          {/* Al hacer clic, se alterna la visibilidad de la barra lateral */}
          <button onClick={toggleNavbar}>
            <i className={`fa-solid fa-bars${navState()}`}></i>
          </button>
          <button onClick={toggleLight}>
            <i className={`fa-${lightState()} fa-lightbulb`}></i>
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
