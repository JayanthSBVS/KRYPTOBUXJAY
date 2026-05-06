import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './components/not-found';
import ToasterContext from './contexts/ToasterContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ToasterContext />
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
