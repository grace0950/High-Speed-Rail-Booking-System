let mysql = require("../mysql/mysql");
let crypto = require("crypto");

handle_request = (data, callback) => {
  let response = {
    status: 400,
  };
  try {
    var randomId = crypto.randomBytes(32).toString("base64").substr(0, 8);
    orderQuery =
      "insert into ticket(id, year, month, day, start, destination, train_no, start_hour, start_minute, end_hour, end_minute, username, price) values('" +
      randomId +
      "', " +
      data.year +
      ", " +
      data.month +
      ", " +
      data.day +
      ", '" +
      data.start +
      "', '" +
      data.destination +
      "', " +
      data.train_no +
      ", " +
      data.start_hour +
      ", " +
      data.start_minute +
      ", " +
      data.end_hour +
      ", " +
      data.end_minute +
      ", '" +
      data.username +
      "', " +
      data_price +
      ")";

    mysql.insertData(orderQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        console.log(result.length);
        if (result.length === 1) {
          response.status = 200;
          response.message = "Order Completed";
          response.id = randomId;
          callback(null, response);
        } else {
          response.status = 400;
          response.message = "Order Error";
          callback(null, response);
        }
      }
    });
  } catch (e) {
    console.log(e);
    err = e;
    response.status = 401;
    response.message = "Order Failed";
    callback(err, response);
  }
};

exports.handle_request = handle_request;
