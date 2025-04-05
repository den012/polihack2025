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

--- no user
CREATE TABLE `Cart` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id VARCHAR(255) NOT NULL UNIQUE, -- Unique identifier for the cart
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
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

--- inserturi rusu

INSERT INTO `Category` (name)
VALUES 
  ('Fitness'),
  ('Nutrition'),
  ('Yoga & Pilates'),
  ('Retreats'),
  ('Workshops'),
  ('Personal Care & Beauty');

INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
('Morning Bootcamp', 'An energetic outdoor fitness session to start your day right.', 'https://images.unsplash.com/photo-1665896966434-75ba47b8774a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', false, '2025-06-05 07:00:00', 20.00, 'Central Park', 'FitLife', 11),
('HIIT Blast', 'High-intensity interval training to push your limits.', 'https://plus.unsplash.com/premium_photo-1666283137099-5a5b99d7f6d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGV4ZXJjaWNlc3xlbnwwfHwwfHx8MA%3D%3D', true, '2025-06-12 18:00:00', 25.00, 'Pulse Gym', 'PowerUp Fitness', 11),
('Cardio Dance Party', 'Dance your way to a healthy heart with fun moves.', 'https://images.unsplash.com/photo-1578619627285-e3a1d382f2bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcmRpbyUyMGRhbmNlfGVufDB8fDB8fHww', false, '2025-06-18 19:00:00', 18.00, 'City Studio', 'RhythmFit', 11),
('Functional Training Circuit', 'Strength and agility in one session.', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1bmN0aW9uYWwlMjB0cmFpbmluZ3xlbnwwfHwwfHx8MA%3D%3D', false, '2025-07-02 17:00:00', 22.00, 'Open Field Gym', 'Alpha Fit', 11),
('Strength & Sweat', 'Muscle building with focus on endurance.', 'https://plus.unsplash.com/premium_photo-1664109999519-57cd675ccef3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3RyZW5naHR8ZW58MHx8MHx8fDA%3D', true, '2025-07-08 18:30:00', 24.00, 'Lift Arena', 'MuscleZone', 11),

INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
-- Nutrition (category_id = 2)
('Plant-Based Cooking Demo', 'Learn how to make delicious and healthy vegan meals.', 'https://plus.unsplash.com/premium_photo-1712758762408-0edd14aa387d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnQlMjBiYXNlZCUyMGNvb2tpbmd8ZW58MHx8MHx8fDA%3D', false, '2025-06-10 17:00:00', 15.00, 'Green Eats Studio', 'NutriKitchen', 12),
('Nutrition for Energy', 'Talk and Q&A with a certified nutritionist on boosting energy.', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bnV0cml0aW9ufGVufDB8fDB8fHww', true, '2025-07-03 19:00:00', 10.00, 'Wellness Center', 'EatWell Co.', 12),
('Meal Prep Sunday', 'Hands-on class on prepping balanced meals.', 'https://plus.unsplash.com/premium_photo-1700760416257-7feafe6fe779?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhbCUyMHByZXB8ZW58MHx8MHx8fDA%3D', false, '2025-06-30 12:00:00', 20.00, 'Healthy Bites Hub', 'Food4Fuel', 12),
('Gut Health 101', 'Explore how nutrition affects your digestive health.', 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3V0JTIwaGVhbHRofGVufDB8fDB8fHww', false, '2025-07-06 14:00:00', 12.00, 'Natura Clinic', 'Holistic Bites', 12),
('Superfood Smoothie Bar', 'Create your own power-packed smoothie.', 'https://plus.unsplash.com/premium_photo-1663853293868-9729d25fdf86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D', true, '2025-07-10 15:00:00', 8.00, 'FitCafe', 'Vital Mix', 12),

INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
-- Yoga & Pilates (category_id = 3)
('Sunrise Yoga Flow', 'Start your day with mindful movement and sunrise views.', 'https://unsplash.com/photos/silhouette-photography-of-woman-doing-yoga-F2qh3yjz6Jk', true, '2025-06-20 06:30:00', 12.00, 'Beachfront Deck', 'Balance Yoga', 13),
('Pilates Core Workshop', 'Strengthen your core and improve posture.', 'https://plus.unsplash.com/premium_photo-1664299707290-b51236a3bac6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGlsYXRlcyUyMGNvcmV8ZW58MHx8MHx8fDA%3D', false, '2025-06-28 10:00:00', 18.00, 'Pilates Studio X', 'CoreMotion', 13),
('Full Moon Yoga', 'A relaxing flow under the full moon.', 'https://images.unsplash.com/photo-1587577984158-9203a0c0361b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1bGwlMjBtb29uJTIweW9nYXxlbnwwfHwwfHx8MA%3D%3D', true, '2025-07-01 20:00:00', 14.00, 'Botanical Garden', 'Moon Yoga', 13),
('Yin Yoga for Sleep', 'Deep stretches and breathwork for restful sleep.', 'https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWluJTIweW9nYXxlbnwwfHwwfHx8MA%3D%3D', false, '2025-07-09 21:00:00', 10.00, 'Tranquil Space', 'ZenSessions', 13),
('Power Pilates Fusion', 'A dynamic session combining pilates and strength.', 'https://unsplash.com/photos/effective-machine-confident-young-sporty-woman-with-slim-body-type-in-the-healthy-center-doing-exercises-by-using-special-equipment-u6cPsw9YYCw', true, '2025-07-13 18:00:00', 20.00, 'Urban Core Studio', 'PilatesPro', 13);

INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
-- Retreats (category_id = 4)
('Weekend Mindfulness Retreat', 'Unplug and reset in nature with guided meditations.', 'https://plus.unsplash.com/premium_photo-1661921265709-7f63b001ef98?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vla2VuZCUyMHJldHJlYXQlMjBtaW5kZnVsbHxlbnwwfHwwfHx8MA%3D%3D', true, '2025-07-12 10:00:00', 150.00, 'Mountain Lodge', 'ZenRetreats', 14),
('Digital Detox Camp', '3-day escape to recharge and disconnect from tech.', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMGRldG94fGVufDB8fDB8fHww', false, '2025-07-26 09:00:00', 130.00, 'Lakeview Cabins', 'NatureSoul', 14),
('Reconnection Retreat', 'Restore your body and mind through nature immersion.', 'https://plus.unsplash.com/premium_phohttps://unsplash.com/photos/a-woman-is-holding-her-head-in-her-hands-BKTEZPVoMBMhttps://example.com/images/mindbody.jpg', true, '2025-08-10 11:00:00', 175.00, 'River Sanctuary', 'Inner Peace', 14),
('Women’s Wellness Retreat', 'Empowering sessions and nurturing activities.', 'https://unsplash.com/photos/a-group-of-women-sitting-on-top-of-a-lush-green-field-C1BK8A8Jwy8', false, '2025-08-16 10:00:00', 140.00, 'Coastal Spa Resort', 'SheBalance', 14);

INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
-- Workshops (category_id = 5)
('Aromatherapy 101', 'Create your own blends and explore essential oils.', 'https://images.unsplash.com/photo-1556760544-74068565f05c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJvbWF0aGVyYXB5fGVufDB8fDB8fHww', false, '2025-06-15 14:00:00', 22.00, 'Wellbeing Studio', 'Scented Wellness', 15),
('Mindful Journaling Workshop', 'Learn expressive writing for emotional clarity.', 'https://images.unsplash.com/photo-1563457012475-13cf086fd600?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluZGZ1bGwlMjBqb3VybmFsaXN0JTIwd29ya3Nob3B8ZW58MHx8MHx8fDA%3D', true, '2025-07-05 11:00:00', 18.00, 'Creative Space', 'Clarity Journals', 15),
('DIY Herbal Remedies', 'Explore herbs and make home remedies.', 'https://images.unsplash.com/photo-1723879683308-0c8542c02ee4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHlpJTIwaGVyYmFsfGVufDB8fDB8fHww', false, '2025-07-12 13:00:00', 16.00, 'Botanical Lab', 'EarthCare', 15),
('Vision Board Session', 'Manifest your goals through visual creativity.', 'https://images.unsplash.com/photo-1684144103636-1059b160184e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlzaW9uJTIwYm9hcmQlMjBzZXNzaW9ufGVufDB8fDB8fHww', true, '2025-07-18 16:00:00', 15.00, 'Inspire Studio', 'Dream Builders', 15),
('Intro to Breathwork', 'Breathing techniques for daily balance.', 'https://plus.unsplash.com/premium_photo-1711987509500-6ea0f58704cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SW50cm8lMjB0byUyMEJyZWF0aHdvcmt8ZW58MHx8MHx8fDA%3D', false, '2025-07-22 17:30:00', 10.00, 'Calm Center', 'BreathFlow', 15);

INSERT INTO `Events` (name, description, image, promoted, date, price, location, organizer, category_id) VALUES
-- Personal Care & Beauty (category_id = 6)
('DIY Natural Skincare', 'Craft your own clean beauty products.', 'https://images.unsplash.com/photo-1585104368639-0933bee8e8af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGl5JTIwbmF0dXJhbCUyMHNraW5jYXJlfGVufDB8fDB8fHww', false, '2025-06-22 13:00:00', 19.00, 'BeautyLab', 'GlowNaturals', 16),
('Wellness Spa Evening', 'Relax with massages and tea ceremonies.', 'https://images.unsplash.com/photo-1743286159555-ea765c1bc5e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VsbG5lcyUyMHNwYSUyMGV2ZW5pbmd8ZW58MHx8MHx8fDA%3D', true, '2025-07-15 18:00:00', 45.00, 'Urban Spa Lounge', 'Zen & Glow', 16),
('Makeup Masterclass', 'Learn techniques for natural beauty.', 'https://plus.unsplash.com/premium_photo-1683120953880-fc8b6213b627?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFrZXVwJTIwbWFzdGVyY2xhc3N8ZW58MHx8MHx8fDA%3D', false, '2025-07-20 14:00:00', 25.00, 'Glam Studio', 'BeautyBlend', 16),
('Holistic Haircare', 'Discover clean products and scalp treatments.', 'https://plus.unsplash.com/premium_photo-1682092497977-4246affe698c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9saXN0aWMlMjBoYWlyY2FyZXxlbnwwfHwwfHx8MA%3D%3D', false, '2025-07-24 13:30:00', 20.00, 'Natural Salon', 'Root Revival', 16),
('Self-Care Sunday', 'A guided ritual of rest, masks and mindfulness.', 'https://plus.unsplash.com/premium_photo-1678400492607-1e596c90ac87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2VsZiUyMGNhcmV8ZW58MHx8MHx8fDA%3D', true, '2025-07-28 15:00:00', 30.00, 'Peaceful Nest', 'YouFirst', 16);