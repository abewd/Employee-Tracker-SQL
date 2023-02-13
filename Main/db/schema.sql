DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  employee_name VARCHAR (50) NOT NULL
);

INSERT INTO employees (employee_name) VALUES
  ('John Doe'),
  ('Jane Doe'),
  ('James Smith'),
  ('Emily Brown'),
  ('Michael Johnson');