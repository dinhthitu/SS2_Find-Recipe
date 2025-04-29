import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  auth, 
  provider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from '../firebase';
import api from '../../Axios/client/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = async (user) => {
    try {
      await sendEmailVerification(user);
      setVerificationSent(true);
      setError('A verification email has been sent. Please check your email.');
    } catch (error) {
      console.error('Email verification error:', error);
      setError(error.message || 'Failed to send verification email. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (verificationSent && auth.currentUser) {
      const interval = setInterval(async () => {
        try {
          await auth.currentUser.reload();
          const user = auth.currentUser;
          console.log('User state:', { email: user.email, emailVerified: user.emailVerified });

          await new Promise(resolve => setTimeout(resolve, 1000));
          await user.getIdToken(true);
          await auth.currentUser.reload();
          console.log('User state after token refresh:', { email: user.email, emailVerified: user.emailVerified });

          if (user.emailVerified) {
            console.log('Email verified, redirecting to login...');
            clearInterval(interval);
            navigate('/login');
          }
        } catch (error) {
          console.error('Auto-check error:', error);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [verificationSent, navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!username) {
        throw new Error('Please enter a username before signing up with Google.');
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign-in successful:', user.email);

      const token = await user.getIdToken();
      const response = await api.post('/auth/login', { name: username }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('username', username);
      console.log('Backend signup successful:', response.data);
      navigate(response.data.role === 'admin' ? '/admin' : '/');
    } catch (error) {
      console.error('Google sign-up error:', error);
      let errorMessage = 'Failed to sign up with Google. Please try again.';
      switch (error.code) {
        case 'auth/popup-blocked':
          errorMessage = 'Google sign-in popup was blocked. Please allow popups and try again.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Google sign-in was cancelled.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email. Please log in instead.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user.email);
      await handleAuthSuccess(user);
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'An error occurred during signup.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use. Please use a different email or login.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/visibility-check-was-unavailable':
          errorMessage = 'Unable to verify request. Please check your network, disable ad blockers, and try again.';
          break;
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm bg-white border border-gray-200 p-8 rounded-xl shadow-md flex flex-col">
        <h1 className="text-3xl text-center font-semibold mb-1">Sign up</h1>
        <span className="text-sm text-gray-400 text-center mt-2">Welcome to our website</span>
        
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 mt-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-200 transition cursor-pointer ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {error && (
          <div className={`mb-4 p-2 text-sm rounded ${
            verificationSent && !error.includes('Failed') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {error}
          </div>
        )}

        {verificationSent ? (
          <div className="text-center text-gray-500">
            {/* Waiting for email verification... Please check your inbox and click the verification link. */}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-left mb-1">Email</p>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="a@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>
            
            <div>
              <p className="text-gray-500 text-left mb-1">Username</p>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="abc"
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>
            
            <div>
              <p className="text-gray-500 text-left mb-1">Password</p>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
                minLength={6}
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className={`border rounded-full w-full py-2 px-4 mt-4 bg-purple-600 text-white font-semibold cursor-pointer hover:bg-purple-700 transition ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending verification email...' : 'Continue'}
            </button>
          </div>
        )}

        <span className="text-gray-400 font-normal text-center mt-5">
          Have an account? <Link to="/login" className="text-purple-600 font-medium">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;