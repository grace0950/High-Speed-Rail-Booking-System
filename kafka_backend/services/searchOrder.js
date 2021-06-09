let mysql = require("../mysql/mysql");

handle_request = (data, callback) => {
  let response = {
    status: 400,
  };
  try {
    searchOrderQuery =
      "select id, year, month, day, start, destination, train_no, start_hour, start_minute, end_hour, end_minute, price from ticket where username = '" +
      data.username +
      "'";

    mysql.fetchData(searchOrderQuery, function (err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        console.log(result.length);
        if (result.length > 0) {
          response.status = 200;
          response.message = "Search Order Successful";
          var id = [];
          var year = [];
          var month = [];
          var day = [];
          var start = [];
          var destination = [];
          var train_no = [];
          var price = [];
          var start_hour = [];
          var start_minute = [];
          var end_hour = [];
          var end_minute = [];
          let index = 0;
          for (index = 0; index < result.length; index++) {
            id.push(result[index].id);
            year.push(result[index].year);
            month.push(result[index].month);
            day.push(result[index].day);
            start.push(result[index].start);
            destination.push(result[index].destination);
            train_no.push(result[index].train_no);
            price.push(result[index].price);
            start_hour.push(result[index].start_hour);
            start_minute.push(result[index].start_minute);
            end_hour.push(result[index].end_hour);
            end_minute.push(result[index].end_minute);
          }
          response.id = id;
          response.year = year;
          response.month = month;
          response.day = day;
          response.start = start;
          response.destination = destination;
          response.train_no = train_no;
          response.price = price;
          response.start_hour = start_hour;
          response.start_minute = start_minute;
          response.end_hour = end_hour;
          response.end_minute = end_minute;
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
    response.message = "Search Order Failed";
    callback(err, response);
  }
};

exports.handle_request = handle_request;
