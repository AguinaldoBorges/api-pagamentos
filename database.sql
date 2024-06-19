CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  card_number VARCHAR(16) NOT NULL,
  card_name VARCHAR(100) NOT NULL,
  expiry_date VARCHAR(5) NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  amount NUMERIC NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
