const User = require("../models/userModel");
const { catchAsync } = require("../util/catchAsync");
const jwt = require("jsonwebtoken");

const signingFunc = async (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET);
};

const signUp = catchAsync(async (req, res) => {
  const { name, email, password, address, role, phone } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    phone,
    address,
    role,
  });
  const token = await signingFunc(newUser._id);

  res.status(201).json({
    message: "User Registered",
    newUser,
    token,
  });
});

module.exports = { signUp };
