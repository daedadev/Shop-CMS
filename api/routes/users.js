const {
  getUser,
  getUserId,
  createUser,
  logoutUser,
} = require("../controllers/userController");
const { userValidate } = require("../validate/userValidate");

const router = require("express").Router();

// Get all users api/user/
router.get("/", getUser);

// Get all users api/user/
router.get("/:id", getUserId);

// Login route api/user/login
router.post("/login", userValidate);

// Signup Route
router.post("/signup", createUser);

// Logout route
router.post("/logout", logoutUser);

module.exports = router;
