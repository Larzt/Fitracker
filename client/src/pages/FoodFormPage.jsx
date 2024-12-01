import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import { Navbar } from '../components/Navbar.jsx';
import '../css/foodform.css';

function FoodFormPage() {
  const { register, handleSubmit } = useForm();
  const { createFood } = useFood();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createFood(data);
  });

  const goBackHome = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Add New Food</h1>
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
