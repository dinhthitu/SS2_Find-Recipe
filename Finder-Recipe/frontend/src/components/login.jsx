import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  auth, 
  provider, 
  signInWithPopup,
  signInWithEmailAndPassword
} from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      
      const user = userCredential.user;
      console.log('Email login successful:', user);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm bg-white border border-gray-200 p-8 rounded-xl shadow-md flex flex-col">
        <h1 className="text-3xl text-center font-semibold mb-1">Login</h1>
        <span className="text-sm text-gray-400 text-center mt-2">Welcome to our website</span>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        
        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border mt-4 border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-200 transition cursor-pointer"
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

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <p className="text-gray-500 text-left mb-1">Password</p>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-600" 
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`border rounded-full w-full py-2 px-4 mt-4 bg-purple-600 text-white font-semibold cursor-pointer hover:bg-purple-500 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>

        <span className="text-gray-400 font-normal text-center mt-5">
          No account? <Link to="/signup" className="text-purple-600 font-medium">Create an account</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;