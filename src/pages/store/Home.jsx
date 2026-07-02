import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavouriteIcon from '../../components/FavouriteIcon';
// import FavouriteIcon from '../components/FavouriteIcon'; // We will build this next!

/*const Home = () => {
  // 1. Initialize the State Engine
  const [registeredHomes, setRegisteredHomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. The Fetch Pipeline
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await fetch('/api/allhomes', {
          method: 'GET',
          credentials: 'include' // Ensures session context is maintained
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Assuming your backend sends the array as data.registeredHomes or just data itself
          setRegisteredHomes(data.homes || data);
        } else {
          setErrorMessage("Failed to load registered homes.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setErrorMessage("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20 font-bold text-purple-600">Loading beautiful homes...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen font-sans">
      
      
      <main className="container mx-auto max-w-4xl pt-10 pb-16 px-4">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Registered Homes
          </h2>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              {errorMessage}
            </div>
          )}

          {registeredHomes.length === 0 && !errorMessage ? (
            <div className="text-center text-gray-400 mt-8 text-lg">
              No homes registered yet.
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {registeredHomes.map((home) => (
                <li
                  key={home._id}
                  className="bg-gradient-to-br from-purple-50 to-blue-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    <img 
                     src={home.image} 
                     
                      alt="houseImage" 
                      loading="lazy"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      onError={(e) => { e.target.src = '/images/default-image.jpg'; }}
                    />

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-semibold text-gray-700 line-clamp-1">
                        {home.housename}
                      </span>
                      <span className="inline-block bg-purple-200 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                        Home
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-gray-700 block mt-3 flex items-center">
                      <span className="mr-1">📍</span> Location: {home.location}
                    </span>
                    
                    <span className="text-xs font-medium text-gray-600 block mt-3 line-clamp-2">
                      Description: {home.description}
                    </span>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-bold text-purple-700">
                        Price per night: ₹{home.price}
                      </span>
                      <span className="text-sm font-semibold text-gray-700 bg-white/50 px-2 py-1 rounded-md">
                        {home.rating} ⭐
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <Link 
                      to={`/homes/${home._id}`}
                      className="flex-1 text-center bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow transition transform hover:-translate-y-1 hover:scale-105"
                    >
                      Details
                    </Link>

                    
                    {<FavouriteIcon home={home} /> }
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
*/


const HomeListings = () => {
  const [homes, setHomes] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // Holds typed text
  const [activeSearch, setActiveSearch] = useState(''); // Triggers the useEffect fetch
  const [isLoading, setIsLoading] = useState(true);
   const [errorMessage, setErrorMessage] = useState('');

  // Fetch homes whenever the activeSearch state changes
  useEffect(() => {
    const fetchHomes = async () => {
      setIsLoading(true);
      try {
        // Construct the URL dynamically based on whether a search term exists
        const endpoint = activeSearch 
          ? `https://homely-api-backend.onrender.com/api/allhomes?search=${encodeURIComponent(activeSearch)}` 
          : 'https://homely-api-backend.onrender.com/api/allhomes';

        const response = await fetch(endpoint, { method: 'GET' });
        const data = await response.json();
        
        if (response.ok) {
          setHomes(data.homes);
        }
      } catch (error) {
        console.error("Error loading homes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomes();
  }, [activeSearch]); // Dependency array listens explicitly to search triggers

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchInput); // Commits the typed input to trigger the API call
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch(''); // Resets to display all properties
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearchSubmit} className="flex gap-2 bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="relative flex-grow flex items-center">
              <span className="absolute left-4 text-gray-400 text-xl">🔍</span>
              <input 
                type="text"
                placeholder="Search by property title or location..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-black bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
              />
              {searchInput && (
                <button 
                  type="button" 
                  onClick={handleClearSearch}
                  className="absolute right-4 text-gray-400 hover:text-black text-sm font-bold bg-gray-100 px-2 py-1 rounded-md transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:opacity-90 active:scale-95 transform transition-all duration-200"
            >
              Search
            </button>
          </form>
          {activeSearch && (
            <p className="text-sm text-gray-500 mt-3 ml-2 font-medium">
              Showing results for: <span className="text-purple-600 font-bold">"{activeSearch}"</span> ({homes.length} found)
            </p>
          )}
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : homes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-5xl block mb-4">🏝️</span>
            <h3 className="text-xl font-bold text-gray-800 mb-1">No matching destinations found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Try checking your spelling or adjusting your keywords to discover other beautiful stays.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {homes.map((home) => (
    <div key={home._id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
      <img src={home.image} alt={home.housename} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h4 className="font-bold text-lg text-gray-800 truncate">{home.housename}</h4>
        <p className="text-gray-500 text-sm mb-3">📍 {home.location}</p>
        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
          <span className="text-gray-900 font-extrabold">${home.price}<span className="text-gray-400 font-normal text-xs">/night</span></span>
          <span className="text-sm font-bold text-amber-500">⭐ {home.rating}</span>
        </div>

        {/* The buttons are now safely inside the p-5 container! */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <Link 
            to={`/homes/${home._id}`}
            className="flex-1 text-center bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow transition transform hover:-translate-y-1 hover:scale-105"
          >
            Details
          </Link>
          
          <FavouriteIcon home={home} /> 
        </div>
      </div>
    </div>
  ))}
</div>
          
        )}

      </div>
    </div>
  );
};

export default HomeListings;