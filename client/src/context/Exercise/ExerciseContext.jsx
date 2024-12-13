import { createContext, useContext, useState } from 'react';
import {
  getExersRequest,
  getExerRequest,
  createExerRequest,
  updateExerRequest,
  deleteExerRequest,
} from '../../api/exercise.js';
import exerciseData from '../../data/exerciseData.json';

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

  const loadExer = async () => {
    try {
      setExers((prevExers) => {
        const ids = new Set(prevExers.map((exer) => exer.name)); // Usamos 'name' como identificador único.
        const newExers = exerciseData.filter((exer) => !ids.has(exer.name)); // Agregamos solo ejercicios únicos.
        return [...prevExers, ...newExers];
      });
    } catch (error) {
      console.log('Error loading exercises from JSON file:', error);
    }
  };

  const getExers = async () => {
    try {
      const res = await getExersRequest();
      setExers((prevExers) => {
        const ids = new Set(prevExers.map((exer) => exer.name)); // Usamos 'name' como identificador único.
        const newExers = res.data.filter((exer) => !ids.has(exer.name)); // Agregamos solo ejercicios únicos.
        return [...prevExers, ...newExers];
      });
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

  return (
    <ExersContext.Provider
      value={{
        exers,
        createExer,
        deleteExer,
        getExers,
        getExer,
        loadExer,
        updateExer,
      }}
    >
      {children}
    </ExersContext.Provider>
  );
}
