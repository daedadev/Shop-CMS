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
    clothing_item_id: {
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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "color",
  }
);

module.exports = Color;
