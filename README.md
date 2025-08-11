# KM Intelligence Backend

This repository contains a minimal Next.js backend scaffold for the **KM Intelligence** project. It provides a simple API layer with user registration, login, and a stubbed metrics endpoint. The backend uses Prisma to connect to a PostgreSQL database and expects the administrative email to be defined via an environment variable.

## Features

- **User registration** (`POST /api/signup`): creates a new user with a hashed password and automatically assigns the `admin` role when the email matches `ADMIN_EMAIL`.
- **User login** (`POST /api/login`): authenticates users with their email and password, returning a JSON Web Token.
- **Metrics endpoint** (`GET /api/km/metrics`): returns example KPIs and time‑series data (placeholder for real aggregated metrics).
- **Prisma ORM** configured for PostgreSQL, with models for `User` and `Account`.

## Getting Started

### Prerequisites

- Node.js 18 or later
- A PostgreSQL database (e.g. from [Neon](https://neon.tech/) or [Supabase](https://supabase.com/))

### Setup

1. **Clone the repository** (after you've pushed it to GitHub).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update the values. At minimum, you should provide `DATABASE_URL`, `ADMIN_EMAIL` and `JWT_SECRET`.

4. Run Prisma migrations:

   ```bash
   npm run prisma:migrate
   ```

   This command will create the database schema based on `prisma/schema.prisma`. Make sure your database connection string is correct.

5. Start the development server:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`.

### Endpoints

| Method | Endpoint            | Description                     |
|-------:|:--------------------|:--------------------------------|
| POST   | `/api/signup`       | Register a new user             |
| POST   | `/api/login`        | Authenticate and get a token    |
| GET    | `/api/km/metrics`   | Retrieve example metrics data   |

## Deploying

1. Create a PostgreSQL database (Neon or Supabase are good choices) and note the connection string.
2. Deploy the project to a platform that supports Next.js, such as [Vercel](https://vercel.com/). Set the environment variables (`DATABASE_URL`, `ADMIN_EMAIL`, `JWT_SECRET`) in the hosting environment.
3. After deployment, run `npm run prisma:migrate` via a build or start script, or run `npx prisma migrate deploy` as part of your CI/CD pipeline.

Your KM Intelligence dashboard frontend can then query `/api/km/metrics` directly.

## Next Steps

This scaffold is meant to be extended. Some potential improvements include:

- Implement OAuth flows for Meta Ads, Google Ads and Shopify to fetch account data.
- Store ad metrics and order data in the `Account` model or create additional models.
- Aggregate metrics in a cron job and return real KPIs from the database instead of the stubbed data.

Feel free to modify and extend this codebase to fit your needs.
