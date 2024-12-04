import { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useExers } from '../../context/ExerciseContext';
import { AddButton } from '../../components/AddButton';
import { Navbar } from '../../components/Navbar';

function ExerciseFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createExer, getExer, updateExer } = useExers();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateExer(params.id, data);
    } else {
      createExer(data);
    }
    navigate('/exercise');
  });

  useEffect(() => {
    async function loadExercise() {
      if (params.id) {
        const exercise = await getExer(params.id);
        console.log(exercise);
        setValue('name', exercise.name);
        setValue('description', exercise.description);
      }
    }
    loadExercise();
  }, []);
  
  return (
    <div className="container">
      <div className="form-container">
        <h1>Exercise Form</h1>
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

export default ExerciseFormPage;
