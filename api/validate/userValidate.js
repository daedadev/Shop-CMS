const { User, Order, Shipping } = require("../models/");

const userValidate = async (req, res) => {
  console.log(req.body);
  try {
    const userCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userCheck.length === 0) {
      res.status(400).json({ message: "Wrong email or password, try again" });
      return;
    }

    const correctPassword = await userCheck.checkPassword(req.body.password);

    if (!correctPassword) {
      res.status(400).json({ message: "Wrong email or password, try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userCheck.id;
      req.session.logged_in = true;
      console.log("Youre logged in");
      res.json({ user: userCheck, message: "You are logged in!" });
      res.send("okay");
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { userValidate };
