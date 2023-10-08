const mongoose = require("mongoose");

// Create a schema for the Donation entity
const donationSchema = new mongoose.Schema({
	Donation: {
		type: String,
		required: true,
	},
	Name: {
		type: String,
		required: true,
	},
	Address: {
		type: String,
		required: true,
	},
	Pincode: {
		type: String,
		required: true,
	},
	Contact: {
		type: String,
		required: true,
	},
	Quantity: {
		type: Number,
		required: true,
	},
	TimeRange: {
		type: [Date], // An array of Date objects for start and end times
		required: true,
		validate: {
			validator: (value) => {
				if (value.length !== 2) {
					return false;
				}
				// Check if both values in the array are valid Date objects
				return value.every((date) => date instanceof Date && !isNaN(date));
			},
			message: "TimeRange should be an array containing two valid Date objects.",
		},
	},
	Date: {
		type: Date,
		required: true,
	},
	Donator_id: {
		type: String,
		required: true,
	},
	isReserved: {
		type: Boolean,
		default: false, // Set the default value to false
	},
});

// Create a model for the Donation entity using the schema
const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
