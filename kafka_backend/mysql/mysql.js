let fs = require("fs");
let mysql = require("mysql");
let connection;

//Put your mysql configuration settings - user, password, database and port
function getConnection() {
  connection = mysql.createConnection({
    host: "localhost",
    user: "debian-sys-maint",
    password: "WOXIpgDm5Ub48RXC",
    database: "CS_HSR",
  });
  return connection;
}

let pool = mysql.createPool({
  connectionLimit: 10,
    host: "localhost",
    user: "debian-sys-maint",
    password: "WOXIpgDm5Ub48RXC",
    database: "CS_HSR",
});

function insertData(callback, sqlQuery) {
  console.log("\nSQL Query:: " + sqlQuery);

  connection = getConnection();

  // pool.getConnection(function (err, connection){
  connection.query(sqlQuery, function (err, result) {
    if (err) {
      console.log("ERROR: " + err.message);
    } else {
      // return err or result
      console.log("DB Results:" + result.affectedRows);
      callback(err, result);
    }
  });
  console.log("\nConnection closed..");
  connection.end();
  // connection.release();
  // });
}

function fetchData(callback, sqlQuery) {
  console.log("\nSQL Query::" + sqlQuery);
  connection = getConnection();

  // pool.getConnection(function (err, connection) {
  connection.query(sqlQuery, function (err, rows) {
    if (err) {
      console.log("ERROR: " + err.message);
    } else {
      // return err or result
      console.log("DB Results:");
      console.log(rows);
      callback(err, rows);
    }
  });
  console.log("\nConnection closed..");
  connection.end();
  // connection.release()
  // });
}

function updateData(callback, sqlQuery) {
  console.log("\nSQL Query:: " + sqlQuery);

  connection = getConnection();

  // pool.getConnection(function (err, connection) {
  connection.query(sqlQuery, function (err, result) {
    if (err) {
      console.log("ERROR: " + err.message);
    } else {
      // return err or result
      console.log("DB Results:" + result.affectedRows);
      callback(err, result);
    }
  });
  console.log("\nConnection closed..");
  connection.end();
  // connection.release()
  // });
}

function deleteData(callback, sqlQuery) {
  console.log("\nSQL Query:: " + sqlQuery);

  connection = getConnection();
  //
  // pool.getConnection(function (err, connection) {
  connection.query(sqlQuery, function (err, result) {
    if (err) {
      console.log("ERROR: " + err.message);
    } else {
      // return err or result
      console.log("DB Results:" + result.affectedRows);
      callback(err, result);
    }
  });
  console.log("\nConnection closed..");
  connection.end();
  // connection.release()
  // });
}

exports.fetchData = fetchData;
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;