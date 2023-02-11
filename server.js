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

db.connect(function () {
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select a choice.",
        name: "choice",
        choices: [
          "View Departments.",
          "View Roles.",
          "View Employees.",
          "Create Department.",
          "Create Role.",
          "Create Employee.",
        ],
      },
    ])
    .then((response) => {
      if (response.choice === "View Departments.") {
        viewDepartments();
      } else if (response.choice === "View Roles.") {
        viewRoles();
      } else if (response.choice === "View Employees.") {
        viewEmployees();
      } else if (response.choice === "Create Department.") {
        createDepartment();
      } else if (response.choice === "Create Role") {
        createRole();
      } else if (response.choice === "Create Employee") {
        createEmployee();
      }
    });
}
function viewDepartments() {
  db.query("select * from department", function (err, data) {
    printTable(data);
    mainMenu();
  });
}
function viewRoles() {
  db.query("select * from role", function (err, data) {
    printTable(data);
    mainMenu();
  });
}
function viewEmployees() {
  db.query("select * from employee", function (err, data) {
    printTable(data);
    mainMenu();
  });
}
