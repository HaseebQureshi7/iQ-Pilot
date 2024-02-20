const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lName: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      minlength: 10,
      maxlength: 13,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  passwordFromBody,
  passwordInDb
) {
  return await bcrypt.compare(passwordFromBody, passwordInDb);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
