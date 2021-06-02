let mysql = require("../mysql/mysql");

handle_request = (data, callback) => {
  let response = {
    status: 400,
  };
  try {
    let startIdQuery =
      "select id from station where name = '" + data.start + "'";
    let destinationIdQuery =
      "select id from station where name = '" + data.destination + "'";
    let startId;
    let destinationId;

    console.log("In Search");
    console.log("SQL Query :" + startIdQuery);
    console.log("SQL Query :" + destinationIdQuery);

    mysql.fetchData(startIdQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        if (result.length === 1) {
          startId = result[0].id;
        } else {
          response.status = 401;
          response.message = "Station doesn't exist";
        }
      }
    });

    mysql.fetchData(destinationIdQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        if (result.length === 1) {
          destinationId = result[0].id;
        } else {
          response.status = 401;
          response.message = "Station doesn't exist";
        }
      }
    });

    let searchQuery =
      "SELECT year, month, day, start, destination, train_no FROM train WHERE year = " +
      data.year +
      " AND month = " +
      data.month +
      " AND day = " +
      data.day +
      " AND start in ( SELECT name FROM station WHERE id BETWEEN 1 AND " +
      startId +
      ") AND destination in (SELECT name FROM station WHERE id BETWEEN " +
      destinationId +
      " AND 6)";

    mysql.fetchData(searchQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(result);
        console.log("1: " + result.length);

        if (result.length > 0) {
          response.status = 200;
          response.message = "Search Successful";
          var year = [];
          var month = [];
          var day = [];
          var start = [];
          var destination = [];
          var train_no = [];
          let index = 0;
          for (index = 0; index < result.length; index++) {
            year.push(result[index].year);
            month.push(result[index].month);
            day.push(result[index].day);
            start.push(result[index].start);
            destination.push(result[index].destination);
            train_no.push(result[index].train_no);
          }
          response.year = year;
          response.month = month;
          response.day = day;
          response.start = start;
          response.destination = destination;
          response.train_no = train_no;

          callback(null, response);
        } else {
          response.status = 400;
          response.message = "Failed to Search";
          callback(null, response);
        }
      }
    });
  } catch (e) {
    console.log(e);
    err = e;
    response.status = 401;
    response.message = "Search Failed";
    callback(err, response);
  }
};

exports.handle_request = handle_request;
