const ClothingItem = require("./ClothingItem");
const ClothingStock = require("./ClothingStock");
const Color = require("./Color");

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

module.exports = { ClothingItem, ClothingStock, Color };
