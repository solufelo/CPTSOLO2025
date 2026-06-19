/**
 * Login Component
 * User login form with email and password
 */

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = ({ onSuccess, onSwitchToSignup }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
        <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary/80 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                       text-primary placeholder-SageGray 
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors duration-200"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary/80 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                       text-primary placeholder-SageGray 
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-DarkLava font-amiamie-round font-bold py-3 rounded-lg
                     hover:bg-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-SageGray">
            Don't have an account?{' '}
            {onSwitchToSignup ? (
              <button
                onClick={onSwitchToSignup}
                className="text-gold hover:underline font-medium"
              >
                Sign up
              </button>
            ) : (
              <Link to="/signup" className="text-gold hover:underline font-medium">
                Sign up
              </Link>
            )}
          </p>
          <p className="text-sm text-SageGray">
            <Link to="/forgot-password" className="text-gold hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

