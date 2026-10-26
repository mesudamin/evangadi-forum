import { useRef } from "react";
import axiosInstance from "../axios/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide both email and password");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>
        <div>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </section>
  );
}


export default Login