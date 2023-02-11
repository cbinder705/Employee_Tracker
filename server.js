const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "promized1",
    database: "myEmployees_db",
  },
  console.log("database connected successfully..")
);
