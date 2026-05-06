import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import LandingLayout from './components/layout/LandingLayout';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Dashboard from './pages/Dashboard';
import NotFound from './components/not-found';
import ToasterContext from './contexts/ToasterContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModalManager from './components/auth/AuthModalManager';

// Protected route guard — redirects to / if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Auth redirect — if user is already logged in and visits /, send them to /dashboard
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function AppRoutes() {
  return (
    <>
      <AuthModalManager />
      <Routes>
        {/* Public landing page — no header/footer layout */}
        <Route element={<LandingLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route path="/documentation" element={<Documentation />} />
        </Route>

        {/* Protected app routes — full app layout */}
        <Route element={<RootLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirect old auth pages */}
        <Route path="/signin" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToasterContext />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
