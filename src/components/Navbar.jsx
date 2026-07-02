/*import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
 const {user,logout}=useContext(AuthContext);
  // Clean, reusable function for active link styling
  const navLinkClass = ({ isActive }) => 
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-black/30 font-bold text-white' : 'text-white hover:bg-white/20'
    }`;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
        
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white transition-all" aria-controls="mobile-menu" ariaExpanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2 items-center h-full">
                
                <Link to="/" className="text-white rounded-md px-3 py-2 text-lg font-extrabold tracking-wide">
                  Homely
                </Link>


   {user?.usertype === 'guest' && (
  <>
    <NavLink to="/allhomes" className={navLinkClass}>Homes-List</NavLink>
    <NavLink to="/bookings" className={navLinkClass}>Bookings</NavLink>
    <NavLink to="/favourites" className={navLinkClass}>Favourites</NavLink>
  </>
)}
{user?.usertype === 'host' && (
  <>
    <NavLink to="/host/add-home" className={navLinkClass}>Add Home</NavLink>
    <NavLink to="/host/host-home-list" className={navLinkClass}>Host Homes</NavLink>
  </>
)}   
                

              </div>
            </div>
          </div>

          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
            {!user ? (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  👤 Login
                </NavLink>
                <NavLink to="/signup" className={navLinkClass}>
                  👤 Signup
                </NavLink>
              </>
            ) : (
              <button 
                onClick={logout} 
                className="text-white hover:bg-black/30 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;*/


import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
 const {user,logout}=useContext(AuthContext);
  // Clean, reusable function for active link styling
  const navLinkClass = ({ isActive }) => 
    `rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
      isActive
        ? 'bg-white/20 text-white shadow-inner backdrop-blur-sm ring-1 ring-white/30'
        : 'text-white/85 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-400 shadow-lg shadow-purple-900/20 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60 transition-colors duration-200" aria-controls="mobile-menu" ariaExpanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Logo & Desktop Nav */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-1 items-center h-full">
                
                <Link to="/" className="text-white rounded-lg px-3 py-2 text-xl font-extrabold tracking-tight mr-4 drop-shadow-sm hover:opacity-90 transition-opacity duration-200">
                  Homely
                </Link>


   {user?.usertype === 'guest' && (
  <>
    <NavLink to="/allhomes" className={navLinkClass}>Homes-List</NavLink>
    <NavLink to="/bookings" className={navLinkClass}>Bookings</NavLink>
    <NavLink to="/favourites" className={navLinkClass}>Favourites</NavLink>
  </>
)}
{user?.usertype === 'host' && (
  <>
    <NavLink to="/host/add-home" className={navLinkClass}>Add Home</NavLink>
    <NavLink to="/host/host-home-list" className={navLinkClass}>Host Homes</NavLink>
  </>
)}   
                

              </div>
            </div>
          </div>

          {/* Auth Actions */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
            {!user ? (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  ➜] Login
                </NavLink>
                <NavLink to="/signup" className={navLinkClass}>
                  🌐 Signup
                </NavLink>
              </>
            ) : (
              <button 
                onClick={logout} 
                className="text-white bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 text-sm font-medium tracking-wide ring-1 ring-white/20 transition-all duration-200"
              >
               [← Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;