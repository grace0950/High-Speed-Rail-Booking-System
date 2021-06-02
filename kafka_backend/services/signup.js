let mysql = require("../mysql/mysql");

handle_request = (data, callback) => {
  let response = {
    status: 400,
  };
  try {
    let password = data.password;

    let userExist =
      "select password from user where username = '" + data.username + "'";

    let insertUser =
      "insert into user (username, password, Name) values ('" +
      data.username +
      "','" +
      password +
      "','" +
      data.Name +
      "');";

    console.log("signup - SQL Query " + insertUser);

    mysql.fetchData(function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        console.log(result.length);
        if (result.length === 1) {
          response.status = 401;
          response.message = "User Already Exists";
          callback(null, response);
        } else {
          mysql.insertData(function (err, result) {
            if (err) {
              console.log(err);
              callback(err);
            } else {
              console.log(result);
              if (result.affectedRows === 1) {
                response.status = 200;
                response.username = data.username;
                response.message = "Signup Successful";
                callback(null, response);
              } else {
                response.status = 400;
                response.message = "Failed to Signup";
                callback(null, response);
              }
            }
          }, insertUser);
        }
      }
    }, userExist);
  } catch (e) {
    console.log(e);
    err = e;
    response.status = 401;
    response.message = "Signup Failed";
    callback(err, response);
  }
};

exports.handle_request = handle_request;
