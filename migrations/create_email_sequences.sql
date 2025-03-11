CREATE TABLE email_sequences (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  tracking_code VARCHAR(13) NOT NULL,
  current_step INTEGER DEFAULT 1,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  last_email_sent_at TIMESTAMP,
  amount INTEGER NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  paid_at TIMESTAMP NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  shipping_address JSONB NOT NULL,
  transaction_id VARCHAR(255) NOT NULL,
  UNIQUE(customer_id, order_id),
  UNIQUE(tracking_code)
);

CREATE TABLE email_logs (
  id SERIAL PRIMARY KEY,
  sequence_id INTEGER REFERENCES email_sequences(id),
  step INTEGER NOT NULL,
  email_type VARCHAR(50) NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50),
  customer_email VARCHAR(255) NOT NULL,
  template_id VARCHAR(255),
  metadata JSONB
);

CREATE INDEX idx_email_sequences_status ON email_sequences(status);
CREATE INDEX idx_email_logs_sequence_id ON email_logs(sequence_id); 