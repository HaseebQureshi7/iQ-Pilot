const User = require("../models/userModel");
const AppError = require("../util/AppError");
const { catchAsync } = require("../util/catchAsync");
const jwt = require("jsonwebtoken");

const signingFunc = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET);
};

const signUp = catchAsync(async (req, res) => {
  const { fName, lName, email, password, address, role, phone } = req.body;
  const newUser = await User.create({
    fName,
    lName,
    email,
    password,
    phone,
    address,
    role,
  });
  const token = signingFunc(newUser._id);

  //   if (newUser.role === "employee") {
  //     const emplyoyee = {
  //       name: newUser.name,
  //       email: newUser.email,
  //       phone: newUser.email,
  //       address: newUser.address,
  //     };

  //     return res.status(201).json({
  //       message: "User Registered",
  //       emplyoyee,
  //       token,
  //     });
  //   }

  res.status(201).json({
    message: "User Registered",
    newUser,
    token,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.checkPassword(password, user.password))) {
    next(new AppError("Incorrect email or password", 401));
  }

  const token = signingFunc(user._id);

  res.status(200).json({
    message: "Logged in successfully",
    user,
    token,
  });
});

module.exports = { signUp, login };
