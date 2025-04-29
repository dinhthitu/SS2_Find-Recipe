import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  auth, 
  provider, 
  signInWithPopup,
  createUserWithEmailAndPassword
} from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('username', username);
        console.log('Backend signup successful:', data);
        navigate(data.role === 'admin' ? '/admin' : '/');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Backend signup error:', error);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await handleAuthSuccess(user);
    } catch (error) {
      console.error('Google sign-up error:', error);
      setError(error.code === 'auth/popup-closed-by-user' ? 'Google sign-up was cancelled.' : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
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
        default:
          errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
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
          className="w-full flex items-center justify-center gap-2 mt-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-200 transition cursor-pointer"
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
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

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
            {loading ? 'Creating account...' : 'Continue'}
          </button>
        </div>

        <span className="text-gray-400 font-normal text-center mt-5">
          Have an account? <Link to="/login" className="text-purple-600 font-medium">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;