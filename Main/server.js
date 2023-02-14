// npm i mysql2
// npm i express
// npm i inquirer@8.2.4
// npm i

// Import and require mysql2
const mysql = require("mysql2");

// Import and require inquierer version 8.2.4
const inquirer = require("inquirer");

// Import and require express
const express = require("express");

// requir("console.table"); -- do we need this? -- and what does it do?

// Set portal directory
const PORT = process.env.PORT || 3001;

// Allow "app" to link to the express function
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",

    // TODO: Add MySQL password here
    password: "abewd",

    database: "employeesDB",
  },
  console.log(`
  ███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗  
  ██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝  
  █████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░  
  ██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░  
  ███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗  
  ╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝  
  
  ███╗░░░███╗░█████╗░███╗░░██╗░█████╗░░██████╗░███████╗██████╗░
  ████╗░████║██╔══██╗████╗░██║██╔══██╗██╔════╝░██╔════╝██╔══██╗
  ██╔████╔██║███████║██╔██╗██║███████║██║░░██╗░█████╗░░██████╔╝
  ██║╚██╔╝██║██╔══██║██║╚████║██╔══██║██║░░╚██╗██╔══╝░░██╔══██╗
  ██║░╚═╝░██║██║░░██║██║░╚███║██║░░██║╚██████╔╝███████╗██║░░██

  Connected to the Employee Manager Database`)

  // Run the app
);

db.connect(function (err) {
  if (err) console.log(err);
  questions();
});

// These are the questions to ask during the prompt
function questions() {
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Roles",
        "View All Departments",
        "Add Department",
        "End",
      ],
    })

    .then(function ({ task }) {
      switch (task) {
        // Creating a function which displays the employees in the table
        case "View All Employees":
          viewEmployee();
          break;

        // Creating a function which adds an employee to the table
        case "Add Employee":
          addEmployee();
          break;

        // Creating a function edits the role of an employee
        case "Update Employee Role":
          updateEmployeeRole();
          break;

        // Creating a function which displays All Roles
        case "View All Roles":
          viewRoles();
          break;

        // Creating a function which adds a role to the table
        case "Add Roles":
          addRoles();
          break;

        // Creating a function which displays All Departments
        case "View All Departments":
          viewDepartments();
          break;

        // Creating a function which adds a department to the table
        case "Add Department":
          addDepartment();
          break;

        // Add a delete employee

        // Remove department

        // Remove role

        // This will close the inquirer prompt
        case "End":
          connection.end();
          break;
      }
    });
}

function viewEmployee() {
  console.log("A list of all current employees:");
  db.query("SELECT * FROM employees", function (error, results) {
    if (error) throw error;
    console.table(results);
    questions();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
      },

      {
        type: "input",
        name: "lastName",
        message: "What is the employees surname?",
      },

      {
        type: "number",
        name: "roleId",
        message: "What is the employees role_id",
      },

      {
        type: "number",
        name: "managerId",
        message: "What is th eemployees manager_id",
      },
    ])
    .then(function (res) {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", ${res.roleId}, ${res.managerId})`,
        function (err, data) {
          if (err) throw err;
          console.table("Successfully added an employee!");
          questions();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        message:
          "Which employee's role_id would you like to change? Input their employee id",
        type: "input",
        name: "id",
      },

      {
        message: "Enter the new role_id",
        type: "number",
        name: "role_id",
      },
    ])
    .then(function (res) {
      console.log(res.role_id);
      console.log(res.id);

      db.query(
        // `UPDATE employee SET role_id = ${res.role_id} WHERE id = "${res.id}"`,
        `UPDATE employees set role_id = ? where id = ?`,
        [res.role_id, res.id],
        // [res.role_id, res.name],
        function (err, data) {
          // console.table(data);
        }
      );
      questions();
    });
}

function viewRoles() {
  console.log("A list of all current roles:");
  db.query("SELECT * FROM roles", function (error, results) {
    if (error) throw error;
    console.table(results);
    questions();
  });
}

function addRoles() {
  inquirer
    .prompt([
      {
        message: "What is the role position?",
        type: "input",
        name: "title",
      },
      {
        message: "What is the salary for this role?",
        type: "number",
        name: "salary",
      },
      {
        type: "number",
        name: "department_id",
        message: "What is the number for this department? (INT)",
      },
    ])
    .then(function (res) {
      console.log(res.title);
      console.log(res.salary);
      console.log(res.department_id);

      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES ("${res.title}", ${res.salary}, ${res.department_id})`,
        [res.title, res.salary, res.department_id],
        function (err, data) {}
      );
      questions();
    });
}

function viewDepartments() {
  console.log("A list of all current departments:");
  db.query("SELECT * FROM department", function (error, results) {
    if (error) throw error;
    console.table(results);
    questions();
  });
}

function viewRoles() {
  console.log("A list of all current roles:");
  db.query("SELECT * FROM roles", function (error, results) {
    if (error) throw error;
    console.table(results);
    questions();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        message: "What is the name of the department?",
        type: "input",
        name: "name",
      },
    ])
    .then(function (res) {
      console.log(res.name);

      db.query(
        `INSERT INTO department (name) VALUES ("${res.name}")`,
        [res.name],
        function (err, data) {}
      );
      questions();
    });
}

// link employee table to role table
