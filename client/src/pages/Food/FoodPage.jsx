import { useEffect } from 'react';
import { useFood } from '../../context/FoodContext.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import '../../css/food.css';
import { useNavigate } from 'react-router-dom';

function FoodPage() {
  const { foods, getFoods, deleteFood } = useFood();
  const navigate = useNavigate();

  const handleDeleteSubmit = (id) => {
    deleteFood(id);
    reloadPage();
  };

  const handleEditSubmit = (id) => {
    navigate(`/food/${id}`);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (foods === 0) return <h1>No foods</h1>;

  return (
    <div className="home-container">
      <div className="food-list">
        {foods.map((food) => (
          <div key={food._id} className="food-card">
            <div className="food-info">
              <div className="food-header">
                <h1>{food.name}</h1>
                <div className="food-modifiers">
                  <button
                    id="edit-button"
                    onClick={() => handleEditSubmit(food._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    id="delete-button"
                    onClick={() => handleDeleteSubmit(food._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <p>Calories: {food.calories}</p>
              <p>Ingredients: {food.ingredients}</p>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}

export default FoodPage;
