CREATE TABLE tracking_codes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(13) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  used_at TIMESTAMP,
  email_sequence_id INTEGER REFERENCES email_sequences(id),
  status VARCHAR(20) DEFAULT 'available'
); 