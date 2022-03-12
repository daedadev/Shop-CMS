const router = require("express").Router();
const { ClothingItem, ClothingStock, Color } = require("../models");

const exampleBody = {
  name: "Should be final clothing",
  price: 2400,
  description: "This is a test item",
  color: "Vermillion",
  xs: 2,
  s: 40,
  m: 22,
  l: 13,
  xl: 12,
};

// Find all comments api/clothing/
router.get("/", async (req, res) => {
  try {
    const clothing = await ClothingItem.findAll({
      include: {
        model: Color,
        include: {
          model: ClothingStock,
        },
      },
    });
    const clothingList = await clothing.map((cloth) =>
      cloth.get({ plain: true })
    );
    res.send(clothingList);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create Comment /api/clothing/create
router.post("/create", async (req, res) => {
  console.log(req.body);
  const theClothing = req.body;
  try {
    const newClothing = await ClothingItem.create({
      name: theClothing.name,
      price: theClothing.price,
      description: theClothing.description,
    });

    const newColor = await Color.create({
      color: theClothing.color,
      clothing_item_id: newClothing.id,
    });

    await ClothingStock.create({
      xs: theClothing.xs,
      s: theClothing.s,
      m: theClothing.m,
      l: theClothing.l,
      xl: theClothing.xl,
      color_id: newColor.id,
      item_id: newClothing.id,
    });

    res.send(newClothing);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Comment /api/clothing/put
router.put("/put", async (req, res) => {
  console.log(req.body);
  const clothUpdate = req.body;
  try {
    Comment.update(
      {
        title: theComment.title,
        content: theComment.content,
      },
      {
        where: {
          id: theComment.post_id,
        },
      }
    );
    res.send(theComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Comment /api/clothing/delete/id
router.delete("/delete/:id", async (req, res) => {
  try {
    await ClothingItem.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Successfully deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
