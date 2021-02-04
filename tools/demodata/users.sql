BEGIN;

DELETE FROM "user";
DELETE FROM "services";

INSERT INTO "services" ("id", "password", "roles") VALUES
	('588bf48b-f009-4f4f-91a9-186fbac65f68', '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', 'admin') , -- sysadmin, password
	('49e42b93-b384-47da-a26c-2a18609c3fb0', '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', 'moderator') , -- John Doe, password
	('daf85d25-b2de-4453-97a1-8ddd6c7b2061', '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', ''); -- Jane Doe, password

INSERT INTO "user" ("id", "name", "email", "services_id") VALUES
	('d0ee6702-4496-4b8c-8d16-8b7b081debad', 'SYSTEM', 'system@example.com', '588bf48b-f009-4f4f-91a9-186fbac65f68'),
	('c3b30f55-0fcd-4deb-b62e-bf0d174e67fa', 'John Doe', 'john.doe@example.com', '49e42b93-b384-47da-a26c-2a18609c3fb0'),
	('541940ed-d955-4fb1-8353-7271ce5843f9', 'Jane Doe', 'jane.doe@example.com', 'daf85d25-b2de-4453-97a1-8ddd6c7b2061');

COMMIT;
