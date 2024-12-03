import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFood } from '../../context/FoodContext.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import '../../css/foodform.css';

function FoodFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createFood, getFood, updateFood } = useFood();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateFood(params.id, data);
    } else {
      createFood(data);
    }
    navigate('/food');
  });

  useEffect(() => {
    async function loadFood() {
      if (params.id) {
        const food = await getFood(params.id);
        console.log(food);
        setValue('name', food.name);
        setValue('calories', food.calories);
        setValue('ingredients', food.ingredients);
      }
    }
    loadFood();
  }, []);

  return (
    <div className="container">
      <div className="form-container">
        <h1>Food Form</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: true })}
            autoFocus
          />
          <input
            type="text"
            placeholder="Calories"
            {...register('calories', { required: true })}
          />
          <textarea
            rows="3"
            placeholder="Ingredients"
            {...register('ingredients')}
          ></textarea>

          <div className="footer">
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>

      <Navbar />
    </div>
  );
}

export default FoodFormPage;
