const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
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
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
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
const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = User;
