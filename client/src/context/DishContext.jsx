import { createContext, useContext, useState } from 'react';
import {
  getDishesRequest,
  getDishRequest,
  createDishRequest,
  deleteDishRequest,
  getDishesByDateRequest,
} from '../api/dish';
import { useFood } from './FoodContext';

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

  const { getFood } = useFood();

  const getDishes = async () => {
    try {
      const res = await getDishesRequest();
      setDish(res.data);
      res.data.map((item) => {
        console.log(getFood(item.food).data);
      });
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
      console.log(res.data);
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
        deleteDish,
        getDishesByDate,
      }}
    >
      {children}
    </DishContext.Provider>
  );
}
