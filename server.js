const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Promized1",
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

function createDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Whats the name of the Department?",
      },
    ])
    .then(function (response) {
      db.query(
        "INSERT INTO department (name) VALUES(?)",
        [response.department],
        function (err) {
          viewDepartments();
        }
      );
    });
}
function createRole() {
  db.query("select name, id as value from department", function (err, data) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "Whats the name of the Role?",
          type: "input",
          name: "salary",
          message: "What is their salary?",
        },
        {
          type: "list",
          name: "department",
          message: "Which Department does this role belong to?",
        },
      ])
      .then(function (response) {
        db.query(
          "INSERT INTO role (title,salary,department id) VALUES (?,?,?)",
          [response.role, response.salary, response.department],
          function (err) {
            viewRoles();
          }
        );
      });
  });
}
function createEmployee() {
  db.query("select title as name,id as value from role", function (err, data) {
    db.query(
      "select concat(first_name,' ',last_name) as name, id as value from employee",
      function (err, employeeData) {
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employees first name?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is their last name?",
            },
            {
              type: "list",
              name: "role",
              choices: data,
              message: "What does this employee do?",
            },
            {
              type: "list",
              name: "manager",
              choices: employeeData,
              message: "Who does this person report to?",
            },
          ])
          .then(function (response) {
            db.query(
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
              [
                response.first_name,
                response.last_name,
                response.role,
                response.manager,
              ],
              function (err) {
                viewEmployees();
              }
            );
          });
      }
    );
  });
}
