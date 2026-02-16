import pool from '../../config/db.js';

export async function getSummary(userId) {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)                                                                 AS total,
       COUNT(*) FILTER (WHERE status = 'wishlist')                             AS wishlist,
       COUNT(*) FILTER (WHERE status = 'applied')                              AS applied,
       COUNT(*) FILTER (WHERE status = 'screening')                            AS screening,
       COUNT(*) FILTER (WHERE status = 'interview')                            AS interview,
       COUNT(*) FILTER (WHERE status = 'offer')                                AS offer,
       COUNT(*) FILTER (WHERE status = 'rejected')                             AS rejected,
       COUNT(*) FILTER (WHERE status = 'withdrawn')                            AS withdrawn,
       COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW()))        AS this_month
     FROM applications
     WHERE user_id = $1`,
    [userId]
  );
  return rows[0];
}
