const express = require("express");
const path = require("path");
const routes = require("./api/routes/index");
const sequelize = require("./api/config/connection");
const session = require("express-session");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(cors());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.use("/api", routes);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./index.html"));
// });

// app.use(express.static(path.join(__dirname, "../public")));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
