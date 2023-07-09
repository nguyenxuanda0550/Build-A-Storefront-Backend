CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    password VARCHAR(50) NOT NULL
);