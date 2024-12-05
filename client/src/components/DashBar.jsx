import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/dashbar.css';

export const DashBar = ({ isOpen }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const [isDishOpen, setIsDishOpen] = useState(false);
  const { logout } = useAuth();

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

  return (
    <div className={`dash-container ${isOpen ? 'open' : 'closed'}`}>
      {/* HEADER */}
      <div className="dash-header">
        <Link to={'/dashboard'}>
          <button className="dash-header-button">
            <i className="fa-solid fa-circle-user"></i>
          </button>
        </Link>
        <div className="dash-header-text">
          <h1>Fitracker</h1>
          <h2>Usuario</h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dash-content">
        <h2>Modules</h2>
        {/* Calendar */}
        <div className="dash-calendar">
          <button onClick={toggleCalendar}>
            <i className="fa-solid fa-calendar-days"></i>
            <p>Calendar</p>
            <i className={`fa-solid fa-chevron-${calendarState()}`}></i>
          </button>
          {isCalendarOpen && (
            <div className="dropdown">
              <button>
                <p>Exercise</p>
              </button>
              <button>
                <p>Dish</p>
              </button>
            </div>
          )}
        </div>

        {/* Exercises */}
        <div className="dash-exercises">
          <button onClick={toggleExercise}>
            <i className="fa-solid fa-heart"></i>
            <p>Exercises</p>
            <i className={`fa-solid fa-chevron-${exerciseState()}`}></i>
          </button>
          {isExerciseOpen && (
            <div className="dropdown">
              <button>
                <p>Routines</p>
              </button>
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
              <button>
                <p>Dishes</p>
              </button>
              <Link to={'/dashboard/food'}>
                <button>
                  <p>Food</p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Setting */}
      <div className="dash-setting">
        <button>
          <i className="fa-solid fa-cog"></i>
        </button>
        <Link>
          <button onClick={() => logout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};
