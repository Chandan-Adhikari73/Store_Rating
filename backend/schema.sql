USE store_rating;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role ENUM('ADMIN', 'USER', 'OWNER') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255),
  address VARCHAR(400),
  owner_id INT,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  store_id INT,
  rating INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
  UNIQUE (user_id, store_id)
);

INSERT INTO users (name, email, password, address, role)
VALUES
('System Administrator AdminUserNameOKOK', 'admin@system.com', '$2b$10$wqv9wV1FfQqf1yWcOa1Yhe6H4i0p1b1bQ9gE0a1sGZgZqv4q9j1m6', 'Admin Address sample', 'ADMIN'),
('Store Owner OwnerUserNameLongEnoughOK', 'owner@store.com', '$2b$10$wqv9wV1FfQqf1yWcOa1Yhe6H4i0p1b1bQ9gE0a1sGZgZqv4q9j1m6', 'Owner Address sample', 'OWNER'),
('Normal User NormalUserNameLongEnoughOK', 'user@demo.com', '$2b$10$wqv9wV1FfQqf1yWcOa1Yhe6H4i0p1b1bQ9gE0a1sGZgZqv4q9j1m6', 'User Address sample', 'USER');

INSERT INTO stores (name, email, address, owner_id)
VALUES ('Alpha Store', 'alpha@store.com', '123 Alpha Road', 2),
       ('Beta Mart', 'beta@store.com', '456 Beta Street', 2);

INSERT INTO ratings (user_id, store_id, rating)
VALUES (3, 1, 5),
       (3, 2, 4);
