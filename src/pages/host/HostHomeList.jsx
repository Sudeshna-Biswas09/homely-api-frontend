import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HostHomeList = () => {
  // 1. Local State: The "Cache"
  const [hosthomes, setHosthomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Data Fetching: The "Fetch-on-Mount" Pipeline
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await fetch('https://homely-api-backend.onrender.com/api/host/host-home-list', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setHosthomes(data.homes);
        } else {
          setErrorMessage("Failed to load your homes.");
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomes();
  }, []);

  // 3. Delete Handler: The "Instant Feedback" Pipeline
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://homely-api-backend.onrender.com/api/host/delete-home/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        // Optimistic UI update: remove from local state immediately
        setHosthomes((prev) => prev.filter((home) => home._id !== id));
      } else {
        alert("Failed to delete home.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading your homes...</div>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      {/* Assuming Navbar and Welcome components are handled by your Layout */}
      

      <main className="container mx-auto max-w-3xl mt-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Hey host, here are your homes
          </h2>

          {hosthomes.length === 0 ? (
            <div className="text-center text-gray-400 mt-8 text-lg">No homes registered yet.</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {hosthomes.map((home) => (
                <li
                  key={home._id}
                  className="bg-gradient-to-br from-purple-50 to-blue-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
                >
                  <div>
                    <img 
                      src={home.image} 
                      alt="houseImage" 
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      onError={(e) => { e.target.src = '/images/default-home.png'; }} 
                    />
                    <span className="text-xl font-semibold text-gray-700">{home.housename}</span>
                    <span className="inline-block bg-purple-200 text-purple-700 text-xs font-bold px-3 py-1 rounded-full ml-2">Home</span>
                    <span className="text-sm font-semibold text-gray-700 block mt-3">Location: {home.location}</span>
                    <span className="text-sm font-semibold text-gray-700 block mt-3">Description: {home.description}</span>
                    <span className="text-sm font-semibold text-gray-700 block mt-3">Price per night: ₹{home.price}</span>
                    <span className="text-sm font-semibold text-gray-700 block mt-3">{home.rating}⭐</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link 
                      to={`/host/edit-home/${home._id}`}
                      className="bg-purple-400 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition transform hover:-translate-y-1 hover:scale-105"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(home._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition transform hover:-translate-y-1 hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

            <div class="flex justify-center">
        <Link
        to="/host/add-home"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 inline-block m-10  "
      >
        + Add Home
      </Link>

            </div>

      </main>






    </div>
  );
};

export default HostHomeList;