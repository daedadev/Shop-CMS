const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ClothingStock extends Model {}

ClothingStock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    xs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    s: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    m: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    l: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    xl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "color",
        key: "id",
      },
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "clothing_item",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "clothing_stock",
  }
);

module.exports = ClothingStock;
