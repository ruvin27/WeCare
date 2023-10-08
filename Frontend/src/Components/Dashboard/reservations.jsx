
import {RxCross1} from 'react-icons/rx'
import React, { useEffect, useRef, useState } from 'react'
import styles from './dashboard.module.css'

const UserDetails = ({ users }) => {
  return (
    <>
      {users.map((user, index) => (
        <div key={index} style={{display: "flex", flexDirection:"column", justifyContent:"flex-start",background:"#212225", margin:"0px", borderBottom:"solid 1px #2d2e33", display: "flex", padding:"10px 10px"}}>
          <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Name: {user.name}</div>
          <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Email: {user.email}</div>
          <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Purchase Date: {user.purchaseDate}</div>
        </div>
      ))}
    </>
  );
};

const Reservations = ({setoptionsOpen}) => {
  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      purchaseDate: '2023-10-15',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      purchaseDate: '2023-10-18',
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        purchaseDate: '2023-10-18',
    }
    // Add more users as needed
  ];

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
    <div style={{width:"600px", maxWidth:"calc(100vw - 20px)", backgroundColor:"#191a1d", padding:"0", height:"600px", display:"flex", flexDirection:"column", position:"relative", border:"solid 1px #2d2e33", color:"#fff"}}>
        <div ref={wrapperRef} style={{ height:"30px", width:"30px", position:"absolute", right:"-15px", top:"-15px", backgroundColor:"#2D2E33", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"solid 1px #212225", cursor:"pointer"}}><RxCross1 color='rgba(255,255,255,0.7)'/></div>
        
        <div style={{margin: "10px 3px", display: "flex", flexDirection:"column", textAlign: "left"}}>
            <div style={{fontSize: "13px"}}>Name: Chair</div>
            <div style={{fontSize: "13px"}}>Quantity: 100 </div>
            <div style={{fontSize: "13px"}}>Posted Date: Date</div>
        </div>

        <div className="userDetails" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", flex:"1", overflowY: "scroll"}}>
            <UserDetails users={users}/>
        </div>
        </div>
  );
};

export default Reservations;