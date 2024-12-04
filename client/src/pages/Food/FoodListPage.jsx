import { useEffect } from 'react';
import { useFood } from '../../context/FoodContext.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import '../../css/foodList.css';
import { useDish } from '../../context/DishContext.jsx';

function FoodListPage() {
  const { foods, getFoods } = useFood();
  const { createDish } = useDish();

  const navigate = useNavigate();

  const handleFoodClick = (id) => {
    createDish(id);
    navigate('/dish');
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (foods.length === 0) return <h1>No foods</h1>;

  return (
    <div className="dish-container">
      <div className="dish-food-list">
        {foods.map((food) => (
          <button
            key={food._id}
            className="dish-food-card"
            onClick={() => handleFoodClick(food._id)}
          >
            <div className="dish-food-info">
              <div className="dish-food-header">
                <h1>{food.name}</h1>
              </div>
              <p>Calories: {food.calories}</p>
              <p>Ingredients: {food.ingredients}</p>
            </div>
          </button>
        ))}
      </div>
      <Navbar />
    </div>
  );
}

export default FoodListPage;
