const express = require("express");
const {
  getAllRoutes,
  createRoute,
  getRoute,
  deleteRoute,
  updateRoute,
} = require("../controllers/routesController");
const { restrictTo, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin"), getAllRoutes)
  .post(protect, restrictTo("admin"), createRoute);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getRoute)
  .delete(protect, restrictTo("admin"), deleteRoute)
  .patch(protect, restrictTo("admin"), updateRoute);

module.exports = router;
