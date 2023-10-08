
import {RxCross1} from 'react-icons/rx'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from "../../Contexts/AuthContext";
import axios from 'axios';

const formatDateTime = (dateTimeString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('en-US', options);
};

const UserDetails = ({ reservations }) => {
  return (
    <>
      {reservations.map((user, index) => (
        <div key={index} style={{display: "flex", flexDirection:"column", justifyContent:"flex-start",background:"#212225", margin:"0px", borderBottom:"solid 1px #2d2e33", padding:"10px 10px"}}>
          <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Name: {user.name}</div>
          <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Email: {user.email}</div>
          <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Reservation Date: {formatDateTime(user.date)}</div>
        </div>
      ))}
    </>
  );
};

const Reservations = ({setoptionsOpen, id}) => {
  const [reservations, setReservations] = useState([]);
  const [donationData, setDonationData] = useState(null);
  const { user } = useAuth();

	useEffect(() => {
		const getData = async () => {
			await axios
				.get(`http://localhost:5000/allreservations/${id}`)
				.then((res) => {
					if (res.data.length) {
						setReservations(res.data);
					}
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});

        await axios
				.get(`http://localhost:5000/donation/${id}`)
				.then((res) => {
						setDonationData(res.data);
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		if (user) {
			getData();
		}
	}, [user,id]);

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
            <div style={{fontSize: "13px", marginLeft:"5px"}}>Name: {donationData?.Donation}</div>
            <div style={{fontSize: "13px", marginLeft:"5px"}}>Quantity: {donationData?.Quantity} </div>
            <div style={{fontSize: "13px", marginLeft:"5px"}}>Date: {donationData && formatDateTime(donationData?.TimeRange[0]) + " - " + formatDateTime(donationData?.TimeRange[1])}</div>
        </div>

        <div className="userDetails" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", flex:"1", overflowY: "scroll"}}>
            <UserDetails reservations={reservations}/>
        </div>
        </div>
  );
};

export default Reservations;