-- Insert department data into department table
INSERT INTO department (department_name) VALUES 
('Behavior Analysis Unit'),
('Forensic Psychology'),
('Information Technology'),
('Investigative Support'),
('Operational Support');

-- Insert role data into role table
INSERT INTO role (id, title, salary, department_id) VALUES 
(1, 'Supervisory Special Agent', 120000.00, 1),
(2, 'Special Agent', 100000.00, 1),
(3, 'Forensic Psychologist', 110000.00, 2),
(4, 'IT Specialist', 90000.00, 3),
(5, 'Investigative Analyst', 95000.00, 4),
(6, 'Administrative Assistant', 50000.00, 5);

-- Insert employee data into employee table
INSERT INTO employee (id, first_name, last_name, manager_id, role_id) VALUES 
(1, 'Aaron', 'Hotchner', NULL, 1),
(2, 'Emily', 'Prentiss', 1, 2),
(3, 'Derek', 'Morgan', 1, 2),
(4, 'Spencer', 'Reid', 1, 3),
(5, 'Jennifer', 'Jareau', 1, 5),
(6, 'Penelope', 'Garcia', 5, 4),
(7, 'David', 'Rossi', NULL, 1),
(8, 'Ashley', 'Seaver', 7, 2),  
(9, 'Alex', 'Blake', 7, 3),
(10, 'Kate', 'Callahan', 1, 2),
(11, 'Tara', 'Lewis', 1, 3),
(12, 'Luke', 'Alvez', 1, 2),
(13, 'Matt', 'Simmons', 1, 2);
