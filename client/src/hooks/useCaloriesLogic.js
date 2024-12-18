import { useEffect, useState } from 'react';
import { useDish } from '../context/Food/DishContext';

export const useCaloriesLogic = () => {
  const { dishes, getDishesByDate } = useDish();
  const [currentCalories, setCurrentCalories] = useState(0);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    let isMounted = true; // Evita actualizaciones si el componente se desmonta
    async function loadDishesByDate() {
      if (isMounted) {
        await getDishesByDate(today);
      }
    }
    loadDishesByDate();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const totalCalories = dishes.reduce(
      (total, dish) => total + Number(dish.food.calories),
      0
    );
    setCurrentCalories(totalCalories);
  }, [dishes]);

  return {
    currentCalories,
  };
};
