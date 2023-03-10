-- database tables

CREATE TABLE recountSheepUsers (
    user_id SERIAL PRIMARY KEY,
    user_username VARCHAR (30) NOT NULL,
    user_password VARCHAR (100) NOT NULL,
    user_email VARCHAR (30) NOT NULL,
    user_role VARCHAR (30) NOT NULL
);

CREATE TABLE dreamEntry (
    dream_id SERIAL PRIMARY KEY,
    user_id INT,
    day_of_month VARCHAR NOT NULL,
    day_of_week VARCHAR (50) NOT NULL,
    time_to_bed VARCHAR (30) NOT NULL,
    time_awake INT NOT NULL,
    people VARCHAR[],
    dream_location VARCHAR (255),
    type_of_dream VARCHAR (50) NOT NULL,
    dream_description TEXT NOT NULL
);

-- session table
psql mydatabase < node_modules/connect-pg-simple/table.sql

INSERT INTO recountSheepUsers (user_username, user_password, user_email, user_role)