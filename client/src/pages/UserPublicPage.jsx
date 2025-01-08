import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseDashboardPage } from './BaseDashboardPage';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/Food/FoodContext';
import { useExers } from '../context/Exercise/ExerciseContext';
import { searchAvatarRequest } from '../api/auth';

function UserPublicPage() {
  const { id } = useParams(); // Extrae el parámetro id de la URL.
  const { user, getUser } = useAuth();
  const { foodFromUser, copyFood } = useFood();
  const { exerciseFromUser, createExer } = useExers();
  const [currentUser, setUser] = useState(null); // Inicializa el estado como null.
  const [foods, setFood] = useState([]); // Inicializa el estado como un arreglo vacío.
  const [exers, setExers] = useState([]); // Inicializa el estado como un arreglo vacío.
  const [avatar, setAvatar] = useState('../images/default.png'); // Inicializa el estado como un arreglo vacío.

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(id); // Espera a que la promesa se resuelva.
      setUser(user); // Actualiza el estado con la respuesta obtenida.
    };

    const fetchFood = async () => {
      const food = await foodFromUser(id); // Espera a que la promesa se resuelva.
      setFood(food); // Actualiza el estado con la respuesta obtenida.
    };

    const fetchExercise = async () => {
      const food = await exerciseFromUser(id); // Espera a que la promesa se resuelva.
      setExers(food); // Actualiza el estado con la respuesta obtenida.
    };

    const loadUserAvatar = async () => {
      let res = await searchAvatarRequest(id);
      if (res.status === 200) {
        setAvatar(`/uploads/${res.data.avatar}.png`);
      }
      console.log(res.status);
    };

    fetchUser();
    fetchExercise();
    fetchFood();
    loadUserAvatar();
  }, [id]); // Asegúrate de que se vuelva a ejecutar si cambia el id.

  // Verifica si `currentUser` está cargado
  if (!currentUser) {
    return <div className="loading-message">Loading...</div>; // Muestra un mensaje de carga mientras esperas la respuesta.
  }

  const handleCopyFood = async (data) => {
    console.log(user);
    copyFood(data, user.id);
  }
  // const handleCopyExer = (data) => {
  //   console.log(data);
  //   createExer(data);
  // }

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
              <th>Ingredients</th>
              <th>Calories</th>
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
