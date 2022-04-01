const sequelize = require("../config/connection");
const { ClothingItem, ClothingStock, Color } = require("../models");
const { Order, User, Category, Shipping } = require("../models");
const { clothingData, colorData, stockData } = require("./seedData");
const { userData, categoryData } = require("./seedData");
const { orderData, shippingData } = require("./seedData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(categoryData);
  await ClothingItem.bulkCreate(clothingData);
  await Color.bulkCreate(colorData);
  await ClothingStock.bulkCreate(stockData);
  await User.bulkCreate(userData);
  await Shipping.bulkCreate(shippingData);
  await Order.bulkCreate(orderData);

  await process.exit(0);
};

seedAll();
