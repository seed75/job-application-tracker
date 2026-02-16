import { getSummary } from './dashboard.repository.js';

export async function summary(userId) {
  const raw = await getSummary(userId);
  return {
    total:      Number(raw.total),
    this_month: Number(raw.this_month),
    by_status: {
      wishlist:  Number(raw.wishlist),
      applied:   Number(raw.applied),
      screening: Number(raw.screening),
      interview: Number(raw.interview),
      offer:     Number(raw.offer),
      rejected:  Number(raw.rejected),
      withdrawn: Number(raw.withdrawn),
    },
  };
}
