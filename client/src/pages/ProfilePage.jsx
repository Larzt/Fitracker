import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { BaseDashboardPage } from './BaseDashboardPage';
import AvatarSection from '../components/AvatarSection'; // Importamos el componente AvatarSection
import '../css/profile.css';

function ProfilePage() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { avatar, getAvatar } = useAuth();
  const {
    weight: initialWeightAndDate,
    updateWeight,
    calories: initialCalories,
    updateCalories,
  } = useAuth();

  // Carga el avatar al montar el componente
  useEffect(() => {
    setLoading(true);
    getAvatar().finally(() => setLoading(false)); // Cargamos el avatar
  }, [getAvatar]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  const onSubmit = handleSubmit(async (values) => {
    // console.log(values); // Verifica qué datos se están enviando
    const { weight, calories } = values;
    if (weight) updateWeight(values);
    if (calories) updateCalories(values);
    window.location.reload();
  });

  console.log(initialWeightAndDate);

  const Metrics = () => {
    return (
      <div className="dashboard-main-content-body">
        <div className="dashboard-main-content-metrics">
          <h1>Goal Metrics</h1>
          <form className="metrics-weight" onSubmit={onSubmit}>
            <p>Weight</p>
            <input
              type="text"
              {...register('weight')}
              placeholder={initialWeightAndDate.weight || 'Weight'}
            />
            <button type="submit">Save</button>
          </form>
          <form className="metrics-calories" onSubmit={onSubmit}>
            <p>Calories</p>
            <input
              type="text"
              {...register('calories')}
              placeholder={initialCalories || 'Calories'}
            />
            <button type="submit">Save</button>
          </form>
        </div>
        <div className="dashboard-main-content-goals">
          <h1>Challengs</h1>
        </div>
      </div>
    );
  };

  return (
    <BaseDashboardPage
      content={
        <div className="dashboard-content">
          <AvatarSection avatar={avatar} /> {/* Componente AvatarSection */}
          <div className="dashboard-main-content">
            <Metrics />
          </div>
        </div>
      }
    />
  );
}

export default ProfilePage;
