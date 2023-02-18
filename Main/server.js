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
        "Update Employee Manager",
        "Delete An Employee",
        "View Employee By Manager",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Delete A Role",
        "Add Roles",
        "View All Departments",
        "Delete A Department",
        "Add Department",
        "Total Budget Of A Department",
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

        // Creating a function which updates the employees manager
        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        // View Employees By Manager

        case "View Employee By Manager":
          viewByManager();
          break;

        // Creating a function which deletes employees
        case "Delete An Employee":
          deleteEmployee();
          break;
        // Creating a function which deletes roles
        case "Delete A Role":
          deleteRole();
          break;
        // Creating a function which deletes departments
        case "Delete A Department":
          deleteDepartment();
          break;

        // View the total utilsed budget of a department
        // join employees, roles and department
        case "Total Budget Of A Department":
          departmentBudget();
          break;
        // This will close the inquirer prompt
        case "End":
          connection.end();
          break;
      }
    });
}

// creating a virtusl table called manager so that we dont reuse employee table again for our other join
function viewEmployee() {
  console.log("A list of all current employees:");
  db.query(
    "SELECT company.id, company.first_name ,company.last_name, company.title, company.salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM (SELECT employees.id ,employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, roles_id FROM employees LEFT JOIN roles ON employees.role_id=roles.roles_id) AS company LEFT JOIN employees AS manager ON company.manager_id=manager.id ",
    function (error, results) {
      if (error) throw error;
      console.table(results);
      questions();
    }
  );
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
        `UPDATE employees set role_id = ? where id = ?`,
        [res.role_id, res.id],
        function (err, data) {}
      );
      questions();
    });
}

function viewRoles() {
  console.log("A list of all current roles:");
  db.query(
    "SELECT roles_id, roles.title, roles.salary, department.name FROM roles LEFT JOIN department ON roles.department_id=department.id",
    function (error, results) {
      if (error) throw error;
      console.table(results);
      questions();
    }
  );
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

function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        message:
          "Which employee's manager would you like to change? Input their employee id",
        type: "input",
        name: "id",
      },

      {
        message: "Enter the new manager_id",
        type: "number",
        name: "manager_id",
      },
    ])
    .then(function (res) {
      console.log(res.manager_id);
      console.log(res.id);

      db.query(
        `UPDATE employees set manager_id = ? where id = ?`,
        [res.manager_id, res.id],
        function (err, data) {}
      );
      questions();
    });
}

function viewByManager() {
  inquirer
    .prompt([
      {
        Message:
          "Which managers team would you like to view? Input their manager_id",
        type: "number",
        name: "manager_id",
      },
    ])
    .then(function (res, data) {
      db.query(
        "SELECT first_name, last_name, role_id FROM employees WHERE manager_id = ?",
        [res.manager_id],
        function (err, data) {
          console.table(data);
        }
      );
      questions();
    });
}

function deleteEmployee() {
  inquirer
    .prompt({
      message: "What employee would you like to delete? Input their ID",
      type: "input",
      name: "id",
    })
    .then((answer) => {
      db.query(
        "DELETE FROM employees WHERE id = ?",
        [answer.id],
        (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows + " employee deleted.\n");
          // Call a function to display the updated employee list
          questions();
        }
      );
    });
}

function deleteRole() {
  inquirer
    .prompt({
      message: "What role would you like to delete? Input the ID",
      type: "input",
      name: "id",
    })
    .then((answer) => {
      db.query(
        "DELETE FROM roles WHERE roles_id = ?",
        [answer.id],
        (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows + " roles deleted.\n");
          // Call a function to display the updated role list
          questions();
        }
      );
    });
}

function deleteDepartment() {
  inquirer
    .prompt({
      message: "What department would you like to delete? Input the ID",
      type: "input",
      name: "id",
    })
    .then((answer) => {
      db.query(
        "DELETE FROM department WHERE id = ?",
        [answer.id],
        (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows + " department deleted.\n");
          // Call a function to display the updated department list
          questions();
        }
      );
    });
}

function departmentBudget() {
  inquirer.prompt({
    message: "Which departments expenditure do you want to look view?",
    type: "input",
    name: "id",
  });
  console.log("Displaying the expenditure for the department:");
  db.query(
    "SELECT department_id, department.name, SUM(role.salary) AS budget FROM employees LEFT JOIN role on employees.role_id = role_id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;",
    function (error, results) {
      if (error) throw error;
      console.table(results);
      questions();
    }
  );
}
