const ClothingItem = require("./ClothingItem");
const ClothingStock = require("./ClothingStock");
const Order = require("./Order");
const User = require("./User");
const Color = require("./Color");
const Category = require("./Category");
const Shipping = require("./Shipping");

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

Order.belongsTo(Shipping, {
  foreignKey: "shipping_id",
});

Shipping.hasMany(Order, {
  foreignKey: "shipping_id",
});

ClothingItem.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(ClothingItem, {
  foreignKey: "category_id",
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
