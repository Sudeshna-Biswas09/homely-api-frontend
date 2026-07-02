import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // Imported the Guard
// Page Imports - Adjust paths based on your folder structure
import Home from './pages/store/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import HomeDetails from './pages/store/HomeDetails';
import FavouriteList from './pages/store/FavouriteList';
import HostHomeList from './pages/host/HostHomeList';
import AddEditHome from './pages/host/AddEditHome';
import NotFound from './pages/store/NotFound';
import Bookings from './pages/store/Bookings';
import Welcome from './pages/store/Welcome'; // Optional: A landing page for guests
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          
          <Navbar />
          
          {/* Main content wrapper stretching to fill the screen */}
          <main className="flex-grow">
           <Routes>
              {/* Public Routes - Anyone can access */}
              <Route path="/" element={<Welcome />} />
              <Route path="/allhomes" element={
                 <ProtectedRoute>
                <Home /> </ProtectedRoute>} />
              <Route path="/homes/:homeId" element={
                 <ProtectedRoute>
                <HomeDetails /> </ProtectedRoute>} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Guest/User Routes - Must be logged in */}
              <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute>
                    <Bookings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/favourites" 
                element={
                  <ProtectedRoute>
                    <FavouriteList />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Host Routes - Must be logged in AND be a 'host' */}
              <Route 
                path="/host/host-home-list" 
                element={
                  <ProtectedRoute allowedRole="host">
                    <HostHomeList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/host/add-home" 
                element={
                  <ProtectedRoute allowedRole="host">
                    <AddEditHome />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/host/edit-home/:id" 
                element={
                  <ProtectedRoute allowedRole="host">
                    <AddEditHome />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;