import { createContext, useContext, useState } from 'react';
import { getGoalsRequest, createGoalsRequest } from '../api/goals.js';

const GoalContext = createContext();

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoal must be used within a GoalProvider');
  }
  return context;
};

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);

  const getGoals = async () => {
    try {
      const res = await getGoalsRequest();
      setGoals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createGoals = async (goal) => {
    try {
      const res = await createGoalsRequest(goal);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        setGoals,
        createGoals,
        getGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
