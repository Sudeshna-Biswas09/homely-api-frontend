import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const FavouriteIcon = ({ home }) => {
  
  const handleFavourite = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page

    try {
      const response = await fetch('https://homely-api-backend.onrender.com/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Crucial: sends your session cookie to Express
        body: JSON.stringify({ id: home._id }), // Passing your exact variable
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Successfully added to favourites!");
      } else {
        console.error("Server refused the request:", data.message);
      }
    } catch (error) {
      console.error("Network error occurred:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFavourite} className="mt-0">
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow transition duration-200"
        >
          <span className="text-xl mr-2">❤️</span>
          Add to favourites
        </button>
        {/* We no longer need the hidden input because we are passing home._id directly in the fetch body above! */}
      </form>
    </div>
  );
};

export default FavouriteIcon;