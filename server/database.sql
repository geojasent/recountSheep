-- database tables

CREATE TABLE dreamEntry (
    dream_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    day_of_week VARCHAR (20) NOT NULL,
    time_to_bed TIME NOT NULL,
    time_awake TIME NOT NULL,
    peope VARCHAR (255),
    location VARCHAR (255),
    type_of_dream VARCHAR (255) NOT NULL,
    dream_description TEXT NOT NULL
);