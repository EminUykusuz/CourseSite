CREATE DATABASE UsersTable;

USE UsersTable;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user' 
);

UPDATE users SET role = 'admin' WHERE id = 1;
