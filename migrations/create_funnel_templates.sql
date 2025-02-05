CREATE TABLE funnel_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  payment_method VARCHAR(50), -- null significa todos os métodos
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE funnel_steps (
  id SERIAL PRIMARY KEY,
  funnel_template_id INTEGER REFERENCES funnel_templates(id),
  step_number INTEGER NOT NULL,
  email_subject VARCHAR(255) NOT NULL,
  email_template TEXT NOT NULL,
  delay_hours INTEGER NOT NULL, -- tempo de espera após o passo anterior
  UNIQUE(funnel_template_id, step_number)
); 