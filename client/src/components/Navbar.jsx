import { Link } from 'react-router-dom';
import '../css/navbar.css'; // Asegúrate de tener el archivo de estilos adecuado

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="home-footer">
        <Link to="/exercises">
          <button className="footer-button">
            <i className="fas fa-dumbbell"></i>
          </button>
        </Link>
        <Link to="/exercise">
          <button className="footer-button">
            <i className="fas fa-running"></i>
          </button>
        </Link>
        <Link to="/home">
          <button className="footer-button">
            <i className="fas fa-home"></i>
          </button>
        </Link>
        <Link to="/food">
          <button className="footer-button">
            <i className="fas fa-utensils"></i>
          </button>
        </Link>
        <Link to="/food/new">
          <button className="footer-button">
            <i className="fas fa-carrot"></i>
          </button>
        </Link>
      </div>
    </nav>
  );
};
