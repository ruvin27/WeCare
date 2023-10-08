import React from 'react';
import { Link } from 'react-router-dom';
import HomeCSS from './homePage.module.css';

function HomePage() {
  return (
    <div className={HomeCSS.homeContainer}>
      <h1 className={HomeCSS.homeTitle}>We Care</h1>
      <p className={HomeCSS.homeSlogan}>We share, we care</p>
      <p className={HomeCSS.homeDescription}>
        Welcome to We Care, a non-profit organization dedicated to making a difference. 
        Join us in our mission to bring positive change to those in need.
      </p>
      <div >
        <Link to="/login" className={HomeCSS.homeLink}>Login</Link>
        <Link to="/register" className={HomeCSS.homeLink}>Register</Link>
      </div>
    </div>
  );
}

export default HomePage;