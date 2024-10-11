const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Date_of_birth: {
    type: Date,
    required: false, // Use false if you want this field to be optional
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: false, // Make this optional
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: false, // Make this optional if needed
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: false, // Make this optional
  },
  city: {
    type: String,
    required: false, // Make this optional
  },
  country: {
    type: String,
    required: false, // Make this optional
  },
  zip_code: {
    type: Number,
    required: false, // Make this optional
  },
  phone_country_code: {
    type: Number,
    required: false, // Make this optional
  },
  orders: {
    type: Array,
    required: false, // Make this optional
  },
  role: {
    type: String,
    default: "user",
  },
  mimetype: {
    type: String,
    required: false, // Make this optional
  },
  image_name: {
    type: String,
    required: false, // Make this optional
  },
});

module.exports = mongoose.model("User", UserSchema);
