import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage.jsx';
import ExercisePage from './pages/Exercise/ExercisePage.jsx';
import RoutinePage from './pages/Exercise/RoutinePage.jsx';
import FoodPage from './pages/Food/FoodPage.jsx';
import DishPage from './pages/Food/DishPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ExerCalendarPage from './pages/Calendar/DExerCalendar.jsx';
import DishCalendarPage from './pages/Calendar/DishCalendar.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import UserPublicPage from './pages/UserPublicPage.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { ExersProvider } from './context/Exercise/ExerciseContext.jsx';
import { FoodProvider } from './context/Food/FoodContext.jsx';
import { DishProvider } from './context/Food/DishContext.jsx';
import { RoutineProvider } from './context/Exercise/RoutineContext.jsx';
import { ObjetiveProvider } from './context/ObjetiveContext.jsx';

function App() {
  return (
    <AuthProvider>
      <ExersProvider>
        <FoodProvider>
          <DishProvider>
            <RoutineProvider>
              <ObjetiveProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<MainPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/public/:id" element={<UserPublicPage />} />

                      {/* Exercise */}
                      <Route
                        path="/dashboard/exercise"
                        element={<ExercisePage />}
                      />
                      <Route
                        path="/dashboard/routines"
                        element={<RoutinePage />}
                      />

                      {/* Food */}
                      <Route path="/dashboard/food" element={<FoodPage />} />
                      <Route path="/dashboard/dishes" element={<DishPage />} />

                      {/* Exercise Calendar */}
                      <Route
                        path="/dashboard/exer-calendar"
                        element={<ExerCalendarPage />}
                      />
                      <Route
                        path="/dashboard/dish-calendar"
                        element={<DishCalendarPage />}
                      />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </ObjetiveProvider>
            </RoutineProvider>
          </DishProvider>
        </FoodProvider>
      </ExersProvider>
    </AuthProvider>
  );
}

export default App;
