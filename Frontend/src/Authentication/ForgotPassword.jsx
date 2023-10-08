import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle forgot password, typically sending the email to backend.
    console.log('Password reset link sent to:', email);
  };

  return (
    <div style={{color:"#fff", border:"solid 1px #2d2e33", backgroundColor:"#212225"}} className="forgot-password-form">
      <h2>Forgot Password</h2>
      <p>Enter your email address and we'll send you a link to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      <Link to="/">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;
