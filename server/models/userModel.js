const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee", "driver"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    pickUp: {
      type: [Number],
      required: true,
    },
    cabDetails: [
      {
        driver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        cabNumber: {
          type: String,
        },
        seatingCapacity: {
          type: Number,
        },
        numberPlate: {
          type: String,
        },
        model: {
          type: String,
        },
        color: {
          type: String,
        },
      },
    ],
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userModel);

module.exports = User;
