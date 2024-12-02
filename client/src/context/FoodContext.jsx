import { createContext, useContext, useState } from 'react'
import { getFoodsRequest, getFoodRequest, createFoodRequest, updateFoodRequest, deleteFoodRequest } from '../api/food';

const FoodContext = createContext();

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
}

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const getFoods = async () => {
    try {
      const res = await getFoodsRequest();
      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getFood = async (id) => {
    const res = await getFoodRequest(id);
    console.log(res);
  }

  const createFood = async (food) => {
    const res = await createFoodRequest(food);
    console.log(res);
  }

  const deleteFood = async (food) => {
    const res = await deleteFoodRequest(food);
    console.log(res);
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        createFood,
        deleteFood,
        getFoods,
        getFood,
      }}>
      {children}
    </FoodContext.Provider>
  )
}