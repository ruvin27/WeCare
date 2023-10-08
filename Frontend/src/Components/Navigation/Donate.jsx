import React, { useEffect, useRef, useState } from 'react'
import styles from './navigation.module.css'
import {RxCross1} from 'react-icons/rx'
import axios from "axios";
import { useAuth } from '../../Contexts/AuthContext'

function Donate({setoptionsOpen}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    Donation: "",
    quantity: "",
    fromTime: "",
    toTime: "",
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
   
  };
  const HandleSubmit = async () => {
    try {
      const newDonation = {
        Donation: formData.Donation,
        Name: user.name,
        Address: user.address,
        Pincode: user.pincode,
        Contact: user.phoneNumber,
        Quantity: formData.quantity,
        TimeRange:[formData.fromTime, formData.toTime],
        Date: Date.now(),
        Donator_id: user._id,
      };

  
      const response = await axios.post('http://localhost:5000/donate', newDonation);
  
      console.log('Donation created successfully:', response.data);

    } catch (error) {
      console.error('Error creating donation:', error);
    }
  }

    function useOutsideAlerter(ref) {
        useEffect(() => {

          function handleClickOutside(event) {
            if (ref.current && ref.current.contains(event.target)) {
              setoptionsOpen(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);
  return (
    <div style={{width:"600px", maxWidth:"calc(100vw - 20px)", backgroundColor:"#191a1d", padding:"0", height:"500px", display:"flex", flexDirection:"column", position:"relative", border:"solid 1px #2d2e33", color:"#fff"}}>
        <div ref={wrapperRef} style={{ height:"30px", width:"30px", position:"absolute", right:"-15px", top:"-15px", backgroundColor:"#2D2E33", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"solid 1px #212225", cursor:"pointer"}}><RxCross1 color='rgba(255,255,255,0.7)'/></div>
    
        <form
        className="formNewPost"
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          paddingLeft:"70px"
        }}
        onSubmit={HandleSubmit}
      >

        <div style={{marginTop:"20px"}} className={styles.inputrow}>
          <label for="Donation" style={{margin: "10px", width:"100%", textAlign: "left", fontSize: "13px"}}>Donation Name</label>
          <input
            className={styles.input}
            type="text"
            id="Donation"
            placeholder="Donation Name"
            value = {formData.Donation}
            required
            name="Donation"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputrow}>
          <label for="quantity" style={{margin: "10px", width:"100%", textAlign: "left", fontSize: "13px"}}>Quantity</label>
          <input type="number" id="quantity" placeholder="Quantity" value={formData.quantity} name="quantity" onChange={handleInputChange} required />
        </div>
        <div className={styles.inputrow}>
          <label for="fromTime" style={{margin: "10px", width:"100%", textAlign: "left", fontSize: "13px"}}>From Time</label>
          <input type="datetime-local" id="fromTime" name = "fromTime" value={formData.fromTime} onChange={handleInputChange} />
        </div>
        <div className={styles.inputrow}>
          <label for="toTime" style={{margin: "10px", width:"100%", textAlign: "left", fontSize: "13px"}}>To Time</label>
          <input type="datetime-local" id="toTime" name="toTime" value={formData.toTime} required onChange={handleInputChange}/>
        </div>        
    
        <div style={{display:"flex", justifyContent:"center", marginRight:"80px"}}>
        <button style={{width: "50%" ,padding:"12px 20px", marginLeft:"10px", backgroundColor:"#32a84e", outline:"none", border:"none", color:"#fff", fontSize:"12px", marginTop:"25px",cursor:"pointer"}} type='submit'>Submit</button>

        </div>
          </form>
    
    </div>
  )
}

export default Donate