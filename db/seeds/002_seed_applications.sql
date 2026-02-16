INSERT INTO applications (id, user_id, company, position, status, applied_date, job_url, location, salary_min, salary_max, notes) VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Acme Corp', 'Frontend Engineer', 'interview',
    '2026-01-15', 'https://acme.example/jobs/123', 'Seoul, KR',
    70000, 90000, 'Referral from Jane'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Globex', 'Full-Stack Developer', 'applied',
    '2026-02-01', 'https://globex.example/jobs/456', 'Remote',
    80000, 110000, NULL
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'Initech', 'Backend Engineer', 'offer',
    '2026-01-20', NULL, 'Busan, KR',
    90000, 120000, 'Offer received 2026-02-10'
  );

INSERT INTO status_history (application_id, from_status, to_status) VALUES
  ('10000000-0000-0000-0000-000000000001', NULL,         'applied'),
  ('10000000-0000-0000-0000-000000000001', 'applied',    'screening'),
  ('10000000-0000-0000-0000-000000000001', 'screening',  'interview'),
  ('10000000-0000-0000-0000-000000000002', NULL,         'applied'),
  ('10000000-0000-0000-0000-000000000003', NULL,         'applied'),
  ('10000000-0000-0000-0000-000000000003', 'applied',    'screening'),
  ('10000000-0000-0000-0000-000000000003', 'screening',  'interview'),
  ('10000000-0000-0000-0000-000000000003', 'interview',  'offer');
