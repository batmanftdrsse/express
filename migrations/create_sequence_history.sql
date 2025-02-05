CREATE TABLE sequence_history (
  id SERIAL PRIMARY KEY,
  email_sequence_id INTEGER REFERENCES email_sequences(id),
  previous_step INTEGER NOT NULL,
  new_step INTEGER NOT NULL,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  changed_by VARCHAR(255),
  reason VARCHAR(255)
); 