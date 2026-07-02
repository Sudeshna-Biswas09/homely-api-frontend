import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditHome = () => {
  // 1. The "Registers" (Local State)
  // Preserving your exact variable names
  const [housename, setHousename] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Holds the actual file object
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { id } = useParams(); // Grabs the ID from the URL if we are editing
  const editing = Boolean(id); // If an ID exists, we are in edit mode

  // 2. Fetch existing data if we are editing
  useEffect(() => {
    if (editing) {
      const fetchHomeDetails = async () => {
        try {
          const response = await fetch(`https://homely-api-backend.onrender.com/api/homes/${id}`);
          const data = await response.json();
          if (response.ok) {
            setHousename(data.home.housename);
            setLocation(data.home.location);
            setPrice(data.home.price);
            setRating(data.home.rating);
            setDescription(data.home.description);
            // We don't pre-fill the file input for security reasons, 
            // but you could show a preview of the existing image here!
          }
        } catch (error) {
          console.error("Failed to fetch home details", error);
        }
      };
      fetchHomeDetails();
    }
  }, [id, editing]);

  // 3. The Submit Handler (The System Call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // We must use FormData because we are transmitting a file (binary data)
    const formData = new FormData();
    formData.append('housename', housename);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('description', description);
    
    // Only append the image if the user selected a new one
    if (image) {
      formData.append('image', image);
    }
    if (editing) {
      formData.append('id', id);
    }

    const endpoint = editing ? 'https://homely-api-backend.onrender.com/api/host/edit-home' : 'https://homely-api-backend.onrender.com/api/host/add-home';
    const method = editing ? 'POST' : 'POST'; // Usually PUT for edits, but keeping POST to match your controller

    try {
      const response = await fetch(endpoint, {
        method: method,
        credentials: 'include',
        // CRITICAL: Do NOT set 'Content-Type': 'application/json' here!
        // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/host/host-home-list');
      } else {
        setErrorMessage(data.message || "Failed to save property.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans relative overflow-x-hidden text-black">
      
      {/* Background ambient lighting - Keeping your beautiful aesthetic */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-[float_6s_ease-in-out_infinite] z-0"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-[float_6s_ease-in-out_infinite] z-0" style={{ animationDelay: '2s' }}></div>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white p-8 sm:p-10 transform transition-all duration-500 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
              {editing ? 'Edit Your Home' : 'Add a New Home'}
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              {editing ? 'Update the details of your property below.' : 'List your beautiful property for guests to explore.'}
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="housename" className="block text-sm font-bold text-black mb-2">Property Title</label>
                <input type="text" id="housename" name="housename" required
                  placeholder="e.g. Cozy Cabin in the Woods"
                  value={housename}
                  onChange={(e) => setHousename(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 focus:bg-white hover:border-purple-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-bold text-black mb-2">Location</label>
                <input type="text" id="location" name="location" required
                  placeholder="e.g. New York, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 focus:bg-white hover:border-pink-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-bold text-black mb-2">Price per Night ($)</label>
                <input type="number" id="price" name="price" required min="1"
                  placeholder="e.g. 150"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 focus:bg-white hover:border-purple-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-bold text-black mb-2">Property Rating (1-5)</label>
                <input type="number" id="rating" name="rating" required min="1" max="5" step="0.1"
                  placeholder="e.g. 4.8"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 focus:bg-white hover:border-pink-300 shadow-sm"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="image" className="block text-sm font-bold text-black mb-2">
                  Cover Image {editing && <span className="text-gray-400 font-normal">(Leave blank to keep existing)</span>}
                </label>
                <input type="file" id="image" name="image" 
                  required={!editing} 
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 focus:bg-white hover:border-purple-300 shadow-sm"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-bold text-black mb-2">Description</label>
                <textarea id="description" name="description" required rows="4"
                  placeholder="Describe what makes your home unique and welcoming..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 focus:bg-white hover:border-pink-300 shadow-sm resize-none"
                ></textarea>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <button type="submit" disabled={isLoading}
                className={`w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(168,85,247,0.4)]'}`}>
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12"></span>
                <span className="relative z-10">{isLoading ? 'Processing...' : (editing ? 'Save Changes' : 'List My Home')}</span>
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
};

export default AddEditHome;