DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  first_name NOT NULL, 
  last_name NOT NULL,
  role_id NOT NULL
  manager_id NOT NULL
  -- employee_name VARCHAR (50) NOT NULL
);

