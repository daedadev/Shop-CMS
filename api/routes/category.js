const { getCategories } = require("../controllers/categoryController");

const router = require("express").Router();

// Delete Post /api/order/id
router.get("/", getCategories);

module.exports = router;
