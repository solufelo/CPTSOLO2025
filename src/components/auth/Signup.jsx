/**
 * Signup Component
 * User registration form with email, password, and full name
 */

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Signup = ({ onSuccess, onSwitchToLogin }) => {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, fullName);
      setSuccess(true);
      // Show success message, then redirect
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
            Account Created!
          </h2>
          <p className="text-primary/80 mb-4">
            Please check your email to verify your account.
          </p>
          <p className="text-sm text-SageGray">
            You can sign in after verification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
        <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-primary/80 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                       text-primary placeholder-SageGray 
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors duration-200"
              placeholder="John Doe"
            />
          </div>

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
              minLength={6}
              className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                       text-primary placeholder-SageGray 
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors duration-200"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary/80 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                       text-primary placeholder-SageGray 
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors duration-200"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-DarkLava font-amiamie-round font-bold py-3 rounded-lg
                     hover:bg-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-SageGray">
            Already have an account?{' '}
            {onSwitchToLogin ? (
              <button
                onClick={onSwitchToLogin}
                className="text-gold hover:underline font-medium"
              >
                Sign in
              </button>
            ) : (
              <Link to="/login" className="text-gold hover:underline font-medium">
                Sign in
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

