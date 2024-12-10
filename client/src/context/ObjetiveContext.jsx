import { createContext, useContext, useState } from 'react';
import {
  getObjetivesRequest,
  createObjetiveRequest,
  updateObjetiveRequest,
} from '../api/objetives.js';

const ObjetiveContext = createContext();

export const useObjetive = () => {
  const context = useContext(ObjetiveContext);
  if (!context) {
    throw new Error('useObjetive must be used within a ObjetiveProvider');
  }
  return context;
};

export function ObjetiveProvider({ children }) {
  const [objetives, setObjetives] = useState([]);

  const getObjetives = async () => {
    try {
      const res = await getObjetivesRequest();
      setObjetives(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createObjetives = async (objetive) => {
    try {
      const res = await createObjetiveRequest(objetive);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateObjetives = async (objetive) => {
    try {
      const res = await updateObjetiveRequest(objetive);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ObjetiveContext.Provider
      value={{
        objetives,
        setObjetives,
        createObjetives,
        updateObjetives,
        getObjetives,
      }}
    >
      {children}
    </ObjetiveContext.Provider>
  );
}
