import { useEffect } from 'react';
import { useExers } from '../../context/ExerciseContext';
import '../../css/exercises.css';
import { Navbar } from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

function ExercisePage() {
  const { exers, getExers, deleteExer
   } = useExers();
  const navigate = useNavigate();

  const handleDeleteSubmit = (id) => {
    deleteExer(id);
    reloadPage();
  };


  const handleEditSubmit = (id) => {
    navigate(`/exercise/${id}`);
  };

  const reloadPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    getExers();
  }, []);

  if (exers === 0) return <h1>No exercises</h1>;
  return (
<div className="home-container">
      <div className="exercise-list">
        {exers.map((exer) => (
          <div key={exer._id} className="exercise-card">
            <div className="exercise-info">
              <div className="exercise-header">
                <h1>{exer.name}</h1>
                <div className="exercise-modifiers">
                  <button
                    id="edit-button"
                    onClick={() => handleEditSubmit(exer._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    id="delete-button"
                    onClick={() => handleDeleteSubmit(exer._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
      <Navbar />
    </div>
  );
}

export default ExercisePage;
