import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { ToastContainer } from "react-toastify";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateName = (name) => {
    if (name.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    // perform validation again to catch any errors that might have been missed during live checking
    validateName(name);
    validateEmail(email);
    validatePassword(password);

    if (nameError || emailError || passwordError) {
      return;
    }

    const formData = {
      name: name,
      email: email,
      password: password,
    };

    fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.errorCode === "1008") {
          toast.error("Email already exists");
        }
        else if(data.errorCode === "2000"){
          toast.error("Name Sould not be empty")
        }
        else {
          toast.success("Registration successful!");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.errorCode === "1008") {
          toast.error("Email already exists");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="register-heading">Signup</h1>
        <input
          value={name}
          type="text"
          placeholder
="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <span className="error">{nameError}</span>}
        <input
          value={email}
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="error">{emailError}</span>}
        <input
          value={password}
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPass(e.target.value)}
        />
        {passwordError && <span className="error">{passwordError}</span>}
        <button type="submit">
          Register
        </button>
      </form>
      
      <ToastContainer /> {/* Add this line */}
      
    </div>
  );
};
