const { User, Order, Shipping } = require("../models/");

const getOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Shipping,
        },
      ],
    });
    const orderList = await orders.map((item) => item.get({ plain: true }));
    res.send(orderList);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const getOrderId = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
        },
        {
          model: Shipping,
        },
      ],
    });
    const theOrder = await orders.map((item) => item.get({ plain: true }));
    res.send(theOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const createOrder = async (req, res) => {
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
      updatedAt: theOrder.updatedAt,
    });
    res.send(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateOrder = async (req, res) => {
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
        updatedAt: theOrder.updatedAt,
      },
      {
        where: {
          id: theOrder.order_id,
        },
      }
    );
    res.send(theOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const updateOrderStatus = async (req, res) => {
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
    console.error(err);
    res.status(400).json(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    Order.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Successfully Deleted Order");
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

module.exports = {
  getOrder,
  getOrderId,
  updateOrder,
  updateOrderStatus,
  createOrder,
  deleteOrder,
};
