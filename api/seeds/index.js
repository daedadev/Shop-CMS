const sequelize = require("../config/connection");
const { ClothingItem, ClothingStock, Color } = require("../models");
const { Order, User, Category, Shipping } = require("../models");
const { categoryData } = require("./categoryData");
const { colorData } = require("./colorData");
const { orderData } = require("./orderData");
const { shippingData } = require("./shippingData");
const { stockData } = require("./stockData");
const { userData } = require("./userData");
const { clothingData } = require("./clothingData");

async function seedAll() {
  try {
    await sequelize.sync({ force: true });

    await Category.bulkCreate(categoryData);
    await ClothingItem.bulkCreate(clothingData);
    await Color.bulkCreate(colorData);
    await ClothingStock.bulkCreate(stockData);
    await User.bulkCreate(userData);
    await Shipping.bulkCreate(shippingData);
    await Order.bulkCreate(orderData);
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
}

seedAll();
