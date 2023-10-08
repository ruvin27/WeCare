import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { AiFillHome, AiFillPhone } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { MdNumbers } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Reservation from './reservations'

function Dashboard() {
  const { user } = useAuth();
  const [donationData, setDonationData] = useState([]);
  const [reservationOpen, setReservationOpen] = useState(false)
  const navigate = useNavigate();


  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', options);
  };

  const toggleDonate = (e) => {
    setReservationOpen(e)
}

  useEffect(() => {
    const getData = async (url) => {
      await axios
        .get(
          url
        )
        .then((res) => {
          if (res.data.length) {
            setDonationData(res.data);
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (user) {
      var url;
      if (user.isOrganization){
         url = `http://localhost:5000/donations/${user?._id}`
      }
      else{
         url = `http://localhost:5000/donations/${user?.pincode}/${user?._id}`
      }
      getData(url);
    }
  }, [user]);

  const handleReserve = async (Creator_id, Donation_id) => {
    await axios
        .post(
          `http://localhost:5000/createbooking/${Creator_id}/${Donation_id}`
        )
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const handleDelete = async ( Donation_id) => {
    console.log("here")
    await axios
        .delete(
          `http://localhost:5000/donation/${Donation_id}`
        )
        .then(async () => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div
      className={styles.mainDiv}
      style={{
        display: "flex",
        flexWrap: "wrap",
        height: "Calc(100vh - 69px)",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          width: "100%",
          margin: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gridGap: "20px",
          alignContent: "flex-start",
        }}
      >
        {donationData.map((item, index) => {
          return (
            new Date(item.TimeRange[1]) > new Date() && 
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "15px",
                color: "#fff",
                borderRadius: "4px",
                backgroundColor: "#191a1d",
                border: "solid 1px #2D2E33",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3px",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item.Donation}
                </div>
                
                {user?.isOrganization && item.Donator_id === user._id ? <div style={{display:"flex"}}>
                <button style={{ fontSize: "12px", marginRight:"5px"}} onClick={() => {setReservationOpen(true)}}>
                    Reservations
                </button>
                <button style={{ fontSize: "12px" }} onClick={() => {handleDelete(item._id)}}>
                    Delete
                  </button></div>:
                (!item.isReserved ? (
                  <button style={{ fontSize: "12px" }} onClick={() => {handleReserve(user._id,item._id)}}>
                    Reserve
                  </button>
                ) : <div style={{color:"#00A783", fontSize:"12px"}}>Reserved</div>
                )}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "10px",
                  marginLeft: "2px",
                }}
              >
                by {item.Name}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AiFillHome
                    color="#FFC940"
                    style={{
                      size: "16px",
                      marginRight: "10px",
                      opacity: "0.7",
                    }}
                  />
                </span>
                {item.Address}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FiMapPin
                    color="#3498db"
                    style={{ size: "16px", marginRight: "10px" }}
                  />
                </span>
                {item.Pincode}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AiFillPhone
                    color="#C15959"
                    style={{ size: "16px", marginRight: "10px" }}
                  />
                </span>
                {item.Contact}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdNumbers
                    color="#fff"
                    style={{ size: "16px", marginRight: "10px" }}
                  />
                </span>
                {item.Quantity}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GiSandsOfTime
                    color="#EFA223"
                    style={{ size: "16px", marginRight: "10px" }}
                  />
                </span>
                {formatDateTime(item.TimeRange[0]) + " - " + formatDateTime(item.TimeRange[1])}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "3px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BiTime
                    color="#fff"
                    style={{ size: "16px", marginRight: "10px" }}
                  />
                </span>
                {formatDateTime(item.Date)}
              </div>
            </div>
          );
        })}
      </div>

{ reservationOpen && <div style={{width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.4)", position:"absolute", zIndex:"998", top:"0", left:"0", transition:"all 0.25s ease-in-out", overflow:"none", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Reservation setoptionsOpen={toggleDonate} />
        </div>}

    </div>
  );
}

export default Dashboard;
