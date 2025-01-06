import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Metrics = ({
  initialHeight,
  initialWeightAndDate,
  initialCalories,
  onSubmit,
}) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { register, handleSubmit } = useForm();
  const { updateHeight, updateWeight, updateCalories } = useAuth();
  const { user } = useAuth();

  const gainWeight =
    1.55 * (10 * user.weight + 6.25 * user.height - 5 * user.age) + 300;

  const stayWeight =
    1.55 * (10 * user.weight + 6.25 * user.height - 5 * user.age);

  const loseWeight =
    1.55 * (10 * user.weight + 6.25 * user.height - 5 * user.age) - 300;

  const handleHeightSubmit = async (data) => {
    await updateHeight(data.height); // Actualiza la altura usando el contexto
  };

  const handleWeightSubmit = async (data) => {
    await updateWeight(data.weight); // Actualiza el peso usando el contexto
  };

  const handleCaloriesSubmit = async (data) => {
    await updateCalories(data.calories); // Actualiza las calorías usando el contexto
  };

  return (
    <div className="dashboard-main-content-body">
      <div className="dashboard-main-content-metrics">
        <h1>Metrics</h1>
        {/* Formulario de altura */}
        <form
          className="metrics-height"
          onSubmit={handleSubmit(handleHeightSubmit)}
        >
          <p>Height</p>
          <input
            type="text"
            {...register('height')}
            placeholder={initialHeight || 'cm'} // Usa el valor desde el contexto
          />
          <button type="submit">Save</button>
        </form>

        {/* Formulario de peso */}
        <form
          className="metrics-weight"
          onSubmit={handleSubmit(handleWeightSubmit)}
        >
          <p>Weight</p>
          <input
            type="text"
            {...register('weight')}
            placeholder={initialWeightAndDate.weight || 'kg'} // Usa el valor desde el contexto
          />
          <button type="submit">Save</button>
        </form>

        {/* Formulario de calorías */}
        <form
          className="metrics-calories"
          onSubmit={handleSubmit(handleCaloriesSubmit)}
        >
          <p>Days Goal Calories</p>
          <input
            type="text"
            {...register('calories')}
            placeholder={initialCalories || 'kcal'} // Usa el valor desde el contexto
          />
          <button type="submit">Save</button>
        </form>
      </div>
      <div className="dashboard-main-content-goals">
        <h1>Calculator</h1>
        <div className="up-weight" onClick={() => setSelectedGoal(gainWeight)}>
          Gain weight
        </div>
        <div
          className="stay-weight"
          onClick={() => setSelectedGoal(stayWeight)}
        >
          Maintaining weight
        </div>
        <div className="low-weight" onClick={() => setSelectedGoal(loseWeight)}>
          Lose weight
        </div>
        {selectedGoal && (
          <div className="goal-info">
            <div className="goal-info-content">
              <h2> The calories you need to eat to achieve your goal are:</h2>
              <p>{[selectedGoal]}</p>
              <p>Caution: this information is merely indicative.</p>
            </div>
            <button onClick={() => setSelectedGoal(null)}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metrics;
