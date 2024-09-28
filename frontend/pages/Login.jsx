import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          return;
        }

        // Registration logic
        const response = await axios.post('http://localhost:4000/user/register', { username, password });
        if (response.status === 201) {
          alert('User registered successfully!');
          setIsRegister(false); // Redirect to login after successful registration
        }
      } else {
        // Login logic
        const response = await axios.post('http://localhost:4000/user/login', { username, password });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token); // Store JWT token
          alert('Login successful!');
          navigate('/'); // Redirect to a protected route
        }
      }
    } catch (error) {
      setError(error.response?.data.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6">{isRegister ? 'Register' : 'Job Seeker Login'}</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {isRegister && (
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-2 rounded hover:bg-gray-700 transition duration-200 transform hover:scale-105"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"} 
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              className="text-gray-600 hover:underline"
            >
              {isRegister ? ' Login' : ' Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
