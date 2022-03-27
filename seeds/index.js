const sequelize = require("../config/connection");
const { ClothingItem, ClothingStock, Color } = require("../models");
const { Order, User } = require("../models");
const { clothingData, colorData, stockData } = require("./seedData");
const { userData, orderData } = require("./seedData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await ClothingItem.bulkCreate(clothingData);
  await Color.bulkCreate(colorData);
  await ClothingStock.bulkCreate(stockData);
  await User.bulkCreate(userData);
  await Order.bulkCreate(orderData);

  process.exit(0);
};

seedAll();
