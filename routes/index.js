const router = require("express").Router();
const userRoutes = require("./users.js");
const clothingRoutes = require("./clothing.js");
const postRoutes = require("./posts.js");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/clothing", clothingRoutes);

module.exports = router;
