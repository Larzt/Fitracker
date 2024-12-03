import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGoal } from '../context/GoalContext.jsx';
import { Navbar } from '../components/Navbar.jsx';
import '../css/foodform.css';

function GoalFormPage() {
  const { register, handleSubmit } = useForm();
  const { createGoals } = useGoal();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createGoals(data);
  });

  return (
    <div className="container">
      <div className="form-container">
        <h1>Goal Form</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: true })}
            autoFocus
          />
          <input
            type="text"
            placeholder="Description"
            {...register('description', { required: true })}
          />
          <input
            type="text"
            placeholder="Id"
            {...register('id', { required: true })}
          />

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

export default GoalFormPage;
