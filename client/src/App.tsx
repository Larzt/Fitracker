import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import FoodPage from './pages/FoodPage.jsx';
import FoodFormPage from './pages/FoodFormPage.jsx';
import ExercisePage from './pages/ExercisePage.jsx';
import ExerciseFormPage from './pages/ExerciseFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import { FoodProvider } from './context/FoodContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <FoodProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/food" element={<FoodPage />} />
              <Route path="/food/new" element={<FoodFormPage />} />
              <Route path="/food/:id" element={<FoodFormPage />} />
              <Route path="/exercise" element={<ExercisePage />} />
              <Route path="/exercise/new" element={<ExerciseFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FoodProvider>
    </AuthProvider>
  );
}

export default App;
