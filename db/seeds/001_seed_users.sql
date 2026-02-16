-- password: 'password123' bcrypt hashed
INSERT INTO users (id, email, password_hash, name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'alice@example.com', '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9Su', 'Alice Kim'),
  ('00000000-0000-0000-0000-000000000002', 'bob@example.com',   '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9Su', 'Bob Lee');
