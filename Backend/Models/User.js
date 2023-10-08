const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: String,
	name: String,
	email: String,
	address: String,
	pincode: String,
	phoneNumber: String,
	isOrganization: Boolean,
});

module.exports = mongoose.model("User", userSchema);
