CREATE TYPE application_status AS ENUM (
  'wishlist',
  'applied',
  'screening',
  'interview',
  'offer',
  'rejected',
  'withdrawn'
);

CREATE TABLE applications (
  id           UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID               NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company      TEXT               NOT NULL,
  position     TEXT               NOT NULL,
  status       application_status NOT NULL DEFAULT 'wishlist',
  applied_date DATE,
  job_url      TEXT,
  location     TEXT,
  salary_min   INTEGER,
  salary_max   INTEGER,
  notes        TEXT,
  created_at   TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status  ON applications(user_id, status);
