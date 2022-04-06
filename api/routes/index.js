const router = require("express").Router();
const userRoutes = require("./users.js");
const clothingRoutes = require("./clothing.js");
const orderRoutes = require("./orders.js");
const categoryRoutes = require("./category.js");

router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/category", categoryRoutes);
router.use("/clothing", clothingRoutes);

module.exports = router;
