const ClothingItem = require("./ClothingItem");
const ClothingStock = require("./ClothingStock");
const Order = require("./Order");
const User = require("./User");
const Color = require("./Color");
const Category = require("./Color");
const Shipping = require("./Color");

ClothingItem.hasMany(Color, {
  foreignKey: "clothing_item_id",
  onDelete: "CASCADE",
});

ClothingItem.hasMany(ClothingStock, {
  foreignKey: "item_id",
  onDelete: "CASCADE",
});

Color.belongsTo(ClothingItem, {
  foreignKey: "clothing_item_id",
});

Color.hasOne(ClothingStock, {
  foreignKey: "color_id",
  onDelete: "CASCADE",
});

ClothingStock.belongsTo(Color, {
  foreignKey: "color_id",
});

ClothingStock.belongsTo(ClothingItem, {
  foreignKey: "item_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Order, {
  foreignKey: "user_id",
});

Order.hasOne(Shipping, {
  foreignKey: "shipping_name",
});

ClothingItem.belongsTo(Category, {
  foreignKey: "category_name",
});

module.exports = {
  ClothingItem,
  ClothingStock,
  Color,
  Order,
  User,
  Category,
  Shipping,
};
