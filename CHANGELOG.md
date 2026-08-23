## [Unreleased] - Phase 2 continued (Category-Product linking)

### Added
- `POST /categories` (protected) — create category with duplicate-slug check
- `POST /products` (protected) — create product with category existence validation
- `GET /products?category=slug` — optional category filtering, backward compatible

### Verified
- Product creation rejects invalid/non-existent categoryId (400 Bad Request)
- Category filter returns matching products, empty array for non-matching category, full list when omitted
- 1 real category and 1 real product created and linked end-to-end