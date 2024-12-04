import { Navbar } from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import '../css/home.css';
import { RingsChart, BarChart } from '../components/Progress.jsx';

function HomePage() {
  const { user } = useAuth();
  console.log(user);
  const exercise = 'Press banca';
  const mockData = [
    { time: 'Semana 1', weight: 85 },
    { time: 'Semana 2', weight: 83 },
    { time: 'Semana 3', weight: 82 },
    { time: 'Semana 4', weight: 80 },
  ];
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

      {/* {Information} */}
      <div className="information-container">
        {/* Exercise */}
        <section className="information-exercise">
          <div className="information-bar">
            <h1>Exercises</h1>
            <Link to={'/routine'}>
              <button>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </Link>
          </div>
          <p>today</p>
          <p>information goes here</p>
        </section>

        {/* Food */}
        <section className="information-food">
          <div className="information-bar">
            <h1>Foods</h1>
            <Link to={'/dish'}>
              <button>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </Link>
          </div>
          <p>today</p>
          <p>information goes here</p>
        </section>
      </div>
      <Navbar />
    </div>
  );
}

export default HomePage;
