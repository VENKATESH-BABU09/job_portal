import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import * as jwtDecode from 'jwt-decode';

// Create a context for managing login state
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === 'jobseeker') {
      navigate('/login');
    } else if (role === 'employee') {
      navigate('/loginemp');
    }
    setDropdownVisible(false);
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        const userRole = decodedToken.role;
        console.log(userRole);
        if (userRole === 'user') {
          navigate('/user/profile');
        } else {
          navigate('/recruiterProfile');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        handleLogout();
      }
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="../src/assets/job-portal.jpg" alt="Job Portal Logo" />
        </a>
      </div>
      <div className="navbar-links">
        <a href="/jobs">Jobs</a>
        <a href="/companies">Companies</a>
        <a href="/services">Services</a>
      </div>
      <div className="navbar-login">
        {!isLoggedIn ? (
          <>
            <div className="dropdown">
              <button className="login-btn" onClick={() => setDropdownVisible(!dropdownVisible)}>
                Login
              </button>
              {dropdownVisible && (
                <div className="dropdown-content">
                  <button onClick={() => handleLogin('jobseeker')}>Jobseeker Login</button>
                  <button onClick={() => handleLogin('employee')}>Employee Login</button>
                </div>
              )}
            </div>
            <a href="/register" className="register-btn">
              Register
            </a>
          </>
        ) : (
          <div className="profile-section">
            <FaUserCircle size={30} onClick={handleProfileClick} className="profile-icon" />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;