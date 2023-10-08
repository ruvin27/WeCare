import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async () => {
          await axios
            .get(`http://localhost:5000/login/${formData.email}`)
            .then((response) => {
              console.log("Login successful:", response.data);
              login(response.data);
              navigate("/");
            })
            .catch((error) => {
              console.error("Login error:", error);
            });
        })
        .catch((error) => {
          console.error("Login error:", error);
          // Handle the error here, e.g., show an alert or perform other error handling.
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#191a1d",
        border: "solid 1px #2d2e33",
        color: "rgba(255,255,255,0.8)",
      }}
      className="login-form"
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 30px 0 20px",
          }}
        >
          <label style={{ display: "flex", width: "100%" }}>Email:</label>
          <input
            style={{ display: "flex", width: "100%" }}
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px 30px 0 20px",
          }}
        >
          <label style={{ display: "flex", width: "100%" }}>Password:</label>
          <input
            style={{ display: "flex", width: "100%" }}
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            required
          />
        </div>
        <div style={{ marginTop: "20px" }} className="forgot-password">
          <Link to="/ForgotPassword" style={{ color: "#3498db" }}>
            Forgot password?
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button type="submit" style={{ padding: "9px 24px" }}>
            Login
          </button>
        </div>
      </form>
      <div style={{ marginTop: "20px" }} className="register-link">
        New member?{" "}
        <Link to="/Register" style={{ color: "#3498db" }}>
          Register here
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
