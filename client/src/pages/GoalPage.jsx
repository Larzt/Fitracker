import React, { useEffect } from 'react';
import { useGoal } from '../context/GoalContext';
import { useAuth } from '../context/AuthContext';

function GoalPage() {
  const { goals, getGoals } = useGoal();
  console.log(goals);

  useEffect(() => {
    getGoals();
  }, []);

  return <div>GoalPage</div>;
}

export default GoalPage;
