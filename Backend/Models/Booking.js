const mongoose = require('mongoose');

// Create a schema for the Booking entity
const bookingSchema = new mongoose.Schema({
  Creator_id: {
    type: String,
    required: true,
  },
  Donation_id: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

// Create a model for the Booking entity using the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
