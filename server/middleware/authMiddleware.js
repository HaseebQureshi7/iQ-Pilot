const AppError = require("../util/AppError");
const catchAsync = require("../util/catchAsync.js");
const { promisify } = require("util");

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById({ _id: decoded.id });

  if (!currentUser) {
    return next(
      new AppError(
        `The user belonging to this token does no longer exist.`,
        401
      )
    );
  }
  req.user = currentUser;
  next();
});
