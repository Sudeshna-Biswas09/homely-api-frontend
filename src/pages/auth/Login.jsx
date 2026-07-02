import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Importing the AuthContext

const Login = () => {
  // Maintaining your exact variable names
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default browser reload
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://homely-api-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Crucial: ensures the session cookie is saved
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Upon success, redirect the user to the homepage
        // Note: You may need to trigger a global context update here so the Navbar updates instantly
        login(data.user);
        navigate('/');
        //window.location.reload(); // Forces AuthContext to re-fetch the session
      } else {
        setErrorMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden min-h-screen bg-gray-200 font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>

      <div className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)] z-10">
        
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8 font-medium">Please enter your details to sign in.</p>

        {/* Dynamic Error Message Rendering */}
        {errorMessage && (
          <div className="bg-pink-50 border-l-4 border-pink-500 text-pink-700 px-4 py-3 rounded-r-lg shadow-sm mb-6 flex items-center" role="alert">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
            <span className="block sm:inline font-bold">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="you@example.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all duration-200"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-500/30 transform transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
          
        </form>
      </div>
    </main>
  );
};

export default Login;