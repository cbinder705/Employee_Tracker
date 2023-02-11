DROP DATABASE IF EXISTS myEmployees_db;
CREATE DATABASE myEmployees_db;

use myEmployees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO INCREMENT PRIMARY KEY,
  name VARCHAR (30) NOT NULL
);

CREATE TABLE role (
  
)