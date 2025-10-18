-- Начальные миграции БД
-- Добавь свои скрипты

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Пример таблицы
-- CREATE TABLE users (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );