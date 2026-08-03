# راهنمای مشارکت

## Commit Convention

این پروژه از Conventional Commits پیروی می‌کند (https://www.conventionalcommits.org/).

فرمت: type(scope): subject

انواع مجاز: feat, fix, docs, style, refactor, test, chore, ci

مثال‌ها:
feat(auth): add JWT login endpoint
fix(cart): prevent negative quantity
docs(readme): update setup instructions

## ساختار برنچ‌ها

- main — همیشه قابل دیپلوی.
- feature/<نام-کوتاه> — هر فیچر جدید روی برنچ جدا.
- fix/<نام-کوتاه> — رفع باگ.

## پیش از هر Commit

1. تغییرات مرتبط با یک موضوع مشخص باشند (commit های کوچک و معنادار).
2. پیام commit مطابق Conventional Commits باشد.