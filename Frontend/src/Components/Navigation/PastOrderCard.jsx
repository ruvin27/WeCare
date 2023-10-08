import React from 'react'

function PastOrderCard({itemName,quantity,fromDate,toDate, num}) {
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <div className="past-order-card" style={{background:"#212225", margin:"0px", borderBottom:"solid 1px #2d2e33", display: "flex", padding:"10px 10px", borderTop:num === 0? "solid 1px #2d2e33": "none"}}>
    <div className="order-details" style={{textAlign: "left"}}>
      <div style={{color:"rgba(255,255,255,0.9)", fontSize:"14px", marginBottom:"5px"}}>Item Name: {itemName}</div>
      <div style={{color:"rgba(255,255,255,0.6)", fontSize:"12px", marginBottom:"3px"}}>Quantity: {quantity}</div>
      <div style={{color:"rgba(255,255,255,0.6)", fontSize:"12px", marginBottom:"3px"}}>Available From: {formatDateTime(fromDate)}</div>
      <div style={{color:"rgba(255,255,255,0.6)", fontSize:"12px", marginBottom:"3px"}}>Available To: {formatDateTime(toDate)}</div>
    </div>
  </div>
  )
}

export default PastOrderCard
