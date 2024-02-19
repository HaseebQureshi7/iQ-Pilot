const express = require("express");
const { getAllRoutes, createRoute, getRoute, deleteRoute, updateRoute } = require("../controllers/routesController");


const router = express.Router();

router.route('/').get(getAllRoutes).post(createRoute);

router.route("/:id").get(getRoute).delete(deleteRoute).patch(updateRoute)


module.exports = router;