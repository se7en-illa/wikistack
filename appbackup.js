const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const notfound = require("./views/notfound");
const serverError = require("./views/servererror");

const app = express();
app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));
app.use(methodOverride("_method"));

app.get("/", (req, res, next) => {
  try {
    res.redirect("/wiki");
  } catch (error) {
    next(error);
  }
});

// 404 Error
app.use((req, res, next) => {
  res.status(404).send(notfound());
});

// 500 Error
app.use((err, req, res, next) => {
  res.status(500).send(serverError());
});

db.authenticate().then(() => {
  console.log("connected to the fucking database");
});

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });
  await Page.sync({ force: true });
  await User.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`The fucking server is listening on port ${PORT}!`);
    console.log("if depression were a language it would be sql");
  });
};

init();
