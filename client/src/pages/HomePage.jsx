import { Navbar } from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import '../css/home.css';

function HomePage() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <h1>¡Bienvenido, {user.username}!</h1>
          <Link to="/profile">
            <button className="user-icon">
              <i className="fas fa-user"></i>
            </button>
          </Link>
        </div>
        <p>Visualiza tu progreso y establece tus metas</p>
      </header>
      {/* Progress Section */}
      <section className="progress-section">
        <div className="progress-card">
          <h3>Calorías consumidas</h3>
          <div className="progress-graph">
            <p>2000 / 2500 kcal</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        <div className="progress-card">
          <h3>Peso actual</h3>
          <div className="progress-graph">
            <p>{user.weight}kg / 68kg</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </section>
      <Navbar />
    </div>
  );
}

export default HomePage;
