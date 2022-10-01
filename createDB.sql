CREATE TABLE users (
    id TEXT not null
        primary key,
    login TEXT,
    password TEXT,
    age INTEGER,
    isDeleted BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE group
(
    id   text not null
        primary key,
    name text
);

CREATE TABLE user_groups
(
    id  text not null
        constraint id
            primary key,
    "userId"  text
        constraint "userId"
            references users
            on update cascade on delete cascade,
    "groupId" text
        constraint "groupId"
            references group
            on update cascade on delete cascade
    
);

INSERT INTO Users (login, password, age, id) 
    VALUES 
        ('John', 'qwerty', 25, 'a192e125-8387-40c5-816f-ab344b25b15f'),
        ('Jane', 'qweewq', 21, 'b121a325-1247-34c7-672f-gh31f25a27g');
