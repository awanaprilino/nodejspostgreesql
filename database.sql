CREATE DATABASE todo_database;


CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

ALTER TABLE todo
ADD COLUMN title varchar(100), 
ADD COLUMN status varchar(10);