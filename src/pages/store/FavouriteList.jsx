import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavouriteList = () => {
  // 1. Local State (Your L1 Cache)
  const [favouriteList, setFavouriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Fetch-on-Mount Pipeline
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('https://homely-api-backend.onrender.com/api/favourites', {
          method: 'GET',
          credentials: 'include' // Crucial for session cookies
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Assuming your API returns { favouriteList: [...] }
          setFavouriteList(data.favourites);
        } else {
          setErrorMessage("Failed to load your favourite homes.");
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  // 3. Asynchronous Delete Handler
  const handleRemoveFavourite = async (homeId) => {
    // Optimistic UI Update: Remove instantly from the screen
    const previousList = [...favouriteList];
    setFavouriteList((prev) => prev.filter((home) => home._id !== homeId));

    try {
      const response = await fetch(`https://homely-api-backend.onrender.com/api/favourites/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id :homeId }) // Payload matching your controller expectations
      });

      if (!response.ok) {
        throw new Error("Failed to remove on server");
      }
    } catch (error) {
      console.error("Remove error:", error);
      // Rollback if the server fails
      setFavouriteList(previousList);
      alert("Could not remove favourite. Please try again.");
    }
  };

  if (isLoading) return <div className="text-center mt-10 font-bold text-purple-600">Loading your favourites...</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Assuming Navbar is rendered in your main Layout component */}
      
      <main className="container mx-auto max-w-3xl pt-10 pb-16 px-4">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-10 transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8 text-center">
            Favourite Homes
          </h2>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              {errorMessage}
            </div>
          )}

          {favouriteList.length === 0 ? (
            <div className="text-center mt-12 flex flex-col items-center">
              {/* Vibrant Empty State */}
              <div className="w-32 h-32 mb-6 bg-pink-100 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-5xl">🌸</span> 
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No favourites yet!</h3>
              <p className="text-gray-500 mb-6">Start exploring and save the homes you love.</p>
              <Link to="/allhomes" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/30 transform transition duration-200 hover:-translate-y-0.5">
                Explore Homes
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {favouriteList.map((home) => (
                <li
                  key={home._id}
                  className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div>
                    <div className="relative">
                      <img 
                        src={home.image} 
                        alt="houseImage" 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/images/default-home.png'; }}
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                        Home
                      </span>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{home.housename}</h3>
                      <p className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <span className="mr-1">📍</span> {home.location}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                        <div>
                          <span className="text-xs text-gray-500 block">Price</span>
                          <span className="text-lg font-bold text-purple-600">₹{home.price}</span>
                          <span className="text-xs text-gray-400"> /night</span>
                        </div>
                        <div className="bg-pink-50 px-2 py-1 rounded-lg flex items-center">
                          <span className="text-sm font-bold text-pink-600 mr-1">{home.rating}</span>
                          <span className="text-xs">⭐</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex gap-3">
                    <Link 
                      to={`/homes/${home._id}`}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors"
                    >
                      proceed to Book
                    </Link>
                    <button 
                      onClick={() => handleRemoveFavourite(home._id)}
                      className="flex-1 bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-50 text-center font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                    >
                      Remove
                    </button>
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

export default FavouriteList;
