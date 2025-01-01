import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { BaseDashboardPage } from './BaseDashboardPage';
import AvatarSection from '../components/AvatarSection'; // Importamos el componente AvatarSection
import '../css/profile.css';
import Metrics from '../components/UserMetrics';

function ProfilePage() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { avatar, getAvatar } = useAuth();
  const {
    weight: initialWeightAndDate,
    updateWeight,
    calories: initialCalories,
    updateCalories,
    height: initialHeight,
    updateHeight,
  } = useAuth();

  // Carga el avatar al montar el componente
  useEffect(() => {
    setLoading(true);
    getAvatar().finally(() => setLoading(false)); // Cargamos el avatar\
  }, [getAvatar]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  const onSubmit = handleSubmit(async (values) => {
    const { weight, calories, height } = values;
    if (weight) updateWeight(values);
    if (calories) updateCalories(values);
    if (height) updateHeight(values);
    window.location.reload();
  });

  return (
    <BaseDashboardPage
      content={
        <div className="dashboard-content">
          <AvatarSection avatar={avatar} /> {/* Componente AvatarSection */}
          <div className="dashboard-main-content">
            <Metrics
              initialHeight={initialHeight}
              initialWeightAndDate={initialWeightAndDate}
              initialCalories={initialCalories}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      }
    />
  );
}

export default ProfilePage;
