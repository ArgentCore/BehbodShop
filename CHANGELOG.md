# Changelog

## [Unreleased] - Phase 2 (Auth, Domain Models, Cart & Orders)

### Added
- Category model with one-to-many relation to Product
- User model with role-based access (CUSTOMER, ADMIN)
- Complete authentication flow: signup, login, JWT issuance
- Password hashing with argon2
- JWT strategy and route guard for protected endpoints
- Global validation pipe with whitelist/forbidNonWhitelisted
- Environment-based secret management (@nestjs/config, .env.example)
- POST /categories (protected) - create category with duplicate-slug check
- POST /products (protected) - create product with category existence validation
- GET /products?category=slug - optional category filtering, backward compatible
- Cart and CartItem models with one-to-one (user-cart) and one-to-many (cart-items) relations
- GET /cart, POST /cart/items, DELETE /cart/items/:productId (all protected)
- Idempotent add-to-cart: adding an existing product increases quantity instead of duplicating rows
- Order and OrderItem models with price/title snapshot at purchase time
- POST /orders - transactional checkout: creates order from cart, clears cart, all-or-nothing
- GET /orders - order history for the logged-in user

### Endpoints
- GET /health
- GET /products
- POST /products (protected)
- GET /categories
- POST /categories (protected)
- POST /auth/signup
- POST /auth/login
- GET /auth/me (protected)
- GET /cart (protected)
- POST /cart/items (protected)
- DELETE /cart/items/:productId (protected)
- POST /orders (protected)
- GET /orders (protected)

### Verified
- Signup rejects duplicate emails (ConflictException)
- Login returns identical error message for wrong email/password (prevents user enumeration)
- /auth/me returns 401 without token, returns user data with valid JWT
- Product creation rejects invalid/non-existent categoryId (400 Bad Request)
- Category filter returns matching products, empty array for non-matching category, full list when omitted
- Cart auto-creates on first access
- Adding the same product twice sums quantities (2 + 3 = 5), does not create duplicate rows
- Removing a cart item returns it to an empty cart
- Checkout rejects empty cart (400 Bad Request)
- Checkout correctly calculates total (2500000 x 2 = 5000000 Toman) and snapshots price/title
- Checkout clears the cart atomically after creating the order
- 1 real test user, 1 category, 1 product, full cart-to-order lifecycle tested end-to-end