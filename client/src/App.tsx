import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import DishPage from './pages/Food/DishPage.jsx';
import FoodPage from './pages/Food/FoodPage.jsx';
import FoodFormPage from './pages/Food/FoodFormPage.jsx';
import ExercisePage from './pages/Exercise/ExercisePage.jsx';
import ExerciseFormPage from './pages/Exercise/ExerciseFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import GoalFormPage from './pages/GoalFormPage.jsx';
import GoalPage from './pages/GoalPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import { FoodProvider } from './context/FoodContext.jsx';
import { GoalProvider } from './context/GoalContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { DishProvider } from './context/DishContext.jsx';

function App() {
  return (
    <AuthProvider>
      <FoodProvider>
        <GoalProvider>
          <DishProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/dish" element={<DishPage />} />
                  <Route path="/food" element={<FoodPage />} />
                  <Route path="/food/new" element={<FoodFormPage />} />
                  <Route path="/food/:id" element={<FoodFormPage />} />
                  <Route path="/exercise" element={<ExercisePage />} />
                  <Route path="/exercise/new" element={<ExerciseFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/goals" element={<GoalPage />} />
                  <Route path="/goals/new" element={<GoalFormPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DishProvider>
        </GoalProvider>
      </FoodProvider>
    </AuthProvider>
  );
}

export default App;
