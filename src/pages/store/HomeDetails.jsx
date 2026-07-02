import React, { useState, useEffect } from 'react';
import { useParams, Link,useSearchParams } from 'react-router-dom';
// import FavouriteIcon from '../components/FavouriteIcon'; 

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const HomeDetails = () => {
  const { homeId } = useParams();
  
  const [searchParams, setSearchParams] = useSearchParams();
  // 1. Data Fetching State
  const [home, setHome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Booking Engine State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState({ type: '', text: '' });

  // Get today's date in YYYY-MM-DD format to prevent past bookings
  const today = new Date().toISOString().split('T')[0];

  // 3. Dynamic Price Calculation
  let nights = 0;
  let totalPrice = 0;
  
  if (checkIn && checkOut) {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = endDate - startDate;
    
    // Calculate nights, ensuring it's a positive number
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (nights > 0) {
      totalPrice = nights * (home?.price || 0);
    }
  }


useEffect(() => {
  // Check if the URL has ?canceled=true
  if (searchParams.get('canceled') === 'true') {
    // Use your existing bookingMessage state to show a friendly alert
    setBookingMessage({ 
      type: 'error', 
      text: 'Payment was cancelled. Feel free to try again when you are ready!' 
    });

    // Best Practice: Clean up the URL so the user doesn't see the message again if they refresh the page
    searchParams.delete('canceled');
    setSearchParams(searchParams, { replace: true });
  }
}, [searchParams, setSearchParams]);





  // 4. Fetch Home Details
  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const response = await fetch(`https://homely-api-backend.onrender.com/api/homes/${homeId}`, {
          method: 'GET',
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setHome(data.home);
        } else {
          setErrorMessage(data.message || "Failed to load property details.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setErrorMessage("A network error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeDetails();
  }, [homeId]);

  // 5. Submit Booking Handler
  const handleBooking = async (e) => {
  e.preventDefault();
  
  if (nights <= 0) {
    setBookingMessage({ type: 'error', text: 'Check-out date must be after check-in date.' });
    return;
  }

  setIsBooking(true);
  setBookingMessage({ type: '', text: '' });

  try {
    // 1. Ask Express for a Stripe Session
    const response = await fetch('https://homely-api-backend.onrender.com/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        homeId: home._id, 
        checkIn, 
        checkOut, 
        totalPrice,
        nights // Passing nights so Stripe can itemize the receipt
      }),
    });

    const session = await response.json();

    if (response.ok) {

      localStorage.setItem('pendingBooking', JSON.stringify({
    homeId: home._id,
    checkIn,
    checkOut,
    totalPrice
  }));


      window.location.href = session.url;
    } else {
      setBookingMessage({ type: 'error', text: session.message || 'Failed to initialize payment.' });
    }
  } catch (error) {
    console.error("Booking error:", error);
    setBookingMessage({ type: 'error', text: 'Network error. Please try again later.' });
  } finally {
    setIsBooking(false);
  }
};

  // Render Loading / Error States
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errorMessage || !home) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto shadow-md">
          {errorMessage || "Property not found."}
        </div>
        <Link to="/" className="inline-block mt-6 text-purple-600 font-bold hover:underline transition-all">
          &larr; Back to all homes
        </Link>
      </div>
    );
  }

  // Render Hydrated UI
  return (
    <main className="container mx-auto p-4 sm:p-8 mt-6 mb-12 max-w-7xl font-sans relative z-10">
      
      <Link to="/" className="text-gray-500 hover:text-purple-600 mb-6 inline-block font-semibold transition-colors">
        &larr; Back to Listings
      </Link>

      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8">
        {home.housename}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Image and Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img 
              src={home.image} 
              alt={home.housename} 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.target.src = '/images/default-home.png'; }}
            />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-800">About this space</h3>
              {/* <FavouriteIcon home={home} /> */}
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{home.description}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center text-gray-700">
                <span className="text-2xl mr-3">📍</span> 
                <span className="font-medium text-lg">{home.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="text-yellow-400 text-2xl mr-3 drop-shadow-sm">★</span>
                <span className="font-medium text-lg">{home.rating} / 5 Rating</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: The Booking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 sticky top-24">
            
            <p className="text-3xl text-gray-800 font-extrabold mb-6">
              ${home.price} <span className="text-lg text-gray-500 font-normal">/ night</span>
            </p>

            <form onSubmit={handleBooking} className="space-y-5">
              
              <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-xl overflow-hidden p-1">
                <div className="p-2 border-r border-gray-200">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check-In</label>
                  <input 
                    type="date" 
                    required 
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full focus:outline-none text-gray-700 bg-transparent cursor-pointer"
                  />
                </div>
                <div className="p-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Check-Out</label>
                  <input 
                    type="date" 
                    required 
                    min={checkIn || today} // Check-out can't be before check-in
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full focus:outline-none text-gray-700 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Price Display */}
              {nights > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>${home.price} x {nights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service fee</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              )}

              {/* Status Message */}
              {bookingMessage.text && (
                <div className={`p-3 rounded-lg text-sm font-medium text-center ${bookingMessage.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {bookingMessage.text}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isBooking}
                className={`w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg transform transition-all duration-300 ${isBooking ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(168,85,247,0.4)]'}`}
              >
                <span className="relative z-10">{isBooking ? 'Securing Dates...' : 'Reserve Now'}</span>
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-4 font-medium">You won't be charged yet</p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default HomeDetails;