import { Navbar } from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import '../css/home.css';
import { RingsChart } from '../components/Progress.jsx';

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
      <div className="progress-container">
        <h1 className="progress-title">Progress</h1>
        <section className="progress-section">
          <div className="progress-chart">
            <RingsChart />
          </div>
          <div className="progress-info">
            <div>
              <h1 id="progress-info-weight">Peso</h1>
              <p>{user.weight} / 80 kg</p>
            </div>
            <div>
              <h1>Calorías</h1>
              <p>1500 / 1700 kcal</p>
            </div>
          </div>
        </section>
      </div>
      {/* Information Section */}
      <div className="information-container">
        <section className="information-section">
          <h1 className="progress-title">Extra</h1>
          <div className="information-charts">
            <div className="information-chart">
              <RingsChart />
            </div>
          </div>
        </section>
        <section className="information-section">
          <h1 className="progress-title">Extra</h1>
          <div className="information-charts">
            <div className="information-chart">
              <RingsChart />
            </div>
          </div>
        </section>
      </div>

      <Navbar />
    </div>
  );
}

export default HomePage;
