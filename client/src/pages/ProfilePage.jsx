import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../css/profile.css';

function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const achievements = [
    {
      icon: 'fas fa-trophy',
      title: 'Campeón',
      description: 'Lograste completar 10 desafíos.',
    },
    {
      icon: 'fas fa-medal',
      title: 'Medalla de Oro',
      description: 'Superaste tus metas de calorías.',
    },
    {
      icon: 'fas fa-running',
      title: 'Corredor',
      description: 'Corriste 5 km sin detenerte.',
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Fuerza',
      description: 'Aumentaste tu PR en el gimnasio.',
    },
    {
      icon: 'fas fa-leaf',
      title: 'Ecológico',
      description: 'Adoptaste una dieta más saludable.',
    },
    {
      icon: 'fas fa-heart',
      title: 'Saludable',
      description: 'Mantienes un ritmo cardíaco saludable.',
    },
    {
      icon: 'fas fa-fire',
      title: 'Constancia',
      description: 'Entrenaste durante 30 días consecutivos.',
    },
    {
      icon: 'fas fa-bolt',
      title: 'Energía',
      description: 'Alcanzaste tu meta diaria de pasos.',
    },
    {
      icon: 'fas fa-star',
      title: 'Estrella',
      description: 'Sobresaliste en todas las categorías.',
    },
  ];

  const reloadProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <button className="user-icon-container" onClick={() => reloadProfile()}>
          <i className="fas fa-user user-icon"></i>
        </button>
        <div className="user-achievement">
          <h1>Achievements</h1>
        </div>
        <button className="logout-button" onClick={() => logout()}>
          <i className="fas fa-door-open"></i>
        </button>
      </header>

      {/* Achievements Table */}
      <div className="scrollable-container">
        <section className="achievements-container">
          {achievements.map((achievement, index) => (
            <div className="achievement-item" key={index}>
              <i className={`achievement-icon ${achievement.icon}`}></i>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">
                {achievement.description}
              </p>
            </div>
          ))}
        </section>
      </div>

      <Navbar />
    </div>
  );
}

export default ProfilePage;
