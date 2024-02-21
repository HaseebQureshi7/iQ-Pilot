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
  .post(createRoute);

router.route("/:id").get(getRoute).delete(deleteRoute).patch(updateRoute);

module.exports = router;
