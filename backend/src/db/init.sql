CREATE TABLE IF NOT EXISTS book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    synopsis TEXT,
    year_published INT
    );

CREATE TABLE IF NOT EXISTS library (
    book_id INT PRIMARY KEY REFERENCES book(id) ON DELETE CASCADE
    );