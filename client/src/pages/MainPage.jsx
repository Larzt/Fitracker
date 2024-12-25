import React, { useState } from 'react';
import { WeightChart } from '../components/WeightChart';
import { CaloriesDoughnut } from '../components/CaloriesChart';
import { BaseDashboardPage } from './BaseDashboardPage';
import { useAuth } from '../context/AuthContext';
import { useCaloriesLogic } from '../hooks/useCaloriesLogic';

function MainPage() {
  const { calories } = useAuth();
  const { currentCalories } = useCaloriesLogic();

  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <div className="display-content-progress">
            <div className="WeightChart">
              <WeightChart />
            </div>
            <div className="CaloriesDoughnut">
              <CaloriesDoughnut
                currentValue={currentCalories}
                targetCalories={calories}
              />
            </div>
          </div>
        </div>
      }
    />
  );
}

export default MainPage;
