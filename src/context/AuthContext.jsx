import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context
export const AuthContext = createContext();



// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Session Verification (Fetch-on-Mount)
  useEffect(() => {
    const verifySession = async () => {
      try {
        // This endpoint should verify the secure HttpOnly cookie on your Express backend
        const response = await fetch('https://homely-api-backend.onrender.com/api/verify-session', {
          method: 'GET',
          credentials: 'include', 
        });
        
        const data = await response.json();
        console.log("I am inside authcontext",data);
        if (response.ok && data.user) {
          setUser(data.user); // Hydrate the state with the user's data (including usertype)
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false); // Stop the global loading spinner
      }
    };

    verifySession();
  }, []);

  // 4. Login Function (Called from Login.jsx)
  const login = (userData) => {
    setUser(userData);
  };

  // 5. Logout Function (Called from Navbar.jsx)
  const logout = async () => {
    try {
      const response= await fetch('https://homely-api-backend.onrender.com/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      

      if (response.ok) {
       setUser(null); // Clear context
       
    } else {
       // Handle server-side errors (e.g., token already expired)
       console.error("Logout failed with status:", response.status);
    }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 6. Provide the state and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

