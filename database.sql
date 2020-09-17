CREATE DATABASE thoughts;

CREATE TABLE thoughts(
  thought_id SERIAL PRIMARY KEY,
  author VARCHAR(50) NOT NULL,
  thought VARCHAR(255) NOT NULL
);
