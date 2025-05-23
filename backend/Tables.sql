CREATE DATABASE AppDB;

USE AppDB;

-- Kullanıcı tablosu
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  role VARCHAR(20)
);

-- Kurs tablosu
CREATE TABLE Courses (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Title VARCHAR(200),
  Description TEXT,
  Image VARCHAR(500),
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
select*from users;
