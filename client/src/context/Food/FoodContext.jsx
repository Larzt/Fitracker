import { createContext, useContext, useState } from 'react';
import {
  getFoodsRequest,
  getFoodRequest,
  createFoodRequest,
  updateFoodRequest,
  deleteFoodRequest,
  getFoodFromUserRequest,
  copyFoodRequest,
} from '../../api/food';

const FoodContext = createContext();

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const getFoods = async () => {
    try {
      const res = await getFoodsRequest();
      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFood = async (id) => {
    try {
      const res = await getFoodRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createFood = async (food) => {
    try {
      const res = await createFoodRequest(food);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const copyFood = async (food, id) => {
    try {
      const { name, ingredients, calories } = food;
      const res = await copyFoodRequest({
        name, ingredients, calories
      }, id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFood = async (id, food) => {
    try {
      const res = await updateFoodRequest(id, food);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (food) => {
    try {
      const res = await deleteFoodRequest(food);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const foodFromUser = async (id) => {
    try {
      const res = await getFoodFromUserRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        createFood,
        updateFood,
        copyFood,
        deleteFood,
        getFoods,
        getFood,
        foodFromUser,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}
