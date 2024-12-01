import { useEffect } from 'react';
import { useFood } from '../context/FoodContext';
// import '../css/home.css';

function FoodPage() {
  const { foods, getFoods } = useFood();

  useEffect(() => {
    getFoods();
  }, [])

  if (foods === 0) return (<h1>No foods</h1>)

  return (
    <div>
      {
        foods.map((food) => {
          return (
            <div key={food._id}>
              <h1>{food.name}</h1>
              <p>{food.calories}</p>
              <p>{food.ingredients}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default FoodPage;
