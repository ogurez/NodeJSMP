CREATE TABLE Users (
    id TEXT,
    login TEXT,
    password TEXT,
    age INTEGER,
    isDeleted BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO Users (login, password, age, id) VALUES ('John', 'qwerty', 25, 'a192e125-8387-40c5-816f-ab344b25b15f');

INSERT INTO Users (login, password, age, id) VALUES ('Jane', 'qweewq', 21, 'b121a325-1247-34c7-672f-gh31f25a27g');