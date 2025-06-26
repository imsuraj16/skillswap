import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../store/actions/userActions";

const Nav = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutuser());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/20 hover:shadow-md ${
      isActive
        ? "bg-white text-blue-600 shadow-md"
        : "text-gray-700 hover:text-gray-900"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg sticky top-0 z-50 p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              SkillSwap
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/explore" className={navLinkClasses}>
              Explore
            </NavLink>
            <NavLink to="/users" className={navLinkClasses}>
              Users
            </NavLink>
            
            {user && (
              <>
                <NavLink to="/add-skill" className={navLinkClasses}>
                  Add Skill
                </NavLink>
                <NavLink to="/profile" className={navLinkClasses}>
                  Profile
                </NavLink>
                <NavLink to="/requests" className={navLinkClasses}>
                  Requests
                </NavLink>
              </>
            )}
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {user.name && (
                  <span className="text-sm text-gray-600 font-medium">
                    Welcome, {user.name}
                  </span>
                )}
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/20 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mx-4 mb-4 p-4 border">
            <div className="space-y-2">
              <NavLink
                to="/"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/explore"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Explore
              </NavLink>
              <NavLink
                to="/users"
                className={mobileNavLinkClasses}
                onClick={closeMobileMenu}
              >
                Users
              </NavLink>
              
              {user && (
                <>
                  <NavLink
                    to="/add-skill"
                    className={mobileNavLinkClasses}
                    onClick={closeMobileMenu}
                  >
                    Add Skill
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={mobileNavLinkClasses}
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/requests"
                    className={mobileNavLinkClasses}
                    onClick={closeMobileMenu}
                  >
                    Requests
                  </NavLink>
                </>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    {user.name && (
                      <p className="text-sm text-gray-600 px-4">
                        Welcome, {user.name}
                      </p>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors duration-300"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;