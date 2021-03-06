const { response } = require("express");
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
// payload = {    username: account,    password: password }
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
      // correct
      res
        .status(response.status)
        .send({
          message: response.message,
          username: response.username,
          name: response.name,
        });
    } else if (response.status === 400) {
      // username does not exist
      res.status(response.status).send({ message: response.message });
    } else {
      // pwd incorrect
      res.status(401).send({ message: "Login Failed" });
    }
  })(req, res);
});

router.post("/signup", function (req, res, next) {
  try {
    console.log(req.body);
    kafka.make_request("signup_topic", req.body, function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log(err);
        throw err;
      } else {
        if (results.status === 200) {
          console.log("Received username: " + results.username);
          console.log("Local username: " + req.body.username);
          res.status(results.status).send({ message: "Signup Successful" });
        } else if (results.status === 401) {
          res.status(results.status).send({ message: "User already Exist" });
        } else if (results.status === 400) {
          res.status(results.status).send({ message: "Signup Failed" });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Signup Failed" });
  }
});

module.exports = router;
