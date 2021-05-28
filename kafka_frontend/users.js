let express = require("express");
const passport = require("passport");
let router = express();
require("./passport")(passport);
var kafka = require("./kafka/client");
// bodyParser
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

const cors = require("cors");
router.use(cors());

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
      res.status(response.status).send({ message: response.message });
      // req.session.previousTime = new Date().getTime();
      // req.session.pageTime = [];
      // req.session.pages = [];
      // req.session.lastPage = "UserHome";
      // req.session.flag = true;
      // req.session.username = response.account;
      // console.log("session initialized. :" + req.session.account);
      // res.status(response.status).send(req.session.account);
    } else if (response.status === 400) {
      res.status(response.status).send({ message: response.message });
    } else {
      res.status(401).send({ message: "Login Failed" });
    }
  })(req, res);
});

router.listen(3000);

module.exports = router;
