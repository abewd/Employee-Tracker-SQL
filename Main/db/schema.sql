DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  first_name VARCHAR(50) NOT NULL, 
  last_name VARCHAR(50) NOT NULL,
  role_id INT NOT NULL, 
  manager_id INT 
  -- employee_name VARCHAR (50) NOT NULL
);

CREATE TABLE roles (
  -- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  salary INT NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);