const router = require("express").Router();
const { User, Order } = require("../models/");

// Get all posts api/order/
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: User,
      },
    });
    const orderList = await orders.map((item) => item.get({ plain: true }));
    res.send(orderList);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
      },
    });
    const theOrder = await orders.map((item) => item.get({ plain: true }));
    res.send(theOrder);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Create new post api/order/
router.post("/", async (req, res) => {
  const theOrder = req.body;
  try {
    const newOrder = Order.create({
      name: theOrder.name,
      price: theOrder.price,
      size: theOrder.size,
      shipping_type: theOrder.shipping_type,
      Address: theOrder.Address,
      order_number: theOrder.order_number,
      order_status: theOrder.order_status,
      user_id: theOrder.user_id,
    });
    res.send(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post route /api/order/
router.put("/", async (req, res) => {
  const theOrder = req.body;
  try {
    Order.update(
      {
        name: theOrder.name,
        price: theOrder.price,
        size: theOrder.size,
        shipping_type: theOrder.shipping_type,
        Address: theOrder.Address,
        order_number: theOrder.order_number,
        order_status: theOrder.order_status,
        user_id: theOrder.user_id,
      },
      {
        where: {
          id: theOrder.order_id,
        },
      }
    );
    res.send(theOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post route /api/order/status
router.put("/status", async (req, res) => {
  const theOrder = req.body;
  try {
    Order.update(
      {
        order_status: theOrder.order_status,
      },
      {
        where: {
          id: theOrder.order_id,
        },
      }
    );
    res.send(theOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Post /api/order/id
router.delete("/:id", async (req, res) => {
  try {
    Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Successfully Deleted Order");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
