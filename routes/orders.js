const router = require("express").Router();
const { User, Order } = require("../models/");

// Get all posts api/post/
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

// Create new post api/post/
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

// Update post route /api/post/put
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

// Update post route /api/post/put
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

// Delete Post /api/post/delete/id
router.delete("/", async (req, res) => {
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
