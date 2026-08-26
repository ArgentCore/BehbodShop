# چرم بهبد | BehbodShop

فروشگاه اینترنتی محصولات چرمی دست‌دوز ایرانی — در حال تبدیل‌شدن از یک نمونه‌ی اولیه‌ی استاتیک به یک پلتفرم full-stack واقعی.

## وضعیت پروژه

در حال توسعه (Phase 2 — Auth, Domain Models & Cart)

بک‌اند NestJS با دیتابیس PostgreSQL واقعی، مدل‌های دامنه (Product, Category, User, Cart) با روابط واقعی بین آن‌ها، سیستم احراز هویت کامل (JWT)، و سبد خرید کاملاً کاربردی پیاده‌سازی شده. فرانت‌اند هنوز نسخه‌ی استاتیک اولیه است (در docs/legacy-prototype نگهداری می‌شود).

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
| GET | /products | لیست محصولات فعال (پشتیبانی از فیلتر ?category=slug) | خیر |
| POST | /products | ساخت محصول جدید | بله (JWT) |
| GET | /categories | لیست دسته‌بندی‌ها | خیر |
| POST | /categories | ساخت دسته‌بندی جدید | بله (JWT) |
| POST | /auth/signup | ثبت‌نام کاربر جدید | خیر |
| POST | /auth/login | ورود و دریافت JWT | خیر |
| GET | /auth/me | اطلاعات کاربر لاگین‌شده | بله (JWT) |
| GET | /cart | مشاهده‌ی سبد خرید (خودکار ساخته می‌شود) | بله (JWT) |
| POST | /cart/items | افزودن محصول به سبد (جمع تعداد در صورت تکرار) | بله (JWT) |
| DELETE | /cart/items/:productId | حذف یک قلم از سبد | بله (JWT) |

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
- [x] مدل‌های Product و Category با رابطه‌ی واقعی
- [x] احراز هویت کامل (signup, login, JWT guard)
- [x] فیلتر محصولات بر اساس دسته‌بندی
- [x] سبد خرید کامل (Cart & CartItem)
- [ ] مدل Order و ثبت سفارش واقعی
- [ ] پنل مدیریت
- [ ] بازسازی فرانت‌اند با Next.js

## License

این پروژه تحت مجوز MIT منتشر شده است.