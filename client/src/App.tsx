import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage.jsx';
import ExercisePage from './pages/ExercisePage.jsx';
import RoutinePage from './pages/RoutinePage.jsx';
import FoodPage from './pages/FoodPage.jsx';
import DishPage from './pages/DishPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import CalendarPage from './pages/Dashboard/DExerCalendar.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { ExersProvider } from './context/ExerciseContext.jsx';
import { FoodProvider } from './context/FoodContext.jsx';
import { DishProvider } from './context/DishContext.jsx';
import { RoutineProvider } from './context/RoutineContext.jsx';

function App() {
  return (
    <AuthProvider>
      <ExersProvider>
        <FoodProvider>
          <DishProvider>
            <RoutineProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<MainPage />} />

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
                      path="/dashboard/calendar"
                      element={<CalendarPage />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </RoutineProvider>
          </DishProvider>
        </FoodProvider>
      </ExersProvider>
    </AuthProvider>
  );
}

export default App;
