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
-- Insert sample users with hashed passwords
INSERT INTO users (username, password, email, departement) VALUES
    ('user1', '$2y$10$V9U1GyEFANMkh4Zj.gos0O1SUIrQ4oU8dRfJwWENByX6Ycn4svFou', 'user1@example.com', 'user'), -- Password: password1
    ('user2', '$2y$10$LsvQFcpqMqk2OyHVt8ZcY.J6YIuhghYp.DyvVpFsL3r8EMdrEClfG', 'user2@example.com', 'user'), -- Password: password2
    ('user3', '$2y$10$1MOFkvGgfMhS7Zz1wfc4yOpGcKLgIkKv2WwKZwTTi0uot3Y7lV8cW', 'user3@example.com', 'user'), -- Password: password3
    ('admin', '$2y$10$eLS1cY/wg3RfCOUyNdoeo.I7LODCYI8fnKsA2bLLSh5JL4Y53x0ZK', 'admin@example.com', 'admin'); -- Password: admin

-- Insert sample directories
INSERT INTO directories (title, content, directory, parent_id, owner) VALUES
    ('Root', 'Main directory', '/', NULL, 1),
    ('Documents', 'User documents', '/Documents', 1, 2),
    ('Photos', 'User photos', '/Photos', 1, 3),
    ('Videos', 'User videos', '/Videos', 1, 1),
    ('Downloads', 'User downloads', '/Downloads', 1, 2),
    ('Music', 'User music', '/Music', 1, 3);

-- Insert associations between users and directories
INSERT INTO user_directories (user_id, directory) VALUES
    (2, '/Documents'),
    (3, '/Photos');

-- Insert sample files
INSERT INTO files (filename, content, directory, owner) VALUES
    ('file1.txt', 'Content of file1', '/Documents', 2),
    ('file2.txt', 'Content of file2', '/Photos', 3),
    ('file3.txt', 'Content of file3', '/Downloads', 2),
    ('file4.txt', 'Content of file4', '/Music', 3);
