CREATE TYPE document_type AS ENUM (
  'resume',
  'cover_letter',
  'portfolio',
  'other'
);

CREATE TABLE documents (
  id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID          NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  user_id        UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type           document_type NOT NULL,
  file_name      TEXT          NOT NULL,
  file_url       TEXT          NOT NULL,
  created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_documents_user_id        ON documents(user_id);
