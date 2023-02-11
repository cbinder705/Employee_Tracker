INSERT INTO department (name)
VALUES 
("Sales"),
("Legal"),
("Finance");

INSERT INTO role (department_id, title, salary)
VALUES (001, "Manager", 80000),
(001,"Lead Sales",50000 ),
(002, "Lawyer", 100000),
(003, "Payroll", 75000);

INSERT INTO employee (role_id, first_name, last_name)
VALUES (001, "Jesse", "Pin"),
(001, "Tim", "Burton"),
(002, "Saul", "Goodman"),
(003, "Walter", "White");