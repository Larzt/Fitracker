import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import '../css/logres.css'

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className='form-container'>
      <h1>Registrarse</h1>
      {registerErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white' key={i}>
            {error}
          </div>
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <input 
            type="text"
            {...register('username', { required: true })}
            placeholder='username'
            className={errors.username ? 'error' : ''}
          />
          {errors.username && (<span className="error-message">Username is required</span>)}
        </div>

        <div>
          <input 
            type="email"
            {...register('email', { required: true })}
            placeholder='email'
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (<span className="error-message">Email is required</span>)}
        </div>

        <div>
          <input 
            type="password"
            {...register('password', { required: true })}
            placeholder='password'
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (<span className="error-message">Password is required</span>)}
        </div>

        {/* Contenedor para edad y peso */}
        <div className="row">
          <div className="column">
            <input
              type="text"
              {...register('age', { required: true, min: 18 })}
              placeholder='age'
              className={errors.age ? 'error' : ''}
            />
            {errors.age && (<span className="error-message">Age is required and must be at least 18</span>)}
          </div>
          <div className="column">
            <input
              type="text"
              {...register('weight', { required: true, min: 1 })}
              placeholder='weight (kg)'
              className={errors.weight ? 'error' : ''}
            />
            {errors.weight && (<span className="error-message">Weight is required and must be greater than 1</span>)}
          </div>
        </div>

        <div>
          <select {...register('gender', { required: true })} className={errors.gender ? 'error' : ''}>
            <option value="">Select gender</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          {errors.gender && (<span className="error-message">Gender is required</span>)}
        </div>

        <button type='submit'>Register</button>
      </form>

      <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
}

export default RegisterPage;
