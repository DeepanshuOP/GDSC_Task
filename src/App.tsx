import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { useThemeStore } from './store/theme';
import { LandingPage } from './pages/LandingPage';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { theme } = useThemeStore();
  return (
    <AuthProvider>
      <div className={theme}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Router>
            <div className="fixed top-4 right-4">
              <ThemeToggle />
            </div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/feed"
                element={
                  <AuthGuard>
                    <Feed />
                  </AuthGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
