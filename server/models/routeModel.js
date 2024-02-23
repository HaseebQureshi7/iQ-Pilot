const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    passengers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    shiftTime: {
      type: Number,
      required: true,
    },
    shiftDate: {
      type: String,
      required: true,
    },
    office: {
      type: String,
      required: true
    },
    typeOfRoute: {
      type: String,
      enum: ["pickup", "drop"],
      required: true,
    },
    estimatedTime: {
      type: Number,
    },
    routeStatus: {
      type: String,
      enum: ["notStarted", "inProgress", "completed"],
      default: "notStarted",
    },
    totalDistance: Number,
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
