const { User, Order, Shipping } = require("../models/");

const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Order,
          include: {
            model: Shipping,
          },
        },
      ],
    });
    const userList = await users.map((user) => user.get({ plain: true }));
    res.send(userList);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const getUserId = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: Order,
      },
    });
    const userList = await users.map((user) => user.get({ plain: true }));
    res.send(userList);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then((newUser) => {
        res.json({ user: newUser, message: "okay" });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end;
      res.send("okay");
    });
  } else {
    console.error(err);
    res.status(404).end();
  }
};

module.exports = { getUser, getUserId, createUser, logoutUser };
