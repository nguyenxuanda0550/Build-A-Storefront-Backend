CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(50)
);