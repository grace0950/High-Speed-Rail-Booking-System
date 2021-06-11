let mysql = require("../mysql/mysql");
//let bcrypt = require("bcrypt");

handle_request = (data, callback) => {
  let response = {
    status: 400,
  };

  try {
    console.log("In Login");
    let sqlQuery =
      "select password, Name from user where username = '" +
      data.username +
      "'";
    mysql.fetchData(sqlQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(result);
        console.log("1: " + result.length);

        if (result.length === 1) {
          console.log("Password: " + data.password);
          console.log("User Password: " + result[0].password);
          //console.log(bcrypt.compareSync(data.password, result[0].password));

          if (data.password == result[0].password) {
            response.status = 200;
            response.username = data.username;
            response.name = result[0].Name;
            response.message = "User Login Credentials are correct";
          } else {
            response.message = "Password is incorrect. Please try again";
            response.status = 401;
          }
          callback(null, response);
        } else {
          response.status = 400;
          response.message = "Username does not exist. Please sign up";
          callback(null, response);
        }
      }
    });
  } catch (e) {
    console.log(e);
    callback(e, response);
  }
};

exports.handle_request = handle_request;
