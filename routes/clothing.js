const router = require("express").Router();
const { ClothingItem, ClothingStock, Color } = require("../models");

const exampleBody = {
  clothing_id: 1,
  name: "Test Item",
  price: 200,
  description: "This is an update test item",
  color: [
    { color: "purple", id: 1 },
    { color: "orange", id: 2 },
    { color: "black", id: 3 },
  ],
  clothing_stock: [
    { xs: 2, s: 40, m: 22, l: 13, xl: 12, id: 1 },
    { xs: 2, s: 40, m: 22, l: 13, xl: 12, id: 2 },
    { xs: 2, s: 40, m: 22, l: 13, xl: 12, id: 3 },
  ],
  added_color: [{ color: "testing", xs: 2, s: 40, m: 22, l: 13, xl: 12 }],
  deleted_color: [{ color_id: 1, stock_id: 2 }],
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
router.post("/", async (req, res) => {
  console.log(req.body);
  const theClothing = req.body;
  try {
    await ClothingItem.create({
      name: theClothing.name,
      price: theClothing.price,
      description: theClothing.description,
    }).then((clothing) => {
      if (theClothing.color !== undefined || theClothing.color.length != 0) {
        console.log("adding color");
        try {
          theClothing.color.forEach((element) => {
            console.log(element);
            Color.create({
              color: element.color,
              clothing_item_id: clothing.id,
            }).then((newColor) => {
              ClothingStock.create({
                xs: element.xs,
                s: element.s,
                m: element.m,
                l: element.l,
                xl: element.xl,
                color_id: newColor.id,
                item_id: clothing.id,
              });
            });
          });
        } catch (err) {
          console.error(err);
        }
      }
    });

    res.send("Good!");
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Comment /api/clothing/
router.put("/", async (req, res) => {
  console.log(req.body);
  // Handling updating -------------
  const clothUpdate = req.body;
  try {
    await ClothingItem.update(
      {
        name: clothUpdate.name,
        price: clothUpdate.price,
        description: clothUpdate.description,
      },
      {
        where: {
          id: clothUpdate.clothing_id,
        },
      }
    );

    await clothUpdate.color.forEach((element) => {
      console.log(element);
      Color.update(
        {
          color: element.color,
        },
        {
          where: {
            id: element.id,
          },
        }
      ).catch((err) => {
        console.log(err);
      });

      ClothingStock.update(
        {
          xs: element.xs,
          s: element.s,
          m: element.m,
          l: element.l,
          xl: element.xl,
        },
        {
          where: {
            id: element.stock_id,
          },
        }
      ).catch((err) => {
        console.log(err);
      });
    });

    // Handling adding -------------
    if (
      clothUpdate.added_color !== undefined ||
      clothUpdate.added_color.length != 0
    ) {
      console.log("adding color");
      await clothUpdate.added_color.forEach((element) => {
        console.log(element);
        Color.create({
          color: element.color,
          clothing_item_id: clothUpdate.clothing_id,
        }).then((newColor) => {
          ClothingStock.create({
            xs: element.xs,
            s: element.s,
            m: element.m,
            l: element.l,
            xl: element.xl,
            color_id: newColor.id,
            item_id: clothUpdate.clothing_id,
          });
        });
      });
    }

    // Handling deleting -------------
    if (
      clothUpdate.deleted_color !== undefined ||
      clothUpdate.deleted_color.length != 0
    ) {
      console.log("deleting Color");
      await clothUpdate.deleted_color.forEach((element) => {
        console.log(element);
        Color.destroy({
          where: {
            id: element.color_id,
          },
        });
        ClothingStock.destroy({
          where: {
            item_id: element.stock_id,
          },
        });
      });
    }
    res.sendStatus(200);
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
