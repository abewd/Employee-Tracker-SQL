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
        "Add Role",
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
        case "Add Role":
          addRole();
          break;

        // Creating a function which displays All Departments
        case "View All Roles":
          viewDepartments();
          break;

        // Creating a function which adds a department to the table
        case "Add Role":
          addDepartment();
          break;

        // This will close the inquirer prompt
        case "End":
          connection.end();
          break;
      }
    });
}

function viewEmployee() {
  // console.log("great success");
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
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?"
      ),
        [res.firstName, res.lastName, res.roleId, res.managerId],
        function (err, data) {
          if (err) throw err;
          console.table("Successfully added an employee!");
          questions();
        };
    });
}
