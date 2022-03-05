const router = require("express").Router();
const userRoutes = require("./users.js");
const commentRoutes = require("./comments.js");
const postRoutes = require("./posts.js");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
