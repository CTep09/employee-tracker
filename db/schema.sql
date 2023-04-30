DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
  );

  CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

  CREATE TABLE employee (
  id INT(7) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);

