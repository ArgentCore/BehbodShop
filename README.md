# چرم بهبد | BehbodShop

فروشگاه اینترنتی محصولات چرمی دست‌دوز ایرانی — در حال تبدیل‌شدن از یک نمونه‌ی اولیه‌ی استاتیک به یک پلتفرم full-stack واقعی.

## وضعیت پروژه

در حال توسعه (Phase 2 — Auth & Domain Models)

بک‌اند NestJS با دیتابیس PostgreSQL واقعی، مدل‌های دامنه (Product, Category, User)، و سیستم احراز هویت کامل (JWT) پیاده‌سازی شده. فرانت‌اند هنوز نسخه‌ی استاتیک اولیه است.

## تکنولوژی‌ها

- Backend: NestJS (TypeScript)
- Database: PostgreSQL + Prisma ORM
- Auth: JWT (access token) + argon2 (password hashing)
- Validation: class-validator, class-transformer
- Dev environment: Docker Compose (PostgreSQL)

## Endpoint های فعلی

| Method | Route | توضیح | نیاز به احراز هویت |
|---|---|---|---|
| GET | /health | بررسی سلامت سرویس | خیر |
| GET | /products | لیست محصولات فعال | خیر |
| GET | /categories | لیست دسته‌بندی‌ها | خیر |
| POST | /auth/signup | ثبت‌نام کاربر جدید | خیر |
| POST | /auth/login | ورود و دریافت JWT | خیر |
| GET | /auth/me | اطلاعات کاربر لاگین‌شده | بله (JWT) |

## راه‌اندازی محلی

پیش‌نیاز: Node.js نسخه ۲۰ یا بالاتر، و Docker Desktop.

مراحل نصب و اجرا:

1. npm install
2. docker compose up -d
3. فایل apps/api/.env را بر اساس apps/api/.env.example بسازید (شامل DATABASE_URL و JWT_SECRET)
4. cd apps/api
5. npx prisma migrate dev
6. cd ../..
7. npm run dev:api

سرور روی http://localhost:3000 بالا می‌آید.

## نقشه‌ی راه

- [x] راه‌اندازی اولیه‌ی بک‌اند (NestJS + Prisma + PostgreSQL)
- [x] مدل‌های Product و Category
- [x] احراز هویت کامل (signup, login, JWT guard)
- [ ] مدل Order و Cart
- [ ] پنل مدیریت
- [ ] بازسازی فرانت‌اند با Next.js

## License

این پروژه تحت مجوز MIT منتشر شده است.