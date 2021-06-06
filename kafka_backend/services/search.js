let mysql = require("../mysql/mysql");
const delay = require("delay");

handle_request = async (data, callback) => {
  let response = {
    status: 400,
  };
  try {
    console.log("In Search");

    // fetch id of start and destination of search
    let startIdQuery =
      "select id from station where name = '" + data.start + "'";
    let destinationIdQuery =
      "select id from station where name = '" + data.destination + "'";
    let startId;
    let destinationId;

    mysql.fetchData(startIdQuery, async function (err, result) {
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

    await delay(100);

    mysql.fetchData(destinationIdQuery, async function (err, result) {
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
    await delay(100);

    // search train
    var searchQuery = "";
    // Southbound
    if (startId <= destinationId) {
      searchQuery =
        "SELECT year, month, day, start, destination, train_no, hour, minute FROM train WHERE year = " +
        Number(data.year) +
        " AND month = " +
        Number(data.month) +
        " AND day = " +
        Number(data.day) +
        " AND start in ( SELECT name FROM station WHERE id BETWEEN 1 AND " +
        startId +
        ") AND destination in (SELECT name FROM station WHERE id BETWEEN " +
        destinationId +
        " AND 12)";
    } else {
      // Northbound
      searchQuery =
        "SELECT year, month, day, start, destination, train_no, hour, minute FROM train WHERE year = " +
        Number(data.year) +
        " AND month = " +
        Number(data.month) +
        " AND day = " +
        Number(data.day) +
        " AND destination in ( SELECT name FROM station WHERE id BETWEEN 1 AND " +
        destinationId +
        ") AND start in (SELECT name FROM station WHERE id BETWEEN " +
        startId +
        " AND 12)";
    }
    const priceQuery =
      "select price from price_" + startId + " where to_id = " + destinationId;

    mysql.fetchData(searchQuery, async function (err, result) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(result);
        console.log("1: " + result.length);

        if (result.length > 0) {
          response.status = 200;
          response.message = "Search Successful";
          // ticket price
          let _price = 0;
          mysql.fetchData(priceQuery, async function (err, _result) {
            if (err) {
              console.log(err);
              callback(err, null);
            } else {
              if (_result.length === 1) {
                _price = _result[0].price;
              }
            }
          });
          await delay(100);
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

          // record all ticket information
          let index = 0;
          for (index = 0; index < result.length; index++) {
            year.push(result[index].year);
            month.push(result[index].month);
            day.push(result[index].day);
            start.push(result[index].start);
            destination.push(result[index].destination);
            train_no.push(result[index].train_no);
            price.push(_price);

            // calculate time of begin and end
            //// fetch id of start station of train
            let trainStartId;
            let trainStartIdQuery =
              "select id from station where name = '" +
              result[index].start +
              "'";
            mysql.fetchData(trainStartIdQuery, function (err, _result) {
              if (err) {
                console.log(err);
                callback(err);
              } else {
                console.log(_result);
                trainStartId = _result[0].id;
              }
            });
            await delay(100);
            //// fetch duration
            let startTimeQuery =
              "select duration from duration_" +
              trainStartId +
              " where to_id = " +
              startId;
            let endTimeQuery =
              "select duration from duration_" +
              trainStartId +
              " where to_id = " +
              destinationId;
            mysql.fetchData(startTimeQuery, function (err, _result) {
              if (err) {
                console.log(err);
                callback(err);
              } else {
                console.log(_result);
                let _starthour = result[index].hour;
                let _startminute = result[index].minute;
                let min = _startminute + _result[0].duration;
                _startminute = min % 60;
                _starthour += parseInt(min / 60);
                start_hour.push(_starthour);
                start_minute.push(_startminute);
              }
            });
            await delay(100);
            mysql.fetchData(endTimeQuery, function (err, _result) {
              if (err) {
                console.log(err);
                callback(err);
              } else {
                console.log(_result);
                let _endhour = result[index].hour;
                let _endminute = result[index].minute;
                let min = _endminute + _result[0].duration;
                _endminute = min % 60;
                _endhour += parseInt(min / 60);
                _endhour %= 24;
                end_hour.push(_endhour);
                end_minute.push(_endminute);
              }
            });
            await delay(100);
          }
          // end of for loop
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
