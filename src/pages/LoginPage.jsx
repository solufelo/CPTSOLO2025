/**
 * Login Page
 * User authentication page with login and signup toggle
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we're on login or signup route
  const isSignupRoute = location.pathname === '/signup';
  const [isLogin, setIsLogin] = useState(!isSignupRoute);
  
  const from = location.state?.from?.pathname || '/dashboard';

  // Update state when route changes
  useEffect(() => {
    setIsLogin(!isSignupRoute);
  }, [isSignupRoute]);

  const handleAuthSuccess = () => {
    navigate(from, { replace: true });
  };
  
  const handleSwitchToSignup = () => {
    navigate('/signup', { replace: true });
  };
  
  const handleSwitchToLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8 flex items-center justify-center">
        {isLogin ? (
          <Login 
            onSuccess={handleAuthSuccess}
            onSwitchToSignup={handleSwitchToSignup}
          />
        ) : (
          <Signup 
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </div>
    </>
  );
};

export default LoginPage;

