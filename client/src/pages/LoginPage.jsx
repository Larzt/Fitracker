import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import '../css/logres.css';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  const handlePredefinedLogin = () => {
    setValue('username', 'Usuario');
    setValue('password', 'usuario');
    onSubmit();
  };

  return (
    <div className="form-container">
      <h1>Iniciar Sesión</h1>
      {signinErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            {...register('username', { required: true })}
            placeholder="Nombre de usuario"
          />
          {errors.username && (
            <span className="error-message">Username is required</span>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="error-message">Password is required</span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className='default-login'>
        <button onClick={handlePredefinedLogin}>Usuario predefinido</button>

      </div>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
}

export default LoginPage;
