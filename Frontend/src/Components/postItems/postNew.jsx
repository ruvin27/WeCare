import React from "react";
import styles from "./postNew.module.css";

function postNew({ closeModal }) {


  return (
    <div
      className={styles.postNew}
      style={{
        position: "absolute",
        zIndex: "999",
        width: "100%",
        height: "100%",
        display: "flex",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#1c1c24",
        opacity: "0.7"
      }}
    >
      <div style={{display: "flex"}}>
      <button onClick={() => closeModal(false)} style={{padding:"9px 14px", margin:"0 10px", backgroundColor:"#ed0524", outline:"none", border:"none", color:"#fff", fontSize:"12px" }} >X </button>
      </div>

      <div style={{display:"flex", flexDirection: "column",justifyContent:"center", alignItems: "center"}}>
        <h1 className="donatioName" style={{ display: "flex" }}>
          Post New Donation
        </h1>
      
      <form
        className="formNewPost"
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >

        <div className={styles.inputrow}>
          <label for="itemName">Item Name</label>
          <input
            className={styles.input}
            type="text"
            id="itemName"
            placeholder="Item Name"
            required
          />
        </div>
        <div className={styles.inputrow}>
          <label for="quantity">Quantity</label>
          <input type="number" id="quantity" placeholder="Quantity" required />
        </div>
        <div className={styles.inputrow}>
          <label for="fromTime">From Time</label>
          <input type="datetime-local" id="fromTime" required />
        </div>
        <div className={styles.inputrow}>
          <label for="toTime">To Time</label>
          <input type="datetime-local" id="toTime" required />
        </div>        
    
          <button style={{width: "50%" ,padding:"9px 14px", marginLeft:"10px", backgroundColor:"#32a84e", outline:"none", border:"none", color:"#fff", fontSize:"12px"}}  >Submit</button>

          </form>
          
          </div>
      </div>
  );
}

export default postNew;
