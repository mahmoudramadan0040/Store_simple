/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    user_name VARCHAR(50) Not null,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);