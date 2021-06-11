let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let passport = require("passport");
let expressSessions = require("express-session");

let cors = require("cors");

let users = require("./routers/users");
let search_order = require("./routers/search_order");

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(passport.initialize());

app.use("/users", users);
app.use("/search_order", search_order);

app.use(function (req, res, next) {
  let err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000);

module.exports = app;
