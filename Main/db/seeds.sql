USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO roles (roles_id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);
INSERT INTO roles (roles_id, title, salary, department_id)
VALUES (2, "Lead Engineer", 150000, 2);
INSERT INTO roles (roles_id, title, salary, department_id)
VALUES (3, "Software Engineer", 120000, 2);
INSERT INTO roles (roles_id, title, salary, department_id)
VALUES (4, "Accountant", 125000, 3);
INSERT INTO roles (roles_id, title, salary, department_id)
VALUES (5, "Legal Team Lead", 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Norah", "Rios", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Mellor", 3, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Shiv", "Betts", 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Leen", "Hurst", 5, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Leer", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Cruise", 4, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Daisy", "Hooper", 1, 2);