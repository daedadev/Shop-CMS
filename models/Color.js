const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Color extends Model {}

Color.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clothing_stock_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "clothing_stock",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "color",
  }
);

module.exports = Color;
