import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/sidebar.css';

export const DashBar = ({ isOpen }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const [isDishOpen, setIsDishOpen] = useState(false);
  const { user, logout, avatar, getAvatar } = useAuth();

  // Carga el avatar al montar el componente
  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  const toUpperCase = (str) => {
    return str.toUpperCase();
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const calendarState = () => {
    return isCalendarOpen ? 'down' : 'right';
  };

  const toggleExercise = () => {
    setIsExerciseOpen(!isExerciseOpen);
  };

  const exerciseState = () => {
    return isExerciseOpen ? 'down' : 'right';
  };

  const toggleDish = () => {
    setIsDishOpen(!isDishOpen);
  };

  const dishState = () => {
    return isDishOpen ? 'down' : 'right';
  };

  // Verifica si el avatar existe y tiene un valor válido, en caso contrario, usa una imagen predeterminada
  const avatarUrl = avatar ? avatar : './client/images/default-avatar.png'; // Ruta de la imagen predeterminada
  // console.log(avatar);

  return (
    <div className={`dash-container ${isOpen ? 'open' : 'closed'}`}>
      {/* HEADER */}
      <div className="dash-header">
        <Link to={'/dashboard'}>
          <button className="dash-header-button">
            <img src={avatarUrl} />
          </button>
        </Link>
        <div className="dash-header-text">
          <h1>Fitracker</h1>
          <h2>{toUpperCase(user.username)}</h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dash-content">
        {/* Calendar */}
        <div className="dash-calendar">
          <button onClick={toggleCalendar}>
            <i className="fa-solid fa-calendar-days"></i>
            <p>Calendar</p>
            <i className={`fa-solid fa-chevron-${calendarState()}`}></i>
          </button>
          {isCalendarOpen && (
            <div className="dropdown">
              <Link to={'/dashboard/calendar'}>
                <button>
                  <p>Routines</p>
                </button>
              </Link>
              <button>
                <p>Dishes</p>
              </button>
            </div>
          )}
        </div>

        {/* Exercises */}
        <div className="dash-exercises">
          <button onClick={toggleExercise}>
            <i className="fa-solid fa-heart"></i>
            <p>Routines</p>
            <i className={`fa-solid fa-chevron-${exerciseState()}`}></i>
          </button>
          {isExerciseOpen && (
            <div className="dropdown">
              <Link to={'/dashboard/routines'}>
                <button>
                  <p>Routines</p>
                </button>
              </Link>
              <Link to={'/dashboard/exercise'}>
                <button>
                  <p>Exercise</p>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Dishes */}
        <div className="dash-dishes">
          <button onClick={toggleDish}>
            <i className="fa-solid fa-utensils"></i>
            <p>Dishes</p>
            <i className={`fa-solid fa-chevron-${dishState()}`}></i>
          </button>
          {isDishOpen && (
            <div className="dropdown">
              <Link to={'/dashboard/dishes'}>
                <button>
                  <p>Dishes</p>
                </button>
              </Link>
              <Link to={'/dashboard/food'}>
                <button>
                  <p>Food</p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="dash-setting">
        <Link to={'/profile'}>
          <button className="dash-setting-profile-btn">
            <i className="fa-solid fa-cog"></i>
          </button>
        </Link>
        <Link>
          <button className="dash-setting-logout-btn" onClick={() => logout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};
