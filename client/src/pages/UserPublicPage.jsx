import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseDashboardPage } from './BaseDashboardPage';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/Food/FoodContext';
import { useExers } from '../context/Exercise/ExerciseContext';
import { searchAvatarRequest } from '../api/auth';

function UserPublicPage() {
  const { id } = useParams();
  const { user, getUser } = useAuth();
  const { foodFromUser, copyFood } = useFood();
  const { exerciseFromUser, copyExer } = useExers();
  const [currentUser, setUser] = useState(null);
  const [foods, setFood] = useState([]);
  const [exers, setExers] = useState([]);
  const [avatar, setAvatar] = useState('/uploads/default.png');
  const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de alerta.

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(id);
      setUser(user);
    };

    const fetchFood = async () => {
      const food = await foodFromUser(id);
      setFood(food);
    };

    const fetchExercise = async () => {
      const food = await exerciseFromUser(id);
      setExers(food);
    };

    const loadUserAvatar = async () => {
      let res = await searchAvatarRequest(id);
      if (res.status === 200) {
        setAvatar(`/uploads/${res.data.avatar}.png`);
      } else if (res.status === 204) {
        setAvatar(`/uploads/default.png`);
      }
    };

    fetchUser();
    fetchExercise();
    fetchFood();
    loadUserAvatar();
  }, [id]);

  if (!currentUser) {
    return <div className="loading-message">Loading...</div>;
  }

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(''), 3000); // Oculta la alerta después de 3 segundos.
  };

  const handleCopyFood = async (data) => {
    copyFood(data, user.id);
    showAlert('Food copied successfully!');
  };

  const handleCopyExer = (data) => {
    copyExer(data, user.id);
    showAlert('Exercise copied successfully!');
  };

  function PublicFood() {
    return (
      <div className="display-content-table">
        <table>
          <thead>
            <tr className="display-content-table-header text-left">
              <th>Name</th>
              <th>Ingredients</th>
              <th>Calories</th>
              <th className="text-center">Copy</th>
            </tr>
          </thead>
          <tbody>
            {foods.length > 0 ? (
              foods.map((food, index) => (
                <tr key={index}>
                  <td className="text-left">{food.name}</td>
                  <td className="text-left">{food.ingredients || 'None'}</td>
                  <td className="text-left">{food.calories || 'None'}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleCopyFood(food)}
                      className="edit-btn"
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No food has been added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  function PublicExercise() {
    return (
      <div className="display-content-table">
        <table>
          <thead>
            <tr className="display-content-table-header text-left">
              <th>Name</th>
              <th>Description</th>
              <th>Equipment</th>
              <th className="text-center">Copy</th>
            </tr>
          </thead>
          <tbody>
            {exers.length > 0 ? (
              exers.map((exer, index) => (
                <tr key={index}>
                  <td className="text-left">{exer.name}</td>
                  <td className="text-left">{exer.description || 'None'}</td>
                  <td className="text-left">{exer.equipment || 'None'}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleCopyExer(exer)}
                      className="edit-btn"
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No exer has been added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <BaseDashboardPage
      content={
        <div className="display-content-public">
          {alertMessage && (
            <div className="alert-box">
              {alertMessage}
            </div>
          )}
          <div className="display-content-public-header">
            <Link to={`/public/${id}`}>
              <button>
                <img src={avatar} alt="Avatar" />
              </button>
            </Link>
            <h1>{currentUser.username}</h1>
          </div>
          <div className="display-content-public-food">
            <h2>Food</h2>
            <PublicFood />
          </div>
          <div className="display-content-public-exercise">
            <h2>Exercise</h2>
            <PublicExercise />
          </div>
        </div>
      }
    />
  );
}

export default UserPublicPage;
