const {
  getOrder,
  getOrderId,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const router = require("express").Router();

// Get all posts api/order/
router.get("/", getOrder);

router.get("/:id", getOrderId);

// Create new post api/order/
router.post("/", createOrder);

// Update post route /api/order/
router.put("/", updateOrder);

// Update post route /api/order/status
router.put("/status", updateOrderStatus);

// Delete Post /api/order/id
router.delete("/:id", deleteOrder);

module.exports = router;
