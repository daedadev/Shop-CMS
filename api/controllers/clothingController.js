const { ClothingItem, ClothingStock, Color } = require("../models");

const getClothing = async (req, res) => {
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
    console.error(err);
    res.status(400).json(err);
  }
};

const updateClothing = async (req, res) => {
  console.log(req.body);
  // Handling updating -------------
  const clothUpdate = req.body;
  try {
    await ClothingItem.update(
      {
        name: clothUpdate.name,
        price: clothUpdate.price,
        description: clothUpdate.description,
        category_id: clothUpdate.category_id,
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
        console.error(err);
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
        console.error(err);
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
    console.error(err);
    res.status(400).json(err);
  }
};

const addClothing = async (req, res) => {
  console.log(req.body);
  const theClothing = req.body;
  try {
    await ClothingItem.create({
      name: theClothing.name,
      price: theClothing.price,
      description: theClothing.description,
      category_id: theClothing.category_id,
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
    console.error(err);
    res.status(400).json(err);
  }
};

const deleteClothing = async (req, res) => {
  try {
    await ClothingItem.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

module.exports = { getClothing, updateClothing, addClothing, deleteClothing };
