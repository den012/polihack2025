CREATE TABLE `Category` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE `Events` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    promoted BOOLEAN DEFAULT FALSE,
    date DATETIME NOT NULL,
    price FLOAT NOT NULL,
    location VARCHAR(255) NOT NULL,
    organizer VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES `Category`(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `User` (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE `Cart` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES `User`(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `CartItem` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    event_id INT NOT NULL,
    quantity INT,
    price FLOAT,
    FOREIGN KEY (cart_id) REFERENCES `Cart`(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES `Events`(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);


INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
('Rock Night 2025', 'Live rock concert with top bands.', 'https://example.com/images/rock-night.jpg', true, '2025-05-15 20:00:00', 49.99, 'Madison Square Garden', 'RockWorld Inc.', 1),
('Championship Finals', 'The ultimate sports showdown.', 'https://example.com/images/championship.jpg', false, '2025-06-10 18:00:00', 79.99, 'National Stadium', 'SportX', 2),
('Shakespeare in the Park', 'Outdoor performance of Hamlet.', 'https://example.com/images/shakespeare.jpg', false, '2025-04-20 19:30:00', 25.00, 'Central Park', 'Classic Acts', 3),
('Jazz & Wine Evening', 'Smooth jazz with local wine tasting.', 'https://example.com/images/jazz-wine.jpg', false, '2025-05-22 21:00:00', 39.50, 'Downtown Lounge', 'Jazz Nights', 1),
('Broadway Dreams', 'A tribute to the best of Broadway.', 'https://example.com/images/broadway.jpg', true, '2025-07-01 19:00:00', 59.00, 'City Theater', 'StageCraft Co.', 3);