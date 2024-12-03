import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import '../css/home.css';

function ProfilePage() {
  const { logout } = useAuth();

  return (
    <div className="home-container">
      <button className="nav-button" onClick={() => logout()}>
        <a href="/">Logout</a>
      </button>
      <Navbar />
    </div>
  );
}

export default ProfilePage;
