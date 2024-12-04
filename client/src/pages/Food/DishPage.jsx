import { useEffect } from 'react';
import { useDish } from '../../context/DishContext.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import '../../css/dish.css';

function DishPage() {
  const { dishes, getDishesByDate } = useDish();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    getDishesByDate(today);
  }, []);

  if (!Array.isArray(dishes)) return <h1>No dishes for Today</h1>;

  return (
    <div>
      <h1>Dishes for Today</h1>
      {dishes.map((dish) => (
        <div key={dish._id}>
          <h2>{dish.food.name}</h2>
          <p>Created By: {dish.user.name}</p>
        </div>
      ))}
      <Navbar />
    </div>
  );
}

export default DishPage;
