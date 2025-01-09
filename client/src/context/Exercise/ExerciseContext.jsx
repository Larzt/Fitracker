import { createContext, useContext, useState } from 'react';
import {
  getExersRequest,
  getExerRequest,
  createExerRequest,
  updateExerRequest,
  deleteExerRequest,
  getExerciseFromUserRequest,
  copyExerRequest,
} from '../../api/exercise.js';

const ExersContext = createContext();

export const useExers = () => {
  const context = useContext(ExersContext);
  if (!context) {
    throw new Error('useExers must be used within a ExersProvider');
  }
  return context;
};

export function ExersProvider({ children }) {
  const [exers, setExers] = useState([]);

  const getExers = async () => {
    try {
      const res = await getExersRequest();
      setExers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getExer = async (id) => {
    try {
      const res = await getExerRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createExer = async (exer) => {
    const res = await createExerRequest(exer);
    console.log(res);
  };

  const updateExer = async (id, exer) => {
    try {
      const res = await updateExerRequest(id, exer);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExer = async (id) => {
    try {
      const res = await deleteExerRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const copyExer = async (exer, id) => {
    try {
      const { name, description, equipment } = exer;
      const res = await copyExerRequest({
        name, description, equipment
      }, id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const exerciseFromUser = async (id) => {
    try {
      const res = await getExerciseFromUserRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExersContext.Provider
      value={{
        exers,
        createExer,
        deleteExer,
        getExers,
        getExer,
        updateExer,
        copyExer,
        exerciseFromUser,
      }}
    >
      {children}
    </ExersContext.Provider>
  );
}
