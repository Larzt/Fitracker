import { createContext, useContext, useState } from 'react';
import {
  getDishesRequest,
  getDishRequest,
  createDishRequest,
  updateDishRequest,
  deleteDishRequest,
  getDishesByDateRequest,
  getDishesByCategoryRequest,
} from '../../api/dish';
// import { useFood } from './FoodContext';

const DishContext = createContext();

export const useDish = () => {
  const context = useContext(DishContext);
  if (!context) {
    throw new Error('useDish must be used within a DishProvider');
  }
  return context;
};

export function DishProvider({ children }) {
  const [dishes, setDish] = useState([]);

  const getDishes = async () => {
    try {
      const res = await getDishesRequest();
      setDish(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDish = async (id) => {
    try {
      const res = await getDishRequest(id);
      setDish(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createDish = async (id) => {
    try {
      const res = await createDishRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDishCategory = async (id, category) => {
    try {
      const res = await updateDishRequest(id, category);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDish = async (id) => {
    try {
      const res = await deleteDishRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getDishesByDate = async (date) => {
    try {
      const res = await getDishesByDateRequest(date);
      // console.log(res.data);
      setDish(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDishesByCategory = async (date) => {
    try {
      const res = await getDishesByCategoryRequest(date);
      // console.log(res.data);
      setDish(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DishContext.Provider
      value={{
        dishes,
        getDishes,
        getDish,
        createDish,
        updateDishCategory,
        deleteDish,
        getDishesByDate,
        getDishesByCategory,
      }}
    >
      {children}
    </DishContext.Provider>
  );
}
