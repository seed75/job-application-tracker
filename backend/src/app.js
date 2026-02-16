import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import applicationsRoutes from './modules/applications/applications.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL ?? '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/dashboard',   dashboardRoutes);

// Global error handler
app.use((err, _req, res, _next) => {
  const status = err.statusCode ?? 500;
  res.status(status).json({ error: err.message ?? 'Internal server error' });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));

export default app;
