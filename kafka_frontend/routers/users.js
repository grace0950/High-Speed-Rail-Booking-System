let express = require("express");
const passport = require("passport");
let router = express.Router();
require("./passport")(passport);
var kafka = require("../kafka/client");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/test", function (req, res, next) {
  res.send("This is a test!");
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
      res.status(response.status).send({ message: response.message });
    } else if (response.status === 400) {
      res.status(response.status).send({ message: response.message });
    } else {
      res.status(401).send({ message: "Login Failed" });
    }
  })(req, res);
});

module.exports = router;
