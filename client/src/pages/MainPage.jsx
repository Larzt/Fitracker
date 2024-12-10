import React from 'react';
import { WeightChart } from '../components/WeightChart';
import { CaloriesChart } from '../components/Food/CaloriesChart';
import { BaseDashboardPage } from './BaseDashboardPage';

function MainPage() {
  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <div className="display-content-progress">
            <WeightChart />
            <CaloriesChart />
          </div>
        </div>
      }
    />
  );
}

export default MainPage;
