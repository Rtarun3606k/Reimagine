const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false, // Optional field
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: false, // Optional field
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false, // Optional field
    },
    address: {
      address: {
        type: String,
        required: false, // Optional field
      },
      city: {
        type: String,
        required: false, // Optional field
      },
      country: {
        type: String,
        required: false, // Optional field
      },
      zipCode: {
        type: Number,
        required: false, // Optional field
      },
    },
    phoneCountryCode: {
      type: Number,
      required: false, // Optional field
    },
    orders: {
      type: [mongoose.Schema.Types.Mixed],
      required: false, // Optional field
    },
    cart: {
      type: [mongoose.Schema.Types.Mixed],
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    mimetype: {
      type: String,
      required: false, // Optional field
    },
    imageName: {
      type: String,
      required: false, // Optional field
    },
  },
  { timestamps: true }
); // Automatically manage created_at and updated_at

module.exports = mongoose.model("User", UserSchema);
