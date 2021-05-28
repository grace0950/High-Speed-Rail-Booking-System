let fs = require("fs");
const { connect } = require("http2");
let mysql = require("mysql");
let connection;

//Put your mysql configuration settings - user, password, database and port
let db = {
  host: "localhost",
  user: "debian-sys-maint",
  password: "IEtjRLuVr5Voa94v",
  database: "CS_HSR",
  port: 3306,
  debug: false,
};

// function getConnection() {
//   connection = mysql.createConnection({
//     host: "localhost",
//     user: "debian-sys-maint",
//     password: "IEtjRLuVr5Voa94v",
//     database: "CS_HSR",
//     port: 3306,
//     debug: false,
//   });
//   console.log(connection.state);
//   return connection;
// }

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "debian-sys-maint",
  password: "IEtjRLuVr5Voa94v",
  database: "CS_HSR",
  port: 3306,
});

// connection = mysql.createConnection(db);
// connection.connect(function onConnect(err) {
//   if (err) {
//     console.log("error when connecting to db:", err);
//   } // to avoid a hot loop, and to allow our node script to
//   else {
//     console.log(connection);
//   }
// });

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

const fetchData = (callback, sqlQuery) => {
  console.log("\nSQL Query::" + sqlQuery);
  pool.query(sqlQuery, (err, rows) => {
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
};
//   console.log("\nSQL Query::" + sqlQuery);

//   connection = getConnection();

//   // pool.getConnection(function (err, connection) {
//   connection.query(sqlQuery, (err, rows) => {
//     if (err) {
//       console.log("ERROR: " + err.message);
//     } else {
//       // return err or result
//       console.log("DB Results:");
//       console.log(rows);
//       callback(err, rows);
//     }
//   });
//   console.log("\nConnection closed..");
//   connection.end();
//   //   connection.release();
//   // });
// };

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

module.exports = { fetchData };
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;
