-- ==============================
-- 1. Вмикаємо розширення UUID
-- ==============================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================
-- 2. Створення таблиць
-- ==============================


CREATE TABLE "Users" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Email" VARCHAR(255) UNIQUE NOT NULL,
    "FullName" VARCHAR(255) NOT NULL,
    "PasswordHash" TEXT NOT NULL
);


CREATE TABLE "Events" (
    "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "Title" VARCHAR(255) NOT NULL,
    "Description" TEXT,
    "Start" TIMESTAMP WITH TIME ZONE NOT NULL,
    "End" TIMESTAMP WITH TIME ZONE,
    "Location" VARCHAR(255),
    "Capacity" INTEGER,
    "IsPublic" BOOLEAN NOT NULL,
    "OrganizerId" UUID NOT NULL,
    CONSTRAINT "FK_Events_Users_OrganizerId" FOREIGN KEY ("OrganizerId") 
        REFERENCES "Users" ("Id") ON DELETE RESTRICT
);


CREATE TABLE "EventParticipants" (
    "UserId" UUID NOT NULL,
    "EventId" UUID NOT NULL,
    PRIMARY KEY ("UserId", "EventId"),
    CONSTRAINT "FK_EventParticipants_Users_UserId" FOREIGN KEY ("UserId") 
        REFERENCES "Users" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_EventParticipants_Events_EventId" FOREIGN KEY ("EventId") 
        REFERENCES "Events" ("Id") ON DELETE CASCADE
);

-- ==============================
-- 3. Заповнення данних (Seed)
-- ==============================

-- користувачі
--Пароль :12345678
INSERT INTO "Users" ("Email", "FullName", "PasswordHash") VALUES
    ('anna.petrenko@example.com', 'Анна Петренко', '$2a$12$yBimTj8ueQA2bY6vBdR8MOpoPB.Mpg.Up9YVY21BVbosGQSNVdCE6'),
    ('ivan.ivanov@example.com', 'Іван Іванов', '$2a$12$yBimTj8ueQA2bY6vBdR8MOpoPB.Mpg.Up9YVY21BVbosGQSNVdCE6'),
    ('maria.koval@example.com', 'Марія Коваль', '$2a$12$yBimTj8ueQA2bY6vBdR8MOpoPB.Mpg.Up9YVY21BVbosGQSNVdCE6');


INSERT INTO "Events" ("Title", "Description", "Start", "End", "Location", "Capacity", "IsPublic", "OrganizerId")
VALUES
    ('Воркшоп з UI/UX дизайну', 
     'Практичний майстер-клас з основ UX-дизайну для початківців.', 
     '2025-11-10 10:00:00+03', '2025-11-10 14:00:00+03', 
     'Київ, вул. Грушевського 5', 25, TRUE, 
     (SELECT "Id" FROM "Users" WHERE "Email" = 'anna.petrenko@example.com')),

    ('Хакатон з веб-розробки', 
     '48 годин повного занурення у створення веб-проектів.', 
     '2025-12-01 09:00:00+03', '2025-12-03 18:00:00+03', 
     'Львів, IT Hub', 50, TRUE, 
     (SELECT "Id" FROM "Users" WHERE "Email" = 'ivan.ivanov@example.com')),

    ('Приватна зустріч розробників', 
     'Networking-зустріч для обміну досвідом у сфері розробки .NET.', 
     '2025-11-20 18:30:00+03', '2025-11-20 21:30:00+03', 
     'Онлайн', 15, FALSE, 
     (SELECT "Id" FROM "Users" WHERE "Email" = 'maria.koval@example.com'));


INSERT INTO "EventParticipants" ("UserId", "EventId")
VALUES
    ((SELECT "Id" FROM "Users" WHERE "Email" = 'ivan.ivanov@example.com'),
     (SELECT "Id" FROM "Events" WHERE "Title" = 'Воркшоп з UI/UX дизайну')),
     
    ((SELECT "Id" FROM "Users" WHERE "Email" = 'maria.koval@example.com'),
     (SELECT "Id" FROM "Events" WHERE "Title" = 'Хакатон з веб-розробки')),

    ((SELECT "Id" FROM "Users" WHERE "Email" = 'anna.petrenko@example.com'),
     (SELECT "Id" FROM "Events" WHERE "Title" = 'Приватна зустріч розробників'));