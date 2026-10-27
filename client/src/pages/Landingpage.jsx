import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axiosInstance from "../axios/axios";
import { appData } from "../App";
import "./Landingpage.css";

function Landingpage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setUser } = useContext(appData) || {};
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  // Helper to switch forms and clear messages
  const switchForm = (toLogin) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLogin(toLogin);
  };

  // Login form refs
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  // Register form refs
  const regUsernameRef = useRef();
  const regFirstNameRef = useRef();
  const regLastNameRef = useRef();
  const regEmailRef = useRef();
  const regPasswordRef = useRef();

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const email = loginEmailRef.current?.value?.trim();
    const password = loginPasswordRef.current?.value;

    if (!email || !password) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (setUser && response.data.username) {
        setUser({ username: response.data.username });
      }

      navigate("/Home");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error.message ||
          "Failed to log in"
      );
    }
  };

  // Handle Register submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const username = regUsernameRef.current?.value?.trim();
    const firstName = regFirstNameRef.current?.value?.trim();
    const lastName = regLastNameRef.current?.value?.trim();
    const email = regEmailRef.current?.value?.trim();
    const password = regPasswordRef.current?.value;

    if (!username || !firstName || !lastName || !email || !password) {
      setErrorMessage("Please provide all required information.");
      return;
    }

    if (password.length <= 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      await axiosInstance.post("/users/register", {
        username,
        firstName,
        lastName,
        email,
        password,
      });

      setSuccessMessage("Registration successful! Please log in.");
      setIsLogin(true);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="landing_container">
      <Header isLogin={isLogin} setIsLogin={switchForm} />

      <main className="landing_hero">
        <div className="landing_content">
          {/* Left Column: Auth Card */}
          <div className="auth_card">
            {/* Inline Error and Success Message Banners */}
            {errorMessage && (
              <div className="auth_error_box" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="auth_success_box" role="status">
                {successMessage}
              </div>
            )}

            {isLogin ? (
              /* ===== LOGIN FORM ===== */
              <div>
                <div className="auth_header">
                  <h2 className="auth_title">Login to your account</h2>
                  <p className="auth_subtitle">
                    Don't have an account?
                    <span
                      className="auth_switch_link"
                      onClick={() => switchForm(false)}
                    >
                      Create a new account
                    </span>
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="auth_form">
                  <div className="input_group">
                    <input
                      ref={loginEmailRef}
                      type="email"
                      placeholder="Your Email"
                      className="form_input"
                      required
                    />
                  </div>

                  <div className="input_group">
                    <input
                      ref={loginPasswordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Your Password"
                      className="form_input"
                      required
                    />
                    <button
                      type="button"
                      className="password_toggle_btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        /* Eye Open */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        /* Eye Off / Slashed */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button type="submit" className="btn_login">
                    submit
                  </button>
                </form>

                <div className="card_bottom_link">
                  <span onClick={() => switchForm(false)}>
                    Create an account?
                  </span>
                </div>
              </div>
            ) : (
              /* ===== REGISTER FORM ===== */
              <div>
                <div className="auth_header">
                  <h2 className="auth_title">Join the network</h2>
                  <p className="auth_subtitle">
                    Already have an account?
                    <span
                      className="auth_switch_link"
                      onClick={() => switchForm(true)}
                    >
                      Sign in
                    </span>
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="auth_form">
                  <div className="input_group">
                    <input
                      ref={regEmailRef}
                      type="email"
                      placeholder="Email"
                      className="form_input"
                      required
                    />
                  </div>

                  <div className="form_row">
                    <div className="input_group">
                      <input
                        ref={regFirstNameRef}
                        type="text"
                        placeholder="First Name"
                        className="form_input"
                        required
                      />
                    </div>
                    <div className="input_group">
                      <input
                        ref={regLastNameRef}
                        type="text"
                        placeholder="Last Name"
                        className="form_input"
                        required
                      />
                    </div>
                  </div>

                  <div className="input_group">
                    <input
                      ref={regUsernameRef}
                      type="text"
                      placeholder="User Name"
                      className="form_input"
                      required
                    />
                  </div>

                  <div className="input_group">
                    <input
                      ref={regPasswordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="form_input"
                      required
                    />
                    <button
                      type="button"
                      className="password_toggle_btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button type="submit" className="btn_register">
                    Agree and Join
                  </button>

                  <p className="terms_text">
                    I agree to the <Link to="#">privacy policy</Link> and{" "}
                    <Link to="#">terms of service</Link>.
                  </p>
                </form>

                <div className="card_bottom_link">
                  <span onClick={() => switchForm(true)}>
                    Already have an account?
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: About Section */}
          <div className="about_section">
            <span className="about_label">About</span>
            <h1 className="about_title">Evangadi Networks Q&A</h1>
            <p className="about_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem
              voluptate officiis beatae nobis pariatur omnis facere accusamus
              laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum
              quisquam! Molestias, ut commodi!
            </p>
            <p className="about_description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quidem
              voluptate officiis beatae nobis pariatur omnis facere accusamus
              laboriosam hic, adipisci vero reiciendis, recusandae sit ad, eum
              quisquam! Molestias, ut commodi!
            </p>
            <p className="about_description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              ipsum, provident minus laudantium esse soluta maiores nostrum nisi
              sunt perferendis dolorum. Praesentium necessitatibus quia
              consectetur sunt tempora possimus eveniet voluptates?
            </p>
            <button className="about_btn">HOW IT WORKS</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Landingpage;