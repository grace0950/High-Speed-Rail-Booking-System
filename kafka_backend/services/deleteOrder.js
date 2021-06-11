let mysql = require("../mysql/mysql");

handle_request = (data, callback) => {
  let response = {
    status: 400,
  };
  try {
    deleteOrderQuery =
      "delete from ticket where id = '" +
      data.id +
      "' and username ='" +
      data.username +
      "'";

    mysql.deleteData(deleteOrderQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        console.log(result.affectedRows);
        if (result.affectedRows === 1) {
          response.status = 200;
          response.message = "Delete Order Successful";
          callback(null, response);
        } else {
          response.status = 400;
          response.message = "No Order";
          callback(null, response);
        }
      }
    });
  } catch (e) {
    console.log(e);
    err = e;
    response.status = 401;
    response.message = "Delete Order Failed";
    callback(err, response);
  }
};

exports.handle_request = handle_request;
