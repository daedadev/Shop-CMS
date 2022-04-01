const {
  getClothing,
  deleteClothing,
  updateClothing,
  addClothing,
} = require("../controllers/clothingController");

const router = require("express").Router();

// Find all comments api/clothing/
router.get("/", getClothing);

// Create Comment /api/clothing/create
router.post("/", addClothing);

// Update Comment /api/clothing/
router.put("/", updateClothing);

// Delete Comment /api/clothing/delete/id
router.delete("/delete/:id", deleteClothing);

module.exports = router;
