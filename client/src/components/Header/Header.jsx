import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { appData } from '../../App';
import './Header.css';

function Header({ isLogin, setIsLogin }) {
  const { user, setUser } = useContext(appData) || {};
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user?.username) {
      localStorage.removeItem('token');
      if (setUser) setUser(null);
      navigate('/');
    } else if (setIsLogin) {
      // Toggle between Login and Register on landing page
      setIsLogin(!isLogin);
    } else {
      navigate('/');
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (user?.username || token) {
      navigate('/Home');
    } else {
      navigate('/');
    }
  };

  // Determine button text dynamically
  const getButtonLabel = () => {
    if (user?.username) {
      return 'LOG OUT';
    }
    if (setIsLogin) {
      return isLogin ? 'SIGN UP' : 'SIGN IN';
    }
    return 'SIGN IN';
  };

  return (
    <header className="evangadi_header">
      <div className="header_left">
        <Link to="/">
          <img src={logo} alt="Evangadi Logo" className="header_logo" />
        </Link>
      </div>

      <nav className="header_right">
        <Link to="/Home" onClick={handleHomeClick} className="nav_item">
          Home
        </Link>
        <Link to="#" className="nav_item nav_item_secondary">
          How it works
        </Link>
        <button onClick={handleAuthAction} className="auth_btn">
          {getButtonLabel()}
        </button>
      </nav>
    </header>
  );
}

export default Header;
