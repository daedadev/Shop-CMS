const { ClothingItem, ClothingStock, Color, Category } = require("../models");

const getCategories = async (req, res) => {
  try {
    const category = await Category.findAll({
      include: {
        model: ClothingItem,
        include: {
          model: Color,
          include: {
            model: ClothingStock,
          },
        },
      },
    });
    const categoryList = await category.map((item) =>
      item.get({ plain: true })
    );
    res.send(categoryList);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const getCategoryList = async (req, res) => {
  try {
    const category = await Category.findAll();
    const categoryList = await category.map((item) =>
      item.get({ plain: true })
    );
    res.send(categoryList);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

module.exports = { getCategories, getCategoryList };
