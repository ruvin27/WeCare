import './Register.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase";
import {useAuth} from '../Contexts/AuthContext'
import axios from 'axios';


const Register = () => {
  const {  login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    phoneNumber: "",
    isOrganization: true
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
   
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password ).then(async (userCredential) => {
        formData._id = userCredential.user.uid;
        delete formData.password;
      await axios.post('http://localhost:5000/register', formData).then((response) => {
        console.log('Registration successful:', response.data);
        login(formData);
        navigate('/');
      }).catch((error) => {
        console.error('Registration error:', error);
      });
      
      })
      .catch((error) => {
        console.error('Registration error:', error);
        // Handle the error here, e.g., show an alert or perform other error handling.
      });
      
   
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
    }
  };
  return (
    <div style={{color:"#fff", border:"solid 1px #2d2e33", backgroundColor:"#212225", display:"flex", justifyContent:"center"}} className="reg-container">
      <h2>Register</h2>
      <form style={{ marginLeft:"60px"}} onSubmit={handleRegistration}>
        <div>
            <label>Name: </label>
            <input
                className="reg-input"
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Email: </label>
            <input
                className="reg-input"
                type="email"
                placeholder="xyz@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
        </div>

        <div>    
            <label>Password: </label>
            <input
                className="reg-input"  
                type="password"
                placeholder="********"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Address: </label>
            <input
                className="reg-input"
                type="text"
                placeholder="Street name, Apt"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Pincode: </label>
            <input
                className="reg-input"
                type="text"
                placeholder="00000"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Contact: </label>
            <input
                className="reg-input"
                type="text"
                placeholder="(999)-999-9999"
                name="phoneNumber"
                value={formData.number}
                onChange={handleInputChange}
                required
            />
        </div>
        <div style={{display:"flex",  alignItems:"center", justifyContent:"flex-end", flexDirection:"row-reverse",marginRight:"60%"} }>
        <label style={{display:"flex", }} className="checkbox-label">Organization?</label>
            <input style={{  display:"inline-block", width:"30px"}}
              type="checkbox"
              name="isOrganization"
              checked={formData.isOrganization}
              onChange={e => setFormData({...formData, isOrganization: e.target.checked})}
            />
        </div>
        
        <div style={{display:"flex", justifyContent:"center", marginTop:"20px", marginRight:"60px"}}>
          <button className="submit-button" type="submit">Submit</button>
        </div>
      </form>
      <div className="login-link">
       Already a member? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
