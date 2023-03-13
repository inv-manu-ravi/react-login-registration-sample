import { toast } from "react-toastify";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  

  const validatePassword = (password) => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password should not contain whitespace");
    } else if (password.length < 4 || password.length > 8) {
      setPasswordError("Password must be between 4 and 8 characters");
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/[\W_]+/.test(password)) {
      setPasswordError("Password must contain at least one special character");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError) {
      console.log("Invalid form");
      return;
    }

    const formData = {
      email: email,
      password: password
    };

    // send the form data as a JSON body to the backend
    fetch("http://localhost:8000/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.errorCode === "3000") {
          toast.error("Email Should not Empty");
        }
        else if(data.errorCode==="4000"){
          toast.error("Email Doesn't Exists")
        }
        else if(data.errorCode==="4001"){
          toast.error("Password Doesn't Match")
        }
        else{
          toast.success("Login SuccessFull")
          toast.success("Welcome "+data.name)
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <label>
          <input
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="error">{emailError}</span>}
        </label>
        <br />
        <label>
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </label>
        <br />
        <button type="submit">
          Login
        </button>
        <p>Doesn't have an account? <Link to="/register" class="link">Register</Link></p>
      </form>
      
      <ToastContainer /> 
      
    </div>
  );
};

export default Login;
