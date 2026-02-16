# Job Application Tracker

A full-stack web application I built to keep track of all the companies I applied to during my job search. When applying to multiple companies at the same time, it gets hard to remember where I applied and what stage each one is at — so I built this to manage it all in one place.

## Features

- **Sign up / Sign in** — JWT-based authentication with bcrypt password hashing
- **Application management** — Add, update, and delete job applications with company, position, and status
- **Status filtering** — Filter by Wishlist / Applied / Screening / Interview / Offer / Rejected / Withdrawn
- **Status history** — Tracks every status change per application
- **Dashboard summary** — Aggregated counts by status

## Tech Stack

**Backend**
- Node.js + Express.js
- PostgreSQL (Supabase)
- JWT authentication, bcrypt password hashing
- Controller → Service → Repository architecture

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6

**Testing**
- Playwright E2E tests

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express entry point
│   │   ├── config/db.js            # PostgreSQL connection
│   │   ├── middleware/auth.js      # JWT auth middleware
│   │   ├── modules/
│   │   │   ├── auth/               # Register / Login
│   │   │   ├── applications/       # Application CRUD
│   │   │   └── dashboard/          # Summary stats
│   │   └── utils/AppError.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx       # Sign in / Sign up
│   │   │   └── ApplicationsPage.jsx
│   │   ├── components/
│   │   │   └── CreateApplicationForm.jsx
│   │   ├── context/AuthContext.jsx
│   │   └── api/client.js
│   └── package.json
├── db/
│   ├── migrations/                 # Table DDL SQL
│   └── seeds/                      # Sample data
├── e2e/
│   └── app.spec.js                 # Playwright E2E tests
└── playwright.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or a Supabase account)

### 1. Database Setup

Run the SQL files in `db/migrations/` in order using the Supabase SQL Editor.

```sql
-- 001_create_users.sql
-- 002_create_applications.sql
-- 003_create_status_history.sql
-- ...
```

### 2. Run the Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET in .env
npm run dev
```

Backend runs at `http://localhost:3001`.

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 4. Run E2E Tests

```bash
# From the project root
npm install
npx playwright install chromium
npx playwright test
```

## Environment Variables

Set the following in `backend/.env`:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
PORT=3001
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/applications` | List applications (filterable by status) |
| POST | `/api/applications` | Create an application |
| PATCH | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |
| GET | `/api/dashboard/summary` | Status summary stats |
