\## \[Unreleased] - Phase 2 (Auth \& Domain Models)



\### Added

\- Category model with one-to-many relation to Product

\- User model with role-based access (CUSTOMER, ADMIN)

\- Complete authentication flow: signup, login, JWT issuance

\- Password hashing with argon2

\- JWT strategy and route guard for protected endpoints

\- Global validation pipe with whitelist/forbidNonWhitelisted

\- Environment-based secret management (@nestjs/config, .env.example)



\### Endpoints

\- `GET /health`

\- `GET /products`

\- `GET /categories`

\- `POST /auth/signup`

\- `POST /auth/login`

\- `GET /auth/me` (protected)



\### Verified

\- Signup rejects duplicate emails (ConflictException)

\- Login returns identical error message for wrong email/password (prevents user enumeration)

\- `/auth/me` returns 401 without token, returns user data with valid JWT

\- 1 real test user created and authenticated end-to-end

