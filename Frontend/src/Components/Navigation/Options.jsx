import React, { useEffect, useRef, useState } from "react";
import styles from "./navigation.module.css";
import PastOrderCard from "./PastOrderCard";
import { useAuth } from "../../Contexts/AuthContext";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

function Options({ setoptionsOpen }) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [pastOrders, setPastOrders] = useState([]);

	const HandleLogout = () => {
		console.log("Logging out...");
		logout();
		console.log("User logged out.");
		navigate("/login");
	};

	useEffect(() => {
		const getData = async (url) => {
			await axios
				.get(url)
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
			var url;
			if (user.isOrganization) {
				url = `http://localhost:5000/donations/${user?._id}`;
			} else {
				url = `http://localhost:5000/reservations/${user?._id}`;
			}
			getData(url);
		}
	}, [user]);

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', options);
  };

	function useOutsideAlerter(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setoptionsOpen(false);
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
		<div
			className={styles.leftMainDiv}
			ref={wrapperRef}
			style={{
				width: "300px",
				backgroundColor: "#191a1d",
				padding: "0",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				position: "absolute",
				top: "0",
				left: "0",
				zIndex: "999",
				color: "#fff",
			}}>
			{user.isOrganization ? (
				<div style={{ padding: "10px", fontSize: "16px", fontWeight: "600", paddingTop: "10px", backgroundColor: "#2d2e33" }}>Past Donations</div>
			) : (
				<div style={{ padding: "10px", fontSize: "16px", fontWeight: "600", paddingTop: "10px", backgroundColor: "#2d2e33" }}>Past Reservations</div>
			)}
			<div className={styles.cardcontainer} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: "1", overflow: "auto" }}>
				{pastOrders.map((order, index) => {
					if (user.isOrganization) {
						return (
							new Date(order.TimeRange[1]) < new Date() && (
								<PastOrderCard key={index} num={index} itemName={order.Donation} quantity={order.Quantity} fromDate={order.TimeRange[0]} toDate={order.TimeRange[1]} />
							)
						);
					}
					return (
						<div
							className="past-order-card"
							style={{
								background: "#212225",
								margin: "0px",
								borderBottom: "solid 1px #2d2e33",
								display: "flex",
								padding: "10px 10px",
								borderTop: index === 0 ? "solid 1px #2d2e33" : "none",
							}}>
							<div className="order-details" style={{ textAlign: "left" }}>
								<div style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", marginBottom: "5px" }}>Donation Name: {order.name}</div>
								<div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "3px" }}>Date: {formatDateTime(order.date)}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "3px" }}>Address: {order.address}</div>
							</div>
						</div>
					);
				})}
			</div>

			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", alignContent: "flex-end", margin: "0px", borderTop: "solid 1px #2d2e33" }}>
				<button
					style={{
						padding: "12px 0",
						width: "calc(100% - 30px)",
						marginLeft: "10px",
						backgroundColor: "rgba(255,255,255,0.9)",
						outline: "none",
						border: "none",
						color: "#000",
						fontSize: "13px",
						margin: "15px 0",
					}}
					onClick={HandleLogout}>
					Sign Out
				</button>
			</div>
		</div>
	);
}

export default Options;
