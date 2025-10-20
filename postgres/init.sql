-- Включаем расширение для генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Таблица Пользователей (из User.cs)
CREATE TABLE "Users" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Email" VARCHAR(255) UNIQUE NOT NULL,
    "FullName" VARCHAR(255) NOT NULL,
    "PasswordHash" TEXT NOT NULL
);

-- 2. Таблица Событий (из Event.cs)
CREATE TABLE "Events" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Title" VARCHAR(255) NOT NULL,
    "Description" TEXT,
    "Start" TIMESTAMP WITH TIME ZONE NOT NULL,
    "End" TIMESTAMP WITH TIME ZONE,
    "Location" VARCHAR(255),
    "Capacity" INTEGER,
    "IsPublic" BOOLEAN NOT NULL,
    
    -- Связь "Один ко многим" с Пользователем (Организатором)
    "OrganizerId" UUID NOT NULL,
    CONSTRAINT "FK_Events_Users_OrganizerId" FOREIGN KEY ("OrganizerId") 
        REFERENCES "Users" ("Id") 
        ON DELETE RESTRICT -- Запрещаем удалять пользователя, если у него есть события
);

-- 3. Таблица Участников Событий (из EventParticipant.cs)
-- Это связующая таблица "Многие ко многим"
CREATE TABLE "EventParticipants" (
    "UserId" UUID NOT NULL,
    "EventId" UUID NOT NULL,
    
    -- Составной первичный ключ: один пользователь может присоединиться к одному событию только один раз
    PRIMARY KEY ("UserId", "EventId"),
    
    -- Внешний ключ к Пользователям
    CONSTRAINT "FK_EventParticipants_Users_UserId" FOREIGN KEY ("UserId") 
        REFERENCES "Users" ("Id") 
        ON DELETE CASCADE, -- Если пользователь удален, его участие в событиях отменяется
    
    -- Внешний ключ к Событиям
    CONSTRAINT "FK_EventParticipants_Events_EventId" FOREIGN KEY ("EventId") 
        REFERENCES "Events" ("Id") 
        ON DELETE CASCADE -- Если событие удалено, все участие в нем отменяется
);
-- ==============================
-- 1. Включаем расширение UUID
-- ==============================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================
-- 2. Пользователи
-- ==============================
INSERT INTO "Users" ("Id", "Email", "FullName", "PasswordHash") VALUES
    (uuid_generate_v4(), 'anna.petrenko@example.com', 'Анна Петренко', 'hash_anna123'),
    (uuid_generate_v4(), 'ivan.ivanov@example.com', 'Іван Іванов', 'hash_ivan456'),
    (uuid_generate_v4(), 'maria.koval@example.com', 'Марія Коваль', 'hash_maria789');

-- ==============================
-- 3. События
-- ==============================
-- Получим ID пользователей для удобства (в реальном SQL можно просто взять их через SELECT)
-- Здесь условно вставляем вручную, чтобы пример был самодостаточным

-- Найдем Id организаторов (для примера вручную указываем через подзапрос)
INSERT INTO "Events" ("Id", "Title", "Description", "Start", "End", "Location", "Capacity", "IsPublic", "OrganizerId")
VALUES
    (uuid_generate_v4(), 'Воркшоп з UI/UX дизайну', 
     'Практичний майстер-клас з основ UX-дизайну для початківців.', 
     '2025-11-10 10:00:00+03', '2025-11-10 14:00:00+03', 
     'Київ, вул. Грушевського 5', 25, TRUE, 
     (SELECT "Id" FROM "Users" WHERE "Email" = 'anna.petrenko@example.com')),

    (uuid_generate_v4(), 'Хакатон з веб-розробки', 
     '48 годин повного занурення у створення веб-проектів.', 
     '2025-12-01 09:00:00+03', '2025-12-03 18:00:00+03', 
     'Львів, IT Hub', 50, TRUE, 
     (SELECT "Id" FROM "Users" WHERE "Email" = 'ivan.ivanov@example.com')),

    (uuid_generate_v4(), 'Приватна зустріч розробників', 
     'Networking-зустріч для обміну досвідом у сфері розробки .NET.', 
     '2025-11-20 18:30:00+03', '2025-11-20 21:30:00+03', 
     'Онлайн', 15, FALSE, 
     (SELECT "Id" FROM "Users" WHERE "Email" = 'maria.koval@example.com'));

-- ==============================
-- 4. Участники событий
-- ==============================
INSERT INTO "EventParticipants" ("UserId", "EventId")
VALUES
    ((SELECT "Id" FROM "Users" WHERE "Email" = 'ivan.ivanov@example.com'),
     (SELECT "Id" FROM "Events" WHERE "Title" = 'Воркшоп з UI/UX дизайну')),
     
    ((SELECT "Id" FROM "Users" WHERE "Email" = 'maria.koval@example.com'),
     (SELECT "Id" FROM "Events" WHERE "Title" = 'Хакатон з веб-розробки')),

    ((SELECT "Id" FROM "Users" WHERE "Email" = 'anna.petrenko@example.com'),
     (SELECT "Id" FROM "Events" WHERE "Title" = 'Приватна зустріч розробників'));
