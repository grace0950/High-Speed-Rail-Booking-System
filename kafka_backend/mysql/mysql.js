let fs = require("fs");
const { connect } = require("http2");
let mysql = require("mysql");
let connection;

//Put your mysql configuration settings - user, password, database and port
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "debian-sys-maint",
  password: "IEtjRLuVr5Voa94v",
  database: "CS_HSR",
  port: 3306,
});

const insertData = (sqlQuery, callback) => {
  console.log("\nSQL Query:: " + sqlQuery);
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("ERROR: " + err.message);
    } else {
      // return err or result
      console.log("DB Results:" + result.affectedRows);
      callback(err, result);
    }
    console.log("\nConnection closed..");
  });
};

const fetchData = (sqlQuery, callback) => {
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
    console.log("\nConnection closed..");
  });
};

const deleteData = (sqlQuery, callback) => {
  console.log("\nSQL Query:: " + sqlQuery);
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("ERROR: " + err.message);
    } else {
      // return err or result
      console.log("DB Results:" + result.affectedRows);
      callback(err, result);
    }
    console.log("\nConnection closed..");
  });
};

module.exports = { fetchData, insertData, deleteData };
