import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initializeDatabase } from './data/database/db';

// Pages
import LoginPage from './presentation/pages/LoginPage';
import WelcomePage from './presentation/pages/WelcomePage';
import AcademicPage from './presentation/pages/AcademicPage';
import TasksPage from './presentation/pages/TasksPage';
import SubjectsPage from './presentation/pages/SubjectsPage';
import CalendarPage from './presentation/pages/CalendarPage';
import StatisticsPage from './presentation/pages/StatisticsPage';

// Layout
import Layout from './presentation/components/layout/Layout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main App Routes
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <WelcomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic"
        element={
          <ProtectedRoute>
            <Layout>
              <AcademicPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic/tasks"
        element={
          <ProtectedRoute>
            <Layout>
              <TasksPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academic/subjects"
        element={
          <ProtectedRoute>
            <Layout>
              <SubjectsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Layout>
              <CalendarPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <ProtectedRoute>
            <Layout>
              <StatisticsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    // Inicializar la base de datos al cargar la aplicación
    initializeDatabase();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-dark-900">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
