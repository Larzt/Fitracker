import { createContext, useContext, useState } from 'react';

import {
  getRoutinesRequest,
  getRoutineRequest,
  createRoutineRequest,
  deleteRoutineRequest,
  getRoutinesByDateRequest,
} from '../api/routine';
import { useExers } from './ExerciseContext';

const RoutineContext = createContext();

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }
  return context;
};

export function RoutineProvider({ children }) {
  const [routines, setRoutine] = useState([]);

  const getRoutines = async () => {
    try {
      const res = await getRoutinesRequest();
      setRoutine(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoutinesByDate = async (date) => {
    try {
      const res = await getRoutinesByDateRequest(date);
      console.log(res.data);
      setRoutine(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createRoutine = async (id) => {
    try {
      const res = await createRoutineRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoutine = async (id) => {
    try {
      const res = await deleteRoutineRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        getRoutines,
        createRoutine,
        deleteRoutine,
        getRoutinesByDate,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}
