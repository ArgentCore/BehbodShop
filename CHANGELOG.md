# Changelog

## [Unreleased] - Phase 2 (Auth & Domain Models)

### Added
- Category model with one-to-many relation to Product
- User model with role-based access (CUSTOMER, ADMIN)
- Complete authentication flow: signup, login, JWT issuance
- Password hashing with argon2
- JWT strategy and route guard for protected endpoints
- Global validation pipe with whitelist/forbidNonWhitelisted
- Environment-based secret management (@nestjs/config, .env.example)
- `POST /categories` (protected) - create category with duplicate-slug check
- `POST /products` (protected) - create product with category existence validation
- `GET /products?category=slug` - optional category filtering, backward compatible

### Endpoints
- `GET /health`
- `GET /products`
- `GET /categories`
- `POST /categories` (protected)
- `POST /products` (protected)
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me` (protected)

### Verified
- Signup rejects duplicate emails (ConflictException)
- Login returns identical error message for wrong email/password (prevents user enumeration)
- /auth/me returns 401 without token, returns user data with valid JWT
- 1 real test user created and authenticated end-to-end
- Product creation rejects invalid/non-existent categoryId (400 Bad Request)
- Category filter returns matching products, empty array for non-matching category, full list when omitted
- 1 real category and 1 real product created and linked end-to-end