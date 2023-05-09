import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://in-out.onrender.com/api/users/login', { email, password });
      localStorage.setItem('userId', response.data._id);
      navigate("/client-dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group" >
          <div style={{display:"flex", flexDirection:"column", justifyContent:"left", textAlign:"left"}}>
          <label htmlFor="email"  >Email:</label>
          <div style={{width:"175%"}}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
          />
          </div>
          </div>
        </div>
        <div className="form-group">
        <div style={{display:"flex", flexDirection:"column", justifyContent:"left", textAlign:"left"}}>
          <label htmlFor="password">Password:</label>
          <div style={{width:"175%"}}>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
          />
          </div>
        </div>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
