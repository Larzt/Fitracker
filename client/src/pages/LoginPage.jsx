import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx';
// import {loginRequest} from '../api/auth.js'
import { useNavigate } from 'react-router-dom'

import '../css/logres.css'
import { useEffect } from 'react';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/home')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <div className="form-container">
      <h1>Iniciar Sesión</h1>
      {signinErrors.map((error, i) => (
        <div className='bg-red-500 p-2 text-white' key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            {...register('username', { required: true })}
            placeholder="Nombre de usuario"
          />
          {errors.username && (<span className="error-message">Username is required</span>)}
        </div>
        <div>
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Contraseña"
          />
          {errors.username && (<span className="error-message">Password is required</span>)}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
}

export default LoginPage;

