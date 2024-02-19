CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    departement TEXT NOT NULL,
    reg_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table to store file information
CREATE TABLE files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    content TEXT,
    directory TEXT NOT NULL,
    owner INTEGER NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(id),
    UNIQUE (filename, directory) -- Add UNIQUE constraint on filename and directory
);

-- Table to store directory information
CREATE TABLE directories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    directory TEXT NOT NULL UNIQUE,
    parent_id INTEGER,
    owner INTEGER NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES directories(id),
    FOREIGN KEY (owner) REFERENCES users(id)
);

-- Table to associate users with directories
CREATE TABLE user_directories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    directory TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (directory) REFERENCES directories(directory)
);