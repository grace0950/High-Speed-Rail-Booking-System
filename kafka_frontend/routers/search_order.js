const { response } = require("express");
let express = require("express");
const passport = require("passport");
let router = express.Router();
require("./passport")(passport);
var kafka = require("../kafka/client");

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/search", function (req, res) {
    console.log(req.body);
    try {
      kafka.make_request("search_topic", req.body, function (err, results) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (results.status === 200) {
            res.status(results.status).send({
              message: results.message,
              year: results.year,
              month: results.month,
              day: results.day,
              start: results.start,
              destination: results.destination,
              train_no: results.train_no,
              price: results.price,
              start_hour: results.start_hour,
              start_minute: results.start_minute,
              end_hour: results.end_hour,
              end_minute: results.end_minute,
            });
          } else if (results.status == 401) {
            res.status(results.status).send({ message: results.message });
          } else if (results.status === 400) {
            res.status(results.status).send({ message: results.message });
          }
        }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Search Failed" });
    }
});

router.post("/order", function(req, res){
    console.log(req.body);
    try {
      kafka.make_request("order_topic", req.body, function (err, results) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (results.status === 200) {
            res.status(results.status).send({
              message: results.message,
              id: results.id
            });
          } else if (results.status == 401) {
            res.status(results.status).send({ message: results.message });
          } else if (results.status === 400) {
            res.status(results.status).send({ message: results.message });
          }
        }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Search Failed" });
    }
});

router.post("/searchOrder", function(req, res){
    console.log(req.body);
    try {
      kafka.make_request("searchOrder_topic", req.body, function (err, results) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (results.status === 200) {
            res.status(results.status).send({
              message: results.message,
              id: results.id,
              year: results.year,
              month: results.month,
              day: results.day,
              start: results.start,
              destination: results.destination,
              train_no: results.train_no,
              price: results.price,
              start_hour: results.start_hour,
              start_minute: results.start_minute,
              end_hour: results.end_hour,
              end_minute: results.end_minute
            });
          } else if (results.status == 401) {
            res.status(results.status).send({ message: results.message });
          } else if (results.status === 400) {
            res.status(results.status).send({ message: results.message });
          }
        }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Search Failed" });
    }
});

module.exports = router;