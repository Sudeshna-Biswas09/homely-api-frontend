import React, { useState,useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Importing the AuthContext
const Signup = () => {
  // Preserving all your exact variable names for seamless backend connection
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [usertype, setUsertype] = useState('guest');
  const [terms, setTerms] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
 
    // Local validation check before hitting the server
    if (password !== confirm_password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://homely-api-backend.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirm_password,
          usertype,
          terms
        }),
      });

      const data = await response.json();
     
      if (response.ok && data.success) {
        // Redirect to login page on successful signup
        navigate('/login');
      } else {
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      <header className="bg-fuchsia-600 py-6 shadow-md">
        <h1 className="text-3xl font-extrabold text-center text-white tracking-wide">Create an Account</h1>
      </header>

      <main className="container mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 border border-gray-200 rounded-xl shadow-lg">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Join Homely</h2>
            <p className="text-gray-500 text-sm mt-1">Please fill in your details to get started.</p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2 text-sm">First Name</label>
              <input 
                type="text" 
                id="firstname" 
                name="firstname" 
                placeholder="John" 
                required 
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2 text-sm">Last Name</label>
              <input 
                type="text" 
                id="lastname" 
                name="lastname" 
                placeholder="Doe" 
                required 
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="you@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2 text-sm">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-gray-700 font-bold mb-2 text-sm">Confirm Password</label>
              <input 
                type="password" 
                id="confirm_password" 
                name="confirm_password" 
                placeholder="••••••••" 
                required 
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
              />
            </div>
          </div>

          <div className="mb-6">
            <span className="block text-gray-700 font-bold mb-3 text-sm">I want to join as a:</span>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="usertype" 
                  value="guest" 
                  checked={usertype === 'guest'}
                  onChange={(e) => setUsertype(e.target.value)}
                  className="peer sr-only" 
                />
                <div className="text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 font-medium transition">
                  🏕️ Guest
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="usertype" 
                  value="host" 
                  checked={usertype === 'host'}
                  onChange={(e) => setUsertype(e.target.value)}
                  className="peer sr-only"
                />
                <div className="text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 font-medium transition">
                  🏠 Host
                </div>
              </label>
            </div>
          </div>

          <div className="mb-6 flex items-start">
            <div className="flex items-center h-5">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms" 
                required 
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" 
              />
            </div>
            <div className="ml-2 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">I agree to the 
                <a href="#" className="text-indigo-600 hover:text-indigo-500 hover:underline ml-1">Terms and Conditions</a> and 
                <a href="#" className="text-indigo-600 hover:text-indigo-500 hover:underline ml-1">Privacy Policy</a>.
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? 
            {/* Replaced anchor tag with React Router Link for instant navigation */}
            <Link to="/login" className="font-bold text-purple-600 hover:text-purple-500 hover:underline ml-1">Log in here</Link>
          </p>

        </form>
      </main>

    </div>
  );
};

export default Signup;