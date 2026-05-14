import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import NotFound from './components/not-found';
import ToasterContext from './contexts/ToasterContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/auth/AuthModal';

import { ReactLenis } from '@studio-freight/react-lenis';

// Auth Guard for Public Routes (Landing Page)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.15, smoothWheel: true, wheelMultiplier: 1.2, duration: 1.2, orientation: 'vertical', gestureOrientation: 'vertical' }}>
      <AuthProvider>
        <ToasterContext />
        <BrowserRouter>
          <AuthModal />
          <Routes>
            {/* Public Marketing Landing Page */}
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              } 
            />

            {/* Secure Internal Application */}
            <Route element={<ProtectedRoute><RootLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Home />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ReactLenis>
  );
}

export default App;
