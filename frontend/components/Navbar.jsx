import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';  // You can style it similarly to the design

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Navigate to the appropriate login page based on the role
    if (role === 'jobseeker') {
      navigate('/login');
    } else if (role === 'employee') {
      navigate('/login');
    }
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="../src/assets/job-portal.jpg"  alt="job portal Logo" />
        </a>
      </div>
      <div className="navbar-links">
        <a href="/jobs">Jobs</a>
        <a href="/companies">Companies</a>
        <a href="/services">Services</a>
      </div>
      <div className="navbar-login">
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
      </div>
    </nav>
  );
};

export default Navbar;
