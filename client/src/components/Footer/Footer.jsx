import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer_container">
      <div className="footer_inner">
        {/* Column 1: Logo & Social Media */}
        <div className="footer_col footer_brand">
          <Link to="/">
            <img src={logo} alt="Evangadi Logo" className="footer_logo" />
          </Link>
          <div className="footer_socials">
            <a
              href="https://www.facebook.com/evangaditech"
              target="_blank"
              rel="noreferrer"
              className="social_icon"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/evangaditech/"
              target="_blank"
              rel="noreferrer"
              className="social_icon"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@evangaditech"
              target="_blank"
              rel="noreferrer"
              className="social_icon"
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.5l5.75 3.26-5.75 3.26z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="footer_col">
          <h3 className="footer_title">Useful Link</h3>
          <ul className="footer_links">
            <li><Link to="#">How it works</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
            <li><Link to="#">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer_col">
          <h3 className="footer_title">Contact Info</h3>
          <ul className="footer_info">
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
