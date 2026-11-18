-- فقط برای دیتابیسی که قبلاً جدول‌های customers و orders را با نسخه قبلی ساخته است
ALTER TABLE customers ADD COLUMN birth_month INTEGER;
ALTER TABLE customers ADD COLUMN birth_day INTEGER;
ALTER TABLE orders ADD COLUMN birth_month INTEGER;
ALTER TABLE orders ADD COLUMN birth_day INTEGER;
