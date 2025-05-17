-- SQLite schema
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS Recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  ingredients TEXT,
  steps TEXT,
  imageUrl TEXT,
  isDeleted BOOLEAN DEFAULT 0,
  UserId INTEGER,
  FOREIGN KEY(UserId) REFERENCES Users(id)
);

-- Insert admin account
INSERT INTO Users (email, name, role) VALUES ('admin@example.com', 'Admin', 'admin');