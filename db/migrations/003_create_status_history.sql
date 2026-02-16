CREATE TABLE status_history (
  id             UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID               NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  from_status    application_status,
  to_status      application_status NOT NULL,
  changed_at     TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_status_history_application_id ON status_history(application_id);
