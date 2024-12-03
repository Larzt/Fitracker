import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../css/profile.css';
import { useEffect } from 'react';
import { useGoal } from '../context/GoalContext';

function ProfilePage() {
  const { logout } = useAuth();
  const { goals, getGoals } = useGoal();
  const navigate = useNavigate();
  const achievements = [
    {
      icon: 'fas fa-trophy',
      title: 'Campeón',
      description: 'Lograste completar 10 desafíos.',
      id: '0',
    },
    {
      icon: 'fas fa-medal',
      title: 'Medalla de Oro',
      description: 'Superaste tus metas de calorías.',
      id: '1',
    },
    {
      icon: 'fas fa-running',
      title: 'Corredor',
      description: 'Corriste 5 km sin detenerte.',
      id: '2',
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Fuerza',
      description: 'Aumentaste tu PR en el gimnasio.',
      id: '3',
    },
    {
      icon: 'fas fa-leaf',
      title: 'Ecológico',
      description: 'Adoptaste una dieta más saludable.',
      id: '4',
    },
    {
      icon: 'fas fa-heart',
      title: 'Saludable',
      description: 'Mantienes un ritmo cardíaco saludable.',
      id: '5',
    },
    {
      icon: 'fas fa-fire',
      title: 'Constancia',
      description: 'Entrenaste durante 30 días consecutivos.',
      id: '6',
    },
    {
      icon: 'fas fa-bolt',
      title: 'Energía',
      description: 'Alcanzaste tu meta diaria de pasos.',
      id: '7',
    },
    {
      icon: 'fas fa-star',
      title: 'Estrella',
      description: 'Sobresaliste en todas las categorías.',
      id: '8',
    },
  ];

  const reloadProfile = () => {
    navigate('/profile');
  };

  const isAchievementCompleted = (achievementsId) => {
    return goals.some((goal) => goal.id === achievementsId);
  };

  useEffect(() => {
    getGoals();
  }, []);

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
          {achievements.map((achievement, index) => {
            // Llama a la función con el id correcto
            const iconClass = isAchievementCompleted(achievement.id)
              ? 'achievement-icon-completed'
              : 'achievement-icon';
            return (
              <div className="achievement-item" key={index}>
                <i className={`${iconClass} ${achievement.icon}`}></i>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </section>
      </div>

      <Navbar />
    </div>
  );
}

export default ProfilePage;
