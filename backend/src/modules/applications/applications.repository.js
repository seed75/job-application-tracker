import pool from '../../config/db.js';

export async function createApplication(userId, data) {
  const { company, position, status = 'wishlist', appliedDate, jobUrl, location, salaryMin, salaryMax, notes } = data;
  const { rows } = await pool.query(
    `INSERT INTO applications (user_id, company, position, status, applied_date, job_url, location, salary_min, salary_max, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [userId, company, position, status, appliedDate ?? null, jobUrl ?? null, location ?? null, salaryMin ?? null, salaryMax ?? null, notes ?? null]
  );
  return rows[0];
}

export async function findApplicationById(id, userId) {
  const { rows } = await pool.query(
    'SELECT * FROM applications WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return rows[0] ?? null;
}

export async function listApplications(userId, filters = {}) {
  const conditions = ['user_id = $1'];
  const values = [userId];
  let idx = 2;

  if (filters.status) {
    conditions.push(`status = $${idx++}`);
    values.push(filters.status);
  }
  if (filters.company) {
    conditions.push(`company ILIKE $${idx++}`);
    values.push(`%${filters.company}%`);
  }

  const { rows } = await pool.query(
    `SELECT * FROM applications WHERE ${conditions.join(' AND ')} ORDER BY created_at DESC`,
    values
  );
  return rows;
}

export async function updateApplication(id, userId, fields) {
  const fieldMap = {
    company:     'company',
    position:    'position',
    status:      'status',
    appliedDate: 'applied_date',
    jobUrl:      'job_url',
    location:    'location',
    salaryMin:   'salary_min',
    salaryMax:   'salary_max',
    notes:       'notes',
  };

  const setClauses = [];
  const values = [];
  let idx = 1;

  for (const [key, col] of Object.entries(fieldMap)) {
    if (fields[key] !== undefined) {
      setClauses.push(`${col} = $${idx++}`);
      values.push(fields[key]);
    }
  }

  if (setClauses.length === 0) return null;

  values.push(id, userId);
  const { rows } = await pool.query(
    `UPDATE applications SET ${setClauses.join(', ')} WHERE id = $${idx++} AND user_id = $${idx} RETURNING *`,
    values
  );
  return rows[0] ?? null;
}

export async function deleteApplication(id, userId) {
  const { rowCount } = await pool.query(
    'DELETE FROM applications WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return rowCount > 0;
}

export async function insertStatusHistory(applicationId, fromStatus, toStatus) {
  await pool.query(
    'INSERT INTO status_history (application_id, from_status, to_status) VALUES ($1, $2, $3)',
    [applicationId, fromStatus, toStatus]
  );
}
