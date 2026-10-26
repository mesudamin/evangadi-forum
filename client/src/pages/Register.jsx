import { useRef } from "react";
import axiosInstance from "../axios/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    // 1. Check for empty fields
    if (
      !usernameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information");
      return;
    }

    // 2. Check password length (matching backend constraint)
    if (passwordValue.length <= 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      await axiosInstance.post("/users/register", {
        username: usernameValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={userNameDom} type="text" placeholder="Username" />
        </div>
        <div>
          <input ref={firstNameDom} type="text" placeholder="First Name" />
        </div>
        <div>
          <input ref={lastNameDom} type="text" placeholder="Last Name" />
        </div>
        <div>
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>
        <div>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">login</Link>
    </section>
  );
}

export default Register;
