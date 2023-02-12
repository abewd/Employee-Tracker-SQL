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

    database: "movies_db",
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

  Connected to the Employee Manager Database`),

  // Run the app
  questions()
);

function questions() {
  inquirer.prompt({
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
  });
  then(function ({ task }) {
    switch (task) {
      case "View Employees":
        viewEmployee();
        break;

      case "View Employees by Department":
        viewEmployeeByDepartment();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employees":
        removeEmployees();
        break;

      case "Update Employee Role":
        updateEmployeeRole();
        break;

      case "Add Role":
        addRole();
        break;

      // This will close the inquirer prompt
      case "End":
        connection.end();
        break;
    }
  });
}
