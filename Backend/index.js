const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./Models/User");
const Donation = require("./Models/Donation");
const Booking = require("./Models/Booking");
const MongoUrl = require('./config')

// Middleware
app.use(express.json(),cors({
	origin: '*',
	methods: 'GET,POST,PUT,DELETE', 
	optionsSuccessStatus: 204,
  }));
  
// Connect to MongoDB
mongoose
	.connect(MongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	});

// Routes
app.get("/login/:email", async (req, res) => {
	try {
		const email = req.params.email;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/donations/:pincode/:id", async (req, res) => {
	try {
		const {pincode, id} = req.params;
		var donations = await Donation.find({ Pincode: pincode });
		if (donations.length === 0) {
			return res.status(200).json({ message: "No donations found for the specified pincode" });
		}
        for( i=0; i<donations.length; i++){
            const reservation = await Booking.findOne({ Creator_id: id, Donation_id: donations[i]._id});
            if (reservation){
                donations[i].isReserved = true;
            }
        }
		res.status(200).json(donations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/donations/:id", async (req, res) => {
	try {
		const {id} = req.params;
		var donations = await Donation.find({ Donator_id: id });
		if (donations.length === 0) {
			return res.status(200).json({ message: "No donations found for this Account" });
		}

		res.status(200).json(donations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/donation/:id", async (req, res) => {
	try {
		const {id} = req.params;
		var donation = await Donation.findOne({ _id: id });
		console.log(donation)
		res.status(200).json(donation);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/reservations/:id", async (req, res) => {
	try {
		const {id} = req.params;
		var reservations = await Booking.find({ Creator_id: id });
		if (reservations.length === 0) {
			return res.status(200).json({ message: "No donations found for this Account" });
		}
		const objectList = [];

		for( let i=0; i<reservations.length; i++){
            const donation = await Donation.findOne({  _id: reservations[i].Donation_id});

			const newObj = {
				name: donation.Donation,
				date: reservations[i].Date,
				address: donation.Address
			}
			objectList.push(newObj);

        }
		res.status(200).json(objectList);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/allreservations/:donation_id", async (req, res) => {
	try {
		const {donation_id} = req.params;
		var reservations = await Booking.find({ Donation_id: donation_id });
		if (reservations.length === 0) {
			return res.status(200).json({ message: "No donations found for this Account" });
		}
		const objectList = [];

		for( let i=0; i<reservations.length; i++){
            const reservationUser = await User.findOne({  _id: reservations[i].Creator_id});

			const newObj = {
				name: reservationUser.name,
				date: reservations[i].Date,
				email: reservationUser.email
			}
			objectList.push(newObj);

        }
		res.status(200).json(objectList);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.get("/bookings/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const bookings = await Booking.find({ Creator_id: id });
  
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching bookings." });
    }
  });
  

app.post("/register", async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

app.post("/donate", async (req, res) => {
	try {
		const newDonation = new Donation(req.body);
		const savedDonation = await newDonation.save();
		res.status(201).json(savedDonation);
	} catch (error) {
		res.status(500).json({ error: "An error occurred while creating the donation." });
	}
});

app.post("/createbooking/:Creator_id/:Donation_id", async (req, res) => {
	const { Creator_id, Donation_id} = req.params;
	try {
		const newBooking = new Booking({
			Creator_id, Donation_id
		});
		const savedBooking = await newBooking.save();

		// Update the donation quantity after booking
		const donation = await Donation.findById(Donation_id);

		donation.Quantity = donation.Quantity - 1;
		await donation.save();
		
		res.status(201).json(savedBooking);
	} catch (error) {
		res.status(500).json({ error: "An error occurred while creating the booking." });
	}
});

app.delete("/donation/:id", async (req, res) => {
	try {
	  const { id } = req.params;
		await Donation.findByIdAndRemove(id);
  
	  res.status(200).json({ message: "Donation deleted successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Server error" });
	}
  });
  

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
