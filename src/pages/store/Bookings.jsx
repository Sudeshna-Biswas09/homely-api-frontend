import React, { useState, useEffect } from 'react';
import { Link ,useSearchParams} from 'react-router-dom';

const Bookings = () => {
const [searchParams, setSearchParams] = useSearchParams();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

 

//booking display helper from localstorage after successful payment

useEffect(() => {
  const processPaymentAndFetch = async () => {
    // 1. THE BRIDGE: Check if we just returned from a successful payment
    if (searchParams.get('success') === 'true') {
      const pendingBooking = localStorage.getItem('pendingBooking');
      
      if (pendingBooking) {
        try {
          // Fire the POST request to save the booking to MongoDB
          await fetch('https://homely-api-backend.onrender.com/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: pendingBooking // Sending the stashed data!
          });
          
          // Clear the memory so it doesn't run again on page refresh
          localStorage.removeItem('pendingBooking');
          
          // Clean up the URL (Remove ?success=true silently)
          searchParams.delete('success');
          setSearchParams(searchParams, { replace: true });
        } catch (error) {
          console.error("Failed to finalize booking:", error);
        }
      }
    }

    // 2. NOW FETCH ALL BOOKINGS (Your existing logic)
    try {
      const response = await fetch('https://homely-api-backend.onrender.com/api/bookings', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setBookings(data.bookings);
      } else {
        setErrorMessage(data.message || "Failed to load your upcoming trips.");
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  processPaymentAndFetch();
}, [searchParams, setSearchParams]);




  // Helper function to format MongoDB ISO dates cleanly
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mx-auto mt-12 text-center max-w-2xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl font-sans min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
          Your Trips
        </h1>
        <p className="text-gray-500 text-lg font-medium">Upcoming reservations and past stays.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <span className="text-6xl mb-4 block">🧳</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No trips booked... yet!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Time to dust off your bags and start planning your next great adventure.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 transition-transform duration-500 hover:-translate-y-2">
              
              {/* Home Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={booking.homeId?.image || '/images/default-home.png'} 
                  alt={booking.homeId?.housename || 'Property'} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-700 shadow-sm uppercase tracking-wider">
                  {booking.status}
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
                  {booking.homeId?.housename || 'Home no longer available'}
                </h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center">
                  <span className="mr-1">📍</span> {booking.homeId?.location || 'Unknown location'}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Check-in</span>
                    <span className="text-sm font-semibold text-gray-800">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Check-out</span>
                    <span className="text-sm font-semibold text-gray-800">{formatDate(booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-sm font-bold text-gray-800">Total Paid</span>
                    <span className="text-lg font-extrabold text-green-600">${booking.totalPrice}</span>
                  </div>
                </div>

                <Link 
                  to={`/homes/${booking.homeId?._id}`}
                  className="block w-full text-center border-2 border-purple-100 text-purple-600 font-bold py-2 rounded-xl hover:bg-purple-50 transition-colors duration-300"
                >
                  View Property
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Bookings;