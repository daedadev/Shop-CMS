const {
  getCategories,
  getCategoryList,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.get("/", getCategories);

router.get("/list", getCategoryList);

module.exports = router;
