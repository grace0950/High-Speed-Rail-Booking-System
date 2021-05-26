let express = require("express");
const passport = require("passport");
let router = express.Router();
require("./passport")(passport);
var kafka = require("./kafka/client");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// when receive login msg
// payload = {    account: account,    password: password }
router.post("/login", function (req, res) {
  console.log(req.body);
  passport.authenticate("login", function (err, response) {
    console.log("response:");
    console.log(response);
    if (err) {
      console.log(err);
      res.status(400).send();
    }
    if (response.status === 200) {
      req.session.previousTime = new Date().getTime();
      req.session.pageTime = [];
      req.session.pages = [];
      req.session.lastPage = "UserHome";
      req.session.flag = true;
      req.session.username = response.account;
      console.log("session initialized. :" + req.session.account);
      res.status(response.status).send(req.session.account);
    } else if (response.status === 201) {
      req.session.username = response.account;
      console.log("session initialized for admin. : ");
      console.log(req.session.account);
      res.status(response.status).send(req.session.account);
    } else if (response.status === 400) {
      res.status(response.status).send({ message: response.message });
    } else {
      res.status(401).send({ message: "Login Failed" });
    }
  })(req, res);
});
