import React, { useEffect, useRef, useState } from 'react'
import styles from './navigation.module.css'
import PastOrderCard from './PastOrderCard';
import {useAuth} from '../../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Options({setoptionsOpen}) {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pastOrders, setPastOrders] = useState([])

  const HandleLogout = () => {
    console.log("Logging out...");
    logout();
    console.log("User logged out.");
    navigate('/login');
  }

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `http://localhost:5000/donations/${user?._id}`
        )
        .then((res) => {
          if (res.data.length) {
            setPastOrders(res.data);
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (user) {
      getData();
    }
  }, [user]);

    function useOutsideAlerter(ref) {
        useEffect(() => {

          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
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
    <div className={styles.leftMainDiv} ref={wrapperRef} style={{width:"300px", backgroundColor:"#191a1d", padding:"0", height:"100vh", display:"flex", flexDirection:"column", position:"absolute", top:"0", left:"0", zIndex:"999", color:"#fff"}}>
      <div style={{padding:"10px", fontSize:"16px", fontWeight:"600", paddingTop:"10px", backgroundColor:"#2d2e33"}}>Past Donations</div>
      <div className={styles.cardcontainer} style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", flex:"1", overflow:"auto"}}>
      {pastOrders.map((order, index) =>  {
        return new Date(order.TimeRange[1]) < new Date() &&
        <PastOrderCard
          key={index}
          num={index}
          itemName={order.Donation}
          quantity={order.Quantity}
          fromDate={order.TimeRange[0]}
          toDate={order.TimeRange[1]}
        />
})}
      </div>

      <div style={{display:"flex", alignItems:"center", justifyContent:"center", alignContent: "flex-end", margin: "0px", borderTop:"solid 1px #2d2e33"}}>
      <button style={{padding:"12px 0", width:"calc(100% - 30px)", marginLeft:"10px", backgroundColor:"rgba(255,255,255,0.9)", outline:"none", border:"none", color:"#000", fontSize:"13px", margin:"15px 0"}}  onClick={HandleLogout}>Sign Out</button>
      </div>

    </div>
  )
}

export default Options
