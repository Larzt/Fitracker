import { createContext, useContext, useEffect, useState } from 'react';

import {
  getRoutinesRequest,
  getRoutineRequest,
  createRoutineRequest,
  deleteRoutineRequest,
  updateRoutineRequest,
  getRoutinesByDateRequest,
  getRoutinesByMuscleRequest,
  getRoutinesByCategoryRequest,
} from '../../api/routine';

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
      // console.log(res.data);
      setRoutine(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoutinesByCategory = async (date) => {
    try {
      const res = await getRoutinesByCategoryRequest(date);
      console.log(res.data);
      setRoutine(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoutinesByMuscle = async (date) => {
    try {
      const res = await getRoutinesByMuscleRequest(date);
      console.log(res.data);
      setRoutine(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createRoutine = async (id, exer) => {
    try {
      const res = await createRoutineRequest(id, exer);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoutine = async (id, body) => {
    try {
      const res = await updateRoutineRequest(id, body);
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
        updateRoutine,
        deleteRoutine,
        getRoutinesByDate,
        getRoutinesByCategory,
        getRoutinesByMuscle,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
}
