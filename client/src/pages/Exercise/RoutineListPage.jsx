import { useEffect } from 'react';
import { Navbar } from '../../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useRoutine } from '../../context/RoutineContext.jsx';
import { useExers } from '../../context/ExerciseContext.jsx';
import '../../css/Exercise/exerciseList.css';

function RoutineListPage() {
  const { exers, getExers } = useExers();
  const { createRoutine } = useRoutine();

  const navigate = useNavigate();

  const handleExerClick = (id) => {
    createRoutine(id);
    navigate('/routine');
  };

  useEffect(() => {
    getExers();
  }, []);

  if (exers.length === 0) return <h1>No exers</h1>;

  return (
    <div className="routine-container">
      <div className="routine-exer-list">
        {exers.map((exer) => (
          <button
            key={exer._id}
            className="routine-exer-card"
            onClick={() => handleExerClick(exer._id)}
          >
            <div className="routine-exer-info">
              <div className="routine-exer-header">
                <h1>{exer.name}</h1>
              </div>
              <p>Description: {exer.description}</p>
            </div>
          </button>
        ))}
      </div>
      <Navbar />
    </div>
  );
}

export default RoutineListPage;
